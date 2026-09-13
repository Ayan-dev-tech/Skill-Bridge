/**
 * Skill Bridge — Comprehensive Target Skill Profiles Catalog (AYUSH Healthcare)
 * Extensible matrix connecting AYUSH systems & clinical niches to required competencies
 * and mapped Knowledge Test concept tags.
 */

import { TargetSkillProfile } from "./types";

export const TARGET_SKILL_PROFILES: Record<string, TargetSkillProfile> = {
  "ayush-clinical-research": {
    "nicheId": "ayush-clinical-research",
    "nicheTitle": "AYUSH Clinical Research",
    "domainId": "ayurveda",
    "domainName": "Ayurveda & Integrative Healthcare",
    "version": "1.0",
    "description": "Specialized competency profile for conducting and evaluating GCP-compliant clinical trials, pharmacovigilance surveillance, and evidence synthesis in AYUSH medicine.",
    "requiredSkills": [
      {
        "skillId": "comp-ayush-gcp",
        "skillName": "AYUSH Good Clinical Practice (GCP) & Ethical Compliance",
        "category": "Regulatory & Ethics",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Applying ICMR-AYUSH ethical guidelines, CTRI trial registration, informed consent protocols, and GCP auditing.",
        "relatedConceptTags": ["ayush-gcp", "ctri-registration", "clinical-ethics"]
      },
      {
        "skillId": "comp-ayush-trial-design",
        "skillName": "Holistic & Adaptive Clinical Trial Design",
        "category": "Research Methodology",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Designing whole-system clinical trials and randomized controlled trials adapted to traditional AYUSH therapies.",
        "relatedConceptTags": ["rct-design", "adaptive-trials", "whole-system-research"]
      },
      {
        "skillId": "comp-ayush-pvpi",
        "skillName": "Pharmacovigilance & Adverse Drug Reaction (ADR) Surveillance",
        "category": "Pharmacovigilance",
        "importance": "essential",
        "targetLevel": "Competent",
        "description": "Identifying, documenting, causality-assessing, and reporting adverse drug reactions under the NPvP-ASU&H framework.",
        "relatedConceptTags": ["adr-reporting", "pvpi", "causality-assessment"]
      },
      {
        "skillId": "comp-ayush-herb-drug",
        "skillName": "Herb-Drug Interaction & Safety Profiling",
        "category": "Pharmacology & Safety",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Evaluating cytochrome P450 interactions, metabolic clearance, and contraindications between ASU and conventional drugs.",
        "relatedConceptTags": ["herb-drug-interaction", "cyp-inhibition", "pharmacokinetics"]
      },
      {
        "skillId": "comp-ayush-bioethics",
        "skillName": "Institutional Ethics Committee (IEC) Dossier Preparation",
        "category": "Regulatory & Ethics",
        "importance": "important",
        "targetLevel": "Competent",
        "description": "Drafting patient information sheets, investigator brochures, and submissions for institutional ethics review.",
        "relatedConceptTags": ["iec-submission", "investigator-brochure", "informed-consent"]
      },
      {
        "skillId": "comp-ayush-data-mgmt",
        "skillName": "Electronic Data Capture & Clinical Data Management (CDM)",
        "category": "Data Science & Informatics",
        "importance": "important",
        "targetLevel": "Competent",
        "description": "Designing electronic Case Report Forms (eCRFs) and managing clinical trial databases compliant with Ayush Grid.",
        "relatedConceptTags": ["edc-ecrf", "clinical-data-management", "ayush-grid"]
      },
      {
        "skillId": "comp-ayush-standardization",
        "skillName": "Investigational Formulation Standardization & Monograph Verification",
        "category": "Pharmacopoeia & Standardization",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Verifying botanical authentication, phytochemical marker assay (HPTLC), and pharmacopoeial limits per API/UPI.",
        "relatedConceptTags": ["botanical-authentication", "hptlc-fingerprinting", "api-monograph"]
      },
      {
        "skillId": "comp-ayush-biostats",
        "skillName": "Biostatistical Analysis & Evidence Synthesis",
        "category": "Biostatistics",
        "importance": "important",
        "targetLevel": "Competent",
        "description": "Performing parametric/non-parametric statistics, sample size calculation, meta-analyses, and systematic reviews.",
        "relatedConceptTags": ["biostatistics", "sample-size", "systematic-review"]
      },
      {
        "skillId": "comp-ayush-samhita-epistemology",
        "skillName": "Classical Epistemological Correlation (Pramana Vijnana)",
        "category": "Classical Theory",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Correlating classical Aptopadesha, Pratyaksha, and Anumana evidence models with modern evidence hierarchies.",
        "relatedConceptTags": ["pramana-vijnana", "samhita-adhyayan", "evidence-hierarchy"]
      }
    ]
  },
  "kayachikitsa": {
    "nicheId": "kayachikitsa",
    "nicheTitle": "Clinical Kayachikitsa & Differential Diagnosis",
    "domainId": "ayurveda",
    "domainName": "Ayurveda",
    "version": "1.0",
    "description": "Core capabilities required for bedside internal medicine, systemic pathology diagnosis (Samprapti Vighatana), and treating complex chronic disorders.",
    "requiredSkills": [
      {
        "skillId": "nadi-pariksha",
        "skillName": "Nadi Pariksha (Pulse Diagnostics)",
        "category": "Clinical Diagnostics",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Evaluating classical pulse gati, rhythm, speed, and doshic predominance.",
        "relatedConceptTags": [
          "nadi-pariksha-gati",
          "tridosha-panchamahabhuta",
          "dosha-sthana-pitta"
        ]
      },
      {
        "skillId": "samprapti-vighatana",
        "skillName": "Samprapti Vighatana (Pathogenesis Deconstruction)",
        "category": "Clinical Pathology",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Mapping Sthanasamshraya, Dosha-Dushya Sammurchana, and breaking disease etiology.",
        "relatedConceptTags": [
          "shat-kriya-kala-stages",
          "ama-clinical-signs"
        ]
      },
      {
        "skillId": "shamana-chikitsa",
        "skillName": "Shamana Chikitsa & Dosage Formulation",
        "category": "Therapeutics",
        "importance": "essential",
        "targetLevel": "Strong Foundation",
        "description": "Selecting classical polyherbal formulations, churnas, kwathas, and vehicle adjuvants.",
        "relatedConceptTags": [
          "classical-triphala",
          "shadrasa-actions",
          "takra-grahani-chikitsa"
        ]
      },
      {
        "skillId": "abdm-clinical-documentation",
        "skillName": "Ayush Grid & ABDM Electronic Health Records",
        "category": "Digital Healthcare",
        "importance": "essential",
        "targetLevel": "Strong Foundation",
        "description": "Standardized clinical documentation conforming to Ayush NAMASTE portal terminology.",
        "relatedConceptTags": [
          "ayush-regulatory-api-standards"
        ]
      }
    ]
  },
  "panchakarma": {
    "nicheId": "panchakarma",
    "nicheTitle": "Panchakarma & Clinical Detoxification Protocols",
    "domainId": "ayurveda",
    "domainName": "Ayurveda",
    "version": "1.0",
    "description": "Clinical expertise in administering Purvakarma, Pradhanakarma (five cleansing procedures), and Paschatkarma rehabilitation.",
    "requiredSkills": [
      {
        "skillId": "snehana-swedana",
        "skillName": "Snehana & Swedana Preparatory Protocols",
        "category": "Purvakarma",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Graduated internal oleation dosing, assessing Samyak Snigdha signs, and steam sudation.",
        "relatedConceptTags": [
          "purvakarma-rationale",
          "samyak-snigdha-lakshanas"
        ]
      },
      {
        "skillId": "basti-therapy",
        "skillName": "Basti Therapy Protocol & Preparation",
        "category": "Pradhanakarma",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Compounding Niruha and Anuvasana bastis, temperature control, and administering retention enemas.",
        "relatedConceptTags": [
          "basti-vata-panchakarma",
          "subdoshas-vata-apana"
        ]
      },
      {
        "skillId": "virechana-vamana",
        "skillName": "Virechana & Vamana Management",
        "category": "Pradhanakarma",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Managing dosage, monitoring Vega counts (bouts), and preventing complications.",
        "relatedConceptTags": [
          "purvakarma-rationale",
          "shat-kriya-kala-stages"
        ]
      },
      {
        "skillId": "samsarjana-krama",
        "skillName": "Samsarjana Krama Dietetic Rehabilitation",
        "category": "Paschatkarma",
        "importance": "essential",
        "targetLevel": "Strong Foundation",
        "description": "Sequential administration of Peya, Vilepi, and Yusha to rekindle digestive Agni.",
        "relatedConceptTags": [
          "samsarjana-krama-sequence",
          "agni-metabolism"
        ]
      }
    ]
  },
  "dravyaguna-pharma": {
    "nicheId": "dravyaguna-pharma",
    "nicheTitle": "Dravyaguna & Botanical Pharmacognosy",
    "domainId": "ayurveda",
    "domainName": "Ayurveda",
    "version": "1.0",
    "description": "Botanical pharmacognosy, organoleptic authentication, Rasa-Panchaka evaluation, and herbal monographs.",
    "requiredSkills": [
      {
        "skillId": "botanical-authentication",
        "skillName": "Raw Drug Botanical Authentication",
        "category": "Pharmacognosy",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Microscopic, macro-morphological, and macroscopic evaluation of raw medicinal plants.",
        "relatedConceptTags": [
          "classical-triphala",
          "medhya-rasayana-brahmi"
        ]
      },
      {
        "skillId": "rasa-panchaka-analysis",
        "skillName": "Rasa Panchaka Pharmacodynamic Profiling",
        "category": "Pharmacology",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Evaluating taste (Rasa), attributes (Guna), potency (Veerya), and post-digestive effect (Vipaka).",
        "relatedConceptTags": [
          "shadrasa-actions",
          "prabhava-pharmacology"
        ]
      },
      {
        "skillId": "phytochemistry-hplc",
        "skillName": "Phytochemical Assay & TLC/HPLC Fingerprinting",
        "category": "Laboratory Standardization",
        "importance": "essential",
        "targetLevel": "Strong Foundation",
        "description": "High performance thin-layer chromatography and quantification of active marker compounds.",
        "relatedConceptTags": [
          "ayush-regulatory-api-standards"
        ]
      }
    ]
  },
  "rasashastra-formulation": {
    "nicheId": "rasashastra-formulation",
    "nicheTitle": "Rasa Shastra & Classical Formulation Standards",
    "domainId": "ayurveda",
    "domainName": "Ayurveda",
    "version": "1.0",
    "description": "Metallic mineral processing, classical calcinations (Marana), Bhasma quality testing, and GMP compliance.",
    "requiredSkills": [
      {
        "skillId": "mineral-shodhana",
        "skillName": "Mineral & Heavy Metal Shodhana",
        "category": "Processing",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Classical purification of mercury (Parada), sulfur (Gandhaka), and mineral ores.",
        "relatedConceptTags": [
          "rasashastra-marana-nanotech"
        ]
      },
      {
        "skillId": "bhasma-pariksha",
        "skillName": "Bhasma Standardized Quality Testing",
        "category": "Quality Control",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Classical Varitara, Rekhapurnatva, and Apunarbhava verification alongside modern XRD/SEM assays.",
        "relatedConceptTags": [
          "bhasma-pariksha-varitara",
          "rasashastra-marana-nanotech"
        ]
      },
      {
        "skillId": "gmp-ayush-manufacturing",
        "skillName": "Schedule T / WHO-GMP Formulation Standards",
        "category": "Industrial Standards",
        "importance": "essential",
        "targetLevel": "Strong Foundation",
        "description": "Manufacturing standards, batch records, heavy metal testing, and microbial load limits.",
        "relatedConceptTags": [
          "ayush-regulatory-api-standards"
        ]
      }
    ]
  },
  "clinical-yoga-therapy": {
    "nicheId": "clinical-yoga-therapy",
    "nicheTitle": "Clinical Yoga Therapy & Stress Physiology",
    "domainId": "yoga-naturopathy",
    "domainName": "Yoga & Naturopathy",
    "version": "1.0",
    "description": "Therapeutic yoga prescriptions, autonomic nervous system modulation, and psychosomatic rehabilitation.",
    "requiredSkills": [
      {
        "skillId": "pranayama-physiology",
        "skillName": "Therapeutic Pranayama & Breathwork",
        "category": "Respiratory Physiology",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Slow paced diaphragmatic breathing, Nadishodhana, and vagal autonomic modulation.",
        "relatedConceptTags": [
          "sheetali-cooling-pranayama",
          "vagal-activation-pranayama",
          "ida-pingala-autonomic"
        ]
      },
      {
        "skillId": "restorative-asana",
        "skillName": "Restorative Postural Therapeutics",
        "category": "Biomechanics",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Supported asanas, pelvic alignment, spinal decompression, and cardiovascular relief.",
        "relatedConceptTags": [
          "viparita-karani-cardiovascular",
          "yoga-therapy-hpa-axis"
        ]
      },
      {
        "skillId": "yoga-nidra-mindfulness",
        "skillName": "Clinical Yoga Nidra & Psychosomatic Relaxation",
        "category": "Mind-Body Medicine",
        "importance": "essential",
        "targetLevel": "Strong Foundation",
        "description": "Guided alpha/theta brainwave entrainment, body scanning, and cortisol reduction.",
        "relatedConceptTags": [
          "patanjali-definition-yoga",
          "yoga-therapy-hpa-axis"
        ]
      }
    ]
  },
  "nature-cure-hydrotherapy": {
    "nicheId": "nature-cure-hydrotherapy",
    "nicheTitle": "Hydrotherapy & Naturopathic Modalities",
    "domainId": "yoga-naturopathy",
    "domainName": "Yoga & Naturopathy",
    "version": "1.0",
    "description": "Hydro-thermal vascular therapies, compresses, mud packs, and natural elimination stimulation.",
    "requiredSkills": [
      {
        "skillId": "hydrotherapy-techniques",
        "skillName": "Clinical Hydrotherapy & Contrast Applications",
        "category": "Physical Modalities",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Spinal sprays, neutral baths, contrast foot baths, and vascular flush protocols.",
        "relatedConceptTags": [
          "hydrotherapy-cold-reaction",
          "neutral-bath-temperature",
          "contrast-hydrotherapy-flush"
        ]
      },
      {
        "skillId": "pelotherapy-mud",
        "skillName": "Pelotherapy & Therapeutic Mud Packaging",
        "category": "Physical Modalities",
        "importance": "essential",
        "targetLevel": "Strong Foundation",
        "description": "Formulating abdominal packs, facial packs, and spinal mud applications for heat reduction.",
        "relatedConceptTags": [
          "mud-pack-abdomen-naturopathy"
        ]
      },
      {
        "skillId": "heliotherapy-chromotherapy",
        "skillName": "Heliotherapy & Solar Radiation Regulation",
        "category": "Environmental Medicine",
        "importance": "essential",
        "targetLevel": "Strong Foundation",
        "description": "Graduated sunbaths, ultraviolet modulation, and chromatic visual relaxation.",
        "relatedConceptTags": [
          "naturopathy-toxin-accumulation"
        ]
      }
    ]
  },
  "dietetics-fasting": {
    "nicheId": "dietetics-fasting",
    "nicheTitle": "Clinical Dietetics & Fasting Therapy",
    "domainId": "yoga-naturopathy",
    "domainName": "Yoga & Naturopathy",
    "version": "1.0",
    "description": "Therapeutic intermittent and water fasting, alkaline dietetics, and gut microbiome restoration.",
    "requiredSkills": [
      {
        "skillId": "fasting-supervision",
        "skillName": "Clinical Fasting Protocol & Vital Sign Monitoring",
        "category": "Therapeutic Fasting",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Supervising water/juice fasts, monitoring electrolytes, and safely breaking the fast.",
        "relatedConceptTags": [
          "breaking-fast-naturopathy",
          "autophagy-fasting-physiology"
        ]
      },
      {
        "skillId": "alkaline-nutrition",
        "skillName": "Alkaline-Acid Nutrition & Raw Food Therapy",
        "category": "Clinical Nutrition",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Designing living-food, high-chlorophyll, unprocessed nutritional tables for metabolic disease.",
        "relatedConceptTags": [
          "naturopathy-alkaline-nutrition",
          "lindlahr-three-causes"
        ]
      }
    ]
  },
  "acupuncture-energy": {
    "nicheId": "acupuncture-energy",
    "nicheTitle": "Acupuncture & Reflexology Balance",
    "domainId": "yoga-naturopathy",
    "domainName": "Yoga & Naturopathy",
    "version": "1.0",
    "description": "Meridian energy balancing, point stimulation, and reflexology neuromodulation.",
    "requiredSkills": [
      {
        "skillId": "meridian-point-mapping",
        "skillName": "Meridian Acupoint Location & Needling Technique",
        "category": "Neuromodulation",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Locating distal and local points, sterile needling depth, and De-Qi sensation elicitation.",
        "relatedConceptTags": [
          "acupuncture-pain-gate-control"
        ]
      },
      {
        "skillId": "zone-reflexology",
        "skillName": "Zone Reflexology & Somatotopic Stimulation",
        "category": "Reflexology",
        "importance": "essential",
        "targetLevel": "Strong Foundation",
        "description": "Foot and hand reflex zone compression to stimulate autonomic visceral reflexes.",
        "relatedConceptTags": [
          "acupuncture-pain-gate-control"
        ]
      }
    ]
  },
  "moalajat-clinical": {
    "nicheId": "moalajat-clinical",
    "nicheTitle": "Moalajat & Bedside Therapeutics",
    "domainId": "unani",
    "domainName": "Unani Medicine",
    "version": "1.0",
    "description": "Clinical general medicine, humoral pathology (Akhlat), and systemic therapeutics in Unani Tibb.",
    "requiredSkills": [
      {
        "skillId": "nuzj-tanqiya-clinical",
        "skillName": "Nuzj wa Tanqiya Clinical Formulation",
        "category": "Internal Therapeutics",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Formulating concoctive Munzij decoctions and administering Mushil purgation.",
        "relatedConceptTags": [
          "nuzj-tanqiya-protocol",
          "safrawi-hepatitis-pathology"
        ]
      },
      {
        "skillId": "baul-examination",
        "skillName": "Baul (Urine) Clinical Uroscopy",
        "category": "Diagnostics",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Evaluating color, sediment, odor, and foam patterns to diagnose systemic humoral states.",
        "relatedConceptTags": [
          "baul-safra-indicators",
          "baul-hematuria-vs-safra"
        ]
      }
    ]
  },
  "ilaj-bit-tadbeer": {
    "nicheId": "ilaj-bit-tadbeer",
    "nicheTitle": "Ilaj-bit-Tadbeer (Regimenal Therapies)",
    "domainId": "unani",
    "domainName": "Unani Medicine",
    "version": "1.0",
    "description": "Physical detoxification interventions: Hijama (cupping), Taleeq (leeching), Fasd, and Dalk.",
    "requiredSkills": [
      {
        "skillId": "hijama-cupping-skills",
        "skillName": "Sterile Hijama (Dry & Wet Cupping) Technique",
        "category": "Regimenal Procedures",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Anatomical landmarking, negative suction pressure calibration, and aseptic scarification.",
        "relatedConceptTags": [
          "hijama-cupping-unani",
          "irq-un-nasa-unani-protocol"
        ]
      },
      {
        "skillId": "taleeq-leech-skills",
        "skillName": "Medicinal Leeching (Taleeq) Management",
        "category": "Regimenal Procedures",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Hirudo medicinalis application, localized venous engorgement relief, and post-bite care.",
        "relatedConceptTags": [
          "taleeq-leech-therapy-indications"
        ]
      }
    ]
  },
  "ilaj-bil-advia": {
    "nicheId": "ilaj-bil-advia",
    "nicheTitle": "Ilaj-bil-Advia & Single Drug Pharmacognosy",
    "domainId": "unani",
    "domainName": "Unani Medicine",
    "version": "1.0",
    "description": "Single drug pharmacology (Mufradat), compound formulation (Murakkabat), and toxicity correctives (Musleh).",
    "requiredSkills": [
      {
        "skillId": "mufradat-materia",
        "skillName": "Mufradat Single Drug Temperament Grading",
        "category": "Pharmacognosy",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Evaluating Darajat-e-Advia (1st to 4th degree) and pairing with appropriate Musleh.",
        "relatedConceptTags": [
          "darajat-e-advia-fourth-degree",
          "suranjan-waja-ul-mafasil",
          "musleh-corrective-unani"
        ]
      },
      {
        "skillId": "murakkabat-compounding",
        "skillName": "Murakkabat (Khamira, Majun, Itrifal) Compounding",
        "category": "Pharmacy",
        "importance": "essential",
        "targetLevel": "Strong Foundation",
        "description": "Preparing standard Qiwam consistency, incorporation of powders, and floral distillation.",
        "relatedConceptTags": [
          "majun-unani-pharmacy",
          "khamira-cardiac-exhilarant",
          "itrifal-unani-compound"
        ]
      }
    ]
  },
  "mizaj-nabz": {
    "nicheId": "mizaj-nabz",
    "nicheTitle": "Mizaj & Nabz Diagnostics",
    "domainId": "unani",
    "domainName": "Unani Medicine",
    "version": "1.0",
    "description": "Ten pulse parameters (Ajnas-e-Nabz) and individual humoral temperament assessment.",
    "requiredSkills": [
      {
        "skillId": "ajnas-e-nabz-palpation",
        "skillName": "Ajnas-e-Nabz Ten-Parameter Palpation",
        "category": "Diagnostics",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Assessing pulse quantity, force, speed, consistency, fullness, temperature, and rhythm.",
        "relatedConceptTags": [
          "nabz-pulse-unani-definition",
          "ajnas-e-nabz-ten-parameters",
          "nabz-e-ghazali-characteristics"
        ]
      },
      {
        "skillId": "mizaj-differentiation",
        "skillName": "Mizaj (Four Temperaments) Clinical Profiling",
        "category": "Diagnostics",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Differential assessment of Damawi, Balghami, Safrawi, and Saudawi constitutions.",
        "relatedConceptTags": [
          "damawi-mizaj-qualities",
          "arba-akhlat-humors"
        ]
      }
    ]
  },
  "maruthuvam-clinical": {
    "nicheId": "maruthuvam-clinical",
    "nicheTitle": "Maruthuvam & Classical Internal Medicine",
    "domainId": "siddha",
    "domainName": "Siddha Medicine",
    "version": "1.0",
    "description": "Mukkuttram balance, 8-fold examination (Envagai Thervu), and chronic disease management.",
    "requiredSkills": [
      {
        "skillId": "envagai-thervu-skills",
        "skillName": "Envagai Thervu (Eight-Fold Examination)",
        "category": "Diagnostics",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Clinical evaluation of Naadi, Sparisam, Naa, Niram, Mozhi, Vizhi, Malam, and Moothiram.",
        "relatedConceptTags": [
          "envagai-thervu-diagnosis",
          "naadi-proportions-siddha"
        ]
      },
      {
        "skillId": "neykkuri-uroscopy",
        "skillName": "Neykkuri (Oil Spread Uroscopy)",
        "category": "Diagnostics",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Performing and interpreting early morning sesame oil drop spreads on patient urine.",
        "relatedConceptTags": [
          "neykkuri-urine-test",
          "neykkuri-azhal-ring",
          "neykkuri-mutthu-iyyam"
        ]
      }
    ]
  },
  "varmam-therapy": {
    "nicheId": "varmam-therapy",
    "nicheTitle": "Varmam Science & Physical Manipulation",
    "domainId": "siddha",
    "domainName": "Siddha Medicine",
    "version": "1.0",
    "description": "108 vital energy points, trauma resuscitation, Adangal release methods, and Thokkanam.",
    "requiredSkills": [
      {
        "skillId": "varmam-stimulation",
        "skillName": "Varmam Node Location & Therapeutic Stimulation",
        "category": "Energy Medicine",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Locating Paduvarmam and Thoduvarmam points, applying controlled finger pressures.",
        "relatedConceptTags": [
          "varmam-108-points-classification",
          "pidari-kaalam-varmam-node",
          "adappa-kaalam-trauma-window"
        ]
      },
      {
        "skillId": "adangal-resuscitation",
        "skillName": "Adangal Retrieval & Emergency Resuscitation",
        "category": "Emergency Medicine",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Performing counter-manipulations and percussion release vectors for trauma revival.",
        "relatedConceptTags": [
          "adangal-varmam-retrieval"
        ]
      }
    ]
  },
  "gunapadam-materia": {
    "nicheId": "gunapadam-materia",
    "nicheTitle": "Gunapadam & Botanical Materia Medica",
    "domainId": "siddha",
    "domainName": "Siddha Medicine",
    "version": "1.0",
    "description": "Tamil Materia Medica, taste-potency bio-actions (Suvai/Veeriyam), and traditional detox.",
    "requiredSkills": [
      {
        "skillId": "siddha-botany-suddhi",
        "skillName": "Raw Plant Suddhi (Purification) Techniques",
        "category": "Pharmacognosy",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Detoxifying potent seeds, roots, and latexes using traditional cow milk boiling.",
        "relatedConceptTags": [
          "siddha-shodhana-etti-vidhai",
          "siddha-materia-medica-triad"
        ]
      },
      {
        "skillId": "kudineer-decoctions",
        "skillName": "Kudineer Poly-Herbal Standardized Brewing",
        "category": "Formulation",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Preparation of Nilavembu, Kaba Sura, and specific antiviral decoctions.",
        "relatedConceptTags": [
          "nilavembu-kudineer-viral",
          "kaba-sura-kudineer-action"
        ]
      }
    ]
  },
  "parpam-chendooram": {
    "nicheId": "parpam-chendooram",
    "nicheTitle": "Parpam, Chendooram & High-Order Alchemy",
    "domainId": "siddha",
    "domainName": "Siddha Medicine",
    "version": "1.0",
    "description": "Mineral calcinations (Parpam), red oxides (Chendooram), and Muppu catalytic chemistry.",
    "requiredSkills": [
      {
        "skillId": "pudam-calcination-siddha",
        "skillName": "Pudam Furnace Thermal Calibration",
        "category": "Alchemy",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Calibrating Varaga, Kukkuda, and Gaja Pudam fuel loads for inorganic mineral synthesis.",
        "relatedConceptTags": [
          "parpam-dosage-form",
          "pudam-heat-calibration-siddha",
          "chendooram-red-oxide"
        ]
      },
      {
        "skillId": "muppu-chemistry",
        "skillName": "Muppu Salt Catalysis & Kayakalpa Compounding",
        "category": "Alchemy",
        "importance": "essential",
        "targetLevel": "Strong Foundation",
        "description": "Esoteric salt compounding for accelerating metal oxide transformation.",
        "relatedConceptTags": [
          "muppu-alchemical-catalyst",
          "siddha-nanotechnology-validation"
        ]
      }
    ]
  },
  "repertory-casataking": {
    "nicheId": "repertory-casataking",
    "nicheTitle": "Classical Case Taking & Repertorization",
    "domainId": "homoeopathy",
    "domainName": "Homoeopathy",
    "version": "1.0",
    "description": "Totality of symptoms, Kentian evaluation hierarchy, computer-aided repertorial analysis.",
    "requiredSkills": [
      {
        "skillId": "classical-case-taking",
        "skillName": "Holistic Unbiased Case Taking (Organon §83–104)",
        "category": "Clinical Case Taking",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Eliciting voluntary patient narratives, modalities, mental generals, and strange, rare, peculiar symptoms.",
        "relatedConceptTags": [
          "boenninghausen-complete-symptom",
          "kentian-symptom-hierarchy"
        ]
      },
      {
        "skillId": "repertorial-analysis",
        "skillName": "Systematic Rubric Selection & Repertorization",
        "category": "Repertorization",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Translating patient symptoms into precise repertory rubrics and cross-referencing remedies.",
        "relatedConceptTags": [
          "repertory-definition",
          "kentian-symptom-hierarchy"
        ]
      }
    ]
  },
  "materia-medica": {
    "nicheId": "materia-medica",
    "nicheTitle": "Comparative Materia Medica & Keynote Prescribing",
    "domainId": "homoeopathy",
    "domainName": "Homoeopathy",
    "version": "1.0",
    "description": "Remedy portraits, keynote symptoms, pathogenetic provings, and differentiating Polychrests.",
    "requiredSkills": [
      {
        "skillId": "keynote-differentiation",
        "skillName": "Keynote Symptom Differentiation",
        "category": "Materia Medica",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Distinguishing subtle modality differences across major Polychrest remedies.",
        "relatedConceptTags": [
          "bryonia-alba-modalities",
          "arsenicum-album-keynotes",
          "pulsatilla-mental-portrait"
        ]
      },
      {
        "skillId": "remedy-relationships",
        "skillName": "Materia Medica Remedy Relationships",
        "category": "Materia Medica",
        "importance": "essential",
        "targetLevel": "Strong Foundation",
        "description": "Navigating complementary, inimical, antidotal, and sequential remedy pairs.",
        "relatedConceptTags": [
          "inimical-remedy-relationship"
        ]
      }
    ]
  },
  "organon-philosophy": {
    "nicheId": "organon-philosophy",
    "nicheTitle": "Organon of Medicine & Miasmatic Philosophy",
    "domainId": "homoeopathy",
    "domainName": "Homoeopathy",
    "version": "1.0",
    "description": "Hahnemannian principles, chronic miasmatic analysis, vital force dynamics, and posology.",
    "requiredSkills": [
      {
        "skillId": "miasmatic-diagnosis",
        "skillName": "Chronic Miasmatic Diagnosis (Psora, Sycosis, Syphilis)",
        "category": "Philosophy",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Identifying dominant miasmatic blocks and selecting appropriate anti-miasmatic remedies.",
        "relatedConceptTags": [
          "three-chronic-miasms",
          "anti-sycotic-thuja-medorrhinum",
          "syphilitic-miasm-indicators"
        ]
      },
      {
        "skillId": "kents-observations",
        "skillName": "Post-Prescription Prognosis & Kent's 12 Observations",
        "category": "Philosophy",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Interpreting aggravation vs. amelioration and applying Hering's Law of Direction of Cure.",
        "relatedConceptTags": [
          "herings-law-cure",
          "kents-twelve-observations-3",
          "kents-fourth-observation"
        ]
      }
    ]
  },
  "homoeopathic-pharmacy": {
    "nicheId": "homoeopathic-pharmacy",
    "nicheTitle": "Homoeopathic Pharmacy & Potentization Standards",
    "domainId": "homoeopathy",
    "domainName": "Homoeopathy",
    "version": "1.0",
    "description": "Decimal/Centesimal/LM scales, mother tincture extraction, trituration, and HPI compliance.",
    "requiredSkills": [
      {
        "skillId": "potentization-methodology",
        "skillName": "Potentization & Succussion / Trituration Methodology",
        "category": "Pharmacy",
        "importance": "essential",
        "targetLevel": "Proficient",
        "description": "Executing serial dilutions across X, C, and LM scales with verified succussion strokes.",
        "relatedConceptTags": [
          "potentization-dynamization",
          "centesimal-scale-ratio",
          "lm-potency-advantages",
          "trituration-vs-succussion-pharmacy"
        ]
      },
      {
        "skillId": "hpi-pharmacopoeial-compliance",
        "skillName": "Homoeopathic Pharmacopoeia of India (HPI) Standards",
        "category": "Quality Assurance",
        "importance": "essential",
        "targetLevel": "Strong Foundation",
        "description": "Testing alcohol proofing, vehicle purity of sugar globules, and mother tincture maceration.",
        "relatedConceptTags": [
          "hpi-globule-specifications"
        ]
      }
    ]
  }
};

/**
 * Helper to retrieve target skill profile by niche ID or domain ID fallback
 */
export function getTargetSkillProfile(
  nicheId: string,
  domainId?: string
): TargetSkillProfile {
  if (TARGET_SKILL_PROFILES[nicheId]) {
    return TARGET_SKILL_PROFILES[nicheId];
  }

  // Fallback to first niche in the domain if direct niche match is absent
  const byDomain = Object.values(TARGET_SKILL_PROFILES).find(
    (p) => p.domainId === domainId
  );
  if (byDomain) {
    return byDomain;
  }

  // Default ultimate fallback: Clinical Kayachikitsa
  return TARGET_SKILL_PROFILES["kayachikitsa"];
}
