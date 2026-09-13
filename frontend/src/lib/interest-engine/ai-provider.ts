/**
 * Skill Bridge — AI Provider & Resilient Adaptive Engine (AYUSH Healthcare)
 * Supports Gemini API (server-side only) with an intelligent, deterministic
 * fallback engine ensuring zero downtime, 100% testability, and no error leaks.
 */

import {
  AdaptiveQuestion,
  AnswerRecord,
  DomainId,
  DomainScores,
  QuestionOption,
  SignalScores,
} from "./types";
import { DOMAIN_TAXONOMY } from "./subdomains";

// ============================================================================
// 1. PHASE 1: CURATED BLIND SITUATIONAL SCENARIOS (SYSTEMS FULLY HIDDEN)
// ============================================================================

export const PHASE_1_BLIND_SCENARIOS: AdaptiveQuestion[] = [
  {
    id: "p1-q1-metabolic-crisis",
    phase: 1,
    questionNumber: 1,
    totalQuestionsEstimated: 5,
    questionText:
      "A patient presents with persistent digestive sluggishness, joint stiffness, and coated tongue after chronic stress. Which therapeutic avenue are you most compelled to explore first?",
    purpose: "Distinguish Tridosha/Ama systemic clearance vs. metabolic fasting/nature-cure vs. humoral concoction vs. vital force repertorization",
    options: [
      {
        id: "p1-q1-opt-a",
        label: "A",
        text: "Analyze digestive fire (Agni) and metabolic toxicity (Ama) to design a systemic bio-cleansing and herbs-adjuvant protocol.",
        signalWeights: { systemsThinking: 0.8, investigation: 0.8, problemSolving: 0.5 },
        domainRelevance: { ayurveda: 0.9 },
      },
      {
        id: "p1-q1-opt-b",
        label: "B",
        text: "Prescribe hydrotherapy wraps, metabolic fasting, and therapeutic breath regulation to stimulate natural physiological elimination.",
        signalWeights: { optimization: 0.9, building: 0.7, systemsThinking: 0.5 },
        domainRelevance: { "yoga-naturopathy": 0.9 },
      },
      {
        id: "p1-q1-opt-c",
        label: "C",
        text: "Palpate the radial pulse (Nabz) to assess humoral imbalance (Khilt-e-Fasid) and plan concoctive decoction therapy.",
        signalWeights: { analysis: 0.8, investigation: 0.8, problemSolving: 0.6 },
        domainRelevance: { unani: 0.85 },
      },
      {
        id: "p1-q1-opt-d",
        label: "D",
        text: "Record detailed mental etiologies, thermal modalities, and unique constitutional rubrics to select an individualized simillimum.",
        signalWeights: { investigation: 0.9, analysis: 0.8, creativity: 0.5 },
        domainRelevance: { homoeopathy: 0.9 },
      },
    ],
  },
  {
    id: "p1-q2-pharmacology-botany",
    phase: 1,
    questionNumber: 2,
    totalQuestionsEstimated: 5,
    questionText:
      "When researching a medicinal plant known for potent rejuvenating and anti-inflammatory properties, what aspect interests you most?",
    purpose: "Evaluate taste-potency bio-action vs. mineral-alkaline processing vs. serial potentization vs. autonomic nervous modulation",
    options: [
      {
        id: "p1-q2-opt-a",
        label: "A",
        text: "Evaluating its Rasa, Guna, Veerya, Vipaka, and Prabhava to understand its systemic tissue-level action (Dhatu Poshan).",
        signalWeights: { systemsThinking: 0.9, analysis: 0.8 },
        domainRelevance: { ayurveda: 0.9 },
      },
      {
        id: "p1-q2-opt-b",
        label: "B",
        text: "Purifying it through traditional cow milk boiling and integrating it with calcined marine/mineral preparations (Parpam/Chendooram).",
        signalWeights: { experimentation: 0.9, investigation: 0.8 },
        domainRelevance: { siddha: 0.9 },
      },
      {
        id: "p1-q2-opt-c",
        label: "C",
        text: "Preparing standardized mother tinctures and potentizing micro-dilutions across centesimal or 50-millesimal scales.",
        signalWeights: { optimization: 0.8, analysis: 0.8, problemSolving: 0.6 },
        domainRelevance: { homoeopathy: 0.9 },
      },
      {
        id: "p1-q2-opt-d",
        label: "D",
        text: "Determining its temperamental degree (Darajat-e-Advia) and compounding it with a corrective agent (Musleh) to neutralize side effects.",
        signalWeights: { analysis: 0.9, systemsThinking: 0.7 },
        domainRelevance: { unani: 0.9 },
      },
    ],
  },
  {
    id: "p1-q3-acute-emergency",
    phase: 1,
    questionNumber: 3,
    totalQuestionsEstimated: 5,
    questionText:
      "A patient suffers an acute neuromuscular spasm and motor impairment. Which clinical response matches your instinct?",
    purpose: "Varmam stimulation vs. regimenal Hijama vs. Snehana-Swedana vs. reflex neuromuscular alignment",
    options: [
      {
        id: "p1-q3-opt-a",
        label: "A",
        text: "Palpate and stimulate specific vital energy points (Varmam nodes) to release trapped prana and restore neuromuscular conductivity.",
        signalWeights: { experimentation: 0.85, investigation: 0.8, systemsThinking: 0.7 },
        domainRelevance: { siddha: 0.95 },
      },
      {
        id: "p1-q3-opt-b",
        label: "B",
        text: "Administer local wet cupping (Hijama-bil-Shart) along designated meridians to relieve congested vascular pressure and muscle spasm.",
        signalWeights: { problemSolving: 0.8, analysis: 0.7 },
        domainRelevance: { unani: 0.9 },
      },
      {
        id: "p1-q3-opt-c",
        label: "C",
        text: "Apply therapeutic spinal traction, neutral immersion baths, and zone reflexology to balance autonomic muscular tone.",
        signalWeights: { building: 0.8, optimization: 0.8 },
        domainRelevance: { "yoga-naturopathy": 0.9 },
      },
      {
        id: "p1-q3-opt-d",
        label: "D",
        text: "Perform intensive medicated oil pooling (Kati Basti) followed by Nadi Sweda to alleviate aggravated local Vata dosha.",
        signalWeights: { systemsThinking: 0.8, investigation: 0.7 },
        domainRelevance: { ayurveda: 0.85 },
      },
    ],
  },
  {
    id: "p1-q4-diagnostic-insight",
    phase: 1,
    questionNumber: 4,
    totalQuestionsEstimated: 5,
    questionText:
      "How do you prefer to discover the core root cause of an obscure, recurring chronic illness?",
    purpose: "Constitutional totality & miasms vs. Eight-fold examination (Ashtavidha) vs. Urine oil spread (Neykkuri) vs. Lifestyle circadian rhythm",
    options: [
      {
        id: "p1-q4-opt-a",
        label: "A",
        text: "Conduct an exhaustive holistic case interview mapping modalities, mental triggers, and underlying chronic miasmatic tendencies.",
        signalWeights: { investigation: 0.95, analysis: 0.8 },
        domainRelevance: { homoeopathy: 0.95 },
      },
      {
        id: "p1-q4-opt-b",
        label: "B",
        text: "Perform Ashtavidha Pariksha (Pulse, Urine, Stool, Tongue, Speech, Touch, Eyes, Physical Appearance) to localize doshic imbalance.",
        signalWeights: { systemsThinking: 0.9, analysis: 0.8 },
        domainRelevance: { ayurveda: 0.9 },
      },
      {
        id: "p1-q4-opt-c",
        label: "C",
        text: "Conduct the classical sesame-oil drop on urine test (Neerkkuri & Neykkuri) observing spreading patterns to diagnose systemic prognosis.",
        signalWeights: { experimentation: 0.9, investigation: 0.8 },
        domainRelevance: { siddha: 0.9 },
      },
      {
        id: "p1-q4-opt-d",
        label: "D",
        text: "Examine circadian habits, sleep latency, dietary biorhythms, and autonomic strain to identify lifestyle disharmony.",
        signalWeights: { optimization: 0.9, building: 0.7 },
        domainRelevance: { "yoga-naturopathy": 0.85 },
      },
    ],
  },
  {
    id: "p1-q5-wellness-preservation",
    phase: 1,
    questionNumber: 5,
    totalQuestionsEstimated: 5,
    questionText:
      "What philosophy guides your ideal model of preventive medicine and longevity?",
    purpose: "Dinacharya & Rasayana vs. Kayakalpam alchemy vs. Asbab-e-Sittah Zarooriyya vs. Yogic Panchakosha harmonization",
    options: [
      {
        id: "p1-q5-opt-a",
        label: "A",
        text: "Preserving vitality through six essential prerequisites (Asbab-e-Sittah Zarooriyya): clean air, balanced food/drink, rest, and evacuation.",
        signalWeights: { systemsThinking: 0.85, analysis: 0.8 },
        domainRelevance: { unani: 0.9 },
      },
      {
        id: "p1-q5-opt-b",
        label: "B",
        text: "Harmonizing the five bodily sheaths (Panchakoshas) through progressive asanas, pranayama breath control, and meditation.",
        signalWeights: { building: 0.8, optimization: 0.85 },
        domainRelevance: { "yoga-naturopathy": 0.95 },
      },
      {
        id: "p1-q5-opt-c",
        label: "C",
        text: "Synchronizing diurnal habits (Dinacharya) and seasonal adaptations (Ritucharya) supported by restorative Rasayana herbal therapies.",
        signalWeights: { systemsThinking: 0.9, problemSolving: 0.7 },
        domainRelevance: { ayurveda: 0.9 },
      },
      {
        id: "p1-q5-opt-d",
        label: "D",
        text: "Practicing classical Kayakalpam therapies using specialized herbomineral elixirs to arrest cellular decay and maintain longevity.",
        signalWeights: { experimentation: 0.9, investigation: 0.8 },
        domainRelevance: { siddha: 0.9 },
      },
    ],
  },
];

