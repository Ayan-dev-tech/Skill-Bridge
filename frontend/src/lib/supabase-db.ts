import crypto from "crypto";
import { getSupabaseServerClient } from "./supabase-server";
import type {
  User,
  Profile,
  OtpVerification,
  RoleType,
  HiringRequest,
  CampusRequest,
  InterestProfileRecord,
  InterestSessionRecord,
  KnowledgeTestSessionRecord,
  KnowledgeTestResultRecord,
  JobPosting,
  InternshipPosting,
} from "./db";
import type {
  StudentVerificationRecord,
  VerificationDocumentRecord,
  ProfessionalProfiles,
  SubmissionStatus,
} from "./verification/types";
import type {
  SkillGapAnalysisRecord,
  Educator,
  EducationProgram,
} from "./skill-gap/types";
import {
  SAMPLE_EDUCATORS,
  SAMPLE_EDUCATION_PROGRAMS,
} from "./skill-gap/educator-catalog-data";
import type { LearningResourceRecord, LearningResourceItem } from "./learning/types";
import type { JobApplicationRecord, SubmitApplicationParams } from "./applications/types";
import type {
  IndustryQuestionRecord,
  CreateIndustryQuestionInput,
  PermittedStudentTalent,
  StudentTalentFilterParams,
  IndustryProfileMetadata,
  IndustryHiringPostRecord,
  CreateHiringPostInput,
  UpdateHiringPostInput,
  KnowledgeTestConfig,
} from "./industry/types";
import type {
  CampusDashboardSummary,
  CampusStudentFilterParams,
  CampusStudentListResponse,
  CampusStudentProfileDetail,
  CampusFacultyFilterParams,
  CampusFacultyListResponse,
  CampusFacultyDetail,
  CampusIndustryFilterParams,
  CampusIndustryListResponse,
  CampusHiringPostFilterParams,
  CampusHiringPostListResponse,
  CampusApplicationFilterParams,
  CampusApplicationListResponse,
  PlacementReportFilters,
  PlacementReportData,
} from "./campus/types";
import type { AssessmentQuestion, AssessmentConfig, AssessmentAttempt } from "./assessment/types";
import type {
  AyushSkillPassport,
  AyushDevelopmentIntervention,
  AyushStudentDevelopmentPlan,
  DevelopmentPlanStatus,
} from "./ayush/types";

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// ==========================================
// MAPPERS: Supabase snake_case <-> TypeScript
// ==========================================

function mapUser(row: any): User {
  return {
    id: row.id,
    email: row.email,
    role: row.role as RoleType,
    passwordHash: row.password_hash || "",
    fullName: row.full_name || row.email,
    isVerified: Boolean(row.is_verified),
    isAdmin: Boolean(row.is_admin),
    createdAt: row.created_at || new Date().toISOString(),
  };
}

function mapProfile(row: any): Profile {
  return {
    userId: row.user_id,
    role: row.role as RoleType,
    metadata: (row.metadata || {}) as Record<string, unknown>,
  };
}

function mapOtp(row: any): OtpVerification {
  return {
    id: row.email,
    email: row.email,
    role: "student",
    otpCode: row.otp,
    expiresAt: row.expires_at,
    attempts: 0,
    verified: Boolean(row.verified),
    createdAt: row.created_at,
  };
}

function mapVerificationDocument(row: any): VerificationDocumentRecord {
  return {
    id: row.id,
    studentId: row.student_id,
    documentType: row.document_type,
    groupId: row.group_id || undefined,
    fileName: row.file_name,
    fileType: row.file_type,
    fileSizeBytes: Number(row.file_size_bytes || 0),
    storagePath: row.storage_path,
    uploadedAt: row.uploaded_at || new Date().toISOString(),
    uploadStatus: (row.upload_status || "completed") as any,
  };
}

function mapStudentVerification(row: any, docs: any[] = []): StudentVerificationRecord {
  const documents = (row.verification_documents || docs || []).map(mapVerificationDocument);
  return {
    studentId: row.student_id,
    verificationStatus: (row.verification_status || "NOT_STARTED") as SubmissionStatus,
    documents,
    completedAt: row.completed_at || undefined,
    createdAt: row.created_at || row.updated_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
    professionalProfiles: row.professional_profiles || undefined,
  };
}

function mapInterestProfile(row: any): InterestProfileRecord {
  return {
    id: row.id,
    studentId: row.student_id,
    sessionId: row.id,
    confirmedMainDomain: row.confirmed_main_domain,
    confirmedMainDomainId: (row.confirmed_main_domain || "").toLowerCase().replace(/\s+/g, "-"),
    confirmedSpecificInterest: row.confirmed_specific_interest,
    explanation: row.explanation || "",
    confidence: Number(row.confidence || 0),
    interestSignals: row.interest_signals || {},
    candidateDomainScores: row.candidate_domain_scores || {},
    phase1AnswerCount: Number(row.phase1_answer_count || 0),
    phase2AnswerCount: Number(row.phase2_answer_count || 0),
    confirmedAt: row.confirmed_at || new Date().toISOString(),
  };
}

function mapInterestSession(row: any): InterestSessionRecord {
  return {
    studentId: row.student_id,
    sessionId: row.session_id,
    phase: (row.phase || 1) as 1 | 2,
    broadDomain: row.broad_domain || undefined,
    answers: row.answers || [],
    signalScores: row.interest_signals || {},
    domainScores: row.domain_scores || {},
    status: row.status || "intro",
    updatedAt: row.completed_at || row.started_at || new Date().toISOString(),
  };
}

function mapKnowledgeTestSession(row: any): KnowledgeTestSessionRecord {
  return {
    sessionId: row.session_id,
    studentId: row.student_id,
    domainId: row.domain_id,
    domainName: row.domain_name,
    specificInterest: row.domain_name || "",
    difficulty: row.difficulty,
    questions: row.questions || [],
    currentQuestionIndex: Number(row.current_question_index || 0),
    answers: Array.isArray(row.answers) ? row.answers : [],
    status: row.status || "in_progress",
    startedAt: row.started_at,
    updatedAt: row.completed_at || row.started_at || new Date().toISOString(),
  };
}

function mapKnowledgeTestResult(row: any): KnowledgeTestResultRecord {
  const score = Number(row.score || 0);
  const maxScore = Number(row.max_score || 40);
  return {
    id: row.id,
    sessionId: row.session_id,
    studentId: row.student_id,
    domainId: row.domain_id,
    domainName: row.domain_name,
    specificInterest: row.domain_name || "",
    difficulty: row.difficulty,
    totalQuestions: Array.isArray(row.answers) ? row.answers.length : 10,
    correctCount: Math.round(score / 4),
    score,
    maxScore,
    pointsPerQuestion: 4,
    scorePercent: Number(row.score_percent || (maxScore > 0 ? (score / maxScore) * 100 : 0)),
    performanceTier: (row.knowledge_level || "Proficient") as any,
    knowledgeLevel: row.knowledge_level || "Proficient",
    strengths: row.strengths || [],
    weaknesses: row.weaknesses || [],
    questionBreakdown: [],
    totalTimeMs: Number(row.time_taken_seconds || 0) * 1000,
    completedAt: row.completed_at || row.created_at || new Date().toISOString(),
  };
}

function mapSkillGapAnalysis(row: any): SkillGapAnalysisRecord {
  return {
    id: row.id,
    studentId: row.student_id,
    interestProfileId: row.interest_profile_id || "",
    knowledgeTestResultId: row.knowledge_test_result_id || "",
    domainId: row.domain_id,
    domainName: row.domain_name,
    nicheId: row.niche_id,
    nicheTitle: row.niche_title,
    difficulty: row.difficulty,
    testScore: Number(row.test_score || 0),
    testMaxScore: Number(row.test_max_score || 0),
    testScorePercent: Number(row.test_score_percent || 0),
    knowledgeLevel: row.knowledge_level,
    skillProfileVersion: row.skill_profile_version || "1.0",
    executiveSummary: row.executive_summary || "",
    skillGaps: row.skill_gaps || [],
    recommendations: row.recommendations || [],
    aiGenerated: Boolean(row.ai_generated),
    isStale: Boolean(row.is_stale),
    createdAt: row.created_at,
    updatedAt: row.updated_at || row.created_at,
  };
}


function mapJobApplication(row: any): JobApplicationRecord {
  return {
    id: row.id,
    studentId: row.student_id,
    jobId: row.job_id || undefined,
    companyName: row.company_name || "Partner Company",
    roleTitle: row.role_title || undefined,
    position: row.position || row.role_title || undefined,
    location: row.location || undefined,
    type: row.type || undefined,
    employmentType: row.employment_type || undefined,
    salaryRange: row.salary_range || undefined,
    status: row.status as any,
    appliedAt: row.applied_at || new Date().toISOString(),
    statusUpdatedAt: row.status_updated_at || undefined,
    updatedAt: row.updated_at || row.applied_at || new Date().toISOString(),
    matchScoreAtApplication: row.match_score_at_application != null ? Number(row.match_score_at_application) : undefined,
    timeline: row.timeline || [],
    applicantFullName: row.applicant_full_name || undefined,
    applicantEmail: row.applicant_email || undefined,
    applicantPhone: row.applicant_phone || undefined,
    resumeFileName: row.resume_file_name || undefined,
    submittedDocumentTypes: row.submitted_document_types || [],
    coverLetter: row.cover_letter || undefined,
    portfolioUrl: row.portfolio_url || undefined,
    githubUrl: row.github_url || undefined,
    linkedinUrl: row.linkedin_url || undefined,
    screeningStatus: row.screening_status || "pending",
    screeningNotes: row.screening_notes || undefined,
    documentValidationResults: row.document_validation_results || undefined,
    eligibilityStatus: row.eligibility_status || undefined,
    knowledgeTestScore: row.knowledge_test_score != null ? Number(row.knowledge_test_score) : undefined,
    knowledgeTestPassed: row.knowledge_test_passed != null ? Boolean(row.knowledge_test_passed) : undefined,
    interviewStatus: row.interview_status || "not_scheduled",
    interviewRounds: row.interview_rounds || [],
    interviewFeedback: row.interview_feedback || undefined,
    finalStatus: row.final_status || "pending",
    finalDecisionDate: row.final_decision_date || undefined,
  };
}

