/**
 * Skill Bridge — Sub-Domain Taxonomy & Niche Taxonomy
 * Comprehensive hierarchy for all 5 canonical AYUSH domains.
 */

import { DomainId } from "./types";

export interface SubDomainNiche {
  id: string;
  name: string;
  shortDesc: string;
  nicheTitle: string;
  whyThisFits: string;
  sampleScenarios: string[];
}

export interface DomainTaxonomy {
  domainId: DomainId;
  name: string;
  tagline: string;
  subDomains: SubDomainNiche[];
}

export const DOMAIN_TAXONOMY: Record<DomainId, DomainTaxonomy> = {
  ayurveda: {
    domainId: "ayurveda",
    name: "Ayurveda",
    tagline: "Tridosha balance, Dravyaguna, Panchakarma, and classical therapeutics",
    subDomains: [
      {
        id: "kayachikitsa",
        name: "Kayachikitsa (Internal Medicine & Differential Diagnosis)",
        shortDesc: "Bedside diagnosis, Srotas pathology, Agni restoration, and chronic disease management.",
        nicheTitle: "Clinical Kayachikitsa & Differential Diagnosis",
        whyThisFits:
          "Your clinical choices show high aptitude for identifying root metabolic dysfunctions (Ama/Agni), mapping Tridosha imbalances, and crafting personalized systemic therapies.",
        sampleScenarios: [
          "Differentiating Vataja vs. Pittaja Grahani through classical examination",
          "Formulating an individualized Shamana protocol for metabolic syndrome",
        ],
      },
      {
        id: "panchakarma",
        name: "Panchakarma & Clinical Detoxification Protocols",
        shortDesc: "Shodhana therapies, Snehana-Swedana preparatory phases, and Paschat Karma rehabilitation.",
        nicheTitle: "Panchakarma & Clinical Detoxification Protocols",
        whyThisFits:
          "You excel in understanding somatic elimination pathways, patient fitness (Bala/Rogabala), and managing rigorous purification protocols safely.",
        sampleScenarios: [
          "Designing optimal Snehapana dosage escalation based on Kostha assessment",
          "Monitoring Samyak Shuddhi lakshanas during therapeutic Virechana",
        ],
      },
      {
        id: "dravyaguna-pharma",
        name: "Dravyaguna & Botanical Pharmacognosy",
        shortDesc: "Rasa-Panchaka analysis, drug interactions, botanical identification, and herbal monographs.",
        nicheTitle: "Dravyaguna & Botanical Pharmacognosy",
        whyThisFits:
          "You demonstrate a strong orientation toward herbal pharmacology, organoleptic analysis, and understanding botanical synergy (Yogavahi properties).",
        sampleScenarios: [
          "Standardizing raw botanical authentication for Commiphora mukul batches",
          "Evaluating synergistic adjuvant (Anupana) dynamics for classical churnas",
        ],
      },
      {
        id: "rasashastra-formulation",
        name: "Rasa Shastra & Classical Formulation Standards",
        shortDesc: "Shodhana, Marana, Bhasma preparation, and Ayurvedic Pharmacopoeia (API) compliance.",
        nicheTitle: "Rasa Shastra & Classical Formulation Standards",
        whyThisFits:
          "You have a keen interest in classical mineral-metallic processing, nano-particle safety testing, and pharmaceutical standardization.",
        sampleScenarios: [
          "Validating Nischandratva and Varitara quality tests for Swarna Bhasma",
          "Authoring modern GMP compliance documentation for classical Asava-Arishta brewing",
        ],
      },
    ],
  },
  "yoga-naturopathy": {
    domainId: "yoga-naturopathy",
    name: "Yoga & Naturopathy",
    tagline: "Drugless healing, physiological homeostasis, and mind-body balance",
    subDomains: [
      {
        id: "clinical-yoga-therapy",
        name: "Clinical Yoga Therapy & Stress Physiology",
        shortDesc: "Asana, Pranayama, and Yoga Nidra tailored to psychosomatic and lifestyle disorders.",
        nicheTitle: "Clinical Yoga Therapy & Stress Physiology",
        whyThisFits:
          "Your responses show an inclination toward autonomic nervous system regulation, vagal nerve stimulation, and evidence-based therapeutic yoga prescriptions.",
        sampleScenarios: [
          "Prescribing Nadishodhana and restorative asanas for essential hypertension",
          "Designing a structured therapeutic protocol for chronic lumbar spondylosis",
        ],
      },
      {
        id: "nature-cure-hydrotherapy",
        name: "Hydrotherapy & Naturopathic Modalities",
        shortDesc: "Spinal sprays, hip baths, compresses, mud packs, and natural thermal regulation.",
        nicheTitle: "Hydrotherapy & Naturopathic Modalities",
        whyThisFits:
          "You are intrigued by the hydro-thermal effects on circulation, visceral congestion relief, and stimulating vital restorative capacity through natural elements.",
        sampleScenarios: [
          "Administering cold friction baths and neutral spinal sprays for neuro-circulatory asthenia",
          "Formulating localized peloid (mud) applications for chronic joint inflammation",
        ],
      },
      {
        id: "dietetics-fasting",
        name: "Clinical Dietetics & Fasting Therapy",
        shortDesc: "Metabolic detoxification, elimination diets, alkaline-acid balance, and therapeutic juice fasts.",
        nicheTitle: "Clinical Dietetics & Fasting Therapy",
        whyThisFits:
          "You emphasize nutritional therapeutics, gut microbiome reset, and physiological rest as primary vehicles for self-recovery.",
        sampleScenarios: [
          "Supervising a short-term lemon-honey fasting protocol with vital sign monitoring",
          "Formulating customized raw-food dietary tables for non-alcoholic fatty liver disease",
        ],
      },
      {
        id: "acupuncture-energy",
        name: "Acupuncture & Reflexology Balance",
        shortDesc: "Meridian energy mapping, reflex zone therapy, and neuro-functional stimulation.",
        nicheTitle: "Acupuncture & Reflexology Balance",
        whyThisFits:
          "You enjoy hands-on physical reflexology, meridian energy mapping, and non-pharmacological pain neuromodulation.",
        sampleScenarios: [
          "Stimulating specific distal acupoints for acute migraine alleviation",
          "Applying zone reflexology protocols for post-operative gastrointestinal motility",
        ],
      },
    ],
  },
  unani: {
    domainId: "unani",
    name: "Unani Medicine",
    tagline: "Humoral doctrine (Akhlat), temperament (Mizaj), and holistic therapeutics",
    subDomains: [
      {
        id: "moalajat-clinical",
        name: "Moalajat (General Medicine & Bedside Therapeutics)",
        shortDesc: "Diagnosis and management of systemic diseases based on Akhlat (humors) and Quwwat (faculties).",
        nicheTitle: "Moalajat & Bedside Therapeutics",
        whyThisFits:
          "You demonstrate sharp clinical insight into identifying abnormal humors (Khilt-e-Fasid), organ strengths, and restoring vital balance.",
        sampleScenarios: [
          "Diagnosing chronic hepatitis (Waja-ul-Kabid) via physical signs and Nabz",
          "Formulating a systemic Nuzj (decoction) protocol to concoct viscous phlegmatic humors",
        ],
      },
      {
        id: "ilaj-bit-tadbeer",
        name: "Ilaj-bit-Tadbeer (Regimenal Therapies)",
        shortDesc: "Hijama (cupping), Taleeq (leeching), Fasd (venesection), and Hammam (Turkish bath).",
        nicheTitle: "Ilaj-bit-Tadbeer (Regimenal Therapies)",
        whyThisFits:
          "You are skilled at physical detoxification interventions, precise anatomical placement for cupping/leeching, and restoring localized tissue perfusion.",
        sampleScenarios: [
          "Determining indications for wet cupping (Hijama-bil-Shart) in sciatica (Irq-un-Nasa)",
          "Performing controlled medicinal leech therapy for localized venous engorgement",
        ],
      },
      {
        id: "ilaj-bil-advia",
        name: "Ilaj-bil-Advia & Single Drug Pharmacognosy",
        shortDesc: "Temperamental grades (Darajat-e-Advia), corrective agents (Musleh), and compound formulations.",
        nicheTitle: "Ilaj-bil-Advia & Single Drug Pharmacognosy",
        whyThisFits:
          "You show strong mastery of Unani single drugs (Mufradat), compound preparations (Murakkabat), and toxicity neutralizing agents (Muslehat).",
        sampleScenarios: [
          "Selecting appropriate Musleh (corrective) for a hot-dry 3rd degree drug like Saqmonia",
          "Compounding classical Majun and Khamira formulations to pharmacopoeial specifications",
        ],
      },
      {
        id: "mizaj-nabz",
        name: "Mizaj (Temperament) & Nabz (Pulse Diagnostics)",
        shortDesc: "Assessment of ten pulse parameters (Ajnas-e-Nabz), Baul (urine), and individual Mizaj.",
        nicheTitle: "Mizaj & Nabz Diagnostics",
        whyThisFits:
          "You have exceptional tactile and sensory diagnostic acuity for differentiating pulse volume, rhythm, speed, and arterial wall elasticity.",
        sampleScenarios: [
          "Differentiating Nabz-e-Ghazali from Nabz-e-Munqati in clinical shock",
          "Mapping four primary temperamental types (Damawi, Balghami, Safrawi, Saudawi)",
        ],
      },
    ],
  },
  siddha: {
    domainId: "siddha",
    name: "Siddha Medicine",
    tagline: "Mukkuttram balance, Varmam points, and alchemical pharmacology",
    subDomains: [
      {
        id: "maruthuvam-clinical",
        name: "Maruthuvam & Classical Internal Medicine",
        shortDesc: "Vali, Azhal, and Iyyam diagnostic frameworks, Envagai Thervu (8-fold examination).",
        nicheTitle: "Maruthuvam & Classical Internal Medicine",
        whyThisFits:
          "You possess deep analytical skills for evaluating Naadi, tongue (Naa), and urine oil-drop spreads (Neerkkuri & Neykkuri).",
        sampleScenarios: [
          "Interpreting ring vs. sieve patterns in Neerkkuri examination for chronic metabolic illness",
          "Formulating a three-dosha harmonizing protocol for inflammatory rheumatology",
        ],
      },
      {
        id: "varmam-therapy",
        name: "Varmam Science & Thokkanam Manipulation",
        shortDesc: "Therapeutic revival of 108 vital life points, trauma healing, and physical massage therapy.",
        nicheTitle: "Varmam Science & Physical Manipulation",
        whyThisFits:
          "You are interested in bio-energetic node manipulation, emergency neurological resuscitation, and specialized musculoskeletal rehabilitation.",
        sampleScenarios: [
          "Stimulating Adappa Kaalam and Thivalai Kaalam for respiratory distress",
          "Applying specialized Thokkanam passive stretches for hemiplegic motor recovery",
        ],
      },
      {
        id: "gunapadam-materia",
        name: "Gunapadam (Siddha Pharmacology) & Botanical Science",
        shortDesc: "Herbal, animal, and marine Materia Medica, taste (Suvai), and potency (Veeriyam).",
        nicheTitle: "Gunapadam & Botanical Materia Medica",
        whyThisFits:
          "You excel in identifying indigenous southern medicinal flora, understanding taste-potency bio-actions, and traditional botanical compounding.",
        sampleScenarios: [
          "Purifying raw Strychnos nux-vomica (Etti vidhai) using traditional cow milk boiling",
          "Formulating classical Nilavembu Kudineer decoction standards for febrile illnesses",
        ],
      },
      {
        id: "parpam-chendooram",
        name: "Parpam, Chendooram & Muppu Alchemical Chemistry",
        shortDesc: "Calcined mineral powders (Parpam), red oxides (Chendooram), and universal catalyst Muppu.",
        nicheTitle: "Parpam, Chendooram & High-Order Alchemy",
        whyThisFits:
          "You have a fascination with high-level inorganic mineral synthesis, traditional furnace (Pudam) calibration, and elemental transmutation.",
        sampleScenarios: [
          "Controlling cow-dung cake counts in Varaga Pudam to yield micro-fine Parpam",
          "Testing safety and non-crystallinity in mercury-sulphur (Rasa-Ghandaka) red sublimate",
        ],
      },
    ],
  },
  homoeopathy: {
    domainId: "homoeopathy",
    name: "Homoeopathy",
    tagline: "Similia Similibus Curentur, individualized repertorization, and vital force",
    subDomains: [
      {
        id: "repertory-casataking",
        name: "Classical Case Taking & Repertorization",
        shortDesc: "Totality of symptoms, Kentian hierarchy, computer-aided repertorial analysis, and rubric hunting.",
        nicheTitle: "Classical Case Taking & Repertorization",
        whyThisFits:
          "Your attention to unique subjective modalities, mental symptoms, and systematic repertorial rubric mapping makes you a natural case analyst.",
        sampleScenarios: [
          "Translating complex patient narratives into precise Synthesis Repertory rubrics",
          "Eliminating remedies through causative mental etiologies and thermal modalities",
        ],
      },
      {
        id: "materia-medica",
        name: "Comparative Materia Medica & Keynote Prescribing",
        shortDesc: "Pathogenetic provings, toxicological profiles, keynote symptom differentiation, and remedy triads.",
        nicheTitle: "Comparative Materia Medica & Keynote Prescribing",
        whyThisFits:
          "You have an extraordinary memory for characteristic remedy portraits, distinguishing subtle differences between Polychrest remedies.",
        sampleScenarios: [
          "Differentiating Lycopodium, Chelidonium, and Nux Vomica in acute hepatobiliary colic",
          "Evaluating constitutional Sulphur vs. Calcarea Carbonica indications in pediatric cases",
        ],
      },
      {
        id: "organon-philosophy",
        name: "Organon of Medicine & Miasmatic Philosophy",
        shortDesc: "Hahnemannian principles, Psora-Sycosis-Syphilis miasms, secondary curative reactions, and posology.",
        nicheTitle: "Organon of Medicine & Miasmatic Philosophy",
        whyThisFits:
          "You appreciate philosophical rigor, fundamental laws of health and disease, vital dynamism, and navigating chronic miasmatic obstacles to cure.",
        sampleScenarios: [
          "Assessing Hering's Law of Direction of Cure during chronic constitutional follow-ups",
          "Navigating high-potency aggravation vs. disease progression using Kent's 12 observations",
        ],
      },
      {
        id: "homoeopathic-pharmacy",
        name: "Homoeopathic Pharmacy & Micro-Dilution Potentization",
        shortDesc: "Decimal/Centesimal/LM scales, mother tincture extraction, and HPI pharmacopoeial standards.",
        nicheTitle: "Homoeopathic Pharmacy & Potentization Standards",
        whyThisFits:
          "You value precision in serial dilution, succussion kinetics, alcohol proofing, and strict pharmacopoeial standardization.",
        sampleScenarios: [
          "Preparing an LM (50-millesimal) potency scale following Organon §270 instructions",
          "Standardizing maceration vs. percolation protocols for indigenous herbal mother tinctures",
        ],
      },
    ],
  },
};