// ============================================================================
// 2. PHASE 2: TARGETED SUB-SYSTEM & NICHE SCENARIOS
// ============================================================================

export const PHASE_2_DOMAIN_SCENARIOS: Record<DomainId, AdaptiveQuestion[]> = {
  ayurveda: [
    {
      id: "p2-ayu-q1",
      phase: 2,
      questionNumber: 1,
      totalQuestionsEstimated: 3,
      broadDomain: "ayurveda",
      questionText:
        "Within Ayurvedic Medicine, which clinical or scientific specialty most engages your professional focus?",
      purpose: "Differentiate Kayachikitsa vs. Panchakarma vs. Dravyaguna vs. Rasa Shastra",
      options: [
        {
          id: "p2-ayu-q1-kaya",
          label: "A",
          text: "Bedside internal medicine, systemic pathology diagnosis (Samprapti Vighatana), and treating complex chronic disorders.",
          signalWeights: { systemsThinking: 0.9, investigation: 0.8 },
          domainRelevance: { ayurveda: 1 },
          subDomainHint: "kayachikitsa",
        },
        {
          id: "p2-ayu-q1-pancha",
          label: "B",
          text: "Managing intensive clinical purification procedures (Vamana, Virechana, Basti, Nasya, Raktamokshana) and rejuvenation therapies.",
          signalWeights: { building: 0.8, optimization: 0.8 },
          domainRelevance: { ayurveda: 1 },
          subDomainHint: "panchakarma",
        },
        {
          id: "p2-ayu-q1-dravya",
          label: "C",
          text: "Medicinal plant pharmacognosy, field botanical identification, and evaluating single-drug action mechanisms.",
          signalWeights: { analysis: 0.9, investigation: 0.7 },
          domainRelevance: { ayurveda: 1 },
          subDomainHint: "dravyaguna-pharma",
        },
        {
          id: "p2-ayu-q1-rasa",
          label: "D",
          text: "Classical pharmaceutical processing, metallic mineral purification (Shodhana/Marana), and nanotechnology Bhasma standardization.",
          signalWeights: { experimentation: 0.9, optimization: 0.8 },
          domainRelevance: { ayurveda: 1 },
          subDomainHint: "rasashastra-formulation",
        },
      ],
    },
    {
      id: "p2-ayu-q2",
      phase: 2,
      questionNumber: 2,
      totalQuestionsEstimated: 3,
      broadDomain: "ayurveda",
      questionText:
        "When managing an obstinate case of metabolic dysfunction (Grahani / Agnimandya), what is your primary clinical objective?",
      purpose: "Refine Ayurveda sub-specialty orientation",
      options: [
        {
          id: "p2-ayu-q2-kaya",
          label: "A",
          text: "Restoring digestive fire (Agni Deepana) and removing metabolic endotoxins (Ama Pachana) via oral herbal compounds.",
          signalWeights: { systemsThinking: 0.9 },
          domainRelevance: { ayurveda: 1 },
          subDomainHint: "kayachikitsa",
        },
        {
          id: "p2-ayu-q2-pancha",
          label: "B",
          text: "Administering internal Snehapana followed by a calibrated therapeutic Virechana protocol to evacuate Pitta/Kapha toxins.",
          signalWeights: { optimization: 0.9 },
          domainRelevance: { ayurveda: 1 },
          subDomainHint: "panchakarma",
        },
        {
          id: "p2-ayu-q2-dravya",
          label: "C",
          text: "Selecting potent Dipana-Pachana herbs with Ushna-Tikshna properties like Pippali, Shunthi, and Maricha with proper vehicles.",
          signalWeights: { analysis: 0.85 },
          domainRelevance: { ayurveda: 1 },
          subDomainHint: "dravyaguna-pharma",
        },
        {
          id: "p2-ayu-q2-rasa",
          label: "D",
          text: "Formulating quick-acting Rasaushadhis such as Shankha Vati or Agnitundi Vati using calcined mineral preparations.",
          signalWeights: { experimentation: 0.9 },
          domainRelevance: { ayurveda: 1 },
          subDomainHint: "rasashastra-formulation",
        },
      ],
    },
    {
      id: "p2-ayu-q3",
      phase: 2,
      questionNumber: 3,
      totalQuestionsEstimated: 3,
      broadDomain: "ayurveda",
      questionText:
        "Which professional achievement would bring you the greatest professional fulfillment?",
      purpose: "Final confirmation of Ayurveda niche",
      options: [
        {
          id: "p2-ayu-q3-kaya",
          label: "A",
          text: "Leading a multi-specialty Ayurvedic clinical hospital department managing complex lifestyle and auto-immune conditions.",
          signalWeights: { systemsThinking: 0.9 },
          domainRelevance: { ayurveda: 1 },
          subDomainHint: "kayachikitsa",
        },
        {
          id: "p2-ayu-q3-pancha",
          label: "B",
          text: "Directing an accredited advanced Panchakarma center delivering rigorous, safe detoxification programs.",
          signalWeights: { optimization: 0.85 },
          domainRelevance: { ayurveda: 1 },
          subDomainHint: "panchakarma",
        },
        {
          id: "p2-ayu-q3-dravya",
          label: "C",
          text: "Publishing authoritative botanical monographs and discovering clinical applications for endangered Himalayan herbs.",
          signalWeights: { analysis: 0.9 },
          domainRelevance: { ayurveda: 1 },
          subDomainHint: "dravyaguna-pharma",
        },
        {
          id: "p2-ayu-q3-rasa",
          label: "D",
          text: "Standardizing classical Bhasma synthesis to WHO-GMP and international pharmacopoeial standards with atomic force microscopy.",
          signalWeights: { experimentation: 0.95 },
          domainRelevance: { ayurveda: 1 },
          subDomainHint: "rasashastra-formulation",
        },
      ],
    },
  ],

  "yoga-naturopathy": [
    {
      id: "p2-yn-q1",
      phase: 2,
      questionNumber: 1,
      totalQuestionsEstimated: 3,
      broadDomain: "yoga-naturopathy",
      questionText:
        "Within Yoga & Naturopathy, which healing modality do you feel most inspired to practice?",
      purpose: "Differentiate Yoga therapy vs Hydrotherapy vs Dietetics/Fasting vs Acupuncture",
      options: [
        {
          id: "p2-yn-q1-yoga",
          label: "A",
          text: "Clinical Yoga therapy, breath physiology, autonomic nervous system modulation, and meditative stress rehabilitation.",
          signalWeights: { systemsThinking: 0.85, optimization: 0.85 },
          domainRelevance: { "yoga-naturopathy": 1 },
          subDomainHint: "clinical-yoga-therapy",
        },
        {
          id: "p2-yn-q1-hydro",
          label: "B",
          text: "Hydrotherapy, steam baths, alternating hot-cold compresses, and natural peloid (mud) applications.",
          signalWeights: { building: 0.8, optimization: 0.8 },
          domainRelevance: { "yoga-naturopathy": 1 },
          subDomainHint: "nature-cure-hydrotherapy",
        },
        {
          id: "p2-yn-q1-diet",
          label: "C",
          text: "Nutritional medicine, therapeutic elimination diets, supervised water/juice fasting, and metabolic resets.",
          signalWeights: { analysis: 0.85, optimization: 0.8 },
          domainRelevance: { "yoga-naturopathy": 1 },
          subDomainHint: "dietetics-fasting",
        },
        {
          id: "p2-yn-q1-acu",
          label: "D",
          text: "Acupuncture, meridian energy balancing, reflexology, and neuro-functional physical trigger point stimulation.",
          signalWeights: { experimentation: 0.8, problemSolving: 0.8 },
          domainRelevance: { "yoga-naturopathy": 1 },
          subDomainHint: "acupuncture-energy",
        },
      ],
    },
    {
      id: "p2-yn-q2",
      phase: 2,
      questionNumber: 2,
      totalQuestionsEstimated: 3,
      broadDomain: "yoga-naturopathy",
      questionText:
        "A patient suffering from chronic hypertension and anxiety seeks a non-pharmacological regimen. Where do you begin?",
      purpose: "Refine Yoga & Naturopathy sub-domain",
      options: [
        {
          id: "p2-yn-q2-yoga",
          label: "A",
          text: "Prescribing slow-paced Nadishodhana, Bhramari pranayama, and systematic Shavasana relaxation to down-regulate sympathetic tone.",
          signalWeights: { optimization: 0.9 },
          domainRelevance: { "yoga-naturopathy": 1 },
          subDomainHint: "clinical-yoga-therapy",
        },
        {
          id: "p2-yn-q2-hydro",
          label: "B",
          text: "Administering neutral spinal baths, cold friction packs, and alternating foot baths to rebalance peripheral vascular resistance.",
          signalWeights: { building: 0.85 },
          domainRelevance: { "yoga-naturopathy": 1 },
          subDomainHint: "nature-cure-hydrotherapy",
        },
        {
          id: "p2-yn-q2-diet",
          label: "C",
          text: "Placing the patient on a low-sodium, alkaline-rich raw vegetable and tender coconut water fasting regimen.",
          signalWeights: { analysis: 0.9 },
          domainRelevance: { "yoga-naturopathy": 1 },
          subDomainHint: "dietetics-fasting",
        },
        {
          id: "p2-yn-q2-acu",
          label: "D",
          text: "Needling calming distal acupoints (such as Yintang, Shenmen, and Taichong) to alleviate psycho-somatic tension.",
          signalWeights: { problemSolving: 0.85 },
          domainRelevance: { "yoga-naturopathy": 1 },
          subDomainHint: "acupuncture-energy",
        },
      ],
    },
    {
      id: "p2-yn-q3",
      phase: 2,
      questionNumber: 3,
      totalQuestionsEstimated: 3,
      broadDomain: "yoga-naturopathy",
      questionText:
        "What type of clinical research or practice model excites you most?",
      purpose: "Final confirmation of Yoga & Naturopathy niche",
      options: [
        {
          id: "p2-yn-q3-yoga",
          label: "A",
          text: "Clinical trials measuring heart rate variability (HRV) and EEG changes during specialized Pranayama protocols.",
          signalWeights: { optimization: 0.9 },
          domainRelevance: { "yoga-naturopathy": 1 },
          subDomainHint: "clinical-yoga-therapy",
        },
        {
          id: "p2-yn-q3-hydro",
          label: "B",
          text: "Establishing modern hydro-thermal sanatoriums delivering standardized natural balneotherapy.",
          signalWeights: { building: 0.9 },
          domainRelevance: { "yoga-naturopathy": 1 },
          subDomainHint: "nature-cure-hydrotherapy",
        },
        {
          id: "p2-yn-q3-diet",
          label: "C",
          text: "Publishing metabolic studies on autophagy and glycemic control through structured therapeutic intermittent fasting.",
          signalWeights: { analysis: 0.9 },
          domainRelevance: { "yoga-naturopathy": 1 },
          subDomainHint: "dietetics-fasting",
        },
        {
          id: "p2-yn-q3-acu",
          label: "D",
          text: "Integrating neuro-acupuncture protocols into integrative pain management and rehabilitation hospitals.",
          signalWeights: { experimentation: 0.9 },
          domainRelevance: { "yoga-naturopathy": 1 },
          subDomainHint: "acupuncture-energy",
        },
      ],
    },
  ],

  unani: [
    {
      id: "p2-una-q1",
      phase: 2,
      questionNumber: 1,
      totalQuestionsEstimated: 3,
      broadDomain: "unani",
      questionText:
        "Within Unani Tibb, which clinical branch best matches your academic and practical inclinations?",
      purpose: "Differentiate Moalajat vs. Ilaj-bit-Tadbeer vs. Ilaj-bil-Advia vs. Mizaj/Nabz",
      options: [
        {
          id: "p2-una-q1-moalajat",
          label: "A",
          text: "Moalajat: Bedside general medicine, chronic disease pathogenesis, and systemic humoral therapeutics.",
          signalWeights: { systemsThinking: 0.9, analysis: 0.8 },
          domainRelevance: { unani: 1 },
          subDomainHint: "moalajat-clinical",
        },
        {
          id: "p2-una-q1-tadbeer",
          label: "B",
          text: "Ilaj-bit-Tadbeer: Physical regimenal procedures like Hijama (cupping), Taleeq (leeching), Fasd (venesection), and Dalk (massage).",
          signalWeights: { problemSolving: 0.85, building: 0.8 },
          domainRelevance: { unani: 1 },
          subDomainHint: "ilaj-bit-tadbeer",
        },
        {
          id: "p2-una-q1-advia",
          label: "C",
          text: "Ilaj-bil-Advia: Single drug pharmacology (Mufradat), compound formulation (Murakkabat), and toxicity correctives (Musleh).",
          signalWeights: { analysis: 0.9, investigation: 0.8 },
          domainRelevance: { unani: 1 },
          subDomainHint: "ilaj-bil-advia",
        },
        {
          id: "p2-una-q1-mizaj",
          label: "D",
          text: "Mizaj & Nabz: Diagnostic assessment through the ten pulse parameters (Ajnas-e-Nabz) and humoral temperament profiling.",
          signalWeights: { investigation: 0.9, analysis: 0.85 },
          domainRelevance: { unani: 1 },
          subDomainHint: "mizaj-nabz",
        },
      ],
    },
    {
      id: "p2-una-q2",
      phase: 2,
      questionNumber: 2,
      totalQuestionsEstimated: 3,
      broadDomain: "unani",
      questionText:
        "When approaching a patient with stubborn chronic arthralgia (Waja-ul-Mafasil) caused by cold-phlegmatic humors, what is your primary strategy?",
      purpose: "Refine Unani sub-specialty",
      options: [
        {
          id: "p2-una-q2-moalajat",
          label: "A",
          text: "Prescribing a concoctive decoction (Munzij-e-Balgham) followed by mild purgation (Mushil) to evacuate the abnormal humor.",
          signalWeights: { systemsThinking: 0.9 },
          domainRelevance: { unani: 1 },
          subDomainHint: "moalajat-clinical",
        },
        {
          id: "p2-una-q2-tadbeer",
          label: "B",
          text: "Applying dry cupping (Hijama-bila-Shart) and warm herbal fomentation (Natool) directly over affected joints to draw out cold effusion.",
          signalWeights: { building: 0.85 },
          domainRelevance: { unani: 1 },
          subDomainHint: "ilaj-bit-tadbeer",
        },
        {
          id: "p2-una-q2-advia",
          label: "C",
          text: "Compounding classical Majun Suranjan with calibrated doses of Colchicum autumnale combined with Musleh almond oil.",
          signalWeights: { analysis: 0.9 },
          domainRelevance: { unani: 1 },
          subDomainHint: "ilaj-bil-advia",
        },
        {
          id: "p2-una-q2-mizaj",
          label: "D",
          text: "Carefully feeling the pulse for depth, volume, and arterial softness (Nabz-e-Laoo) to verify phlegmatic excess before prescribing.",
          signalWeights: { investigation: 0.9 },
          domainRelevance: { unani: 1 },
          subDomainHint: "mizaj-nabz",
        },
      ],
    },
    {
      id: "p2-una-q3",
      phase: 2,
      questionNumber: 3,
      totalQuestionsEstimated: 3,
      broadDomain: "unani",
      questionText:
        "Which milestone in classical Unani healthcare development inspires you most?",
      purpose: "Final confirmation of Unani niche",
      options: [
        {
          id: "p2-una-q3-moalajat",
          label: "A",
          text: "Pioneering evidence-based clinical protocols for complex systemic liver and gastrointestinal disorders.",
          signalWeights: { systemsThinking: 0.9 },
          domainRelevance: { unani: 1 },
          subDomainHint: "moalajat-clinical",
        },
        {
          id: "p2-una-q3-tadbeer",
          label: "B",
          text: "Establishing state-of-the-art sterile Hijama and regimental surgical intervention theaters in premier tertiary hospitals.",
          signalWeights: { building: 0.9 },
          domainRelevance: { unani: 1 },
          subDomainHint: "ilaj-bit-tadbeer",
        },
        {
          id: "p2-una-q3-advia",
          label: "C",
          text: "Modernizing classical Khamira and Arq formulations into standardized, shelf-stable pharmaceutical forms.",
          signalWeights: { analysis: 0.9 },
          domainRelevance: { unani: 1 },
          subDomainHint: "ilaj-bil-advia",
        },
        {
          id: "p2-una-q3-mizaj",
          label: "D",
          text: "Developing digital pulse-sensor technologies mapped accurately to classical ten parameters of Nabz.",
          signalWeights: { experimentation: 0.95 },
          domainRelevance: { unani: 1 },
          subDomainHint: "mizaj-nabz",
        },
      ],
    },
  ],

  siddha: [
    {
      id: "p2-sid-q1",
      phase: 2,
      questionNumber: 1,
      totalQuestionsEstimated: 3,
      broadDomain: "siddha",
      questionText:
        "Within Siddha Medicine, which domain aligns closest with your passion?",
      purpose: "Differentiate Maruthuvam vs Varmam vs Gunapadam vs Parpam/Chendooram",
      options: [
        {
          id: "p2-sid-q1-maruthuvam",
          label: "A",
          text: "Maruthuvam: Classical internal medicine, Mukkuttram doshic harmony, and treating chronic degenerative diseases.",
          signalWeights: { systemsThinking: 0.9, analysis: 0.8 },
          domainRelevance: { siddha: 1 },
          subDomainHint: "maruthuvam-clinical",
        },
        {
          id: "p2-sid-q1-varmam",
          label: "B",
          text: "Varmam Science: Therapeutic resuscitation of the 108 vital energy points, physical manipulation, and trauma care.",
          signalWeights: { experimentation: 0.9, problemSolving: 0.85 },
          domainRelevance: { siddha: 1 },
          subDomainHint: "varmam-therapy",
        },
        {
          id: "p2-sid-q1-gunapadam",
          label: "C",
          text: "Gunapadam: Botanical Materia Medica, taste (Suvai) evaluation, potency analysis, and indigenous herbal compounding.",
          signalWeights: { analysis: 0.9, investigation: 0.8 },
          domainRelevance: { siddha: 1 },
          subDomainHint: "gunapadam-materia",
        },
        {
          id: "p2-sid-q1-parpam",
          label: "D",
          text: "Parpam & Chendooram: Higher-order mineral alchemy, traditional calcinations (Pudam), and nano-oxide formulation.",
          signalWeights: { experimentation: 0.95, optimization: 0.8 },
          domainRelevance: { siddha: 1 },
          subDomainHint: "parpam-chendooram",
        },
      ],
    },
    {
      id: "p2-sid-q2",
      phase: 2,
      questionNumber: 2,
      totalQuestionsEstimated: 3,
      broadDomain: "siddha",
      questionText:
        "When performing diagnostic evaluation, which classical method provides you the clearest diagnostic certainty?",
      purpose: "Refine Siddha sub-specialty",
      options: [
        {
          id: "p2-sid-q2-maruthuvam",
          label: "A",
          text: "The Envagai Thervu (8-fold examination: Naadi, Sparisam, Naa, Niram, Mozhi, Vizhi, Malam, Moothiram).",
          signalWeights: { systemsThinking: 0.9 },
          domainRelevance: { siddha: 1 },
          subDomainHint: "maruthuvam-clinical",
        },
        {
          id: "p2-sid-q2-varmam",
          label: "B",
          text: "Palpating tissue tenderness, muscular tension lines, and energetic pulse nodes at regional Varmam centers.",
          signalWeights: { problemSolving: 0.9 },
          domainRelevance: { siddha: 1 },
          subDomainHint: "varmam-therapy",
        },
        {
          id: "p2-sid-q2-gunapadam",
          label: "C",
          text: "Correlating clinical symptom clusters with Suvai-Veeriyam-Pirivu actions of indigenous Dravidian herbs.",
          signalWeights: { analysis: 0.9 },
          domainRelevance: { siddha: 1 },
          subDomainHint: "gunapadam-materia",
        },
        {
          id: "p2-sid-q2-parpam",
          label: "D",
          text: "Assessing therapeutic response and cellular assimilation of calcined mineral Bhasmas in chronic metabolic diseases.",
          signalWeights: { experimentation: 0.9 },
          domainRelevance: { siddha: 1 },
          subDomainHint: "parpam-chendooram",
        },
      ],
    },
    {
      id: "p2-sid-q3",
      phase: 2,
      questionNumber: 3,
      totalQuestionsEstimated: 3,
      broadDomain: "siddha",
      questionText:
        "What major contribution would you like to make to Siddha healthcare?",
      purpose: "Final confirmation of Siddha niche",
      options: [
        {
          id: "p2-sid-q3-maruthuvam",
          label: "A",
          text: "Establishing integrative Siddha specialty protocols for complex autoimmune and dermatological diseases.",
          signalWeights: { systemsThinking: 0.9 },
          domainRelevance: { siddha: 1 },
          subDomainHint: "maruthuvam-clinical",
        },
        {
          id: "p2-sid-q3-varmam",
          label: "B",
          text: "Standardizing clinical emergency Varmam protocols for acute neuromuscular trauma and stroke rehabilitation.",
          signalWeights: { experimentation: 0.9 },
          domainRelevance: { siddha: 1 },
          subDomainHint: "varmam-therapy",
        },
        {
          id: "p2-sid-q3-gunapadam",
          label: "C",
          text: "Creating comprehensive scientific monographs for rare Western Ghats medicinal plants.",
          signalWeights: { analysis: 0.9 },
          domainRelevance: { siddha: 1 },
          subDomainHint: "gunapadam-materia",
        },
        {
          id: "p2-sid-q3-parpam",
          label: "D",
          text: "Validating non-toxic elemental states and biological half-life of classical mineral Chendoorams using XRD and SEM analysis.",
          signalWeights: { experimentation: 0.95 },
          domainRelevance: { siddha: 1 },
          subDomainHint: "parpam-chendooram",
        },
      ],
    },
  ],

  homoeopathy: [
    {
      id: "p2-hom-q1",
      phase: 2,
      questionNumber: 1,
      totalQuestionsEstimated: 3,
      broadDomain: "homoeopathy",
      questionText:
        "Within Homoeopathic Medicine, which aspect of the healing science do you find most intellectually fulfilling?",
      purpose: "Differentiate Repertory vs Materia Medica vs Organon vs Pharmacy",
      options: [
        {
          id: "p2-hom-q1-repertory",
          label: "A",
          text: "Systematic case taking, converting complex patient narratives into rubric totality, and repertorial analysis.",
          signalWeights: { investigation: 0.9, analysis: 0.85 },
          domainRelevance: { homoeopathy: 1 },
          subDomainHint: "repertory-casataking",
        },
        {
          id: "p2-hom-q1-materia",
          label: "B",
          text: "Comparative Materia Medica, understanding remedy portraits, keynote symptoms, and differentiating similar Polychrests.",
          signalWeights: { analysis: 0.9, problemSolving: 0.8 },
          domainRelevance: { homoeopathy: 1 },
          subDomainHint: "materia-medica",
        },
        {
          id: "p2-hom-q1-organon",
          label: "C",
          text: "Organon of Medicine, Hahnemannian philosophy, miasmatic analysis (Psora, Sycosis, Syphilis), and vital force dynamics.",
          signalWeights: { systemsThinking: 0.9, investigation: 0.85 },
          domainRelevance: { homoeopathy: 1 },
          subDomainHint: "organon-philosophy",
        },
        {
          id: "p2-hom-q1-pharmacy",
          label: "D",
          text: "Homoeopathic pharmacy, potentization mathematics, mother tincture extraction, and HPI pharmacopoeial compliance.",
          signalWeights: { optimization: 0.85, experimentation: 0.8 },
          domainRelevance: { homoeopathy: 1 },
          subDomainHint: "homoeopathic-pharmacy",
        },
      ],
    },
    {
      id: "p2-hom-q2",
      phase: 2,
      questionNumber: 2,
      totalQuestionsEstimated: 3,
      broadDomain: "homoeopathy",
      questionText:
        "A chronic patient returns for follow-up with old symptoms reappearing after constitutional remedy administration. How do you assess this?",
      purpose: "Refine Homoeopathy sub-specialty",
      options: [
        {
          id: "p2-hom-q2-repertory",
          label: "A",
          text: "Re-repertorize the symptom hierarchy to ensure no emerging uncharacteristic rubrics contradict the primary totality.",
          signalWeights: { investigation: 0.9 },
          domainRelevance: { homoeopathy: 1 },
          subDomainHint: "repertory-casataking",
        },
        {
          id: "p2-hom-q2-materia",
          label: "B",
          text: "Review the complementary and inimical remedy relationships in Boericke/Clarke to prepare the next sequential prescription.",
          signalWeights: { analysis: 0.9 },
          domainRelevance: { homoeopathy: 1 },
          subDomainHint: "materia-medica",
        },
        {
          id: "p2-hom-q2-organon",
          label: "C",
          text: "Recognize Hering's Law of Direction of Cure (symptoms disappearing in reverse chronological order) and wait without interfering.",
          signalWeights: { systemsThinking: 0.95 },
          domainRelevance: { homoeopathy: 1 },
          subDomainHint: "organon-philosophy",
        },
        {
          id: "p2-hom-q2-pharmacy",
          label: "D",
          text: "Assess if the potency scale (decimal, centesimal, or LM) requires adjustment or succussion variation for the next dose.",
          signalWeights: { optimization: 0.9 },
          domainRelevance: { homoeopathy: 1 },
          subDomainHint: "homoeopathic-pharmacy",
        },
      ],
    },
    {
      id: "p2-hom-q3",
      phase: 2,
      questionNumber: 3,
      totalQuestionsEstimated: 3,
      broadDomain: "homoeopathy",
      questionText:
        "What type of clinical advancement in Homoeopathy would you be most proud to accomplish?",
      purpose: "Final confirmation of Homoeopathy niche",
      options: [
        {
          id: "p2-hom-q3-repertory",
          label: "A",
          text: "Refining computer-aided algorithmic repertorization software to handle complex multi-rubric constitutional analysis with high precision.",
          signalWeights: { problemSolving: 0.95 },
          domainRelevance: { homoeopathy: 1 },
          subDomainHint: "repertory-casataking",
        },
        {
          id: "p2-hom-q3-materia",
          label: "B",
          text: "Conducting modern double-blind drug provings to add verified clinical rubrics for new therapeutic substances.",
          signalWeights: { analysis: 0.9 },
          domainRelevance: { homoeopathy: 1 },
          subDomainHint: "materia-medica",
        },
        {
          id: "p2-hom-q3-organon",
          label: "C",
          text: "Documenting long-term clinical remission in chronic autoimmune cases using strict classical miasmatic methodology.",
          signalWeights: { systemsThinking: 0.9 },
          domainRelevance: { homoeopathy: 1 },
          subDomainHint: "organon-philosophy",
        },
        {
          id: "p2-hom-q3-pharmacy",
          label: "D",
          text: "Establishing ultra-clean, standardized potentization manufacturing following rigorous international pharmacopoeia standards.",
          signalWeights: { optimization: 0.9 },
          domainRelevance: { homoeopathy: 1 },
          subDomainHint: "homoeopathic-pharmacy",
        },
      ],
    },
  ],
};