function mapIndustryHiringPost(row: any): IndustryHiringPostRecord {
  return {
    id: row.id,
    industryId: row.industry_id,
    companyName: row.company_name,
    roleTitle: row.role_title,
    hiringType: row.hiring_type || "Full-time",
    industryDomain: row.industry_domain,
    location: row.location,
    workMode: row.work_mode || "Hybrid",
    salaryRange: row.salary_range || "",
    experienceRequirement: row.experience_requirement || "",
    openings: Number(row.openings || 1),
    deadline: row.deadline,
    description: row.description,
    responsibilities: row.responsibilities || [],
    requiredSkills: row.required_skills || [],
    preferredSkills: row.preferred_skills || [],
    requiredQualifications: row.required_qualifications || [],
    preferredQualifications: row.preferred_qualifications || [],
    requiredDocumentTypes: row.required_document_types || [],
    interviewDetails: row.interview_config || {
      mode: "Virtual",
      type: "Technical & Behavioral",
      estimatedRounds: 2,
      instructions: "Standard interview process",
    },
    knowledgeTest: row.knowledge_test_config || undefined,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at || row.created_at,
    publishedAt: row.published_at || undefined,
  };
}

function mapHiringRequest(row: any): HiringRequest {
  return {
    id: row.id,
    companyName: row.company_name,
    industryDomain: row.industry_domain || row.industry,
    jobTitle: row.job_title || row.open_roles?.[0] || "Hiring Drive",
    positions: Number(row.positions || 5),
    applicants: Number(row.applicants || 10),
    status: row.status,
    isFrozen: Boolean(row.is_frozen),
    freezeReason: row.freeze_reason || undefined,
    updatedAt: row.updated_at || row.created_at,
  };
}

function mapCampusRequest(row: any): CampusRequest {
  return {
    id: row.id,
    campusName: row.campus_name,
    code: row.code,
    requestType: row.request_type,
    studentsEnrolled: Number(row.students_enrolled || 0),
    status: row.status,
    isFrozen: Boolean(row.is_frozen),
    freezeReason: row.freeze_reason || undefined,
    updatedAt: row.updated_at || row.created_at,
  };
}

function mapIndustryQuestion(row: any): IndustryQuestionRecord {
  return {
    id: row.id,
    industryId: row.industry_id,
    questionText: row.question_text,
    questionType: row.question_type || "multiple_choice",
    options: row.options || [],
    correctOptionId: row.correct_option_id,
    difficulty: row.difficulty,
    complexity: row.complexity,
    domainId: row.domain_id,
    conceptTag: row.concept_tag,
    marks: Number(row.marks || 1),
    explanation: row.explanation || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at || row.created_at,
  };
}

