"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Loader2,
  ShieldCheck,
  Sparkles,
  CameraOff,
} from "lucide-react";
import type { FaceCaptureRecord } from "@/lib/verification/types";

interface FaceCaptureCardProps {
  existingCapture?: FaceCaptureRecord;
  onCaptureComplete: (imageBase64: string, mode: "auto" | "manual") => Promise<void>;
  isProcessing: boolean;
}

export function FaceCaptureCard({
  existingCapture,
  onCaptureComplete,
  isProcessing,
}: FaceCaptureCardProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const [streamActive, setStreamActive] = React.useState(false);
  const [permissionDenied, setPermissionDenied] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // 15-Second Auto-Capture Timer
  const [timeLeft, setTimeLeft] = React.useState(15);
  const [timerTimedOut, setTimerTimedOut] = React.useState(false);

  // Face Detection State
  const [faceDetected, setFaceDetected] = React.useState(false);
  const [isCentered, setIsCentered] = React.useState(false);
  const [holdStillCount, setHoldStillCount] = React.useState(0);
  const [capturedImage, setCapturedImage] = React.useState<string | null>(null);

  const mediaStreamRef = React.useRef<MediaStream | null>(null);
  const detectionIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // Cleanup helper to guarantee webcam is turned off
  const stopCameraStream = React.useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      mediaStreamRef.current = null;
    }
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setStreamActive(false);
  }, []);

  // Request camera and initialize detection stream
  const startCamera = React.useCallback(async () => {
    stopCameraStream();
    setErrorMessage(null);
    setPermissionDenied(false);
    setTimeLeft(15);
    setTimerTimedOut(false);
    setHoldStillCount(0);
    setCapturedImage(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
        audio: false,
      });

      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStreamActive(true);

      // Start 15s timer
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            setTimerTimedOut(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: unknown) {
      console.error("Camera access error:", err);
      const isDenied =
        err instanceof DOMException &&
        (err.name === "NotAllowedError" || err.name === "PermissionDeniedError");
      setPermissionDenied(isDenied);
      setErrorMessage(
        isDenied
          ? "Camera permission was denied. Please allow camera access in browser settings."
          : "Unable to connect to camera device. Please ensure a webcam is connected."
      );
      stopCameraStream();
    }
  }, [stopCameraStream]);

  // Client-side canvas frame analysis
  const analyzeFrame = React.useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !streamActive || capturedImage) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video.videoWidth === 0 || video.videoHeight === 0) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Analyze central target region
    const cx = Math.floor(canvas.width * 0.25);
    const cy = Math.floor(canvas.height * 0.15);
    const cw = Math.floor(canvas.width * 0.5);
    const ch = Math.floor(canvas.height * 0.7);

    try {
      const imgData = ctx.getImageData(cx, cy, cw, ch);
      const pixels = imgData.data;

      let totalBrightness = 0;
      let edgeChanges = 0;
      const step = 4; // Sample every 4th pixel for high FPS performance

      for (let i = 0; i < pixels.length; i += step * 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const brightness = (r + g + b) / 3;
        totalBrightness += brightness;

        if (i > 4) {
          const prevBrightness = (pixels[i - 4] + pixels[i - 3] + pixels[i - 2]) / 3;
          if (Math.abs(brightness - prevBrightness) > 25) {
            edgeChanges++;
          }
        }
      }

      const sampledCount = pixels.length / (step * 4);
      const avgBrightness = totalBrightness / sampledCount;
      const edgeDensity = edgeChanges / sampledCount;

      // Detection heuristic: Adequate lighting (35 - 220) and high edge density (face contours vs plain wall)
      const hasFace = avgBrightness >= 35 && avgBrightness <= 225 && edgeDensity >= 0.12;
      const centered = hasFace && avgBrightness >= 40 && avgBrightness <= 210;

      setFaceDetected(hasFace);
      setIsCentered(centered);

      // Auto-capture accumulator: If face is centered and steady for ~1.5 seconds (3 ticks)
      if (centered && !timerTimedOut) {
        setHoldStillCount((prev) => {
          const next = prev + 1;
          if (next >= 4) {
            // Trigger auto capture!
            executeCapture("auto");
            return 0;
          }
          return next;
        });
      } else {
        setHoldStillCount(0);
      }
    } catch {
      // Ignore frame read errors
    }
  }, [streamActive, capturedImage, timerTimedOut]);

  // Run frame analysis loop while camera is active
  React.useEffect(() => {
    if (streamActive && !capturedImage) {
      detectionIntervalRef.current = setInterval(analyzeFrame, 400);
    }
    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, [streamActive, capturedImage, analyzeFrame]);

  // Execute snapshot from active canvas
  const executeCapture = React.useCallback(
    async (mode: "auto" | "manual") => {
      if (!canvasRef.current) return;
      const dataUrl = canvasRef.current.toDataURL("image/jpeg", 0.9);
      setCapturedImage(dataUrl);
      stopCameraStream();

      try {
        await onCaptureComplete(dataUrl, mode);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Face capture verification failed.";
        setErrorMessage(msg);
      }
    },
    [onCaptureComplete, stopCameraStream]
  );

  // Stop camera on unmount
  React.useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, [stopCameraStream]);

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg border border-border bg-muted/40 text-foreground">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm font-semibold">Live Face Verification</CardTitle>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-amber-500/30 text-amber-500">
                  Required
                </Badge>
              </div>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Take a live photo to complete your student identity onboarding verification.
              </CardDescription>
            </div>
          </div>

          {(existingCapture || capturedImage) && (
            <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs gap-1 py-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Face Verified</span>
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {errorMessage && (
          <div
            role="alert"
            className="p-3 rounded-lg border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center justify-between gap-2 animate-in fade-in"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs px-2"
              onClick={startCamera}
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Retry
            </Button>
          </div>
        )}

        {/* Existing verified state */}
        {existingCapture && !streamActive && !capturedImage && (
          <div className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/[0.03] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Biometric Identity Confirmed
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Mode: {existingCapture.captureMode === "auto" ? "Automatic Detection" : "Manual Verified"} •{" "}
                    {new Date(existingCapture.capturedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={startCamera}
                disabled={isProcessing}
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                Retake Photo
              </Button>
            </div>
          </div>
        )}

        {/* Active Camera Viewfinder */}
        {streamActive && (
          <div className="space-y-3">
            <div className="relative aspect-[4/3] max-w-md mx-auto rounded-xl overflow-hidden bg-black border-2 border-border shadow-inner">
              <video
                ref={videoRef}
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Target Face Oval Overlay */}
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-4">
                <div
                  className={`w-48 h-60 rounded-[50%] border-2 transition-all duration-300 ${
                    isCentered
                      ? "border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.5)] scale-[1.02]"
                      : faceDetected
                      ? "border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.3)]"
                      : "border-white/30 border-dashed"
                  }`}
                />

                {/* Live Guidance Feedback */}
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md transition-colors ${
                      holdStillCount > 0
                        ? "bg-emerald-500/80 text-white"
                        : isCentered
                        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                        : faceDetected
                        ? "bg-amber-950/80 text-amber-300 border border-amber-500/40"
                        : "bg-black/60 text-white/90 border border-white/20"
                    }`}
                  >
                    {holdStillCount > 0 ? (
                      <>
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        <span>Hold still... Capturing</span>
                      </>
                    ) : isCentered ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Face detected. Keep centered.</span>
                      </>
                    ) : faceDetected ? (
                      <span>Position face inside oval frame.</span>
                    ) : (
                      <span>Position your face inside the frame.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 15-Second Countdown Badge */}
              <div className="absolute top-3 right-3">
                <div
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium backdrop-blur-md border ${
                    timerTimedOut
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      : "bg-black/60 text-white border-white/20"
                  }`}
                >
                  {timerTimedOut ? (
                    "Auto capture timed out"
                  ) : (
                    `Auto capture in ${timeLeft}s`
                  )}
                </div>
              </div>
            </div>

            {/* Controls Row: 15-second manual capture fallback */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <p className="text-xs text-muted-foreground text-center sm:text-left">
                {timerTimedOut
                  ? "Automatic timer elapsed. You can now trigger manual capture."
                  : "Automatic capture will trigger when your face is centered."}
              </p>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-initial text-xs"
                  onClick={stopCameraStream}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant={timerTimedOut ? "default" : "secondary"}
                  className={`flex-1 sm:flex-initial text-xs font-semibold gap-1.5 ${
                    timerTimedOut
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                      : ""
                  }`}
                  onClick={() => executeCapture("manual")}
                  disabled={!streamActive}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Capture Manually</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Captured Snapshot Preview (Post-Capture) */}
        {capturedImage && (
          <div className="space-y-3">
            <div className="relative aspect-[4/3] max-w-xs mx-auto rounded-xl overflow-hidden border border-border shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={capturedImage}
                alt="Captured Student Selfie"
                className="w-full h-full object-cover transform -scale-x-100"
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-emerald-500 text-white text-[10px] py-0.5">
                  Captured
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={startCamera}
                disabled={isProcessing}
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                Retake
              </Button>
            </div>
          </div>
        )}

        {/* Initial inactive prompt */}
        {!streamActive && !existingCapture && !capturedImage && (
          <div className="p-5 border-2 border-dashed border-border rounded-lg text-center space-y-3 bg-muted/10">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              <Camera className="w-5 h-5" />
            </div>

            <div className="space-y-1 max-w-sm mx-auto">
              <p className="text-xs font-semibold text-foreground">
                Live Camera Capture Required
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Skill Bridge captures a 1-second live selfie to match your institutional ID.
                Camera stream is only used during this step and automatically terminates upon capture.
              </p>
            </div>

            <Button
              type="button"
              onClick={startCamera}
              disabled={isProcessing}
              className="text-xs font-semibold gap-1.5"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Enable Camera &amp; Start Capture</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