// ============================================================================
// 3. AI PROVIDER IMPLEMENTATION (GEMINI + DETERMINISTIC FALLBACK)
// ============================================================================

export interface GenerateQuestionContext {
  phase: 1 | 2;
  questionCount: number;
  questionHistory: AnswerRecord[];
  signalScores: SignalScores;
  domainScores: DomainScores;
  broadDomain?: DomainId;
}

/**
 * Attempts to generate an adaptive question using Gemini API with strict structured schema.
 * If unavailable, timed out, or invalid, gracefully returns null so fallback activates.
 */
async function queryGeminiForQuestion(
  context: GenerateQuestionContext
): Promise<AdaptiveQuestion | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null; // Graceful fallback
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000); // 4-second strict timeout

    const prompt = `You are the adaptive diagnostic engine for Skill Bridge AYUSH Healthcare Student Interest Discovery.
Generate the next single adaptive diagnostic question for a student exploring AYUSH medical systems.

CURRENT CONTEXT:
- Phase: ${context.phase === 1 ? "1 (BLIND INTEREST DISCOVERY - DO NOT MENTION ANY SYSTEM NAMES)" : `2 (SUB-SYSTEM DISCOVERY for ${context.broadDomain})`}
- Question Number: ${context.questionCount + 1}
- Answered Count: ${context.questionHistory.length}
- Current Top Signals: ${JSON.stringify(context.signalScores)}
${context.broadDomain ? `- Targeted System: ${context.broadDomain}` : ""}

STRICT RULES:
1. If Phase 1: The question and options MUST NOT mention system names ("Ayurveda", "Yoga", "Unani", "Siddha", "Homoeopathy") or ask what system the student prefers. Use realistic clinical, diagnostic, herbal, and therapeutic scenarios, patient cases, and practical choices.
2. Provide exactly 3 or 4 compelling options (A, B, C, D).
3. Return ONLY valid JSON matching this schema:
{
  "id": "gemini-q-${Date.now()}",
  "phase": ${context.phase},
  "questionNumber": ${context.questionCount + 1},
  "totalQuestionsEstimated": ${context.phase === 1 ? 5 : 3},
  "questionText": "The situational clinical question text",
  "purpose": "Internal diagnostic purpose",
  "options": [
    {
      "id": "opt-a",
      "label": "A",
      "text": "Option text",
      "signalWeights": { "investigation": 0.8, "systemsThinking": 0.7 },
      "domainRelevance": { "ayurveda": 0.8 }
    }
  ]
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.3,
        },
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return null;

    const parsed = JSON.parse(rawText) as AdaptiveQuestion;
    // Runtime schema validation
    if (
      parsed.questionText &&
      Array.isArray(parsed.options) &&
      parsed.options.length >= 3 &&
      parsed.options.every((o) => o.text && o.label)
    ) {
      return parsed;
    }
    return null;
  } catch {
    // Network failure, timeout, or parsing error -> fallback silently
    return null;
  }
}

/**
 * Primary server-side function to retrieve the next adaptive question.
 * Always returns a validated AdaptiveQuestion object.
 */
export async function getNextAdaptiveQuestion(
  context: GenerateQuestionContext
): Promise<AdaptiveQuestion> {
  // 1. Attempt AI Generation if configured
  const aiGenerated = await queryGeminiForQuestion(context);
  if (aiGenerated) {
    return aiGenerated;
  }

  // 2. Deterministic Adaptive Fallback Engine
  if (context.phase === 1) {
    // Filter out already answered questions
    const answeredIds = new Set(context.questionHistory.map((a) => a.questionId));
    const candidateQuestions = PHASE_1_BLIND_SCENARIOS.filter(
      (q) => !answeredIds.has(q.id)
    );

    if (candidateQuestions.length > 0) {
      // Pick next sequential question matching adaptive index
      const nextQ = candidateQuestions[0];
      return {
        ...nextQ,
        questionNumber: context.questionCount + 1,
        totalQuestionsEstimated: Math.max(5, context.questionCount + 1),
      };
    }

    // If candidate pool exhausted, return calibrated fallback
    const fallback = PHASE_1_BLIND_SCENARIOS[PHASE_1_BLIND_SCENARIOS.length - 1];
    return {
      ...fallback,
      id: `p1-repeat-${context.questionCount + 1}`,
      questionNumber: context.questionCount + 1,
      totalQuestionsEstimated: context.questionCount + 1,
    };
  }

  // Phase 2: Sub-domain discovery for the confirmed broad domain
  const domain = context.broadDomain || "ayurveda";
  const domainQuestions = PHASE_2_DOMAIN_SCENARIOS[domain] || PHASE_2_DOMAIN_SCENARIOS.ayurveda;
  const answeredPhase2Ids = new Set(
    context.questionHistory.filter((a) => a.phase === 2).map((a) => a.questionId)
  );

  const candidateP2 = domainQuestions.filter((q) => !answeredPhase2Ids.has(q.id));
  if (candidateP2.length > 0) {
    const nextQ = candidateP2[0];
    return {
      ...nextQ,
      questionNumber: context.questionCount + 1,
      totalQuestionsEstimated: 3,
    };
  }

  return {
    ...domainQuestions[domainQuestions.length - 1],
    id: `p2-repeat-${context.questionCount + 1}`,
    questionNumber: context.questionCount + 1,
    totalQuestionsEstimated: 3,
  };
}