function mapEducationProgram(r: any): EducationProgram {
  return {
    id: r.id,
    educatorId: r.educator_id,
    educatorName: r.educator_name || "Partner Educator",
    title: r.title,
    description: r.description || "",
    programUrl: r.program_url || "",
    domains: r.domains || [],
    niches: r.niches || [],
    skillIds: r.skill_ids || [],
    difficulty: r.difficulty || "intermediate",
    deliveryType: r.delivery_type || "Online Self-Paced",
    duration: r.duration || "",
    certification: r.certification || "",
    verifiedStatus: r.verified_status || "verified_partner",
    active: Boolean(r.active),
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function mapAssessmentQuestion(row: any): AssessmentQuestion {
  return {
    id: row.id,
    questionText: row.question_text,
    scenarioContext: row.scenario_context || undefined,
    options: row.options || [],
    correctOptionId: row.correct_option_id,
    explanation: row.explanation || "",
    examType: row.exam_type,
    questionType: row.question_type || "MCQ",
    subject: row.subject,
    topic: row.topic,
    ayushSkillIds: row.ayush_skill_ids || [],
    skillCategory: row.skill_category || null,
    difficulty: row.difficulty,
    cognitiveLevel: row.cognitive_level,
    ayushSystem: row.ayush_system || null,
    conceptTag: row.concept_tag,
    sourceRef: row.source_ref || undefined,
    referenceYear: row.reference_year != null ? Number(row.reference_year) : undefined,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at || row.created_at,
  };
}

function mapAssessmentConfig(row: any): AssessmentConfig {
  return {
    id: row.id,
    name: row.name,
    description: row.description || "",
    examType: row.exam_type,
    mode: row.mode || "Practice",
    ayushSystem: row.ayush_system || null,
    subjectFilters: row.subject_filters || [],
    topicFilters: row.topic_filters || [],
    difficulty: row.difficulty || null,
    questionCount: Number(row.question_count || 10),
    timeLimitMinutes: row.time_limit_minutes != null ? Number(row.time_limit_minutes) : null,
    passingScorePercent: row.passing_score_percent != null ? Number(row.passing_score_percent) : null,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at || row.created_at,
  };
}

function mapAssessmentAttempt(row: any): AssessmentAttempt {
  return {
    id: row.id,
    studentId: row.student_id,
    configId: row.config_id,
    examType: row.exam_type || "PRACTICAL_SCENARIO",
    ayushSystem: row.ayush_system || null,
    questionIds: row.question_ids || [],
    responses: row.responses || {},
    startedAt: row.started_at,
    endedAt: row.ended_at || null,
    status: row.status || "in_progress",
    score: row.score != null ? Number(row.score) : null,
    maxScore: row.max_score != null ? Number(row.max_score) : null,
    scorePercent: row.score_percent != null ? Number(row.score_percent) : null,
    correctCount: row.correct_count != null ? Number(row.correct_count) : null,
    incorrectCount: row.incorrect_count != null ? Number(row.incorrect_count) : null,
    unattemptedCount: row.unattempted_count != null ? Number(row.unattempted_count) : null,
    totalQuestions: Number(row.total_questions || (row.question_ids ? row.question_ids.length : 0)),
    skillPerformance: row.skill_performance || {},
    createdAt: row.created_at || row.started_at,
    updatedAt: row.updated_at || row.started_at,
  };
}

function mapAyushSkillPassport(row: any): AyushSkillPassport {
  return {
    studentId: row.student_id,
    ayushSystem: row.ayush_system,
    course: row.course || "BAMS",
    academicLevel: row.academic_level || "UG",
    institution: row.institution || "National Institute of Ayurveda",
    batchYear: row.batch_year || "2022-2027",
    skills: row.skills || {},
    competencies: row.competencies || [],
    assessmentResults: row.assessment_results || [],
    skillGaps: row.skill_gaps || [],
    certifications: row.certifications || [],
    internshipIds: row.internship_ids || [],
    verifiedExperiences: row.verified_experiences || [],
    researchInterests: row.research_interests || [],
    industryReadinessScore: row.industry_readiness_score != null ? Number(row.industry_readiness_score) : null,
    industryReadinessBand: row.industry_readiness_band || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at || row.created_at,
  };
}

function mapDevelopmentIntervention(row: any): AyushDevelopmentIntervention {
  return {
    id: row.id,
    title: row.title,
    description: row.description || "",
    type: row.type,
    competencyId: row.competency_id,
    targetMaturity: row.target_maturity,
    estimatedDuration: row.estimated_duration,
    difficulty: row.difficulty,
    provider: row.provider,
    evidenceRequired: row.evidence_required,
    supportingResources: row.supporting_resources || [],
    active: Boolean(row.active),
    createdAt: row.created_at,
    updatedAt: row.updated_at || row.created_at,
  };
}

function mapStudentDevelopmentPlan(row: any): AyushStudentDevelopmentPlan {
  return {
    id: row.id,
    studentId: row.student_id,
    roleId: row.role_id,
    competencyId: row.competency_id,
    baselineLevel: Number(row.baseline_level || 0),
    targetLevel: Number(row.target_level || 1),
    interventionId: row.intervention_id,
    status: row.status,
    startedAt: row.started_at || null,
    completedAt: row.completed_at || null,
    evidenceStatus: row.evidence_status || null,
    evidenceSubmission: row.evidence_submission || null,
    evidenceFilePath: row.evidence_file_path || null,
    evidenceFileName: row.evidence_file_name || null,
    evidenceFileSize: row.evidence_file_size || null,
    evidenceMimeType: row.evidence_mime_type || null,
    extractedText: row.extracted_text || null,
    extractionStatus: row.extraction_status || null,
    evidenceQuality: row.evidence_quality || null,
    aiExpectedRating: row.ai_expected_rating != null ? Number(row.ai_expected_rating) : null,
    aiConfidence: row.ai_confidence != null ? Number(row.ai_confidence) : null,
    aiEvaluation: row.ai_evaluation || null,
    facultyFinalRating: row.faculty_final_rating != null ? Number(row.faculty_final_rating) : null,
    facultyFeedback: row.faculty_feedback || null,
    facultyId: row.faculty_id || null,
    verifiedAt: row.verified_at || null,
    intervention: row.ayush_development_interventions ? mapDevelopmentIntervention(row.ayush_development_interventions) : undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at || row.created_at,
  };
}

// ==========================================
// SUPABASE RUNTIME DATA ADAPTER
// ==========================================

export const supabaseDb = {
  // 1. User & Auth Operations
  async findUserByEmailAndRole(email: string, role: RoleType): Promise<User | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .ilike("email", email.trim().toLowerCase())
      .eq("role", role)
      .maybeSingle();

    if (error || !data) return null;
    return mapUser(data);
  },

  async findUsersByEmail(email: string): Promise<User[]> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .ilike("email", email.trim().toLowerCase());

    if (error || !data) return [];
    return data.map(mapUser);
  },

  async getUsers(filterRole?: RoleType): Promise<User[]> {
    const supabase = getSupabaseServerClient();
    let query = supabase.from("users").select("*");
    if (filterRole) {
      query = query.eq("role", filterRole);
    }
    const { data, error } = await query;
    if (error || !data) return [];
    return data.map(mapUser);
  },

  async getUserById(id: string): Promise<User | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) return null;
    return mapUser(data);
  },

  async getUser(id: string): Promise<User | null> {
    return this.getUserById(id);
  },

  async getProfileByUserId(userId: string): Promise<Profile | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error || !data) return null;
    return mapProfile(data);
  },

  async getProfile(userId: string): Promise<Profile | null> {
    return this.getProfileByUserId(userId);
  },

  async updateUserProfile(userId: string, metadata: Record<string, unknown>): Promise<Profile> {
    const supabase = getSupabaseServerClient();
    const existing = await this.getProfileByUserId(userId);
    const merged = { ...(existing?.metadata || {}), ...metadata };
    const user = await this.getUserById(userId);
    const role = user?.role || "student";

    const { data, error } = await supabase
      .from("profiles")
      .upsert(
        {
          user_id: userId,
          role,
          metadata: merged,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      )
      .select("*")
      .single();

    if (error) throw error;
    return mapProfile(data);
  },

  async saveProfile(userId: string, metadata: Record<string, unknown>): Promise<Profile> {
    return this.updateUserProfile(userId, metadata);
  },

  async createOrUpdatePendingUser(
    userData: {
      email: string;
      role: RoleType;
      password: string;
      fullName: string;
    },
    metadata: Record<string, string | number | undefined> = {},
    isVerified = false
  ): Promise<{ user: User; profile: Profile }> {
    const supabase = getSupabaseServerClient();
    const normalized = userData.email.toLowerCase().trim();
    const existing = await this.findUserByEmailAndRole(normalized, userData.role);
    const id = existing?.id || crypto.randomUUID();
    const now = new Date().toISOString();
    const passwordHash = hashPassword(userData.password);

    const { data: userRow, error: uErr } = await supabase
      .from("users")
      .upsert(
        {
          id,
          email: normalized,
          full_name: userData.fullName || normalized,
          role: userData.role,
          password_hash: passwordHash,
          is_verified: isVerified,
          is_admin: false,
          updated_at: now,
          ...(existing ? {} : { created_at: now }),
        },
        { onConflict: "id" }
      )
      .select("*")
      .single();

    if (uErr) throw uErr;

    const { data: profRow, error: pErr } = await supabase
      .from("profiles")
      .upsert(
        {
          user_id: id,
          role: userData.role,
          metadata: metadata || {},
          updated_at: now,
        },
        { onConflict: "user_id" }
      )
      .select("*")
      .single();

    if (pErr) throw pErr;

    return { user: mapUser(userRow), profile: mapProfile(profRow) };
  },

  async createOrUpdateOtp(
    email: string,
    role: RoleType,
    otpCode: string,
    expiryMinutes = 10
  ): Promise<OtpVerification> {
    const supabase = getSupabaseServerClient();
    const normalized = email.toLowerCase().trim();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + expiryMinutes * 60000).toISOString();

    const { error } = await supabase
      .from("otp_verifications")
      .upsert(
        {
          email: normalized,
          otp: otpCode,
          expires_at: expiresAt,
          verified: false,
          created_at: now.toISOString(),
        },
        { onConflict: "email" }
      )
      .select("*")
      .single();

    if (error) throw error;
    return {
      id: normalized,
      email: normalized,
      role,
      otpCode,
      expiresAt,
      attempts: 0,
      verified: false,
      createdAt: now.toISOString(),
    };
  },

  async getLatestOtp(email: string): Promise<OtpVerification | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("otp_verifications")
      .select("*")
      .ilike("email", email.trim().toLowerCase())
      .maybeSingle();

    if (error || !data) return null;
    return mapOtp(data);
  },

  async verifyUserAndOtp(
    email: string,
    role: RoleType,
    otp: string
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    const supabase = getSupabaseServerClient();
    const normalizedEmail = email.toLowerCase().trim();

    const otpRecord = await this.getLatestOtp(normalizedEmail);
    if (!otpRecord) {
      return { success: false, error: "OTP not found. Please request a new code." };
    }

    if (new Date(otpRecord.expiresAt).getTime() < Date.now()) {
      return { success: false, error: "OTP expired. Please request a new code." };
    }

    if (otpRecord.otpCode !== otp.trim()) {
      return { success: false, error: "Invalid verification code." };
    }

    // Mark OTP verified
    await supabase
      .from("otp_verifications")
      .update({ verified: true })
      .ilike("email", normalizedEmail);

    const user = await this.findUserByEmailAndRole(normalizedEmail, role);
    if (!user) {
      return { success: false, error: "User account not found." };
    }

    // Update user is_verified
    const { data, error } = await supabase
      .from("users")
      .update({ is_verified: true, updated_at: new Date().toISOString() })
      .eq("id", user.id)
      .select("*")
      .single();

    if (error || !data) {
      return { success: false, error: "Failed to update user verification state." };
    }

    return { success: true, user: mapUser(data) };
  },

  // 2. Student Verification & Documents
  async getStudentVerification(studentId: string): Promise<StudentVerificationRecord> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("student_verifications")
      .select("*, verification_documents(*)")
      .eq("student_id", studentId)
      .maybeSingle();

    if (!data || error) {
      const now = new Date().toISOString();
      const insertRes = await supabase
        .from("student_verifications")
        .upsert(
          {
            student_id: studentId,
            verification_status: "NOT_STARTED",
            created_at: now,
            updated_at: now,
          },
          { onConflict: "student_id" }
        )
        .select("*, verification_documents(*)")
        .single();

      if (insertRes.data) {
        return mapStudentVerification(insertRes.data, []);
      }

      return {
        studentId,
        verificationStatus: "NOT_STARTED",
        documents: [],
        createdAt: now,
        updatedAt: now,
      };
    }

    return mapStudentVerification(data);
  },

  async saveVerificationDocument(
    studentId: string,
    document: VerificationDocumentRecord,
    replaceDocumentId?: string
  ): Promise<StudentVerificationRecord> {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();

    if (replaceDocumentId) {
      await supabase
        .from("verification_documents")
        .delete()
        .eq("id", replaceDocumentId)
        .eq("student_id", studentId);
    }

    await supabase.from("verification_documents").upsert(
      {
        id: document.id,
        student_id: studentId,
        document_type: document.documentType,
        group_id: document.groupId || null,
        file_name: document.fileName,
        file_type: document.fileType,
        file_size_bytes: document.fileSizeBytes,
        storage_path: document.storagePath,
        upload_status: document.uploadStatus || "completed",
        uploaded_at: document.uploadedAt || now,
      },
      { onConflict: "id" }
    );

    // Fetch existing verification to determine status
    const currentVerification = await this.getStudentVerification(studentId);
    const REQUIRED_CATEGORIES = [
      "student_id",
      "passport_photo",
      "post_graduation_marksheet",
      "abc_id",
    ];

    const currentDocTypes = new Set(currentVerification.documents.map((d) => d.documentType));
    currentDocTypes.add(document.documentType);

    const hasAllRequired = REQUIRED_CATEGORIES.every((cat) => currentDocTypes.has(cat));
    const newStatus: SubmissionStatus = hasAllRequired
      ? "VERIFIED"
      : currentDocTypes.size > 0
      ? "DOCUMENTS_PENDING"
      : "NOT_STARTED";

    await supabase
      .from("student_verifications")
      .update({
        verification_status: newStatus,
        updated_at: now,
        ...(newStatus === "VERIFIED" && !currentVerification.completedAt
          ? { completed_at: now }
          : {}),
      })
      .eq("student_id", studentId);

    return this.getStudentVerification(studentId);
  },

  async deleteVerificationDocument(
    studentId: string,
    documentId: string
  ): Promise<StudentVerificationRecord | null> {
    const supabase = getSupabaseServerClient();
    await supabase
      .from("verification_documents")
      .delete()
      .eq("id", documentId)
      .eq("student_id", studentId);

    return this.getStudentVerification(studentId);
  },

  async findVerificationDocumentById(
    documentId: string
  ): Promise<{ studentId: string; document: VerificationDocumentRecord } | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("verification_documents")
      .select("*")
      .eq("id", documentId)
      .maybeSingle();

    if (error || !data) return null;
    return {
      studentId: data.student_id,
      document: mapVerificationDocument(data),
    };
  },

  async saveProfessionalProfiles(
    studentId: string,
    profiles: ProfessionalProfiles
  ): Promise<StudentVerificationRecord> {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();

    await supabase
      .from("student_verifications")
      .upsert(
        {
          student_id: studentId,
          professional_profiles: profiles,
          updated_at: now,
        },
        { onConflict: "student_id" }
      );

    return this.getStudentVerification(studentId);
  },

  async completeStudentVerification(studentId: string): Promise<StudentVerificationRecord | null> {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from("student_verifications")
      .update({
        verification_status: "VERIFIED",
        completed_at: now,
        updated_at: now,
      })
      .eq("student_id", studentId)
      .select("*, verification_documents(*)")
      .single();

    if (error || !data) return null;
    return mapStudentVerification(data);
  },

  async getStudentWorkflowStatus(studentId: string): Promise<any> {
    const verification = await this.getStudentVerification(studentId);
    const interest = await this.getInterestProfile(studentId);
    const knowledgeTest = await this.getLatestKnowledgeTestResult(studentId);
    const skillGap = await this.getSkillGapAnalysisByStudent(studentId);

    const isVerified = verification.verificationStatus === "VERIFIED";
    const hasInterest = Boolean(interest);
    const hasKnowledgeTest = Boolean(knowledgeTest);
    const hasSkillGap = Boolean(skillGap);

    return {
      studentId,
      verificationStatus: verification.verificationStatus,
      isVerified,
      stages: {
        stage1_verification: isVerified ? "COMPLETED" : verification.verificationStatus,
        stage2_interest_discovery: hasInterest ? "COMPLETED" : isVerified ? "ACTIVE" : "LOCKED",
        stage3_knowledge_testing: hasKnowledgeTest ? "COMPLETED" : hasInterest ? "ACTIVE" : "LOCKED",
        stage4_skill_gap: hasSkillGap ? "COMPLETED" : hasKnowledgeTest ? "ACTIVE" : "LOCKED",
        stage5_placements: hasSkillGap ? "ACTIVE" : "LOCKED",
      },
      currentStep: !isVerified
        ? 1
        : !hasInterest
        ? 2
        : !hasKnowledgeTest
        ? 3
        : !hasSkillGap
        ? 4
        : 5,
    };
  },

  async isStudentAdvancedVerified(studentId: string): Promise<boolean> {
    const verification = await this.getStudentVerification(studentId);
    return verification.verificationStatus === "VERIFIED";
  },

  // 3. Interest Engine
  async saveInterestProfile(profile: InterestProfileRecord): Promise<InterestProfileRecord> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("interest_profiles")
      .upsert(
        {
          id: profile.id,
          student_id: profile.studentId,
          confirmed_main_domain: profile.confirmedMainDomain,
          confirmed_specific_interest: profile.confirmedSpecificInterest,
          explanation: profile.explanation,
          confidence: profile.confidence,
          interest_signals: profile.interestSignals,
          candidate_domain_scores: profile.candidateDomainScores,
          phase1_answer_count: profile.phase1AnswerCount,
          phase2_answer_count: profile.phase2AnswerCount,
          confirmed_at: profile.confirmedAt || new Date().toISOString(),
        },
        { onConflict: "id" }
      )
      .select("*")
      .single();

    if (error) throw error;
    return mapInterestProfile(data);
  },

  async getInterestProfile(studentId: string): Promise<InterestProfileRecord | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("interest_profiles")
      .select("*")
      .eq("student_id", studentId)
      .order("confirmed_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return mapInterestProfile(data);
  },

  async saveInterestSession(session: InterestSessionRecord): Promise<InterestSessionRecord> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("interest_sessions")
      .upsert(
        {
          session_id: session.sessionId,
          student_id: session.studentId,
          phase: session.phase,
          answers: session.answers,
          interest_signals: session.signalScores,
          status: session.status,
          started_at: session.updatedAt || new Date().toISOString(),
          completed_at: session.status === "confirmed" ? new Date().toISOString() : null,
        },
        { onConflict: "session_id" }
      )
      .select("*")
      .single();

    if (error) throw error;
    return mapInterestSession(data);
  },

  async getInterestSession(sessionId: string): Promise<InterestSessionRecord | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("interest_sessions")
      .select("*")
      .eq("session_id", sessionId)
      .maybeSingle();

    if (error || !data) return null;
    return mapInterestSession(data);
  },

  async clearInterestSession(sessionId: string): Promise<void> {
    const supabase = getSupabaseServerClient();
    await supabase.from("interest_sessions").delete().eq("session_id", sessionId);
  },

  // 4. Knowledge Test Operations
  async saveKnowledgeTestSession(
    session: KnowledgeTestSessionRecord
  ): Promise<KnowledgeTestSessionRecord> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("knowledge_test_sessions")
      .upsert(
        {
          session_id: session.sessionId,
          student_id: session.studentId,
          domain_id: session.domainId,
          domain_name: session.domainName,
          difficulty: session.difficulty,
          questions: session.questions,
          current_question_index: session.currentQuestionIndex,
          answers: session.answers,
          status: session.status,
          started_at: session.startedAt,
          completed_at: session.updatedAt || new Date().toISOString(),
        },
        { onConflict: "session_id" }
      )
      .select("*")
      .single();

    if (error) throw error;
    return mapKnowledgeTestSession(data);
  },

  async getKnowledgeTestSession(sessionId: string): Promise<KnowledgeTestSessionRecord | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("knowledge_test_sessions")
      .select("*")
      .eq("session_id", sessionId)
      .maybeSingle();

    if (error || !data) return null;
    return mapKnowledgeTestSession(data);
  },

  async getActiveKnowledgeTestSessionByStudent(
    studentId: string
  ): Promise<KnowledgeTestSessionRecord | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("knowledge_test_sessions")
      .select("*")
      .eq("student_id", studentId)
      .eq("status", "in_progress")
      .order("started_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return mapKnowledgeTestSession(data);
  },

  async saveKnowledgeTestResult(
    result: KnowledgeTestResultRecord
  ): Promise<KnowledgeTestResultRecord> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("knowledge_test_results")
      .upsert(
        {
          id: result.id,
          session_id: result.sessionId,
          student_id: result.studentId,
          domain_id: result.domainId,
          domain_name: result.domainName,
          difficulty: result.difficulty,
          score: result.score,
          max_score: result.maxScore,
          score_percent: result.scorePercent,
          knowledge_level: result.knowledgeLevel,
          strengths: result.strengths,
          weaknesses: result.weaknesses,
          answers: result.questionBreakdown || [],
          time_taken_seconds: Math.round((result.totalTimeMs || 0) / 1000),
          completed_at: result.completedAt || new Date().toISOString(),
          created_at: result.completedAt || new Date().toISOString(),
        },
        { onConflict: "id" }
      )
      .select("*")
      .single();

    if (error) throw error;
    return mapKnowledgeTestResult(data);
  },

  async getKnowledgeTestResultsByStudent(studentId: string): Promise<KnowledgeTestResultRecord[]> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("knowledge_test_results")
      .select("*")
      .eq("student_id", studentId)
      .order("completed_at", { ascending: false });

    if (error || !data) return [];
    return data.map(mapKnowledgeTestResult);
  },

  async getLatestKnowledgeTestResult(studentId: string): Promise<KnowledgeTestResultRecord | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("knowledge_test_results")
      .select("*")
      .eq("student_id", studentId)
      .order("completed_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return mapKnowledgeTestResult(data);
  },

  async getKnowledgeTestResultById(id: string): Promise<KnowledgeTestResultRecord | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("knowledge_test_results")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) return null;
    return mapKnowledgeTestResult(data);
  },

  // 5. Skill Gap Analysis Operations
  async saveSkillGapAnalysis(analysis: SkillGapAnalysisRecord): Promise<SkillGapAnalysisRecord> {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from("skill_gap_analyses")
      .upsert(
        {
          id: analysis.id,
          student_id: analysis.studentId,
          interest_profile_id: analysis.interestProfileId || null,
          knowledge_test_result_id: analysis.knowledgeTestResultId || null,
          domain_id: analysis.domainId,
          domain_name: analysis.domainName,
          niche_id: analysis.nicheId,
          niche_title: analysis.nicheTitle,
          difficulty: analysis.difficulty,
          test_score: analysis.testScore,
          test_max_score: analysis.testMaxScore,
          test_score_percent: analysis.testScorePercent,
          knowledge_level: analysis.knowledgeLevel,
          skill_profile_version: analysis.skillProfileVersion || "1.0",
          executive_summary: analysis.executiveSummary || "",
          skill_gaps: analysis.skillGaps || [],
          recommendations: analysis.recommendations || [],
          ai_generated: Boolean(analysis.aiGenerated),
          is_stale: Boolean(analysis.isStale),
          created_at: analysis.createdAt || now,
          updated_at: analysis.updatedAt || now,
        },
        { onConflict: "id" }
      )
      .select("*")
      .single();

    if (error) throw error;
    return mapSkillGapAnalysis(data);
  },

  async getSkillGapAnalysisByStudent(studentId: string): Promise<SkillGapAnalysisRecord | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("skill_gap_analyses")
      .select("*")
      .eq("student_id", studentId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return mapSkillGapAnalysis(data);
  },

  async invalidateSkillGapAnalysis(studentId: string): Promise<void> {
    const supabase = getSupabaseServerClient();
    await supabase
      .from("skill_gap_analyses")
      .update({ is_stale: true, updated_at: new Date().toISOString() })
      .eq("student_id", studentId);
  },

  async getEducators(): Promise<Educator[]> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("educators")
      .select("*")
      .eq("active", true);

    if (error || !data || data.length === 0) return SAMPLE_EDUCATORS;
    return data.map((r) => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      description: r.description || "",
      website: r.website || "",
      logoUrl: r.logo_url || undefined,
      verifiedStatus: r.verified_status || "verified_partner",
      statusLabel: r.status_label || "Verified Partner",
      active: Boolean(r.active),
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
  },

  async getEducationPrograms(): Promise<EducationProgram[]> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("education_programs")
      .select("*")
      .eq("active", true);

    if (error || !data || data.length === 0) return SAMPLE_EDUCATION_PROGRAMS;
    return data.map((r) => ({
      id: r.id,
      educatorId: r.educator_id,
      educatorName: r.educator_name || "Partner Educator",
      title: r.title,
      description: r.description || "",
      programUrl: r.program_url || "",
      domains: r.domains || [],
      niches: r.niches || [],
      skillIds: r.skill_ids || [],
      difficulty: r.difficulty || "intermediate",
      deliveryType: r.delivery_type || "Online Self-Paced",
      duration: r.duration || "",
      certification: r.certification || "",
      verifiedStatus: r.verified_status || "verified_partner",
      active: Boolean(r.active),
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
  },


  // 7. Job Application Operations
  async getJobApplicationsByStudent(studentId: string): Promise<JobApplicationRecord[]> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .eq("student_id", studentId)
      .order("applied_at", { ascending: false });

    if (error || !data) return [];
    return data.map(mapJobApplication);
  },

  async saveJobApplication(
    paramsOrStudentId: SubmitApplicationParams | JobApplicationRecord | string,
    paramsParam?: Partial<JobApplicationRecord>
  ): Promise<JobApplicationRecord> {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();
    let record: Partial<JobApplicationRecord>;

    if (typeof paramsOrStudentId === "string") {
      record = {
        id: paramsParam?.id || `app_${paramsOrStudentId}_${Date.now()}`,
        studentId: paramsOrStudentId,
        jobId: paramsParam?.jobId,
        companyName: paramsParam?.companyName || "Partner Company",
        roleTitle: paramsParam?.roleTitle || paramsParam?.position || "Engineering Role",
        position: paramsParam?.position || paramsParam?.roleTitle || "Engineering Role",
        location: paramsParam?.location || "Remote / Hybrid",
        type: paramsParam?.employmentType || paramsParam?.type || "full_time",
        employmentType: paramsParam?.employmentType || "Full-time",
        salaryRange: paramsParam?.salaryRange,
        status: paramsParam?.status || "applied",
        appliedAt: paramsParam?.appliedAt || now,
        statusUpdatedAt: now,
        timeline: paramsParam?.timeline || [
          {
            status: "applied",
            date: now,
            title: "Application Submitted",
            description: "Application submitted and queued for recruiter review.",
          },
        ],
        notes: paramsParam?.notes,
        applicantFullName: paramsParam?.applicantFullName,
        applicantEmail: paramsParam?.applicantEmail,
        applicantPhone: paramsParam?.applicantPhone,
        resumeFileName: paramsParam?.resumeFileName,
        submittedDocumentTypes: paramsParam?.submittedDocumentTypes,
        coverLetter: paramsParam?.coverLetter,
        portfolioUrl: paramsParam?.portfolioUrl,
        githubUrl: paramsParam?.githubUrl,
        linkedinUrl: paramsParam?.linkedinUrl,
      };
    } else {
      record = paramsOrStudentId as Partial<JobApplicationRecord>;
    }

    const { data, error } = await supabase
      .from("job_applications")
      .upsert(
        {
          id: record.id || `app_${record.studentId}_${Date.now()}`,
          student_id: record.studentId,
          job_id: record.jobId || null,
          company_name: record.companyName || "Partner Company",
          role_title: record.roleTitle || null,
          position: record.position || null,
          location: record.location || null,
          type: record.type || null,
          employment_type: record.employmentType || null,
          salary_range: record.salaryRange || null,
          status: record.status || "applied",
          applied_at: record.appliedAt || now,
          status_updated_at: record.statusUpdatedAt || now,
          updated_at: now,
          timeline: record.timeline || [],
          applicant_full_name: record.applicantFullName || null,
          applicant_email: record.applicantEmail || null,
          applicant_phone: record.applicantPhone || null,
          resume_file_name: record.resumeFileName || null,
          submitted_document_types: record.submittedDocumentTypes || [],
          cover_letter: record.coverLetter || null,
          portfolio_url: record.portfolioUrl || null,
          github_url: record.githubUrl || null,
          linkedin_url: record.linkedinUrl || null,
          screening_status: record.screeningStatus || "pending",
          screening_notes: record.screeningNotes || null,
          interview_status: record.interviewStatus || "not_scheduled",
          final_status: record.finalStatus || "pending",
        },
        { onConflict: "id" }
      )
      .select("*")
      .single();

    if (error) throw error;
    return mapJobApplication(data);
  },

  // 8. Industry Hiring Posts & Operations
  async getIndustryHiringPosts(industryUserId?: string): Promise<IndustryHiringPostRecord[]> {
    const supabase = getSupabaseServerClient();
    let query = supabase.from("industry_hiring_posts").select("*");
    if (industryUserId) {
      query = query.eq("industry_id", industryUserId);
    }
    const { data, error } = await query.order("created_at", { ascending: false });

    if (error || !data) return [];
    return data.map(mapIndustryHiringPost);
  },

  async getIndustryHiringPostById(
    postId: string,
    industryUserId?: string
  ): Promise<IndustryHiringPostRecord | null> {
    const supabase = getSupabaseServerClient();
    let query = supabase
      .from("industry_hiring_posts")
      .select("*")
      .eq("id", postId);

    if (industryUserId) {
      query = query.eq("industry_id", industryUserId);
    }

    const { data, error } = await query.maybeSingle();

    if (error || !data) return null;
    return mapIndustryHiringPost(data);
  },

  async createIndustryHiringPost(
    industryUserId: string,
    input: CreateHiringPostInput
  ): Promise<IndustryHiringPostRecord> {
    const supabase = getSupabaseServerClient();
    const id = `post_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const deadline = input.deadline || new Date(Date.now() + 30 * 86400000).toISOString();

    const profile = await this.getProfileByUserId(industryUserId);
    const user = await this.getUserById(industryUserId);
    const companyName = (profile?.metadata?.companyName as string) || user?.fullName || "Partner Organization";

    const { data, error } = await supabase
      .from("industry_hiring_posts")
      .insert({
        id,
        industry_id: industryUserId,
        company_name: companyName,
        role_title: input.roleTitle,
        hiring_type: input.hiringType || "Full-time",
        industry_domain: input.industryDomain || "Technology & Software",
        location: input.location,
        work_mode: input.workMode || "Hybrid",
        salary_range: input.salaryRange || "",
        experience_requirement: input.experienceRequirement || "",
        openings: input.openings || 1,
        deadline,
        description: input.description,
        responsibilities: input.responsibilities || [],
        required_skills: input.requiredSkills || [],
        preferred_skills: input.preferredSkills || [],
        required_qualifications: input.requiredQualifications || [],
        preferred_qualifications: input.preferredQualifications || [],
        required_document_types: input.requiredDocumentTypes || [],
        status: input.status || "draft",
        knowledge_test_config: input.knowledgeTest || null,
        interview_config: input.interviewDetails || null,
        created_at: now,
        updated_at: now,
      })
      .select("*")
      .single();

    if (error) throw error;
    return mapIndustryHiringPost(data);
  },

  async updateIndustryHiringPost(
    industryUserId: string,
    postId: string,
    updates: UpdateHiringPostInput
  ): Promise<IndustryHiringPostRecord | null> {
    const supabase = getSupabaseServerClient();
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (updates.roleTitle) payload.role_title = updates.roleTitle;
    if (updates.hiringType) payload.hiring_type = updates.hiringType;
    if (updates.industryDomain) payload.industry_domain = updates.industryDomain;
    if (updates.location) payload.location = updates.location;
    if (updates.workMode) payload.work_mode = updates.workMode;
    if (updates.salaryRange !== undefined) payload.salary_range = updates.salaryRange;
    if (updates.experienceRequirement !== undefined) payload.experience_requirement = updates.experienceRequirement;
    if (updates.description) payload.description = updates.description;
    if (updates.responsibilities) payload.responsibilities = updates.responsibilities;
    if (updates.requiredSkills) payload.required_skills = updates.requiredSkills;
    if (updates.preferredSkills) payload.preferred_skills = updates.preferredSkills;
    if (updates.requiredQualifications) payload.required_qualifications = updates.requiredQualifications;
    if (updates.preferredQualifications) payload.preferred_qualifications = updates.preferredQualifications;
    if (updates.requiredDocumentTypes) payload.required_document_types = updates.requiredDocumentTypes;
    if (updates.openings != null) payload.open_positions = updates.openings;
    if (updates.status) payload.status = updates.status;
    if (updates.knowledgeTest) payload.knowledge_test_config = updates.knowledgeTest;
    if (updates.interviewDetails) payload.interview_config = updates.interviewDetails;

    const { data, error } = await supabase
      .from("industry_hiring_posts")
      .update(payload)
      .eq("id", postId)
      .eq("industry_id", industryUserId)
      .select("*")
      .single();

    if (error || !data) return null;
    return mapIndustryHiringPost(data);
  },

  async publishIndustryHiringPost(
    industryUserId: string,
    postId: string
  ): Promise<IndustryHiringPostRecord | null> {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("industry_hiring_posts")
      .update({
        status: "published",
        published_at: now,
        updated_at: now,
      })
      .eq("id", postId)
      .eq("industry_id", industryUserId)
      .select("*")
      .single();

    if (error || !data) return null;
    return mapIndustryHiringPost(data);
  },

  async deleteIndustryHiringPost(industryUserId: string, postId: string): Promise<boolean> {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from("industry_hiring_posts")
      .delete()
      .eq("id", postId)
      .eq("industry_id", industryUserId);

    return !error;
  },

  async getIndustryApplications(
    industryId: string,
    postId?: string
  ): Promise<JobApplicationRecord[]> {
    const supabase = getSupabaseServerClient();
    let query = supabase.from("job_applications").select("*");
    if (postId) {
      query = query.eq("job_id", postId);
    } else {
      const posts = await this.getIndustryHiringPosts(industryId);
      const postIds = posts.map((p) => p.id);
      if (postIds.length > 0) {
        query = query.in("job_id", postIds);
      } else {
        const profile = await this.getProfileByUserId(industryId);
        const companyName = (profile?.metadata?.companyName as string) || "";
        if (companyName) {
          query = query.ilike("company_name", companyName.trim());
        } else {
          return [];
        }
      }
    }

    const { data, error } = await query;
    if (error || !data) return [];
    return data.map(mapJobApplication);
  },

  async updateApplicationScreening(
    industryId: string,
    applicationId: string,
    decision: "shortlisted" | "rejected" | "screened",
    notes?: string
  ): Promise<JobApplicationRecord> {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();
    const status = decision === "rejected" ? "rejected" : "in_review";

    const { data: existing } = await supabase
      .from("job_applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    const timeline = existing?.timeline || [];
    timeline.push({
      id: `tl_${Date.now()}`,
      status,
      date: now,
      timestamp: now,
      title: decision === "shortlisted" ? "Application Shortlisted" : decision === "rejected" ? "Application Not Selected" : "Application Screened",
      description: notes || `Candidate application screening completed (${decision}).`,
    });

    const { data, error } = await supabase
      .from("job_applications")
      .update({
        screening_status: decision,
        screening_notes: notes || null,
        status,
        status_updated_at: now,
        updated_at: now,
        timeline,
      })
      .eq("id", applicationId)
      .select("*")
      .single();

    if (error || !data) throw error || new Error("Application screening update failed");
    return mapJobApplication(data);
  },

  // 9. Admin Overview & Institutional Operations
  async getAdminOverview(): Promise<{
    users: User[];
    profiles: Profile[];
    hiringRequests: HiringRequest[];
    campusRequests: CampusRequest[];
    studentVerifications: StudentVerificationRecord[];
    industryHiringPosts: IndustryHiringPostRecord[];
    jobApplications: JobApplicationRecord[];
    educationPrograms: EducationProgram[];
    stats: any;
  }> {
    const supabase = getSupabaseServerClient();

    const [
      usersRes,
      profilesRes,
      hiringRes,
      campusRes,
      verificationsRes,
      postsRes,
      appsRes,
      programsRes,
    ] = await Promise.all([
      supabase.from("users").select("*"),
      supabase.from("profiles").select("*"),
      supabase.from("hiring_requests").select("*"),
      supabase.from("campus_requests").select("*"),
      supabase.from("student_verifications").select("*, verification_documents(*)"),
      supabase.from("industry_hiring_posts").select("*"),
      supabase.from("job_applications").select("*"),
      supabase.from("education_programs").select("*"),
    ]);

    const users = (usersRes.data || []).map(mapUser);
    const profiles = (profilesRes.data || []).map(mapProfile);
    const hiringRequests = (hiringRes.data || []).map(mapHiringRequest);
    const campusRequests = (campusRes.data || []).map(mapCampusRequest);
    const studentVerifications = (verificationsRes.data || []).map((v) =>
      mapStudentVerification(v)
    );
    const industryHiringPosts = (postsRes.data || []).map(mapIndustryHiringPost);
    const jobApplications = (appsRes.data || []).map(mapJobApplication);
    const educationPrograms = (programsRes.data || []).map(mapEducationProgram);

    const students = users.filter((u) => u.role === "student" && !u.isAdmin);
    const verifiedStudents = studentVerifications.filter(
      (v) => v.verificationStatus === "VERIFIED"
    );

    return {
      users,
      profiles,
      hiringRequests,
      campusRequests,
      studentVerifications,
      industryHiringPosts,
      jobApplications,
      educationPrograms,
      stats: {
        totalUsers: users.filter((u) => !u.isAdmin).length,
        totalStudents: students.length,
        activeStudents: verifiedStudents.length,
        totalFaculty: users.filter((u) => u.role === "faculty").length,
        totalIndustry: hiringRequests.length,
        activeIndustry: hiringRequests.filter((h) => !h.isFrozen).length,
        totalCampus: campusRequests.length,
        activeCampus: campusRequests.filter((c) => !c.isFrozen).length,
        totalJobs: industryHiringPosts.filter((p) => p.hiringType !== "Internship").length,
        totalInternships: industryHiringPosts.filter((p) => p.hiringType === "Internship")
          .length,
        totalApplications: jobApplications.length,
        totalEducationDrives: educationPrograms.length,
        totalFrozen:
          hiringRequests.filter((h) => h.isFrozen).length +
          campusRequests.filter((c) => c.isFrozen).length,
      },
    };
  },

  async toggleCompanyFreeze(
    id: string,
    isFrozen: boolean,
    freezeReason?: string
  ): Promise<HiringRequest | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("hiring_requests")
      .update({
        is_frozen: isFrozen,
        freeze_reason: isFrozen ? freezeReason || "Administrative freeze" : null,
        status: isFrozen ? "frozen" : "active",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error || !data) return null;
    return mapHiringRequest(data);
  },

  async toggleCampusFreeze(
    id: string,
    isFrozen: boolean,
    freezeReason?: string
  ): Promise<CampusRequest | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("campus_requests")
      .update({
        is_frozen: isFrozen,
        freeze_reason: isFrozen ? freezeReason || "Administrative compliance hold" : null,
        status: isFrozen ? "frozen" : "active",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error || !data) return null;
    return mapCampusRequest(data);
  },



  // Learning Resource Operations
  async saveLearningResources(
    studentId: string,
    analysisId: string,
    resources: LearningResourceItem[]
  ): Promise<void> {
    const supabase = getSupabaseServerClient();
    const id = `lr_${studentId}_${analysisId}`;
    const now = new Date().toISOString();

    const { error } = await supabase.from("learning_resources").upsert(
      {
        id,
        student_id: studentId,
        analysis_id: analysisId,
        resource_type: "youtube_video",
        resources,
        cached_at: now,
        created_at: now,
      },
      { onConflict: "id" }
    );

    if (error) throw error;
  },

  async getLearningResourcesByAnalysis(
    studentId: string,
    analysisId: string
  ): Promise<LearningResourceItem[] | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("learning_resources")
      .select("*")
      .eq("student_id", studentId)
      .eq("analysis_id", analysisId)
      .maybeSingle();

    if (error || !data || !data.resources) return null;
    return data.resources as LearningResourceItem[];
  },

  async clearLearningResources(studentId: string): Promise<void> {
    const supabase = getSupabaseServerClient();
    await supabase.from("learning_resources").delete().eq("student_id", studentId);
  },

  // Industry Question Operations
  async getIndustryQuestions(
    industryUserId: string,
    filters: { search?: string; difficulty?: string; domainId?: string; questionType?: string } = {}
  ): Promise<IndustryQuestionRecord[]> {
    const supabase = getSupabaseServerClient();
    let query = supabase
      .from("industry_questions")
      .select("*")
      .eq("industry_id", industryUserId);

    if (filters.difficulty && filters.difficulty !== "all") {
      query = query.eq("difficulty", filters.difficulty);
    }
    if (filters.domainId && filters.domainId !== "all") {
      query = query.eq("domain_id", filters.domainId);
    }
    if (filters.questionType && filters.questionType !== "all") {
      query = query.eq("question_type", filters.questionType);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error || !data) return [];
    let list = data.map(mapIndustryQuestion);

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (item) =>
          item.questionText.toLowerCase().includes(q) ||
          item.conceptTag.toLowerCase().includes(q) ||
          item.options.some((o) => o.text.toLowerCase().includes(q))
      );
    }

    return list;
  },

  async getIndustryQuestionById(
    id: string,
    industryUserId: string
  ): Promise<IndustryQuestionRecord | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("industry_questions")
      .select("*")
      .eq("id", id)
      .eq("industry_id", industryUserId)
      .maybeSingle();

    if (error || !data) return null;
    return mapIndustryQuestion(data);
  },

  async createIndustryQuestion(
    industryUserId: string,
    input: CreateIndustryQuestionInput
  ): Promise<IndustryQuestionRecord> {
    const supabase = getSupabaseServerClient();
    const id = `ind_q_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const options = (input.options || []).map((opt, idx) => ({
      id: opt.id || `opt_${id}_${idx + 1}`,
      label: opt.label || ["A", "B", "C", "D"][idx] || `Option ${idx + 1}`,
      text: opt.text.trim(),
    }));

    const { data, error } = await supabase
      .from("industry_questions")
      .insert({
        id,
        industry_id: industryUserId,
        question_text: input.questionText.trim(),
        question_type: input.questionType || "mcq",
        options,
        correct_option_id: input.correctOptionId,
        difficulty: input.difficulty || "intermediate",
        complexity: input.complexity || "application",
        domain_id: input.domainId || "ayurveda",
        concept_tag: input.conceptTag || "ayush-clinical-practice",
        marks: typeof input.marks === "number" && input.marks > 0 ? input.marks : 1,
        explanation: input.explanation || null,
        created_at: now,
        updated_at: now,
      })
      .select("*")
      .single();

    if (error) throw error;
    return mapIndustryQuestion(data);
  },

  async updateIndustryQuestion(
    id: string,
    industryUserId: string,
    updates: Partial<CreateIndustryQuestionInput>
  ): Promise<IndustryQuestionRecord | null> {
    const supabase = getSupabaseServerClient();
    const payload: Record<string, any> = { updated_at: new Date().toISOString() };
    if (updates.questionText) payload.question_text = updates.questionText.trim();
    if (updates.questionType) payload.question_type = updates.questionType;
    if (updates.options) {
      payload.options = updates.options.map((opt, idx) => ({
        id: opt.id || `opt_${id}_${idx + 1}`,
        label: opt.label || ["A", "B", "C", "D"][idx] || `Option ${idx + 1}`,
        text: opt.text.trim(),
      }));
    }
    if (updates.correctOptionId) payload.correct_option_id = updates.correctOptionId;
    if (updates.difficulty) payload.difficulty = updates.difficulty;
    if (updates.complexity) payload.complexity = updates.complexity;
    if (updates.domainId) payload.domain_id = updates.domainId;
    if (updates.conceptTag) payload.concept_tag = updates.conceptTag;
    if (updates.marks) payload.marks = updates.marks;
    if (updates.explanation !== undefined) payload.explanation = updates.explanation;

    const { data, error } = await supabase
      .from("industry_questions")
      .update(payload)
      .eq("id", id)
      .eq("industry_id", industryUserId)
      .select("*")
      .single();

    if (error || !data) return null;
    return mapIndustryQuestion(data);
  },

  async deleteIndustryQuestion(id: string, industryUserId: string): Promise<boolean> {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from("industry_questions")
      .delete()
      .eq("id", id)
      .eq("industry_id", industryUserId);

    return !error;
  },

  async updateIndustryKnowledgeTestConfig(
    industryUserId: string,
    postId: string,
    config: KnowledgeTestConfig
  ): Promise<IndustryHiringPostRecord | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("industry_hiring_posts")
      .update({
        knowledge_test_config: config,
        updated_at: new Date().toISOString(),
      })
      .eq("id", postId)
      .eq("industry_id", industryUserId)
      .select("*")
      .single();

    if (error || !data) return null;
    return mapIndustryHiringPost(data);
  },

  // Assessment Question Details
  async getAssessmentQuestionById(id: string): Promise<AssessmentQuestion | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("assessment_questions")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) return null;
    return mapAssessmentQuestion(data);
  },

  async saveAssessmentQuestion(question: AssessmentQuestion): Promise<AssessmentQuestion> {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("assessment_questions")
      .upsert(
        {
          id: question.id,
          question_text: question.questionText,
          scenario_context: question.scenarioContext || null,
          options: question.options,
          correct_option_id: question.correctOptionId,
          explanation: question.explanation || "",
          exam_type: question.examType,
          question_type: question.questionType || "MCQ",
          subject: question.subject,
          topic: question.topic,
          ayush_skill_ids: question.ayushSkillIds || [],
          skill_category: question.skillCategory || null,
          difficulty: question.difficulty,
          cognitive_level: question.cognitiveLevel,
          ayush_system: question.ayushSystem || null,
          concept_tag: question.conceptTag,
          source_ref: question.sourceRef || null,
          reference_year: question.referenceYear || null,
          is_active: question.isActive,
          created_at: question.createdAt || now,
          updated_at: now,
        },
        { onConflict: "id" }
      )
      .select("*")
      .single();

    if (error) throw error;
    return mapAssessmentQuestion(data);
  },

  async saveAssessmentQuestions(questions: AssessmentQuestion[]): Promise<AssessmentQuestion[]> {
    const results: AssessmentQuestion[] = [];
    for (const q of questions) {
      results.push(await this.saveAssessmentQuestion(q));
    }
    return results;
  },

  async getAssessmentConfigById(id: string): Promise<AssessmentConfig | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("assessment_configs")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) return null;
    return mapAssessmentConfig(data);
  },

  async saveAssessmentConfig(config: AssessmentConfig): Promise<AssessmentConfig> {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("assessment_configs")
      .upsert(
        {
          id: config.id,
          name: config.name,
          description: config.description || null,
          exam_type: config.examType,
          mode: config.mode || "Practice",
          ayush_system: config.ayushSystem || null,
          subject_filters: config.subjectFilters || [],
          topic_filters: config.topicFilters || [],
          difficulty: config.difficulty || null,
          question_count: config.questionCount || 10,
          time_limit_minutes: config.timeLimitMinutes || null,
          passing_score_percent: config.passingScorePercent || null,
          is_active: config.isActive,
          created_at: config.createdAt || now,
          updated_at: now,
        },
        { onConflict: "id" }
      )
      .select("*")
      .single();

    if (error) throw error;
    return mapAssessmentConfig(data);
  },

  async getAssessmentAttemptById(id: string): Promise<AssessmentAttempt | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("assessment_attempts")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) return null;
    return mapAssessmentAttempt(data);
  },

  async getActiveAssessmentAttempt(
    studentId: string,
    configId: string
  ): Promise<AssessmentAttempt | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("assessment_attempts")
      .select("*")
      .eq("student_id", studentId)
      .eq("config_id", configId)
      .eq("status", "in_progress")
      .order("started_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return mapAssessmentAttempt(data);
  },

  // Assessment Question Collection Queries
  async getAssessmentQuestions(): Promise<AssessmentQuestion[]> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.from("assessment_questions").select("*");
    if (error || !data) return [];
    return data.map(mapAssessmentQuestion);
  },

  async getActiveAssessmentQuestions(): Promise<AssessmentQuestion[]> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("assessment_questions")
      .select("*")
      .eq("is_active", true);
    if (error || !data) return [];
    return data.map(mapAssessmentQuestion);
  },

  async getAssessmentConfigs(): Promise<AssessmentConfig[]> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("assessment_configs")
      .select("*")
      .eq("is_active", true);
    if (error || !data) return [];
    return data.map(mapAssessmentConfig);
  },

  async getAssessmentAttemptsByStudent(studentId: string): Promise<AssessmentAttempt[]> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("assessment_attempts")
      .select("*")
      .eq("student_id", studentId)
      .order("started_at", { ascending: false });
    if (error || !data) return [];
    return data.map(mapAssessmentAttempt);
  },

  async saveAssessmentAttempt(attempt: AssessmentAttempt): Promise<AssessmentAttempt> {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("assessment_attempts")
      .upsert(
        {
          id: attempt.id,
          student_id: attempt.studentId,
          config_id: attempt.configId,
          exam_type: attempt.examType,
          ayush_system: attempt.ayushSystem || null,
          question_ids: attempt.questionIds || [],
          responses: attempt.responses || {},
          started_at: attempt.startedAt || now,
          ended_at: attempt.endedAt || null,
          status: attempt.status,
          score: attempt.score ?? 0,
          max_score: attempt.maxScore ?? 0,
          score_percent: attempt.scorePercent ?? 0,
          correct_count: attempt.correctCount ?? null,
          incorrect_count: attempt.incorrectCount ?? null,
          unattempted_count: attempt.unattemptedCount ?? null,
          total_questions: attempt.totalQuestions ?? 0,
          skill_performance: attempt.skillPerformance ?? {},
          created_at: attempt.createdAt || now,
          updated_at: now,
        },
        { onConflict: "id" }
      )
      .select("*")
      .single();

    if (error) throw error;
    return mapAssessmentAttempt(data);
  },

  async getAyushSkillPassport(studentId: string): Promise<AyushSkillPassport | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("ayush_skill_passports")
      .select("*")
      .eq("student_id", studentId)
      .maybeSingle();

    if (error || !data) return null;
    return mapAyushSkillPassport(data);
  },

  async saveAyushSkillPassport(passport: AyushSkillPassport): Promise<AyushSkillPassport> {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();
    const passportId = `asp_${passport.studentId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 16)}`;
    const { data, error } = await supabase
      .from("ayush_skill_passports")
      .upsert(
        {
          id: passportId,
          student_id: passport.studentId,
          ayush_system: passport.ayushSystem,
          course: passport.course,
          academic_level: passport.academicLevel,
          institution: passport.institution,
          batch_year: passport.batchYear,
          skills: passport.skills || {},
          competencies: passport.competencies || [],
          assessment_results: passport.assessmentResults || [],
          skill_gaps: passport.skillGaps || [],
          certifications: passport.certifications || [],
          internship_ids: passport.internshipIds || [],
          verified_experiences: passport.verifiedExperiences || [],
          research_interests: passport.researchInterests || [],
          industry_readiness_score: passport.industryReadinessScore != null ? passport.industryReadinessScore : null,
          industry_readiness_band: ["Not Assessed", "Developing", "Emerging", "Industry Ready"].includes(passport.industryReadinessBand as any)
            ? passport.industryReadinessBand
            : "Not Assessed",
          created_at: passport.createdAt || now,
          updated_at: now,
        },
        { onConflict: "student_id" }
      )
      .select("*")
      .single();

    if (error) throw error;
    return mapAyushSkillPassport(data);
  },

  async updateApplicationInterview(
    industryId: string,
    applicationId: string,
    interviewData: {
      roundNumber?: number;
      roundName?: string;
      mode?: "Virtual" | "In-person" | "Hybrid";
      scheduledAt?: string;
      meetingLinkOrLocation?: string;
      evaluationCriteria?: string;
      score?: number;
      feedback?: string;
      decision?: "pending" | "passed" | "failed";
      overallOutcome?: "in_progress" | "completed" | "cancelled";
    }
  ): Promise<JobApplicationRecord> {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();

    const { data: existing, error: fetchErr } = await supabase
      .from("job_applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    if (fetchErr || !existing) throw fetchErr || new Error("Application not found");

    const interviewRounds = Array.isArray(existing.interview_rounds) ? existing.interview_rounds : [];
    const roundNum = interviewData.roundNumber || interviewRounds.length + 1;
    const existingIdx = interviewRounds.findIndex((r: any) => r.roundNumber === roundNum);

    const roundRecord = {
      roundNumber: roundNum,
      roundName: interviewData.roundName || `Round ${roundNum}`,
      mode: interviewData.mode || "Virtual",
      scheduledAt: interviewData.scheduledAt,
      meetingLinkOrLocation: interviewData.meetingLinkOrLocation,
      evaluationCriteria: interviewData.evaluationCriteria,
      score: interviewData.score,
      feedback: interviewData.feedback,
      decision: interviewData.decision || "pending",
    };

    if (existingIdx !== -1) {
      interviewRounds[existingIdx] = { ...interviewRounds[existingIdx], ...roundRecord };
    } else {
      interviewRounds.push(roundRecord);
    }

    const timeline = Array.isArray(existing.timeline) ? existing.timeline : [];
    timeline.push({
      id: `tl_${Date.now()}`,
      status: "interview",
      date: now,
      timestamp: now,
      title: `Interview ${roundRecord.roundName} Updated`,
      description: `Evaluation decision: ${roundRecord.decision.toUpperCase()}. ${roundRecord.feedback || ""}`.trim(),
    });

    const { data, error } = await supabase
      .from("job_applications")
      .update({
        interview_rounds: interviewRounds,
        interview_status: interviewData.overallOutcome || "scheduled",
        status: "interview",
        status_updated_at: now,
        updated_at: now,
        timeline,
      })
      .eq("id", applicationId)
      .select("*")
      .single();

    if (error || !data) throw error || new Error("Failed to update application interview");
    return mapJobApplication(data);
  },

  async updateFinalHiringDecision(
    industryId: string,
    applicationId: string,
    decision: "selected" | "rejected",
    offerDetails?: {
      offeredRole?: string;
      offeredCompensation?: string;
      startDate?: string;
      notes?: string;
    }
  ): Promise<JobApplicationRecord> {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();

    const { data: existing, error: fetchErr } = await supabase
      .from("job_applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    if (fetchErr || !existing) throw fetchErr || new Error("Application not found");

    const status = decision === "selected" ? "selected" : "rejected";
    const timeline = Array.isArray(existing.timeline) ? existing.timeline : [];
    timeline.push({
      id: `tl_${Date.now()}`,
      status,
      date: now,
      timestamp: now,
      title: decision === "selected" ? "Offer Extended / Candidate Selected" : "Application Not Selected",
      description: decision === "selected"
        ? `Congratulations! Candidate has been selected for ${offerDetails?.offeredRole || existing.role_title || "the role"} at ${existing.company_name}.`
        : "Recruitment process concluded.",
    });

    const updatePayload: Record<string, any> = {
      final_status: decision,
      final_decision_date: now,
      status,
      status_updated_at: now,
      updated_at: now,
      timeline,
    };
    if (offerDetails) {
      updatePayload.offer_details = offerDetails;
    }

    const { data, error } = await supabase
      .from("job_applications")
      .update(updatePayload)
      .eq("id", applicationId)
      .select("*")
      .single();

    if (error || !data) throw error || new Error("Failed to update final hiring decision");

    // IF SELECTED: Persist to Student's Acquired Opportunities in profile
    if (decision === "selected" && existing.student_id) {
      const studentProfile = await this.getProfileByUserId(existing.student_id);
      if (studentProfile) {
        const metadata = studentProfile.metadata || {};
        const existingAcquired = Array.isArray(metadata.acquiredOpportunities)
          ? (metadata.acquiredOpportunities as Array<Record<string, unknown>>)
          : [];

        const alreadyAcquired = existingAcquired.some(
          (opp) => opp.applicationId === applicationId || (opp.hiringPostId && opp.hiringPostId === existing.job_id)
        );

        if (!alreadyAcquired) {
          existingAcquired.unshift({
            applicationId,
            hiringPostId: existing.job_id,
            roleTitle: offerDetails?.offeredRole || existing.role_title || "Engineering Role",
            companyName: existing.company_name,
            hiringType: existing.employment_type || existing.type || "Full-time",
            status: "Acquired / Selected",
            startDate: offerDetails?.startDate || undefined,
            compensation: offerDetails?.offeredCompensation || existing.salary_range,
            acquisitionDate: now,
          });
          metadata.acquiredOpportunities = existingAcquired;
          await this.saveProfile(existing.student_id, metadata);
        }
      }
    }

    return mapJobApplication(data);
  },

  // Institutional Request Operations
  async getCampusRequests(): Promise<CampusRequest[]> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("campus_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data.map(mapCampusRequest);
  },

  async updateHiringRequest(
    id: string,
    updates: Partial<HiringRequest>
  ): Promise<HiringRequest | null> {
    const supabase = getSupabaseServerClient();
    const payload: Record<string, any> = { updated_at: new Date().toISOString() };
    if (updates.status) payload.status = updates.status;
    if (updates.isFrozen != null) payload.is_frozen = updates.isFrozen;
    if (updates.freezeReason !== undefined) payload.freeze_reason = updates.freezeReason;

    const { data, error } = await supabase
      .from("hiring_requests")
      .update(payload)
      .eq("id", id)
      .select("*")
      .single();

    if (error || !data) return null;
    return mapHiringRequest(data);
  },

  async updateCampusRequest(
    id: string,
    updates: Partial<CampusRequest>
  ): Promise<CampusRequest | null> {
    const supabase = getSupabaseServerClient();
    const payload: Record<string, any> = { updated_at: new Date().toISOString() };
    if (updates.status) payload.status = updates.status;
    if (updates.isFrozen != null) payload.is_frozen = updates.isFrozen;
    if (updates.freezeReason !== undefined) payload.freeze_reason = updates.freezeReason;

    const { data, error } = await supabase
      .from("campus_requests")
      .update(payload)
      .eq("id", id)
      .select("*")
      .single();

    if (error || !data) return null;
    return mapCampusRequest(data);
  },

  // 17. AYUSH Development Interventions & Plans (Step 8)
  async getDevelopmentInterventions(activeOnly = true): Promise<AyushDevelopmentIntervention[]> {
    const supabase = getSupabaseServerClient();
    let query = supabase.from("ayush_development_interventions").select("*");
    if (activeOnly) {
      query = query.eq("active", true);
    }
    const { data, error } = await query.order("title", { ascending: true });
    if (error || !data) return [];
    return data.map(mapDevelopmentIntervention);
  },

  async getDevelopmentInterventionById(id: string): Promise<AyushDevelopmentIntervention | null> {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("ayush_development_interventions")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error || !data) return null;
    return mapDevelopmentIntervention(data);
  },

  async getStudentDevelopmentPlans(studentId: string, roleId?: string): Promise<AyushStudentDevelopmentPlan[]> {
    const supabase = getSupabaseServerClient();
    let query = supabase
      .from("ayush_student_development_plans")
      .select("*, ayush_development_interventions(*)")
      .eq("student_id", studentId);
    if (roleId) {
      query = query.eq("role_id", roleId);
    }
    const { data, error } = await query.order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map(mapStudentDevelopmentPlan);
  },

  async createOrUpdateDevelopmentPlan(
    plan: Partial<AyushStudentDevelopmentPlan> & {
      studentId: string;
      roleId: string;
      competencyId: string;
      interventionId: string;
    }
  ): Promise<AyushStudentDevelopmentPlan> {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();
    const id = plan.id || `plan_${plan.studentId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10)}_${plan.interventionId}`;
    const payload: any = {
      id,
      student_id: plan.studentId,
      role_id: plan.roleId,
      competency_id: plan.competencyId,
      baseline_level: plan.baselineLevel ?? 1,
      target_level: plan.targetLevel ?? 3,
      intervention_id: plan.interventionId,
      status: plan.status || "RECOMMENDED",
      started_at: plan.startedAt || null,
      completed_at: plan.completedAt || null,
      evidence_status: plan.evidenceStatus || null,
      evidence_submission: plan.evidenceSubmission || null,
      updated_at: now,
    };
    if (!plan.id) {
      payload.created_at = plan.createdAt || now;
    }
    const { data, error } = await supabase
      .from("ayush_student_development_plans")
      .upsert(payload, { onConflict: "student_id,role_id,competency_id,intervention_id" })
      .select("*, ayush_development_interventions(*)")
      .single();
    if (error) throw error;
    return mapStudentDevelopmentPlan(data);
  },

  async updateDevelopmentPlanStatus(
    planId: string,
    status: DevelopmentPlanStatus,
    evidenceSubmission?: Record<string, any>
  ): Promise<AyushStudentDevelopmentPlan | null> {
    const supabase = getSupabaseServerClient();
    const now = new Date().toISOString();
    const payload: Record<string, any> = {
      status,
      updated_at: now,
    };
    if (status === "IN_PROGRESS") {
      payload.started_at = now;
    } else if (status === "COMPLETED" || status === "EVIDENCE_PENDING" || status === "VERIFIED") {
      payload.completed_at = now;
    }
    if (evidenceSubmission) {
      payload.evidence_submission = evidenceSubmission;
      payload.evidence_status = status === "VERIFIED" ? "VERIFIED" : "SUBMITTED";
    }
    const { data, error } = await supabase
      .from("ayush_student_development_plans")
      .update(payload)
      .eq("id", planId)
      .select("*, ayush_development_interventions(*)")
      .maybeSingle();
    if (error || !data) return null;
    return mapStudentDevelopmentPlan(data);
  },
};
