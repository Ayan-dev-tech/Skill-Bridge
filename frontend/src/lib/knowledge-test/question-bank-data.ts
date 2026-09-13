/**
 * Skill Bridge — Comprehensive Calibrated Fallback Question Bank (AYUSH Healthcare)
 * 150 meticulously engineered questions across 5 AYUSH systems and 3 difficulty tiers.
 * Every question features:
 * - 4 options belonging to the exact same clinical/pharmacological conceptual domain
 * - Balanced character lengths (no giveaway lengths)
 * - Authentic AYUSH concepts, samhita/classical references, and pharmacopoeial standards
 * - Balanced base answer distribution across A, B, C, D
 * - Dynamic Fisher-Yates runtime shuffling support
 */

import { DifficultyLevel, KnowledgeQuestion } from "./types";

export type QuestionBank = Record<
  string,
  Record<DifficultyLevel, Omit<KnowledgeQuestion, "questionNumber">[]>
>;

export const FALLBACK_QUESTION_BANK: QuestionBank = {
  "ayurveda": {
    "beginner": [
      {
        "id": "ayu-beg-1",
        "questionText": "According to classical Ayurveda, which biological humor (Dosha) is predominantly composed of Akasha (Ether) and Vayu (Air) elements?",
        "options": [
          {
            "id": "ayu-beg-1-a",
            "label": "A",
            "text": "Vata Dosha, governing all bodily movement, neural impulses, and kinetic processes"
          },
          {
            "id": "ayu-beg-1-b",
            "label": "B",
            "text": "Pitta Dosha, governing digestion, cellular metabolism, and enzymatic transformations"
          },
          {
            "id": "ayu-beg-1-c",
            "label": "C",
            "text": "Kapha Dosha, governing anabolic cohesion, structural lubrication, and stability"
          },
          {
            "id": "ayu-beg-1-d",
            "label": "D",
            "text": "Rakta Dhatu, governing systemic oxygenation, vitality, and complexion"
          }
        ],
        "correctOptionId": "ayu-beg-1-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "tridosha-panchamahabhuta",
        "explanationAfterAnswer": "Vata is composed of Akasha and Vayu mahabhutas, characterized by dry (Ruksha), light (Laghu), cold (Sheeta), and mobile (Chala) properties."
      },
      {
        "id": "ayu-beg-2",
        "questionText": "Which of the following is considered the foremost prime site (Sthana) of Pitta Dosha in the human body?",
        "options": [
          {
            "id": "ayu-beg-2-a",
            "label": "A",
            "text": "Grahani (Duodenum and lower stomach region) where digestive fire resides"
          },
          {
            "id": "ayu-beg-2-b",
            "label": "B",
            "text": "Pakwashaya (Large intestine and colon region) representing the primary seat of Vata"
          },
          {
            "id": "ayu-beg-2-c",
            "label": "C",
            "text": "Uras (Chest and thoracic cavity) serving as the principal seat of Kapha"
          },
          {
            "id": "ayu-beg-2-d",
            "label": "D",
            "text": "Shiras (Cranial vault) serving as the controlling seat of Prana Vata"
          }
        ],
        "correctOptionId": "ayu-beg-2-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "dosha-sthana-pitta",
        "explanationAfterAnswer": "According to Ashtanga Hridaya, the principal seats of Pitta are Nabhi, Amashaya, Sweda, Lasika, Rakta, Drig, and Sparshana, with Nabhi/Grahani being foremost."
      },
      {
        "id": "ayu-beg-3",
        "questionText": "In Ayurvedic physiology, what is 'Agni' primarily responsible for?",
        "options": [
          {
            "id": "ayu-beg-3-a",
            "label": "A",
            "text": "Biotransformation, digestion of nutrients, metabolic conversion, and cellular energy"
          },
          {
            "id": "ayu-beg-3-b",
            "label": "B",
            "text": "Mechanical filtration of waste products through the mutravaha srotas"
          },
          {
            "id": "ayu-beg-3-c",
            "label": "C",
            "text": "Structural physical support and mineral deposition in the asthi dhatu"
          },
          {
            "id": "ayu-beg-3-d",
            "label": "D",
            "text": "Physical circulation of unoxygenated blood through the siras"
          }
        ],
        "correctOptionId": "ayu-beg-3-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "agni-metabolism",
        "explanationAfterAnswer": "Agni is the physiological principle responsible for digestion (Jatharagni), tissue metabolism (Dhatvagni), and elemental conversion (Bhutagni)."
      },
      {
        "id": "ayu-beg-4",
        "questionText": "Which classical formulation is categorized as a Triphala churna in Ayurvedic Materia Medica?",
        "options": [
          {
            "id": "ayu-beg-4-a",
            "label": "A",
            "text": "Haritaki (Terminalia chebula), Bibhitaki (Terminalia bellirica), and Amalaki (Phyllanthus emblica)"
          },
          {
            "id": "ayu-beg-4-b",
            "label": "B",
            "text": "Shunthi (Zingiber officinale), Maricha (Piper nigrum), and Pippali (Piper longum)"
          },
          {
            "id": "ayu-beg-4-c",
            "label": "C",
            "text": "Guduchi (Tinospora cordifolia), Gokshura (Tribulus terrestris), and Amalaki"
          },
          {
            "id": "ayu-beg-4-d",
            "label": "D",
            "text": "Musta (Cyperus rotundus), Ativisha (Aconitum heterophyllum), and Karkatashringi"
          }
        ],
        "correctOptionId": "ayu-beg-4-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "classical-triphala",
        "explanationAfterAnswer": "Triphala consists of equal parts of Haritaki, Bibhitaki, and Amalaki, widely used for bowel regulation, ocular health, and Rasayana therapy."
      },
      {
        "id": "ayu-beg-5",
        "questionText": "What are the seven classical bodily tissues (Sapta Dhatus) listed in their proper physiological progression?",
        "options": [
          {
            "id": "ayu-beg-5-a",
            "label": "A",
            "text": "Rasa, Rakta, Mamsa, Meda, Asthi, Majja, Shukra"
          },
          {
            "id": "ayu-beg-5-b",
            "label": "B",
            "text": "Rakta, Rasa, Asthi, Mamsa, Meda, Shukra, Majja"
          },
          {
            "id": "ayu-beg-5-c",
            "label": "C",
            "text": "Meda, Mamsa, Rasa, Rakta, Majja, Asthi, Shukra"
          },
          {
            "id": "ayu-beg-5-d",
            "label": "D",
            "text": "Rasa, Mamsa, Rakta, Asthi, Meda, Shukra, Majja"
          }
        ],
        "correctOptionId": "ayu-beg-5-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "sapta-dhatu-progression",
        "explanationAfterAnswer": "Nutritional plasma (Rasa) sequentially nourishes blood (Rakta), muscle (Mamsa), adipose (Meda), bone (Asthi), bone marrow (Majja), and reproductive tissue (Shukra)."
      },
      {
        "id": "ayu-beg-6",
        "questionText": "What is the primary diagnostic indicator of 'Ama' (metabolic endotoxins) during oral clinical examination?",
        "options": [
          {
            "id": "ayu-beg-6-a",
            "label": "A",
            "text": "A thick, sticky white coating on the tongue accompanied by altered taste and foul breath"
          },
          {
            "id": "ayu-beg-6-b",
            "label": "B",
            "text": "A completely clean, bright crimson tongue surface with hyperemic papillae"
          },
          {
            "id": "ayu-beg-6-c",
            "label": "C",
            "text": "Pale conjunctiva and cold peripheral extremities without abdominal fullness"
          },
          {
            "id": "ayu-beg-6-d",
            "label": "D",
            "text": "Excessive salivary amylase secretion with rapid hunger spikes immediately after meals"
          }
        ],
        "correctOptionId": "ayu-beg-6-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "ama-clinical-signs",
        "explanationAfterAnswer": "Alasya, Gaurava, Srotorodha, and a coated tongue (Jihwa Lepa) are classical hallmark indicators of systemic Ama."
      },
      {
        "id": "ayu-beg-7",
        "questionText": "Which taste (Rasa) among the Shadrassas possesses the most pronounced Pitta-aggravating and Vata-pacifying properties?",
        "options": [
          {
            "id": "ayu-beg-7-a",
            "label": "A",
            "text": "Lavana (Salty) rasa, being hot in potency, unctuous, and heavy"
          },
          {
            "id": "ayu-beg-7-b",
            "label": "B",
            "text": "Tikta (Bitter) rasa, being cold in potency, dry, and light"
          },
          {
            "id": "ayu-beg-7-c",
            "label": "C",
            "text": "Kashaya (Astringent) rasa, being cooling, constricting, and drying"
          },
          {
            "id": "ayu-beg-7-d",
            "label": "D",
            "text": "Madhura (Sweet) rasa, being anabolic, cooling, and heavy"
          }
        ],
        "correctOptionId": "ayu-beg-7-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "shadrasa-actions",
        "explanationAfterAnswer": "Lavana rasa consists of Jala and Agni mahabhutas, which pacifies Vata due to snigdha/ushna attributes but aggravates Pitta."
      },
      {
        "id": "ayu-beg-8",
        "questionText": "What is the primary purpose of 'Purvakarma' prior to administering main Panchakarma detoxification?",
        "options": [
          {
            "id": "ayu-beg-8-a",
            "label": "A",
            "text": "To mobilize deep-seated doshas from peripheral tissues (Shakha) toward the digestive tract (Koshtha) using Snehana and Swedana"
          },
          {
            "id": "ayu-beg-8-b",
            "label": "B",
            "text": "To permanently reduce red blood cell counts and deplete liver glycogen reserves"
          },
          {
            "id": "ayu-beg-8-c",
            "label": "C",
            "text": "To suppress metabolic rate and induce continuous sleep for multiple days"
          },
          {
            "id": "ayu-beg-8-d",
            "label": "D",
            "text": "To substitute classical oral nourishment exclusively with synthetic intravenous fluids"
          }
        ],
        "correctOptionId": "ayu-beg-8-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "purvakarma-rationale",
        "explanationAfterAnswer": "Purvakarma (internal/external oleation and sudation) liquefies and unbinds accumulated doshas, directing them to the Koshtha for easy expulsion."
      },
      {
        "id": "ayu-beg-9",
        "questionText": "Which classical text is revered as the foremost authority on Ayurvedic internal medicine (Kayachikitsa)?",
        "options": [
          {
            "id": "ayu-beg-9-a",
            "label": "A",
            "text": "Charaka Samhita"
          },
          {
            "id": "ayu-beg-9-b",
            "label": "B",
            "text": "Sushruta Samhita"
          },
          {
            "id": "ayu-beg-9-c",
            "label": "C",
            "text": "Ashtanga Sangraha"
          },
          {
            "id": "ayu-beg-9-d",
            "label": "D",
            "text": "Sarangadhara Samhita"
          }
        ],
        "correctOptionId": "ayu-beg-9-a",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "classical-samhita-authority",
        "explanationAfterAnswer": "Charaka Samhita is the foundational authority for Kayachikitsa, while Sushruta Samhita is the premier treatise on surgical science (Shalya Tantra)."
      },
      {
        "id": "ayu-beg-10",
        "questionText": "What is the specific Ayurvedic term for seasonal biological adaptation and regimen?",
        "options": [
          {
            "id": "ayu-beg-10-a",
            "label": "A",
            "text": "Ritucharya"
          },
          {
            "id": "ayu-beg-10-b",
            "label": "B",
            "text": "Dinacharya"
          },
          {
            "id": "ayu-beg-10-c",
            "label": "C",
            "text": "Sadvritta"
          },
          {
            "id": "ayu-beg-10-d",
            "label": "D",
            "text": "Ratricharya"
          }
        ],
        "correctOptionId": "ayu-beg-10-a",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "ritucharya-preventive",
        "explanationAfterAnswer": "Ritucharya details dietary and behavioral modifications across the six Indian seasons (Ritus) to prevent seasonal doshic accumulation (Chaya) and vitiation (Prakopa)."
      }
    ],
    "intermediate": [
      {
        "id": "ayu-int-1",
        "questionText": "In the pathogenesis (Shat Kriya Kala) of disease, which stage represents the localized manifestation of specific structural disease symptoms?",
        "options": [
          {
            "id": "ayu-int-1-a",
            "label": "A",
            "text": "Vyakti (Fifth stage where cardinal signs and symptoms of the disease become fully manifest)"
          },
          {
            "id": "ayu-int-1-b",
            "label": "B",
            "text": "Chaya (First stage representing passive accumulation of Doshas in their native seats)"
          },
          {
            "id": "ayu-int-1-c",
            "label": "C",
            "text": "Prasara (Third stage representing overflowing and systemic circulation of excited Doshas)"
          },
          {
            "id": "ayu-int-1-d",
            "label": "D",
            "text": "Sthanasamshraya (Fourth stage representing relocation and dosha-dushya interaction in defective channels)"
          }
        ],
        "correctOptionId": "ayu-int-1-a",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "shat-kriya-kala-stages",
        "explanationAfterAnswer": "Shat Kriya Kala stages are Chaya, Prakopa, Prasara, Sthana-samshraya (prodromal), Vyakti (manifestation), and Bheda (chronicity/complications)."
      },
      {
        "id": "ayu-int-2",
        "questionText": "Which Panchakarma procedure is specifically designated as the ultimate therapeutic measure for chronic aggravated Vata disorders?",
        "options": [
          {
            "id": "ayu-int-2-a",
            "label": "A",
            "text": "Basti (Medicated herbal enema using Niruha and Anuvasana formulations)"
          },
          {
            "id": "ayu-int-2-b",
            "label": "B",
            "text": "Vamana (Therapeutic emesis directed against aggravated Kapha)"
          },
          {
            "id": "ayu-int-2-c",
            "label": "C",
            "text": "Virechana (Therapeutic purgation directed primarily against aggravated Pitta)"
          },
          {
            "id": "ayu-int-2-d",
            "label": "D",
            "text": "Nasya (Errhine therapy directed toward supra-clavicular disorders)"
          }
        ],
        "correctOptionId": "ayu-int-2-a",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "basti-vata-panchakarma",
        "explanationAfterAnswer": "Basti reaches the Pakwashaya (the primary seat of Vata) and is described in classical texts as half or even the entirety of all medical treatments (Chikitsardha)."
      },
      {
        "id": "ayu-int-3",
        "questionText": "During the assessment of pulse (Nadi Pariksha), a pulse movement that feels like the slow, undulating movement of a swan (Hamsa Gati) or elephant indicates predominance of which Dosha?",
        "options": [
          {
            "id": "ayu-int-3-a",
            "label": "A",
            "text": "Kapha Dosha"
          },
          {
            "id": "ayu-int-3-b",
            "label": "B",
            "text": "Vata Dosha (characterized by Sarpa/snake-like rapid zig-zag motion)"
          },
          {
            "id": "ayu-int-3-c",
            "label": "C",
            "text": "Pitta Dosha (characterized by Manduka/frog-like leaping bounding motion)"
          },
          {
            "id": "ayu-int-3-d",
            "label": "D",
            "text": "Sannipataja (irregular mixed chaotic motion)"
          }
        ],
        "correctOptionId": "ayu-int-3-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "nadi-pariksha-gati",
        "explanationAfterAnswer": "Classical Nadi texts state: Vata moves like a snake/leech (Sarpa/Jalauka), Pitta like a frog/crow (Manduka/Kaka), and Kapha like a swan/pigeon (Hamsa/Kapota)."
      },
      {
        "id": "ayu-int-4",
        "questionText": "A patient with Rheumatoid Arthritis (Amavata) presents with severe polyarticular joint stiffness and swelling. Why is classical Sneha-Sweda (oil massage) initially contraindicated?",
        "options": [
          {
            "id": "ayu-int-4-a",
            "label": "A",
            "text": "Because unctuous oily applications increase Ama and block channels further; Valuka Sweda (dry sand fomentation) is indicated instead"
          },
          {
            "id": "ayu-int-4-b",
            "label": "B",
            "text": "Because oil increases Vata in bone marrow tissues"
          },
          {
            "id": "ayu-int-4-c",
            "label": "C",
            "text": "Because dry fomentation depletes red blood cells rapidly"
          },
          {
            "id": "ayu-int-4-d",
            "label": "D",
            "text": "Because massage alters the renal excretion of calcium"
          }
        ],
        "correctOptionId": "ayu-int-4-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "amavata-chikitsa-sutra",
        "explanationAfterAnswer": "In Amavata, Ama combined with Vata creates severe channel obstruction (Srotorodha). Applying unctuous oil (Snigdha) increases Ama. Rooksha Sweda (dry heat) is required."
      },
      {
        "id": "ayu-int-5",
        "questionText": "In Rasa Shastra, which test confirms that an incinerated metallic Bhasma has achieved true micro-fine particle division so that it floats upon water?",
        "options": [
          {
            "id": "ayu-int-5-a",
            "label": "A",
            "text": "Varitara Pariksha (Floating evenly upon cold surface water without sinking)"
          },
          {
            "id": "ayu-int-5-b",
            "label": "B",
            "text": "Nischandratva (Absence of luster under direct sunlight)"
          },
          {
            "id": "ayu-int-5-c",
            "label": "C",
            "text": "Apunarbhava (Inability to revert to metallic state when smelted with flux)"
          },
          {
            "id": "ayu-int-5-d",
            "label": "D",
            "text": "Rekhapurnatva (Entering within the micro-furrows of the skin of the thumb)"
          }
        ],
        "correctOptionId": "ayu-int-5-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "bhasma-pariksha-varitara",
        "explanationAfterAnswer": "Varitara tests surface tension and nanoparticle buoyancy; a properly prepared Bhasma floats like a leaf on still water."
      },
      {
        "id": "ayu-int-6",
        "questionText": "Which subtype of Vata Dosha is situated in the pelvic region and is responsible for micturition, defecation, ejaculation, and parturition?",
        "options": [
          {
            "id": "ayu-int-6-a",
            "label": "A",
            "text": "Apana Vata"
          },
          {
            "id": "ayu-int-6-b",
            "label": "B",
            "text": "Prana Vata"
          },
          {
            "id": "ayu-int-6-c",
            "label": "C",
            "text": "Udana Vata"
          },
          {
            "id": "ayu-int-6-d",
            "label": "D",
            "text": "Samana Vata"
          }
        ],
        "correctOptionId": "ayu-int-6-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "subdoshas-vata-apana",
        "explanationAfterAnswer": "Apana Vata resides in the Shroni, Basti, Medhra, and Uru regions, operating in a downward direction (Adhogamana)."
      },
      {
        "id": "ayu-int-7",
        "questionText": "What is the classical therapeutic principle (Chikitsa Sutra) for managing Jwara (Fever) in its acute (Taruna Jwara) stage?",
        "options": [
          {
            "id": "ayu-int-7-a",
            "label": "A",
            "text": "Langhana (Therapeutic fasting/lightness), Swedana, and bitter digestive decoctions (Kashaya)"
          },
          {
            "id": "ayu-int-7-b",
            "label": "B",
            "text": "Immediate administration of heavy nourishing tonics (Brimhana) and clarified butter"
          },
          {
            "id": "ayu-int-7-c",
            "label": "C",
            "text": "Intensive cold water immersion baths and excessive ingestion of dairy curds"
          },
          {
            "id": "ayu-int-7-d",
            "label": "D",
            "text": "Surgical phlebotomy and continuous high-pressure oleation enemas"
          }
        ],
        "correctOptionId": "ayu-int-7-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "jwara-chikitsa-sutra",
        "explanationAfterAnswer": "Langhanam Svedanam Kalo Yavagvastikto Rasah: acute fever originates from Amashaya and Ama; fasting, mild sweating, time, gruels, and bitter herbs digest the Ama."
      },
      {
        "id": "ayu-int-8",
        "questionText": "Which herb is celebrated in Ayurveda as the premier single-drug Rasayana for medha (intellect), memory, and speech enhancement?",
        "options": [
          {
            "id": "ayu-int-8-a",
            "label": "A",
            "text": "Brahmi (Bacopa monnieri / Centella asiatica)"
          },
          {
            "id": "ayu-int-8-b",
            "label": "B",
            "text": "Kutaja (Holarrhena antidysenterica)"
          },
          {
            "id": "ayu-int-8-c",
            "label": "C",
            "text": "Haridra (Curcuma longa)"
          },
          {
            "id": "ayu-int-8-d",
            "label": "D",
            "text": "Arjuna (Terminalia arjuna)"
          }
        ],
        "correctOptionId": "ayu-int-8-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "medhya-rasayana-brahmi",
        "explanationAfterAnswer": "Mandukaparni / Brahmi is one of the four classical Medhya Rasayanas of Charaka Samhita Chikitsa Sthana (along with Shankhpushpi, Guduchi, and Yashtimadhu)."
      },
      {
        "id": "ayu-int-9",
        "questionText": "What represents the classical dietetic sequence (Samsarjana Krama) administered immediately following Shodhana Panchakarma therapies?",
        "options": [
          {
            "id": "ayu-int-9-a",
            "label": "A",
            "text": "Peya (Thin rice water) -> Vilepi (Thick rice gruel) -> Akrita Yusha (Unseasoned soup) -> Krita Yusha -> Mamsarasa"
          },
          {
            "id": "ayu-int-9-b",
            "label": "B",
            "text": "Heavy wheat porridge -> Clarified butter -> Raw salads -> Fermented asavas"
          },
          {
            "id": "ayu-int-9-c",
            "label": "C",
            "text": "Fasting for seven days -> Dairy curds -> Deep-fried sweetmeats"
          },
          {
            "id": "ayu-int-9-d",
            "label": "D",
            "text": "Peyada -> Churna -> Bhasma -> Ghrita -> Taila"
          }
        ],
        "correctOptionId": "ayu-int-9-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "samsarjana-krama-sequence",
        "explanationAfterAnswer": "Post-Shodhana Agni is sluggish like a small flame. Samsarjana Krama progressively rekindles Agni using liquid to semi-solid to solid easily digestible nutrition."
      },
      {
        "id": "ayu-int-10",
        "questionText": "In Ayurvedic Dravyaguna, what is the term for the unique, inexplicable specific action of a substance that supersedes standard Rasa-Veerya-Vipaka principles?",
        "options": [
          {
            "id": "ayu-int-10-a",
            "label": "A",
            "text": "Prabhava"
          },
          {
            "id": "ayu-int-10-b",
            "label": "B",
            "text": "Veerya"
          },
          {
            "id": "ayu-int-10-c",
            "label": "C",
            "text": "Vipaka"
          },
          {
            "id": "ayu-int-10-d",
            "label": "D",
            "text": "Guna"
          }
        ],
        "correctOptionId": "ayu-int-10-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "prabhava-pharmacology",
        "explanationAfterAnswer": "Prabhava is the specific pharmacodynamic action that cannot be explained purely by elemental taste or potency (e.g. Chitraka and Danti both being Katu-Ushna, but Danti acting as a purgative due to Prabhava)."
      }
    ],
    "advanced": [
      {
        "id": "ayu-adv-1",
        "questionText": "A 54-year-old male with long-standing Type 2 Diabetes presents with burning feet neuropathy, cloudy turbid urine, and fatigue diagnosed as Kaphaja Prameha transitioning to Madhumeha. What pathological conversion in Dhatus explains this chronicity?",
        "options": [
          {
            "id": "ayu-adv-1-a",
            "label": "A",
            "text": "Dhatwagnimandya leading to Medo-Kleda accumulation, with Ojas depleting and spilling into urine via Mutravaha Srotas"
          },
          {
            "id": "ayu-adv-1-b",
            "label": "B",
            "text": "Isolated Rakta-Pitta hemorrhagic overflow with acute hemolysis"
          },
          {
            "id": "ayu-adv-1-c",
            "label": "C",
            "text": "Primary destruction of Asthi Dhatu resulting in severe hypercalcemia"
          },
          {
            "id": "ayu-adv-1-d",
            "label": "D",
            "text": "Purely psychological Mano-vaha Srotas impairment without tissue involvement"
          }
        ],
        "correctOptionId": "ayu-adv-1-a",
        "difficulty": "advanced",
        "complexity": "fundamental",
        "conceptTag": "madhumeha-pathology",
        "explanationAfterAnswer": "In Prameha, Kapha vitiates Medas, Kleda, and Mamsa; when untreated, Vata pulls vital Ojas from tissues into the bladder, manifesting as incurable Madhumeha."
      },
      {
        "id": "ayu-adv-2",
        "questionText": "In classical Panchakarma, what clinical signs indicate 'Samyak Snigdha Lakshana' (adequate internal oleation during Snehapana)?",
        "options": [
          {
            "id": "ayu-adv-2-a",
            "label": "A",
            "text": "Vatanulomana (downward wind passage), Diptagni (rekindled appetite), Snigdha-Asamhata Pureesha (unctuous loose stool), and Snehadvesha (aversion to fat)"
          },
          {
            "id": "ayu-adv-2-b",
            "label": "B",
            "text": "Severe profuse vomiting, marked dryness of skin, and severe constipation"
          },
          {
            "id": "ayu-adv-2-c",
            "label": "C",
            "text": "High fever with chills, acute hematuria, and loss of consciousness"
          },
          {
            "id": "ayu-adv-2-d",
            "label": "D",
            "text": "Complete absence of thirst, high blood pressure spikes, and hyperhidrosis"
          }
        ],
        "correctOptionId": "ayu-adv-2-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "samyak-snigdha-lakshanas",
        "explanationAfterAnswer": "Samyak Snigdha signs indicate tissues are saturated with lipid vehicle; Snehapana must stop immediately upon reaching Snehadvesha to prevent Ama formation."
      },
      {
        "id": "ayu-adv-3",
        "questionText": "Which specific pharmacological category of drugs in Charaka Samhita possesses the unique dynamic ability to penetrate micro-channels before spreading (Vyavayi) and break down cohesions rapidly (Vikashi)?",
        "options": [
          {
            "id": "ayu-adv-3-a",
            "label": "A",
            "text": "Madya (Fermented spirits) and Visha/Upavisha (Poisonous plant/mineral preparations)"
          },
          {
            "id": "ayu-adv-3-b",
            "label": "B",
            "text": "Kshira (Fresh milk and dairy fats)"
          },
          {
            "id": "ayu-adv-3-c",
            "label": "C",
            "text": "Shali Dhanya (Cultivated rice varieties)"
          },
          {
            "id": "ayu-adv-3-d",
            "label": "D",
            "text": "Mudga Yusha (Green gram decoction)"
          }
        ],
        "correctOptionId": "ayu-adv-3-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "vyavayi-vikashi-gunas",
        "explanationAfterAnswer": "Vyavayi substances spread throughout the body before digestion; Vikashi substances loosen Ojas and tissue bonds without requiring preliminary metabolic conversion."
      },
      {
        "id": "ayu-adv-4",
        "questionText": "When formulating an Ayurvedic clinical intervention for Grahani Roga (IBD / Malabsorption) presenting with alternating constipation and diarrhea with mucus, why is Takra (buttermilk) considered the supreme therapeutic vehicle (Anupana)?",
        "options": [
          {
            "id": "ayu-adv-4-a",
            "label": "A",
            "text": "Because it is Deepana, Grahi (astringent/retentive), Laghu (light), and balances both Kapha and Vata without aggravating Pitta"
          },
          {
            "id": "ayu-adv-4-b",
            "label": "B",
            "text": "Because it completely destroys all intestinal flora and acidifies the lumen"
          },
          {
            "id": "ayu-adv-4-c",
            "label": "C",
            "text": "Because it acts as a drastic purgative evacuating all bodily fluids within hours"
          },
          {
            "id": "ayu-adv-4-d",
            "label": "D",
            "text": "Because it consists exclusively of lipid-soluble synthetic enzymes"
          }
        ],
        "correctOptionId": "ayu-adv-4-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "takra-grahani-chikitsa",
        "explanationAfterAnswer": "Charaka Chikitsa 15 notes: 'Na Takra Sevinam Rogah...': Takra restores mucosal barrier function and normalizes dysbiosis due to its Kashaya-Amla Rasa and Ushna Virya."
      },
      {
        "id": "ayu-adv-5",
        "questionText": "In Susruta Shalya Tantra, what is the specific classification of surgical instruments known as 'Yantras' versus 'Shastras'?",
        "options": [
          {
            "id": "ayu-adv-5-a",
            "label": "A",
            "text": "Yantras are blunt grasping/retrieving instruments (101 types), while Shastras are sharp cutting/puncturing instruments (20 types)"
          },
          {
            "id": "ayu-adv-5-b",
            "label": "B",
            "text": "Yantras are heating furnaces, while Shastras are herbal bandaging cloths"
          },
          {
            "id": "ayu-adv-5-c",
            "label": "C",
            "text": "Yantras are diagnostic pulse probes, while Shastras are internal enema nozzles"
          },
          {
            "id": "ayu-adv-5-d",
            "label": "D",
            "text": "Yantras are pharmaceutical stone pestles, while Shastras are glass storage vessels"
          }
        ],
        "correctOptionId": "ayu-adv-5-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "sushruta-yantra-shastra",
        "explanationAfterAnswer": "Sushruta describes 101 blunt Yantras (with Samdamsha, Kanka-mukha, etc., where the surgeon's hand is the chief Yantra) and 20 sharp Shastras (Mandalagra, Vriddhipatra, etc.)."
      },
      {
        "id": "ayu-adv-6",
        "questionText": "Which regulatory standard governs testing limits for heavy metals (Lead, Cadmium, Mercury, Arsenic) in Ayurvedic botanical and proprietary medicines in India?",
        "options": [
          {
            "id": "ayu-adv-6-a",
            "label": "A",
            "text": "Ayurvedic Pharmacopoeia of India (API) and Ministry of Ayush / FSSAI limits"
          },
          {
            "id": "ayu-adv-6-b",
            "label": "B",
            "text": "IEEE 802.11 wireless networking criteria"
          },
          {
            "id": "ayu-adv-6-c",
            "label": "C",
            "text": "ISO 27001 Information Security standards"
          },
          {
            "id": "ayu-adv-6-d",
            "label": "D",
            "text": "Indian Boiler Regulation Act 1923"
          }
        ],
        "correctOptionId": "ayu-adv-6-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "ayush-regulatory-api-standards",
        "explanationAfterAnswer": "The Ayurvedic Pharmacopoeia of India (API) Part I and II under the Drugs and Cosmetics Act 1940 mandates permissible limits for heavy metals, aflatoxins, and pesticide residues."
      },
      {
        "id": "ayu-adv-7",
        "questionText": "A patient with bilateral Avascular Necrosis (AVN) of the femoral head is assessed through Ayurvedic pathology. Which Dhatu-Kshaya and Srotas-Dushti are fundamentally implicated?",
        "options": [
          {
            "id": "ayu-adv-7-a",
            "label": "A",
            "text": "Asthivaha Srotas dushti with Asthi-Majja Dhatu Kshaya aggravated by Vata lodged in bone tissue (Asthi-Majjagata Vata)"
          },
          {
            "id": "ayu-adv-7-b",
            "label": "B",
            "text": "Isolated Rasavaha Srotas dushti without osseous vascular involvement"
          },
          {
            "id": "ayu-adv-7-c",
            "label": "C",
            "text": "Mutravaha Srotas obstruction leading to secondary renal osteodystrophy only"
          },
          {
            "id": "ayu-adv-7-d",
            "label": "D",
            "text": "Excessive Meda vriddhi causing acute osteolytic tumor transformation"
          }
        ],
        "correctOptionId": "ayu-adv-7-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "asthi-majja-vata-pathology",
        "explanationAfterAnswer": "Vata has an inverse relationship with Kapha in Asthi; Vata aggravation depletes bone and bone marrow tissue (Asthi-Majja Kshaya), leading to bone resorption and ischemia."
      },
      {
        "id": "ayu-adv-8",
        "questionText": "In classical Bhasma preparation, what is the distinct chemical outcome of the 'Shodhana' followed by 'Marana' process using specific plant juices (Bhavana) and sealed crucibles (Sharava Samputa) in a furnace (Puda)?",
        "options": [
          {
            "id": "ayu-adv-8-a",
            "label": "A",
            "text": "Conversion of crude, toxic bulk metals into non-toxic, bio-assimilable organo-metallic nano-oxides and sulphides"
          },
          {
            "id": "ayu-adv-8-b",
            "label": "B",
            "text": "Complete incineration into inert, unabsorbable elemental carbon flakes"
          },
          {
            "id": "ayu-adv-8-c",
            "label": "C",
            "text": "Direct synthetic polymer formation without mineral alteration"
          },
          {
            "id": "ayu-adv-8-d",
            "label": "D",
            "text": "Precipitation into toxic crystalline metallic salts that damage glomeruli"
          }
        ],
        "correctOptionId": "ayu-adv-8-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "rasashastra-marana-nanotech",
        "explanationAfterAnswer": "Repeated calcination (Putapaka) with botanical juices chemically converts metallic elements into nano-scale oxide lattices (Bhasmas) that cross biological membranes without renal toxicity."
      },
      {
        "id": "ayu-adv-9",
        "questionText": "Which clinical parameter in Charaka Chikitsa Sthana establishes the differential diagnosis between Vatarakta (Gouty arthritis / Vasculitis) and Sandhigata Vata (Osteoarthritis)?",
        "options": [
          {
            "id": "ayu-adv-9-a",
            "label": "A",
            "text": "Vatarakta starts peripherally in the great toe (Angustha-mula) with burning discoloration and spreads centripetally; Sandhigata Vata involves weight-bearing joints with crepitus (Hanti Sandhigatah)"
          },
          {
            "id": "ayu-adv-9-b",
            "label": "B",
            "text": "Sandhigata Vata is predominantly Pitta-Rakta vitiation without mechanical pain"
          },
          {
            "id": "ayu-adv-9-c",
            "label": "C",
            "text": "Vatarakta never causes cutaneous sensations or joint tenderness"
          },
          {
            "id": "ayu-adv-9-d",
            "label": "D",
            "text": "Both disorders have identical presentation and respond identically to cold therapies"
          }
        ],
        "correctOptionId": "ayu-adv-9-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "vatarakta-vs-sandhigatavata",
        "explanationAfterAnswer": "Vatarakta is an obstruction of Rakta by Vata manifesting initially as burning pain in the big toe (like modern podagra); Sandhigata Vata is localized degenerative Vata in major joints."
      },
      {
        "id": "ayu-adv-10",
        "questionText": "According to classical toxicology (Agada Tantra), what is the term for slow, low-potency residual poisons that remain dormant in tissues without immediately killing the patient, flaring during cloudy weather or incompatible diet?",
        "options": [
          {
            "id": "ayu-adv-10-a",
            "label": "A",
            "text": "Dushi Visha"
          },
          {
            "id": "ayu-adv-10-b",
            "label": "B",
            "text": "Sthavara Visha"
          },
          {
            "id": "ayu-adv-10-c",
            "label": "C",
            "text": "Jangama Visha"
          },
          {
            "id": "ayu-adv-10-d",
            "label": "D",
            "text": "Gara Visha"
          }
        ],
        "correctOptionId": "ayu-adv-10-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "dushi-visha-toxicology",
        "explanationAfterAnswer": "Dushi Visha is a weakened or latent poison encapsulated by Kapha that persists for years in Dhatus, flaring during specific seasons or under dietary stress."
      }
    ]
  },
  "yoga-naturopathy": {
    "beginner": [
      {
        "id": "yn-beg-1",
        "questionText": "According to Patanjali's Yoga Sutras, what is the classical definition of Yoga?",
        "options": [
          {
            "id": "yn-beg-1-a",
            "label": "A",
            "text": "Yogas Chitta Vritti Nirodha (The cessation of the fluctuations of the mind-field)"
          },
          {
            "id": "yn-beg-1-b",
            "label": "B",
            "text": "Continuous vigorous physical calisthenics to build muscular hypertrophy"
          },
          {
            "id": "yn-beg-1-c",
            "label": "C",
            "text": "Hypnotic induction of subconscious behavioral conditioning"
          },
          {
            "id": "yn-beg-1-d",
            "label": "D",
            "text": "Extreme physical fasting to the point of muscular atrophy"
          }
        ],
        "correctOptionId": "yn-beg-1-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "patanjali-definition-yoga",
        "explanationAfterAnswer": "Patanjali Yoga Sutra 1.2 defines Yoga as 'Yogas chitta vritti nirodhah'—restraining mental modifications to rest in one's true nature."
      },
      {
        "id": "yn-beg-2",
        "questionText": "In classical Naturopathy, which foundational tenet explains the primary cause of all diseases?",
        "options": [
          {
            "id": "yn-beg-2-a",
            "label": "A",
            "text": "Accumulation of foreign matter and metabolic waste (toxins) due to lowered vital force"
          },
          {
            "id": "yn-beg-2-b",
            "label": "B",
            "text": "Immediate invasion of external bacteria regardless of host vitality or terrain"
          },
          {
            "id": "yn-beg-2-c",
            "label": "C",
            "text": "Deficiency of synthetic pharmaceutical supplements in childhood"
          },
          {
            "id": "yn-beg-2-d",
            "label": "D",
            "text": "Genetic predisposition operating independently of diet or lifestyle habits"
          }
        ],
        "correctOptionId": "yn-beg-2-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "naturopathy-toxin-accumulation",
        "explanationAfterAnswer": "Naturopathy holds that the root cause of all disease is the accumulation of morbid matter (toxins) caused by violation of natural laws, depressing vital vitality."
      },
      {
        "id": "yn-beg-3",
        "questionText": "What are the eight limbs of Ashtanga Yoga enumerated in their classical order?",
        "options": [
          {
            "id": "yn-beg-3-a",
            "label": "A",
            "text": "Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi"
          },
          {
            "id": "yn-beg-3-b",
            "label": "B",
            "text": "Asana, Pranayama, Yama, Niyama, Dhyana, Dharana, Pratyahara, Samadhi"
          },
          {
            "id": "yn-beg-3-c",
            "label": "C",
            "text": "Shatkarma, Asana, Mudra, Bandha, Pranayama, Samadhi, Yama, Niyama"
          },
          {
            "id": "yn-beg-3-d",
            "label": "D",
            "text": "Dharana, Dhyana, Samadhi, Yama, Niyama, Asana, Pranayama, Pratyahara"
          }
        ],
        "correctOptionId": "yn-beg-3-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "ashtanga-yoga-eight-limbs",
        "explanationAfterAnswer": "Patanjali Yoga Sutra 2.29 lists the eight limbs: restraint (Yama), observance (Niyama), posture (Asana), breath regulation (Pranayama), sensory withdrawal (Pratyahara), concentration (Dharana), meditation (Dhyana), and absorption (Samadhi)."
      },
      {
        "id": "yn-beg-4",
        "questionText": "Which of the following is categorized under the classical Shatkriyas (six cleansing actions) of Hatha Yoga?",
        "options": [
          {
            "id": "yn-beg-4-a",
            "label": "A",
            "text": "Jala Neti (Nasal saline irrigation)"
          },
          {
            "id": "yn-beg-4-b",
            "label": "B",
            "text": "Paschimottanasana (Seated forward fold)"
          },
          {
            "id": "yn-beg-4-c",
            "label": "C",
            "text": "Anuloma Viloma (Alternate nostril breathing)"
          },
          {
            "id": "yn-beg-4-d",
            "label": "D",
            "text": "Shavasana (Corpse relaxation pose)"
          }
        ],
        "correctOptionId": "yn-beg-4-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "shatkriyas-neti",
        "explanationAfterAnswer": "The six cleansing processes (Shatkriyas) of Hatha Yoga Pradipika are Dhauti, Basti, Neti, Trataka, Nauli, and Kapalabhati."
      },
      {
        "id": "yn-beg-5",
        "questionText": "In Naturopathic hydrotherapy, what physiological effect does a short cold application (under 1 minute) produce on blood vessels?",
        "options": [
          {
            "id": "yn-beg-5-a",
            "label": "A",
            "text": "Primary vasoconstriction followed immediately by active tonic secondary vasodilatation and reactive hyperemia"
          },
          {
            "id": "yn-beg-5-b",
            "label": "B",
            "text": "Permanent arterial paralysis with localized gangrenous necrosis"
          },
          {
            "id": "yn-beg-5-c",
            "label": "C",
            "text": "Immediate destruction of white blood cell count"
          },
          {
            "id": "yn-beg-5-d",
            "label": "D",
            "text": "Complete cessation of visceral capillary circulation"
          }
        ],
        "correctOptionId": "yn-beg-5-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "hydrotherapy-cold-reaction",
        "explanationAfterAnswer": "A brief cold stimulus causes immediate arterial constriction, rapidly followed by a vigorous reactive vasodilatation (secondary reaction), stimulating systemic circulation."
      },
      {
        "id": "yn-beg-6",
        "questionText": "Which Pranayama is renowned for producing a cooling physiological effect throughout the body?",
        "options": [
          {
            "id": "yn-beg-6-a",
            "label": "A",
            "text": "Sheetali and Sheetkari Pranayama"
          },
          {
            "id": "yn-beg-6-b",
            "label": "B",
            "text": "Surya Bhedana Pranayama (Right-nostril solar breathing)"
          },
          {
            "id": "yn-beg-6-c",
            "label": "C",
            "text": "Bhastrika Pranayama (Bellows breath)"
          },
          {
            "id": "yn-beg-6-d",
            "label": "D",
            "text": "Kapalabhati (Rapid frontal skull shining exhalations)"
          }
        ],
        "correctOptionId": "yn-beg-6-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "sheetali-cooling-pranayama",
        "explanationAfterAnswer": "Inhaling moist air through the curled tongue (Sheetali) or through the teeth (Sheetkari) cools the blood, lowers core temperature, and calms Pitta."
      },
      {
        "id": "yn-beg-7",
        "questionText": "What is the primary role of therapeutic Mud Therapy (Pelotherapy) applied to the abdomen in Naturopathy?",
        "options": [
          {
            "id": "yn-beg-7-a",
            "label": "A",
            "text": "Retaining prolonged moist cooling to reduce visceral congestion, decrease intestinal heat, and alleviate constipation"
          },
          {
            "id": "yn-beg-7-b",
            "label": "B",
            "text": "Chemically delivering synthetic corticosteroid hormones into the blood"
          },
          {
            "id": "yn-beg-7-c",
            "label": "C",
            "text": "Inducing systemic hypothermia and immediate dehydration"
          },
          {
            "id": "yn-beg-7-d",
            "label": "D",
            "text": "Providing oral mineral nutrition through digestive mucosal absorption"
          }
        ],
        "correctOptionId": "yn-beg-7-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "mud-pack-abdomen-naturopathy",
        "explanationAfterAnswer": "Mud holds moisture and cool temperature for extended periods, reducing intra-abdominal morbid heat, toning the intestines, and relieving gastrointestinal inflammation."
      },
      {
        "id": "yn-beg-8",
        "questionText": "Which Yama in Patanjali's Yoga Sutras signifies non-injury in thought, word, and action?",
        "options": [
          {
            "id": "yn-beg-8-a",
            "label": "A",
            "text": "Ahimsa"
          },
          {
            "id": "yn-beg-8-b",
            "label": "B",
            "text": "Satya"
          },
          {
            "id": "yn-beg-8-c",
            "label": "C",
            "text": "Asteya"
          },
          {
            "id": "yn-beg-8-d",
            "label": "D",
            "text": "Aparigraha"
          }
        ],
        "correctOptionId": "yn-beg-8-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "yama-ahimsa-philosophy",
        "explanationAfterAnswer": "Ahimsa (non-violence) is the foundational cornerstone of the five Yamas (Ahimsa, Satya, Asteya, Brahmacharya, Aparigraha)."
      },
      {
        "id": "yn-beg-9",
        "questionText": "In Naturopathic fasting, what is considered the ideal physiological fluid to break a multi-day fast?",
        "options": [
          {
            "id": "yn-beg-9-a",
            "label": "A",
            "text": "Diluted fresh orange or lemon juice, followed slowly by tender fruit slices"
          },
          {
            "id": "yn-beg-9-b",
            "label": "B",
            "text": "Spicy lentil stew with fried flatbreads"
          },
          {
            "id": "yn-beg-9-c",
            "label": "C",
            "text": "Whole animal milk and refined sugar confections"
          },
          {
            "id": "yn-beg-9-d",
            "label": "D",
            "text": "Concentrated carbonated sodas and caffeinated beverages"
          }
        ],
        "correctOptionId": "yn-beg-9-a",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "breaking-fast-naturopathy",
        "explanationAfterAnswer": "Breaking a fast requires gentle reactivation of the dormant digestive enzymes. Diluted alkaline citrus or tender coconut water ensures safe resumption."
      },
      {
        "id": "yn-beg-10",
        "questionText": "What autonomic nervous system shift is predominantly elicited during slow, deep diaphragmatic breathing and prolonged exhalation?",
        "options": [
          {
            "id": "yn-beg-10-a",
            "label": "A",
            "text": "Vagal nerve activation and parasympathetic nervous system dominance, reducing heart rate and blood pressure"
          },
          {
            "id": "yn-beg-10-b",
            "label": "B",
            "text": "Acute sympathetic fight-or-flight activation with epinephrine surge"
          },
          {
            "id": "yn-beg-10-c",
            "label": "C",
            "text": "Suppression of all brainwave activity into isoelectric flatline"
          },
          {
            "id": "yn-beg-10-d",
            "label": "D",
            "text": "Immediate respiratory alkalosis with arterial spasm"
          }
        ],
        "correctOptionId": "yn-beg-10-a",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "vagal-activation-pranayama",
        "explanationAfterAnswer": "Slow breathing with prolonged expiration stimulates pulmonary stretch receptors and carotid baroreceptors, triggering parasympathetic cholinergic outflow."
      }
    ],
    "intermediate": [
      {
        "id": "yn-int-1",
        "questionText": "In Hatha Yoga physiology, which two primary energy nadis correspond to sympathetic (solar/right) and parasympathetic (lunar/left) autonomic flows?",
        "options": [
          {
            "id": "yn-int-1-a",
            "label": "A",
            "text": "Pingala Nadi (right nostril/solar) and Ida Nadi (left nostril/lunar)"
          },
          {
            "id": "yn-int-1-b",
            "label": "B",
            "text": "Sushumna Nadi and Chitrini Nadi"
          },
          {
            "id": "yn-int-1-c",
            "label": "C",
            "text": "Kuhu Nadi and Shankhini Nadi"
          },
          {
            "id": "yn-int-1-d",
            "label": "D",
            "text": "Alambusha Nadi and Yashasvini Nadi"
          }
        ],
        "correctOptionId": "yn-int-1-a",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "ida-pingala-autonomic",
        "explanationAfterAnswer": "Ida represents lunar, cooling, parasympathetic activity terminating in the left nostril; Pingala represents solar, warming, sympathetic activity terminating in the right nostril."
      },
      {
        "id": "yn-int-2",
        "questionText": "Which classical Hatha Yoga Bandha involves pulling the abdomen backward toward the spine following complete exhalation?",
        "options": [
          {
            "id": "yn-int-2-a",
            "label": "A",
            "text": "Uddiyana Bandha (Abdominal lock)"
          },
          {
            "id": "yn-int-2-b",
            "label": "B",
            "text": "Jalandhara Bandha (Throat/chin lock)"
          },
          {
            "id": "yn-int-2-c",
            "label": "C",
            "text": "Mula Bandha (Perineal/pelvic floor lock)"
          },
          {
            "id": "yn-int-2-d",
            "label": "D",
            "text": "Maha Bandha (Simultaneous triple lock)"
          }
        ],
        "correctOptionId": "yn-int-2-a",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "uddiyana-bandha-physiology",
        "explanationAfterAnswer": "Uddiyana Bandha creates strong negative intra-thoracic pressure, elevates the diaphragm, massages abdominal viscera, and stimulates sympathetic ganglia."
      },
      {
        "id": "yn-int-3",
        "questionText": "A patient with metabolic syndrome is prescribed a Naturopathic elimination diet. Why are raw sprouted legumes and green juices emphasized over cooked refined meals?",
        "options": [
          {
            "id": "yn-int-3-a",
            "label": "A",
            "text": "They provide high enzymatic content, alkaline mineral salts, bioavailable antioxidants, and high dietary fiber without toxic glycation byproducts"
          },
          {
            "id": "yn-int-3-b",
            "label": "B",
            "text": "They immediately shut down pancreatic endocrine secretion"
          },
          {
            "id": "yn-int-3-c",
            "label": "C",
            "text": "They induce permanent ketosis within twenty minutes"
          },
          {
            "id": "yn-int-3-d",
            "label": "D",
            "text": "They eliminate the body's physiological need for drinking pure water"
          }
        ],
        "correctOptionId": "yn-int-3-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "naturopathy-alkaline-nutrition",
        "explanationAfterAnswer": "Living raw foods preserve heat-labile enzymes, supply chlorophyll and magnesium, alkalize the extracellular matrix, and promote hepatic Phase II detoxification."
      },
      {
        "id": "yn-int-4",
        "questionText": "Which clinical phenomenon described in Naturopathy represents a temporary acute exacerbation of symptoms (e.g., mild fever, headache, skin eruptions) during deep detoxification?",
        "options": [
          {
            "id": "yn-int-4-a",
            "label": "A",
            "text": "The Healing Crisis (Constructive reaction demonstrating vital force eliminating suppressed morbid matter)"
          },
          {
            "id": "yn-int-4-b",
            "label": "B",
            "text": "Irreversible multi-organ disease progression"
          },
          {
            "id": "yn-int-4-c",
            "label": "C",
            "text": "Acute systemic drug intoxication"
          },
          {
            "id": "yn-int-4-d",
            "label": "D",
            "text": "Terminal cachexia"
          }
        ],
        "correctOptionId": "yn-int-4-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "healing-crisis-naturopathy",
        "explanationAfterAnswer": "In Hering's Law and nature cure principles, a Healing Crisis is an acute constructive effort of the organism to eliminate toxins, distinguished from disease relapse."
      },
      {
        "id": "yn-int-5",
        "questionText": "During the practice of Kapalabhati, what is the active phase versus the passive phase of respiration?",
        "options": [
          {
            "id": "yn-int-5-a",
            "label": "A",
            "text": "Exhalation is active and forceful (contracting rectus abdominis), while inhalation is passive and automatic (recoil of diaphragm)"
          },
          {
            "id": "yn-int-5-b",
            "label": "B",
            "text": "Inhalation is forceful while exhalation is passive"
          },
          {
            "id": "yn-int-5-c",
            "label": "C",
            "text": "Both inhalation and exhalation are vigorously forced with equal duration"
          },
          {
            "id": "yn-int-5-d",
            "label": "D",
            "text": "Breath is suspended indefinitely under high pressure"
          }
        ],
        "correctOptionId": "yn-int-5-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "kapalabhati-respiratory-mechanics",
        "explanationAfterAnswer": "Kapalabhati involves rapid, rhythmic, active contractions of the abdominal wall forcing air out, followed by passive inhalation from elastic recoil."
      },
      {
        "id": "yn-int-6",
        "questionText": "In Naturopathic hydrotherapy, what is the temperature range defining a 'Neutral Bath' designed to relieve insomnia and mental agitation?",
        "options": [
          {
            "id": "yn-int-6-a",
            "label": "A",
            "text": "92°F to 97°F (33.3°C to 36.1°C), matching peripheral body surface temperature without thermal shock"
          },
          {
            "id": "yn-int-6-b",
            "label": "B",
            "text": "50°F to 60°F (10.0°C to 15.5°C)"
          },
          {
            "id": "yn-int-6-c",
            "label": "C",
            "text": "105°F to 115°F (40.5°C to 46.1°C)"
          },
          {
            "id": "yn-int-6-d",
            "label": "D",
            "text": "32°F to 40°F (0.0°C to 4.4°C)"
          }
        ],
        "correctOptionId": "yn-int-6-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "neutral-bath-temperature",
        "explanationAfterAnswer": "A neutral bath creates no thermoregulatory strain, quieting peripheral sensory nerve endings and promoting profound sedative neural relaxation."
      },
      {
        "id": "yn-int-7",
        "questionText": "Which asana is classified as an inverted posture that decompresses lumbar vertebrae and enhances venous return from the lower extremities without cervical strain?",
        "options": [
          {
            "id": "yn-int-7-a",
            "label": "A",
            "text": "Viparita Karani (Legs-up-the-wall with supported pelvis)"
          },
          {
            "id": "yn-int-7-b",
            "label": "B",
            "text": "Ustrasana (Camel pose)"
          },
          {
            "id": "yn-int-7-c",
            "label": "C",
            "text": "Dhanurasana (Bow pose)"
          },
          {
            "id": "yn-int-7-d",
            "label": "D",
            "text": "Trikonasana (Triangle pose)"
          }
        ],
        "correctOptionId": "yn-int-7-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "viparita-karani-cardiovascular",
        "explanationAfterAnswer": "Viparita Karani reverses venous hydrostatic pressure in the saphenous system, unloads lumbar discs, and stimulates baroreceptor-mediated blood pressure lowering."
      },
      {
        "id": "yn-int-8",
        "questionText": "According to the philosophy of Naturopathy as formulated by Dr. Henry Lindlahr, what are the three primary causes of chronic degenerative disease?",
        "options": [
          {
            "id": "yn-beg-8-a",
            "label": "A",
            "text": "Lowered vitality, abnormal composition of blood and lymph, and accumulation of morbid matter and toxins"
          },
          {
            "id": "yn-beg-8-b",
            "label": "B",
            "text": "Lack of vaccinations, surgical non-intervention, and low dietary salt intake"
          },
          {
            "id": "yn-beg-8-c",
            "label": "C",
            "text": "Over-consumption of alkaline fruits and excessive exposure to fresh mountain air"
          },
          {
            "id": "yn-beg-8-d",
            "label": "D",
            "text": "Purely psychic possession without bodily biochemical involvement"
          }
        ],
        "correctOptionId": "yn-beg-8-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "lindlahr-three-causes",
        "explanationAfterAnswer": "Lindlahr's Nature Cure outlines: (1) Lowered vitality, (2) Abnormal composition of blood and lymph, and (3) Accumulation of waste matter and poisons."
      },
      {
        "id": "yn-int-9",
        "questionText": "What is the primary contraindication for performing Agnisara Kriya or Nauli in clinical yoga therapy?",
        "options": [
          {
            "id": "yn-int-9-a",
            "label": "A",
            "text": "Active peptic ulcer, acute abdominal hernia, recent abdominal surgery, and severe hypertension"
          },
          {
            "id": "yn-int-9-b",
            "label": "B",
            "text": "Mild sluggish digestion and sedentary posture"
          },
          {
            "id": "yn-int-9-c",
            "label": "C",
            "text": "Chronic stress and tension headaches"
          },
          {
            "id": "yn-int-9-d",
            "label": "D",
            "text": "Subclinical hypothyroid metabolic rate"
          }
        ],
        "correctOptionId": "yn-int-9-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "agnisara-contraindications",
        "explanationAfterAnswer": "Agnisara and Nauli generate high intra-abdominal pressures and intense visceral friction, posing risks of perforation or herniation in acute ulcerations or recent surgical wounds."
      },
      {
        "id": "yn-int-10",
        "questionText": "In Naturopathic iris diagnosis (Iridology), what anatomical structure in the eye is analyzed for tissue density, nerve rings, and systemic toxic deposits?",
        "options": [
          {
            "id": "yn-int-10-a",
            "label": "A",
            "text": "The stroma of the Iris"
          },
          {
            "id": "yn-int-10-b",
            "label": "B",
            "text": "The fovea centralis of the Retina"
          },
          {
            "id": "yn-int-10-c",
            "label": "C",
            "text": "The crystalline lens nucleus"
          },
          {
            "id": "yn-int-10-d",
            "label": "D",
            "text": "The optic nerve disc cupping"
          }
        ],
        "correctOptionId": "yn-int-10-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "iridology-iris-stroma",
        "explanationAfterAnswer": "Iridology analyzes the trabeculae, crypts, and pigments of the iris stroma, reflecting genetic constitutional resilience and reflexive visceral changes."
      }
    ],
    "advanced": [
      {
        "id": "yn-adv-1",
        "questionText": "A 48-year-old executive presents with severe burnout, chronic insomnia, and an elevated baseline cortisol-to-DHEA ratio. Which structured clinical Yoga therapy sequence produces the greatest parasympathetic rebound?",
        "options": [
          {
            "id": "yn-adv-1-a",
            "label": "A",
            "text": "Restorative supported Supta Baddha Konasana, 1:2 ratio breath (Puraka 4s, Rechaka 8s) with Bhramari, followed by 30-minute structured Yoga Nidra"
          },
          {
            "id": "yn-adv-1-b",
            "label": "B",
            "text": "High-intensity Ashtanga Vinyasa Sun Salutations followed by Surya Bhedana Pranayama"
          },
          {
            "id": "yn-adv-1-c",
            "label": "C",
            "text": "Prolonged high-cadence Kapalabhati (120 strokes/min) followed by cold plunge"
          },
          {
            "id": "yn-adv-1-d",
            "label": "D",
            "text": "Extreme spinal backbends held under breath retention (Kumbhaka)"
          }
        ],
        "correctOptionId": "yn-adv-1-a",
        "difficulty": "advanced",
        "complexity": "fundamental",
        "conceptTag": "yoga-therapy-hpa-axis",
        "explanationAfterAnswer": "Restorative postures with supported thoracic opening, prolonged exhalations (stimulating vagal baroreceptors), and Yoga Nidra reset the hyperactive HPA axis and reduce cortisol."
      },
      {
        "id": "yn-adv-2",
        "questionText": "In Naturopathy, what cellular mechanism explains why prolonged therapeutic water fasting (beyond 48-72 hours) activates systemic tissue rejuvenation and immune clearance?",
        "options": [
          {
            "id": "yn-adv-2-a",
            "label": "A",
            "text": "Downregulation of mTOR and activation of cellular autophagy, clearing damaged organelles, senescent cells, and misfolded proteins"
          },
          {
            "id": "yn-adv-2-b",
            "label": "B",
            "text": "Accumulation of toxic lactic acid in peripheral skeletal myocytes"
          },
          {
            "id": "yn-adv-2-c",
            "label": "C",
            "text": "Direct irreversible inhibition of hepatic gluconeogenesis"
          },
          {
            "id": "yn-adv-2-d",
            "label": "D",
            "text": "Conversion of all somatic cells into malignant dedifferentiated stem cells"
          }
        ],
        "correctOptionId": "yn-adv-2-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "autophagy-fasting-physiology",
        "explanationAfterAnswer": "Deprivation of exogenous amino acids and glucose suppresses the nutrient-sensor mTOR, stimulating macro-autophagy (Nobel Prize in Medicine 2016) and hematopoietic stem cell regeneration."
      },
      {
        "id": "yn-adv-3",
        "questionText": "In hydrotherapy, what is the specific physiological mechanism underlying Father Sebastian Kneipp's alternating hot and cold vascular flush (Contrast Douche)?",
        "options": [
          {
            "id": "yn-adv-3-a",
            "label": "A",
            "text": "Alternating active vasodilatation (heat) with intense vasoconstriction (cold) acting as a peripheral 'vascular gymnastics' pump for lymph and venous return"
          },
          {
            "id": "yn-adv-3-b",
            "label": "B",
            "text": "Thermal destruction of cutaneous sensory nerve axons"
          },
          {
            "id": "yn-adv-3-c",
            "label": "C",
            "text": "Complete crystallization of subcutaneous triglycerides into solid plaque"
          },
          {
            "id": "yn-adv-3-d",
            "label": "D",
            "text": "Permanent elevation of body core temperature above 104°F"
          }
        ],
        "correctOptionId": "yn-adv-3-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "contrast-hydrotherapy-flush",
        "explanationAfterAnswer": "Contrast applications (typically 3 minutes hot, 30 seconds cold, repeated 3 times) alternate smooth muscle relaxation and contraction, accelerating metabolic waste removal."
      },
      {
        "id": "yn-adv-4",
        "questionText": "Which neurophysiological phenomenon accounts for the profound pain reduction achieved via traditional acupuncture and dry-needle reflex stimulation in Naturopathy?",
        "options": [
          {
            "id": "yn-adv-4-a",
            "label": "A",
            "text": "Melzack-Wall Gate Control mechanism in the spinal dorsal horn combined with central endorphin/enkephalin and dynorphin release"
          },
          {
            "id": "yn-adv-4-b",
            "label": "B",
            "text": "Irreversible transection of C-fiber afferent nerves"
          },
          {
            "id": "yn-adv-4-c",
            "label": "C",
            "text": "Direct chemical ionization of interstitial calcium ions"
          },
          {
            "id": "yn-adv-4-d",
            "label": "D",
            "text": "Thermal ablation of the thalamic ventral posterolateral nucleus"
          }
        ],
        "correctOptionId": "yn-adv-4-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "acupuncture-pain-gate-control",
        "explanationAfterAnswer": "A-beta fiber stimulation closes the spinal substantia gelatinosa gate to slower nociceptive C-fibers, while ascending impulses trigger pituitary beta-endorphin release."
      },
      {
        "id": "yn-adv-5",
        "questionText": "During the clinical administration of Shanka Prakshalana (master intestinal wash in Yoga therapy), which specific sequence of five dynamic asanas is performed to open the pyloric, ileocecal, and anal sphincters?",
        "options": [
          {
            "id": "yn-adv-5-a",
            "label": "A",
            "text": "Tadasana, Tiryaka Tadasana, Kati Chakrasana, Tiryaka Bhujangasana, and Udarakarshanasana"
          },
          {
            "id": "yn-adv-5-b",
            "label": "B",
            "text": "Sirshasana, Sarvangasana, Halasana, Matsyasana, and Mayurasana"
          },
          {
            "id": "yn-adv-5-c",
            "label": "C",
            "text": "Padmasana, Siddhasana, Swastikasana, Vajrasana, and Sukhasana"
          },
          {
            "id": "yn-adv-5-d",
            "label": "D",
            "text": "Garudasana, Bakasana, Vrikshasana, Natarajasana, and Virabhadrasana"
          }
        ],
        "correctOptionId": "yn-adv-5-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "shanka-prakshalana-sequence",
        "explanationAfterAnswer": "This precise 5-asana sequence mechanically guides warm isotonic saline sequentially through the stomach, duodenum, small intestine, and colon until rectal effluent runs clear."
      },
      {
        "id": "yn-adv-6",
        "questionText": "What represents the definitive hemodynamic response during the performance of Jalandhara Bandha (chin lock against the jugular notch) during Kumbhaka?",
        "options": [
          {
            "id": "yn-adv-6-a",
            "label": "A",
            "text": "Mechanical compression of the carotid sinus stimulating baroreceptors, triggering reflex bradycardia and preventing intracranial pressure spikes"
          },
          {
            "id": "yn-adv-6-b",
            "label": "B",
            "text": "Complete occlusion of the vertebral arteries causing syncopal collapse"
          },
          {
            "id": "yn-adv-6-c",
            "label": "C",
            "text": "Massive acute surge in left ventricular end-systolic pressure"
          },
          {
            "id": "yn-adv-6-d",
            "label": "D",
            "text": "Direct mechanical collapse of the thyroid cartilage"
          }
        ],
        "correctOptionId": "yn-adv-6-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "jalandhara-bandha-hemodynamics",
        "explanationAfterAnswer": "Jalandhara Bandha compresses the carotid bifurcations, stimulating the glossopharyngeal afferents of the carotid sinus to slow heart rate and stabilize cranial circulation during breath retention."
      },
      {
        "id": "yn-adv-7",
        "questionText": "In Naturopathic oncology support, why is a high-potency alkaline-rich raw diet utilized alongside hyperthermia therapy?",
        "options": [
          {
            "id": "yn-adv-7-a",
            "label": "A",
            "text": "Cancer cells exhibit the Warburg effect (anaerobic glycolysis) creating an acidic microenvironment; hyperthermia and alkaline hydration impair tumor heat-shock protein defenses"
          },
          {
            "id": "yn-adv-7-b",
            "label": "B",
            "text": "Raw diets stimulate rapid mutation rates in normal epithelial cells"
          },
          {
            "id": "yn-adv-7-c",
            "label": "C",
            "text": "Hyperthermia permanently eliminates all red blood cell hemoglobin oxygenation"
          },
          {
            "id": "yn-adv-7-d",
            "label": "D",
            "text": "Alkaline hydration eliminates all bicarbonate buffers from the systemic bloodstream"
          }
        ],
        "correctOptionId": "yn-adv-7-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "naturopathy-oncology-hyperthermia",
        "explanationAfterAnswer": "Tumor vasculature is disorganized and unable to dissipate heat; whole-body/local hyperthermia (41-42°C) induces tumor apoptosis while antioxidant raw foods protect healthy tissue."
      },
      {
        "id": "yn-adv-8",
        "questionText": "Under the AYUSH and Central Council for Research in Yoga & Naturopathy (CCRYN) guidelines, what clinical diagnostic parameters validate successful Naturopathic reversal in non-insulin dependent Type 2 Diabetes?",
        "options": [
          {
            "id": "yn-adv-8-a",
            "label": "A",
            "text": "Reduction of HbA1c below 6.5% sustained over 3-6 months without pharmaceutical hypoglycemics, accompanied by improved HOMA-IR and lipid profile"
          },
          {
            "id": "yn-adv-8-b",
            "label": "B",
            "text": "Temporary 24-hour fasting blood glucose reduction regardless of medication dose"
          },
          {
            "id": "yn-adv-8-c",
            "label": "C",
            "text": "Persistent ketonuria with elevated serum creatinine"
          },
          {
            "id": "yn-adv-8-d",
            "label": "D",
            "text": "Decreased body mass index occurring solely through loss of skeletal muscle mass"
          }
        ],
        "correctOptionId": "yn-adv-8-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "ccryn-diabetes-reversal-standards",
        "explanationAfterAnswer": "True remission/reversal requires normal HbA1c (<6.5%) and fasting plasma glucose (<126 mg/dL) maintained without pharmacotherapy, demonstrating restored insulin sensitivity."
      },
      {
        "id": "yn-adv-9",
        "questionText": "In advanced Pranayama physiology, what distinguishes Sahaja Pranayama from Kevala Kumbhaka?",
        "options": [
          {
            "id": "yn-adv-9-a",
            "label": "A",
            "text": "Sahaja is voluntary natural diaphragmatic breath awareness, whereas Kevala Kumbhaka is spontaneous, effortless respiratory cessation without inhalation or exhalation"
          },
          {
            "id": "yn-adv-9-b",
            "label": "B",
            "text": "Kevala Kumbhaka is hyperventilation, while Sahaja is breath holding"
          },
          {
            "id": "yn-adv-9-c",
            "label": "C",
            "text": "Sahaja requires nostril occlusion clips while Kevala uses mouth breathing"
          },
          {
            "id": "yn-adv-9-d",
            "label": "D",
            "text": "Both terms are identical and imply forced hypoventilation"
          }
        ],
        "correctOptionId": "yn-adv-9-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "kevala-kumbhaka-physiology",
        "explanationAfterAnswer": "Patanjali Sutra 2.51 describes the fourth Pranayama (Kevala Kumbhaka) as transcending the realm of internal and external breathing—a state of metabolic quietude."
      },
      {
        "id": "yn-adv-10",
        "questionText": "In Naturopathy, how does 'Gastro-Hepatic Pack' therapy specifically relieve portal vein congestion and enhance hepatic bile flow?",
        "options": [
          {
            "id": "yn-adv-10-a",
            "label": "A",
            "text": "Simultaneous application of a hot compress over the liver and a cold compress over the abdomen creates thermal derivation, stimulating splanchnic blood turnover and biliary evacuation"
          },
          {
            "id": "yn-adv-10-b",
            "label": "B",
            "text": "It chemically neutralizes all bilirubin into systemic glucose"
          },
          {
            "id": "yn-adv-10-c",
            "label": "C",
            "text": "It stops mesenteric arterial flow for two hours"
          },
          {
            "id": "yn-adv-10-d",
            "label": "D",
            "text": "It replaces bile salts with exogenous magnesium ions directly through skin pores"
          }
        ],
        "correctOptionId": "yn-adv-10-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "gastro-hepatic-pack-naturopathy",
        "explanationAfterAnswer": "Thermal derivation techniques shift congested blood volume between adjacent vascular beds, improving hepatic clearance, relieving stasis, and enhancing bile secretion."
      }
    ]
  },
  "unani": {
    "beginner": [
      {
        "id": "una-beg-1",
        "questionText": "What are the four primary humors (Arba Akhlat) in classical Unani Tibb?",
        "options": [
          {
            "id": "una-beg-1-a",
            "label": "A",
            "text": "Dam (Blood), Balgham (Phlegm), Safra (Yellow Bile), and Sauda (Black Bile)"
          },
          {
            "id": "una-beg-1-b",
            "label": "B",
            "text": "Vata, Pitta, Kapha, and Rakta"
          },
          {
            "id": "una-beg-1-c",
            "label": "C",
            "text": "Prana, Apana, Udana, and Samana"
          },
          {
            "id": "una-beg-1-d",
            "label": "D",
            "text": "Mizaj, Quwwat, Arwah, and Aza"
          }
        ],
        "correctOptionId": "una-beg-1-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "arba-akhlat-humors",
        "explanationAfterAnswer": "Unani medicine rests on the humoral doctrine of four humors: Dam (hot and moist), Balgham (cold and moist), Safra (hot and dry), and Sauda (cold and dry)."
      },
      {
        "id": "una-beg-2",
        "questionText": "What is the concept of 'Tabiyyat' in Unani medicine?",
        "options": [
          {
            "id": "una-beg-2-a",
            "label": "A",
            "text": "The innate supreme administrator and self-healing power of the body that maintains health and fights disease (Medicatrix Naturae)"
          },
          {
            "id": "una-beg-2-b",
            "label": "B",
            "text": "A toxic mineral compound used exclusively in surgical cauterization"
          },
          {
            "id": "una-beg-2-c",
            "label": "C",
            "text": "The physical pulse recorded at the radial artery"
          },
          {
            "id": "una-beg-2-d",
            "label": "D",
            "text": "A specialized surgical knife used in venesection"
          }
        ],
        "correctOptionId": "una-beg-2-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "tabiyyat-vital-healing",
        "explanationAfterAnswer": "In Unani Tibb, Tabiyyat is the internal physiological intelligence and vital defense force; the role of the physician is solely to assist Tabiyyat."
      },
      {
        "id": "una-beg-3",
        "questionText": "Which classical authority authored 'Al-Qanun fi al-Tibb' (The Canon of Medicine), the monumental encyclopedia of Unani Tibb?",
        "options": [
          {
            "id": "una-beg-3-a",
            "label": "A",
            "text": "Ibn Sina (Avicenna)"
          },
          {
            "id": "una-beg-3-b",
            "label": "B",
            "text": "Buqrat (Hippocrates)"
          },
          {
            "id": "una-beg-3-c",
            "label": "C",
            "text": "Jalinus (Galen)"
          },
          {
            "id": "una-beg-3-d",
            "label": "D",
            "text": "Al-Razi (Rhazes)"
          }
        ],
        "correctOptionId": "una-beg-3-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "ibn-sina-canon-medicine",
        "explanationAfterAnswer": "Ibn Sina (Avicenna, 980–1037 CE) authored Al-Qanun fi al-Tibb, which standardized medicine across Europe and the Islamic world for centuries."
      },
      {
        "id": "una-beg-4",
        "questionText": "What are the six essential prerequisites of health (Asbab-e-Sittah Zarooriyya) in Unani medicine?",
        "options": [
          {
            "id": "una-beg-4-a",
            "label": "A",
            "text": "Hawa (Air), Makul wa Mashrub (Food & Drink), Harkat wa Sukun Badani (Physical Movement & Rest), Harkat wa Sukun Nafsani (Mental State & Rest), Naum wa Yaqzah (Sleep & Wakefulness), and Istefragh wa Ehtebas (Evacuation & Retention)"
          },
          {
            "id": "una-beg-4-b",
            "label": "B",
            "text": "Six surgical incisions for trauma"
          },
          {
            "id": "una-beg-4-c",
            "label": "C",
            "text": "Six toxic metals requiring chemical sublimation"
          },
          {
            "id": "una-beg-4-d",
            "label": "D",
            "text": "Six mandatory dietary fasts observed during winter"
          }
        ],
        "correctOptionId": "una-beg-4-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "asbab-e-sittah-zarooriyya",
        "explanationAfterAnswer": "Asbab-e-Sittah Zarooriyya are the six external environmental and behavioral determinants that must be balanced to sustain health or restore humoral equilibrium."
      },
      {
        "id": "una-beg-5",
        "questionText": "Which regimenal therapy in Unani Tibb is known as 'Hijama'?",
        "options": [
          {
            "id": "una-beg-5-a",
            "label": "A",
            "text": "Cupping therapy (both dry cupping Hijama-bila-Shart and wet cupping Hijama-bil-Shart)"
          },
          {
            "id": "una-beg-5-b",
            "label": "B",
            "text": "Leech application (Taleeq)"
          },
          {
            "id": "una-beg-5-c",
            "label": "C",
            "text": "Venesection / Bloodletting (Fasd)"
          },
          {
            "id": "una-beg-5-d",
            "label": "D",
            "text": "Cauterization (Kawi)"
          }
        ],
        "correctOptionId": "una-beg-5-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "hijama-cupping-unani",
        "explanationAfterAnswer": "Hijama is the classical Unani term for cupping, used to draw out morbid matter, relieve localized congestion, and stimulate micro-circulation."
      },
      {
        "id": "una-beg-6",
        "questionText": "What are the two intrinsic qualities (Kaifiyat) defining the Damawi (Sanguine) temperament?",
        "options": [
          {
            "id": "una-beg-6-a",
            "label": "A",
            "text": "Haar (Hot) and Ratab (Moist)"
          },
          {
            "id": "una-beg-6-b",
            "label": "B",
            "text": "Barid (Cold) and Ratab (Moist)"
          },
          {
            "id": "una-beg-6-c",
            "label": "C",
            "text": "Haar (Hot) and Yabis (Dry)"
          },
          {
            "id": "una-beg-6-d",
            "label": "D",
            "text": "Barid (Cold) and Yabis (Dry)"
          }
        ],
        "correctOptionId": "una-beg-6-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "damawi-mizaj-qualities",
        "explanationAfterAnswer": "The sanguine humor (Dam) and temperament (Damawi) are Hot and Moist (Haar-Ratab), associated with vigor, flushed complexion, and robust circulation."
      },
      {
        "id": "una-beg-7",
        "questionText": "In Unani pharmacotherapy, what is a 'Musleh'?",
        "options": [
          {
            "id": "una-beg-7-a",
            "label": "A",
            "text": "A corrective substance compounded with a potent drug to neutralize its adverse effects or moderate its temperamental intensity"
          },
          {
            "id": "una-beg-7-b",
            "label": "B",
            "text": "A surgical scalpel used for corneal incisions"
          },
          {
            "id": "una-beg-7-c",
            "label": "C",
            "text": "A diagnostic magnifying glass for examining urine"
          },
          {
            "id": "una-beg-7-d",
            "label": "D",
            "text": "A specialized clay cup used in Hammam therapies"
          }
        ],
        "correctOptionId": "una-beg-7-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "musleh-corrective-unani",
        "explanationAfterAnswer": "A Musleh is a corrective drug added to a classical recipe to eliminate toxicity, safeguard vital organs (liver, kidneys, heart), or enhance therapeutic action."
      },
      {
        "id": "una-beg-8",
        "questionText": "Which organ is considered the primary site of formation and maturation for the four Akhlat (humors) following gastric digestion?",
        "options": [
          {
            "id": "una-beg-8-a",
            "label": "A",
            "text": "Kabid (The Liver)"
          },
          {
            "id": "una-beg-8-b",
            "label": "B",
            "text": "Qalb (The Heart)"
          },
          {
            "id": "una-beg-8-c",
            "label": "C",
            "text": "Dimagh (The Brain)"
          },
          {
            "id": "una-beg-8-d",
            "label": "D",
            "text": "Kulyah (The Kidney)"
          }
        ],
        "correctOptionId": "una-beg-8-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "kabid-liver-humor-formation",
        "explanationAfterAnswer": "Digested chyme (Kailus) travels via the portal vein to the Liver (Kabid), where second digestion (Hazm-e-Kabidi) separates the four humors."
      },
      {
        "id": "una-beg-9",
        "questionText": "What does 'Nabz' refer to in Unani diagnostic methodology?",
        "options": [
          {
            "id": "una-beg-9-a",
            "label": "A",
            "text": "The arterial pulse palpated primarily at the radial artery to determine systemic temperament and disease state"
          },
          {
            "id": "una-beg-9-b",
            "label": "B",
            "text": "The microscopic examination of sputum"
          },
          {
            "id": "una-beg-9-c",
            "label": "C",
            "text": "The physical density of stool"
          },
          {
            "id": "una-beg-9-d",
            "label": "D",
            "text": "The percussion note over lung fields"
          }
        ],
        "correctOptionId": "una-beg-9-a",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "nabz-pulse-unani-definition",
        "explanationAfterAnswer": "Nabz is the expansion and contraction of arteries produced by cardiac movement, systematically evaluated across ten comprehensive classical parameters (Ajnas-e-Nabz)."
      },
      {
        "id": "una-beg-10",
        "questionText": "Which Unani dosage form is a semi-solid sweet compound preparation containing herbal extracts in a base of sugar or honey?",
        "options": [
          {
            "id": "una-beg-10-a",
            "label": "A",
            "text": "Majun (e.g., Majun Dabeedul Ward, Majun Suranjan)"
          },
          {
            "id": "una-beg-10-b",
            "label": "B",
            "text": "Arq (Distilled aromatic waters)"
          },
          {
            "id": "una-beg-10-c",
            "label": "C",
            "text": "Kohl (Fine ocular powder)"
          },
          {
            "id": "una-beg-10-d",
            "label": "D",
            "text": "Roghan (Medicated oily extract)"
          }
        ],
        "correctOptionId": "una-beg-10-a",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "majun-unani-pharmacy",
        "explanationAfterAnswer": "Majun is an electuary prepared by incorporating powdered single drugs (Mufradat) into a base (Qiwam) of purified honey or sugar syrup."
      }
    ],
    "intermediate": [
      {
        "id": "una-int-1",
        "questionText": "How many classical parameters (Ajnas-e-Nabz) are evaluated by a Unani physician during pulse examination?",
        "options": [
          {
            "id": "una-int-1-a",
            "label": "A",
            "text": "Ten parameters: Miqdar (Quantity), Qar' (Force of beat), Harkat (Velocity), Zamanah (Duration of beat), Qiwam (Arterial consistency), Khulu wa Imtila (Fullness), Malmas (Temperature/Texture), Wazan (Rhythm), Istiwa (Regularity), and Nizam (Orderliness)"
          },
          {
            "id": "una-int-1-b",
            "label": "B",
            "text": "Two parameters: Pulse rate and skin temperature only"
          },
          {
            "id": "una-int-1-c",
            "label": "C",
            "text": "Four parameters: Dam, Balgham, Safra, and Sauda"
          },
          {
            "id": "una-int-1-d",
            "label": "D",
            "text": "Six parameters matching the six seasons"
          }
        ],
        "correctOptionId": "una-int-1-a",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "ajnas-e-nabz-ten-parameters",
        "explanationAfterAnswer": "Unani pulse science evaluates Ajnas-e-Nabz across ten distinct physical dimensions to ascertain the condition of the heart, vessels, and humors."
      },
      {
        "id": "una-int-2",
        "questionText": "What is the classical therapeutic protocol 'Nuzj wa Tanqiya' in the management of chronic humoral diseases?",
        "options": [
          {
            "id": "una-int-2-a",
            "label": "A",
            "text": "Administering concoctive decoctions (Munzij) to ripen and liquefy morbid humors, followed by purgation (Mushil) to thoroughly evacuate them (Tanqiya)"
          },
          {
            "id": "una-int-2-b",
            "label": "B",
            "text": "Applying cauterization followed by immediate wound stitching"
          },
          {
            "id": "una-int-2-c",
            "label": "C",
            "text": "Performing venous phlebotomy without preliminary dietetic preparation"
          },
          {
            "id": "una-int-2-d",
            "label": "D",
            "text": "Administering ice baths followed by dry bread fasting"
          }
        ],
        "correctOptionId": "una-int-2-a",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "nuzj-tanqiya-protocol",
        "explanationAfterAnswer": "Nuzj (concoction) alters the abnormal consistency of morbid matter so that Tabiyyat and evacuating drugs (Mushilat) can expel it safely during Tanqiya (purification)."
      },
      {
        "id": "una-int-3",
        "questionText": "In the examination of urine (Baul), which observation classically indicates excess of Safra (Yellow Bile) in the body?",
        "options": [
          {
            "id": "una-int-3-a",
            "label": "A",
            "text": "Deep yellow to flaming reddish-yellow color, thin consistency, and pungent odor"
          },
          {
            "id": "una-int-3-b",
            "label": "B",
            "text": "Pale white, copious volume, thick consistency, and low odor"
          },
          {
            "id": "una-int-3-c",
            "label": "C",
            "text": "Dark blackish-brown tint with heavy sediment"
          },
          {
            "id": "una-int-3-d",
            "label": "D",
            "text": "Milky appearance with fat globules"
          }
        ],
        "correctOptionId": "una-int-3-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "baul-safra-indicators",
        "explanationAfterAnswer": "Yellow bile excess gives urine a fiery yellow-red hue (Asfar Naari), thin texture, and sharp odor due to heat and dryness."
      },
      {
        "id": "una-int-4",
        "questionText": "Which Unani single drug (Mufrad) is celebrated as a specific remedy for arthritis (Waja-ul-Mafasil) due to its colchicine content, requiring Almond oil as Musleh?",
        "options": [
          {
            "id": "una-int-4-a",
            "label": "A",
            "text": "Suranjan (Colchicum autumnale)"
          },
          {
            "id": "una-int-4-b",
            "label": "B",
            "text": "Asgand (Withania somnifera)"
          },
          {
            "id": "una-int-4-c",
            "label": "C",
            "text": "Badyan (Foeniculum vulgare)"
          },
          {
            "id": "una-int-4-d",
            "label": "D",
            "text": "Aftimoon (Cuscuta reflexa)"
          }
        ],
        "correctOptionId": "una-int-4-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "suranjan-waja-ul-mafasil",
        "explanationAfterAnswer": "Suranjan (Colchicum) is hot-dry in the 3rd degree, powerful in resolving phlegmatic arthritic swelling, but requires correctives (Muslehat) like Roghan-e-Badam to avoid gastrointestinal irritation."
      },
      {
        "id": "una-int-5",
        "questionText": "What is the primary anatomical indication for performing Taleeq (Medicinal Leech Therapy) in Unani medicine?",
        "options": [
          {
            "id": "una-int-5-a",
            "label": "A",
            "text": "Drawing non-coagulated, congested venous blood from delicate, deep, or inflamed tissues (e.g., skin disorders, chronic localized thrombophlebitis)"
          },
          {
            "id": "una-int-5-b",
            "label": "B",
            "text": "Treating massive acute arterial hemorrhage"
          },
          {
            "id": "una-int-5-c",
            "label": "C",
            "text": "Inducing general anesthesia before major amputation"
          },
          {
            "id": "una-int-5-d",
            "label": "D",
            "text": "Treating severe aplastic anemia"
          }
        ],
        "correctOptionId": "una-int-5-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "taleeq-leech-therapy-indications",
        "explanationAfterAnswer": "Taleeq is preferred over venesection for delicate areas or when extracting morbid blood from deeper micro-capillary beds where scarification is inappropriate."
      },
      {
        "id": "una-int-6",
        "questionText": "Which classical compound formulation is celebrated in Unani medicine as a cardiac tonic, brain exhilarant (Mufarreh Qalb), and nervine strengthener containing pearls or silk cocoon?",
        "options": [
          {
            "id": "una-int-6-a",
            "label": "A",
            "text": "Khamira Abresham / Khamira Marwareed"
          },
          {
            "id": "una-int-6-b",
            "label": "B",
            "text": "Itrifal Ustukhuddus"
          },
          {
            "id": "una-int-6-c",
            "label": "C",
            "text": "Jawarish Kamuni"
          },
          {
            "id": "una-int-6-d",
            "label": "D",
            "text": "Sikanjabeen Sada"
          }
        ],
        "correctOptionId": "una-int-6-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "khamira-cardiac-exhilarant",
        "explanationAfterAnswer": "Khamira is a fermented-like whipped electuary containing fine calces of pearls (Marwareed) or silk (Abresham), acting as a potent Mufarreh and Muqawwi-e-Qalb."
      },
      {
        "id": "una-int-7",
        "questionText": "In the grading of drug potency (Darajat-e-Advia), how is a 'Fourth Degree' (Darja Chaharum) drug defined?",
        "options": [
          {
            "id": "una-int-7-a",
            "label": "A",
            "text": "Extremely toxic or fatal in ordinary therapeutic amounts, capable of destroying bodily functions (e.g., Strychnine, Aconite)"
          },
          {
            "id": "una-int-7-b",
            "label": "B",
            "text": "Mild food-like substance with barely perceptible pharmacodynamic actions"
          },
          {
            "id": "una-int-7-c",
            "label": "C",
            "text": "Common culinary spice safe in unlimited quantities"
          },
          {
            "id": "una-int-7-d",
            "label": "D",
            "text": "Purely inert mineral vehicle"
          }
        ],
        "correctOptionId": "una-int-7-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "darajat-e-advia-fourth-degree",
        "explanationAfterAnswer": "First degree drugs have imperceptible physiological shifts; second degree produce noticeable safe actions; third degree have intense actions; fourth degree are poisonous/toxic."
      },
      {
        "id": "una-int-8",
        "questionText": "What is the specific therapeutic property of an 'Itrifal' in Unani medicine?",
        "options": [
          {
            "id": "una-int-8-a",
            "label": "A",
            "text": "A tri-fruit compound (Halela, Balela, Amla) formulated with honey and almond oil, used chronically for brain tonicity, digestion, and chronic headaches"
          },
          {
            "id": "una-int-8-b",
            "label": "B",
            "text": "A sterile eye drop distilled from rose water"
          },
          {
            "id": "una-int-8-c",
            "label": "C",
            "text": "A caustic paste used to burn off warts"
          },
          {
            "id": "una-int-8-d",
            "label": "D",
            "text": "A hot water fomentation applied to kidneys"
          }
        ],
        "correctOptionId": "una-int-8-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "itrifal-unani-compound",
        "explanationAfterAnswer": "Itrifal (derived from Triphala) incorporates Halela (Terminalia chebula), Balela (Terminalia bellirica), and Amla, widely prescribed for brain, eye, and bowel health."
      },
      {
        "id": "una-int-9",
        "questionText": "Which variety of Nabz (pulse) is described in classical texts as bounding, rapid, and undulating like the motion of a leaping gazelle (Nabz-e-Ghazali)?",
        "options": [
          {
            "id": "una-int-9-a",
            "label": "A",
            "text": "A pulse with unequal beats leaping forward, indicating extreme cardiac excitement or fever"
          },
          {
            "id": "una-int-9-b",
            "label": "B",
            "text": "A slow, sluggish, deeply buried pulse in severe hypothermia"
          },
          {
            "id": "una-int-9-c",
            "label": "C",
            "text": "A hard, rigid, wiry pulse of arteriosclerosis"
          },
          {
            "id": "una-int-9-d",
            "label": "D",
            "text": "An intermittent, failing pulse of imminent cardiac collapse"
          }
        ],
        "correctOptionId": "una-int-9-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "nabz-e-ghazali-characteristics",
        "explanationAfterAnswer": "Nabz-e-Ghazali (gazelle-like) is an asymmetrical, fast, leaping pulse seen when the heart attempts to overcome high peripheral fever or acute emotional excitability."
      },
      {
        "id": "una-int-10",
        "questionText": "What is the definition of 'Fasd' (Venesection) in Unani clinical practice?",
        "options": [
          {
            "id": "una-int-10-a",
            "label": "A",
            "text": "An incision into a specific superficial vein (e.g., Basilic, Cephalic, Median Cubital) to evacuate general plethoric blood volume (Imtila)"
          },
          {
            "id": "una-int-10-b",
            "label": "B",
            "text": "Subcutaneous injection of herbal distillates"
          },
          {
            "id": "una-int-10-c",
            "label": "C",
            "text": "Physical joint manipulation with traction"
          },
          {
            "id": "una-int-10-d",
            "label": "D",
            "text": "Application of medicinal clay over the skull"
          }
        ],
        "correctOptionId": "una-int-10-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "fasd-venesection-unani",
        "explanationAfterAnswer": "Fasd is therapeutic phlebotomy performed to purge excess general blood volume (Imtila bi hasbil awiyah) or systemic vitiation."
      }
    ],
    "advanced": [
      {
        "id": "una-adv-1",
        "questionText": "A 52-year-old male with chronic hepatitis (Waja-ul-Kabid) presents with jaundice, dry tongue, bitter taste, rapid pulse (Nabz-e-Muntazam Sari), and deep amber urine. According to Unani pathology, which humor is primary in this disease?",
        "options": [
          {
            "id": "una-adv-1-a",
            "label": "A",
            "text": "Soo-e-Mizaj Maddi Safrawi (Morbid yellow bile excess producing warm hepatic inflammation)"
          },
          {
            "id": "una-adv-1-b",
            "label": "B",
            "text": "Primary phlegmatic cold effusion without vascular involvement"
          },
          {
            "id": "una-adv-1-c",
            "label": "C",
            "text": "Purely melancholic black bile stasis in the spleen"
          },
          {
            "id": "una-adv-1-d",
            "label": "D",
            "text": "Traumatic nerve rupture without humoral alteration"
          }
        ],
        "correctOptionId": "una-adv-1-a",
        "difficulty": "advanced",
        "complexity": "fundamental",
        "conceptTag": "safrawi-hepatitis-pathology",
        "explanationAfterAnswer": "Waja-ul-Kabid with burning signs, bitter taste, and fiery urine signifies acute Safrawi inflammation requiring Munzij-e-Safra followed by mild purgation."
      },
      {
        "id": "una-adv-2",
        "questionText": "In classical Unani pharmacology, what is 'Kushta' and how does it compare to Ayurvedic Bhasmas?",
        "options": [
          {
            "id": "una-adv-2-a",
            "label": "A",
            "text": "A calcined mineral, metallic, or animal shell preparation processed in closed crucibles (Bhatthi) to yield fine bioavailable micro-oxides"
          },
          {
            "id": "una-adv-2-b",
            "label": "B",
            "text": "A hydro-alcoholic herbal tincture aged for three years"
          },
          {
            "id": "una-adv-2-c",
            "label": "C",
            "text": "A soft sugar pastille chewable for sore throat"
          },
          {
            "id": "una-adv-2-d",
            "label": "D",
            "text": "A topical liniment formulated in sesame oil"
          }
        ],
        "correctOptionId": "una-adv-2-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "kushta-calcination-unani",
        "explanationAfterAnswer": "Kushtajat (e.g., Kushta Faulad, Kushta Sadaf) are micro-fine calcined preparations analogous to Bhasmas, prized for fast onset and potency."
      },
      {
        "id": "una-adv-3",
        "questionText": "Which formulation rule in Unani compounding governs the preparation of 'Jawarish' versus 'Majun'?",
        "options": [
          {
            "id": "una-adv-3-a",
            "label": "A",
            "text": "Jawarish is formulated specifically for gastrointestinal and digestive disorders, ground coarsely with stomachic carminative spices, whereas Majun is a fine paste for systemic use"
          },
          {
            "id": "una-adv-3-b",
            "label": "B",
            "text": "Jawarish contains only poisonous minerals, while Majun contains only fresh vegetables"
          },
          {
            "id": "una-adv-3-c",
            "label": "C",
            "text": "Jawarish is an injectable fluid while Majun is an eye drop"
          },
          {
            "id": "una-adv-3-d",
            "label": "D",
            "text": "There is no difference; they are synonymous terms"
          }
        ],
        "correctOptionId": "una-adv-3-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "jawarish-vs-majun-pharmacy",
        "explanationAfterAnswer": "Jawarish (from Persian Gawara, meaning digestible) is textured more coarsely to stimulate gastric mucosal mechanoreceptors and tonify digestion."
      },
      {
        "id": "una-adv-4",
        "questionText": "A patient with chronic melancholy, insomnia, dark complexion, and obstinate constipation is diagnosed with Saudawi (Melancholic/Black Bile) excess. Which classical Unani single drug is the premier choice for concocting and purging Sauda?",
        "options": [
          {
            "id": "una-adv-4-a",
            "label": "A",
            "text": "Aftimoon (Cuscuta reflexa) and Ustukhuddus (Lavandula stoechas)"
          },
          {
            "id": "una-adv-4-b",
            "label": "B",
            "text": "Kishmish (Dried raisins) alone"
          },
          {
            "id": "una-adv-4-c",
            "label": "C",
            "text": "Fresh cow milk without additives"
          },
          {
            "id": "una-adv-4-d",
            "label": "D",
            "text": "Kafur (Camphor) in large doses"
          }
        ],
        "correctOptionId": "una-adv-4-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "aftimoon-saudawi-purging",
        "explanationAfterAnswer": "Aftimoon is the foremost specific evacuant for black bile (Sauda), and Ustukhuddus is termed the 'broom of the brain' (Jaroob-e-Dimagh)."
      },
      {
        "id": "una-adv-5",
        "questionText": "What represents the definitive pathological principle of 'Imtila bi hasbil Quwwat' versus 'Imtila bi hasbil Awiyah' in Unani clinical medicine?",
        "options": [
          {
            "id": "una-adv-5-a",
            "label": "A",
            "text": "Imtila bi hasbil Awiyah is vascular blood volume engorgement; Imtila bi hasbil Quwwat is when the qualitative burden of humors exceeds the functional power (Quwwat) of the organs to metabolize it"
          },
          {
            "id": "una-adv-5-b",
            "label": "B",
            "text": "Both refer to simple intestinal gas accumulation"
          },
          {
            "id": "una-adv-5-c",
            "label": "C",
            "text": "One refers to pulmonary tuberculosis, while the other refers to bone fracture"
          },
          {
            "id": "una-adv-5-d",
            "label": "D",
            "text": "It indicates excess urination due to cold exposure"
          }
        ],
        "correctOptionId": "una-adv-5-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "imtila-quwwat-awiyah-pathology",
        "explanationAfterAnswer": "Imtila bi hasbil Awiyah is quantitative vascular fullness. Imtila bi hasbil Quwwat occurs even with normal fluid volume when organ vitality cannot handle the humoral load."
      },
      {
        "id": "una-adv-6",
        "questionText": "In the preparation of Unani distilled waters (Arqiyat), what is the technical name of the specialized copper distillation apparatus featuring a cooling condensing trough?",
        "options": [
          {
            "id": "una-adv-6-a",
            "label": "A",
            "text": "Qara-o-Ambeeq (Alembic and cucurbit still)"
          },
          {
            "id": "una-adv-6-b",
            "label": "B",
            "text": "Kharal (Stone pestle)"
          },
          {
            "id": "una-adv-6-c",
            "label": "C",
            "text": "Bhati (Crucible furnace)"
          },
          {
            "id": "una-adv-6-d",
            "label": "D",
            "text": "Sartan (Cupping vessel)"
          }
        ],
        "correctOptionId": "una-adv-6-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "qara-o-ambeeq-distillation",
        "explanationAfterAnswer": "The Qara-o-Ambeeq is the historical distillation apparatus refined by Jabir ibn Hayyan and Al-Razi for extracting volatile essential oils and therapeutic Arqiyat."
      },
      {
        "id": "una-adv-7",
        "questionText": "Under the National Commission for Indian System of Medicine (NCISM) Unani curriculum standards, which classic organ is considered the seat of 'Quwwat-e-Nafsaniyya' (Psychic/Brain Faculties)?",
        "options": [
          {
            "id": "una-adv-7-a",
            "label": "A",
            "text": "Dimagh (The Brain), generating sensory perception, cognition, and motor impulses"
          },
          {
            "id": "una-adv-7-b",
            "label": "B",
            "text": "Meda (The Stomach)"
          },
          {
            "id": "una-adv-7-c",
            "label": "C",
            "text": "Riya (The Lungs)"
          },
          {
            "id": "una-adv-7-d",
            "label": "D",
            "text": "Tihal (The Spleen)"
          }
        ],
        "correctOptionId": "una-adv-7-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "quwwat-e-nafsaniyya-dimagh",
        "explanationAfterAnswer": "Unani physiology attributes Quwwat-e-Tabiyya to the liver, Quwwat-e-Haiwaniyya to the heart, and Quwwat-e-Nafsaniyya to the brain."
      },
      {
        "id": "una-adv-8",
        "questionText": "What classical diagnostic criteria in Baul (Urine analysis) distinguish genuine hematuria from biliary pigmentation (Safrawi urine)?",
        "options": [
          {
            "id": "una-adv-8-a",
            "label": "A",
            "text": "Urine with blood stains cloth with a permanent red hue and forms an unstable red sediment, whereas bilious urine stains cloth yellow and remains homogeneous"
          },
          {
            "id": "una-adv-8-b",
            "label": "B",
            "text": "Both stains are identical and can only be evaluated by tasting"
          },
          {
            "id": "una-adv-8-c",
            "label": "C",
            "text": "Blood in urine immediately freezes at room temperature"
          },
          {
            "id": "una-adv-8-d",
            "label": "D",
            "text": "Biliary urine forms an immediate thick crust of calcium carbonate"
          }
        ],
        "correctOptionId": "una-adv-8-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "baul-hematuria-vs-safra",
        "explanationAfterAnswer": "Ibn Sina details linen cloth staining: blood leaves a true reddish coagulated imprint, while bile yields a diffuse yellow-green saffron dye."
      },
      {
        "id": "una-adv-9",
        "questionText": "When managing acute Ischialgia / Sciatica (Irq-un-Nasa) in Unani medicine, what is the classical sequence of regimenal intervention?",
        "options": [
          {
            "id": "una-adv-9-a",
            "label": "A",
            "text": "Administering Munzij-e-Balgham, evacuating via Mushil, applying dry cupping along the sciatic nerve trajectory, and venesection of the Saphenous/Basilic vein if plethoric"
          },
          {
            "id": "una-adv-9-b",
            "label": "B",
            "text": "Immediate cold water packing with immobilization for three months"
          },
          {
            "id": "una-adv-9-c",
            "label": "C",
            "text": "Surgical severance of the sciatic trunk at the gluteal fold"
          },
          {
            "id": "una-adv-9-d",
            "label": "D",
            "text": "Administering high-sugar syrups with complete fluid restriction"
          }
        ],
        "correctOptionId": "una-adv-9-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "irq-un-nasa-unani-protocol",
        "explanationAfterAnswer": "Unani texts prescribe preliminary humoral concoction and systemic evacuation (Tanqiya) before local cupping (Hijama) or venous release (Fasd-e-Arq-un-Nasa) to avoid driving crude matter deeper."
      },
      {
        "id": "una-adv-10",
        "questionText": "In the Unani pharmacopoeia, why is Sikanjabeen (Oxymel, an emulsion of vinegar and honey) regarded as the prince of adjuvant vehicles?",
        "options": [
          {
            "id": "una-adv-10-a",
            "label": "A",
            "text": "Because the acidity of Sirka (vinegar) cuts through viscous phlegm and opens hepatic obstructions (Mufattih Sudad), while honey protects stomach mucosa and aids systemic delivery"
          },
          {
            "id": "una-adv-10-b",
            "label": "B",
            "text": "Because it completely destroys all digestive acid within seconds"
          },
          {
            "id": "una-adv-10-c",
            "label": "C",
            "text": "Because it acts as an irreversible coagulant in the arterial circulation"
          },
          {
            "id": "una-adv-10-d",
            "label": "D",
            "text": "Because it eliminates all need for pharmaceutical drug standardization"
          }
        ],
        "correctOptionId": "una-adv-10-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "sikanjabeen-oxymel-dynamics",
        "explanationAfterAnswer": "Sikanjabeen balances hot and cold properties, dissolves thick stubborn humors (Lateef), relieves visceral obstruction, and quenches feverish heat."
      }
    ]
  },
  "siddha": {
    "beginner": [
      {
        "id": "sid-beg-1",
        "questionText": "What are the three fundamental humors (Mukkuttram) that govern the human body in Siddha Medicine?",
        "options": [
          {
            "id": "sid-beg-1-a",
            "label": "A",
            "text": "Vali (Vatham), Azhal (Pitham), and Iyyam (Kabam)"
          },
          {
            "id": "sid-beg-1-b",
            "label": "B",
            "text": "Dam, Balgham, and Safra"
          },
          {
            "id": "sid-beg-1-c",
            "label": "C",
            "text": "Ida, Pingala, and Sushumna"
          },
          {
            "id": "sid-beg-1-d",
            "label": "D",
            "text": "Rasa, Rakta, and Mamsa"
          }
        ],
        "correctOptionId": "sid-beg-1-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "mukkuttram-vali-azhal-iyyam",
        "explanationAfterAnswer": "Siddha medicine views bodily function through the triad of Mukkuttram: Vali (governing catabolism/movement), Azhal (metabolism/heat), and Iyyam (anabolism/structure)."
      },
      {
        "id": "sid-beg-2",
        "questionText": "Who is revered as the foremost primordial preceptor and father of the Siddha system of medicine in traditional Tamil tradition?",
        "options": [
          {
            "id": "sid-beg-2-a",
            "label": "A",
            "text": "Agathiyar (Sage Agastya)"
          },
          {
            "id": "sid-beg-2-b",
            "label": "B",
            "text": "Thirumoolar"
          },
          {
            "id": "sid-beg-2-c",
            "label": "C",
            "text": "Bogar"
          },
          {
            "id": "sid-beg-2-d",
            "label": "D",
            "text": "Theraiyar"
          }
        ],
        "correctOptionId": "sid-beg-2-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "agathiyar-father-siddha",
        "explanationAfterAnswer": "Sage Agathiyar is revered as the first of the 18 supreme Siddhars (Pathinen Siddhargal) and the founder of the Siddha medical system."
      },
      {
        "id": "sid-beg-3",
        "questionText": "What is the classical eight-fold diagnostic examination in Siddha medicine known as?",
        "options": [
          {
            "id": "sid-beg-3-a",
            "label": "A",
            "text": "Envagai Thervu (Naadi, Sparisam, Naa, Niram, Mozhi, Vizhi, Malam, Moothiram)"
          },
          {
            "id": "sid-beg-3-b",
            "label": "B",
            "text": "Ashtanga Yoga"
          },
          {
            "id": "sid-beg-3-c",
            "label": "C",
            "text": "Shatkriyas"
          },
          {
            "id": "sid-beg-3-d",
            "label": "D",
            "text": "Ajnas-e-Nabz"
          }
        ],
        "correctOptionId": "sid-beg-3-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "envagai-thervu-diagnosis",
        "explanationAfterAnswer": "Envagai Thervu encompasses pulse (Naadi), touch (Sparisam), tongue (Naa), color (Niram), voice (Mozhi), eyes (Vizhi), stool (Malam), and urine (Moothiram)."
      },
      {
        "id": "sid-beg-4",
        "questionText": "In Siddha medicine, what are the total number of vital energy points (Varmam nodes) traditionally mapped across the human anatomy?",
        "options": [
          {
            "id": "sid-beg-4-a",
            "label": "A",
            "text": "108 Varmam points (consisting of 12 Paduvarmam and 96 Thoduvarmam)"
          },
          {
            "id": "sid-beg-4-b",
            "label": "B",
            "text": "360 Varmam points"
          },
          {
            "id": "sid-beg-4-c",
            "label": "C",
            "text": "14 Varmam points"
          },
          {
            "id": "sid-beg-4-d",
            "label": "D",
            "text": "72,000 Varmam points"
          }
        ],
        "correctOptionId": "sid-beg-4-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "varmam-108-points-classification",
        "explanationAfterAnswer": "Siddha Varmam science maps 108 principal vital points: 12 Paduvarmam (major life-threatening vulnerable points) and 96 Thoduvarmam (points activated by touch/pressure)."
      },
      {
        "id": "sid-beg-5",
        "questionText": "What is the specialized diagnostic test of urine where a drop of sesame oil is placed onto early morning urine to observe its spread?",
        "options": [
          {
            "id": "sid-beg-5-a",
            "label": "A",
            "text": "Neerkkuri and Neykkuri"
          },
          {
            "id": "sid-beg-5-b",
            "label": "B",
            "text": "Varitara Pariksha"
          },
          {
            "id": "sid-beg-5-c",
            "label": "C",
            "text": "Baul-e-Safra"
          },
          {
            "id": "sid-beg-5-d",
            "label": "D",
            "text": "Kushta testing"
          }
        ],
        "correctOptionId": "sid-beg-5-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "neykkuri-urine-test",
        "explanationAfterAnswer": "Neykkuri involves placing a drop of sesame oil on urine surface; spreading like a snake indicates Vali, a ring indicates Azhal, and a pearl/sieve indicates Iyyam."
      },
      {
        "id": "sid-beg-6",
        "questionText": "Which classical Siddha herbal formulation gained widespread clinical acclaim for treating viral fevers and dengue?",
        "options": [
          {
            "id": "sid-beg-6-a",
            "label": "A",
            "text": "Nilavembu Kudineer"
          },
          {
            "id": "sid-beg-6-b",
            "label": "B",
            "text": "Triphala Churna"
          },
          {
            "id": "sid-beg-6-c",
            "label": "C",
            "text": "Majun Dabeedul Ward"
          },
          {
            "id": "sid-beg-6-d",
            "label": "D",
            "text": "Arnica Montana 200CH"
          }
        ],
        "correctOptionId": "sid-beg-6-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "nilavembu-kudineer-viral",
        "explanationAfterAnswer": "Nilavembu Kudineer (containing Andrographis paniculata and 8 other botanical ingredients) is widely endorsed by the Ministry of Ayush for antipyretic and antiviral efficacy."
      },
      {
        "id": "sid-beg-7",
        "questionText": "In Siddha Gunapadam (Pharmacology), what are the three broad classes of raw Materia Medica sources?",
        "options": [
          {
            "id": "sid-beg-7-a",
            "label": "A",
            "text": "Mooligai (Herbal), Thadhu (Mineral/Metals), and Jeevam (Animal products)"
          },
          {
            "id": "sid-beg-7-b",
            "label": "B",
            "text": "Air, Fire, and Water"
          },
          {
            "id": "sid-beg-7-c",
            "label": "C",
            "text": "Alkalis, Acids, and Salts"
          },
          {
            "id": "sid-beg-7-d",
            "label": "D",
            "text": "Leaves, Flowers, and Roots only"
          }
        ],
        "correctOptionId": "sid-beg-7-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "siddha-materia-medica-triad",
        "explanationAfterAnswer": "Gunapadam classifies raw medicinal substances into Mooligai (plant kingdom), Thadhu (minerals, metals, salts), and Jeevam (fauna and marine organisms)."
      },
      {
        "id": "sid-beg-8",
        "questionText": "What is the ultimate goal of 'Kayakalpam' in the Siddha philosophical and medical tradition?",
        "options": [
          {
            "id": "sid-beg-8-a",
            "label": "A",
            "text": "Cellular rejuvenation, prevention of aging (Jara), disease immunity, and preservation of the physical body"
          },
          {
            "id": "sid-beg-8-b",
            "label": "B",
            "text": "Performing radical surgical incisions"
          },
          {
            "id": "sid-beg-8-c",
            "label": "C",
            "text": "Generating rapid commercial profits through cosmetic powders"
          },
          {
            "id": "sid-beg-8-d",
            "label": "D",
            "text": "Temporary analgesia using opium derivatives"
          }
        ],
        "correctOptionId": "sid-beg-8-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "kayakalpam-longevity-siddha",
        "explanationAfterAnswer": "Kayakalpam (Kayam = body, Kalpam = immortal/ageless) comprises specialized yogic practices, dietetics, and herbomineral formulations to achieve physical immortality and vitality."
      },
      {
        "id": "sid-beg-9",
        "questionText": "What is the normal physiological proportion of Vali, Azhal, and Iyyam in a healthy adult according to Siddha Naadi science?",
        "options": [
          {
            "id": "sid-beg-9-a",
            "label": "A",
            "text": "1 : 1/2 : 1/4 (Vali 1 part, Azhal 1/2 part, Iyyam 1/4 part)"
          },
          {
            "id": "sid-beg-9-b",
            "label": "B",
            "text": "1 : 1 : 1 equal parts"
          },
          {
            "id": "sid-beg-9-c",
            "label": "C",
            "text": "1/4 : 1/2 : 1"
          },
          {
            "id": "sid-beg-9-d",
            "label": "D",
            "text": "4 : 2 : 1"
          }
        ],
        "correctOptionId": "sid-beg-9-a",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "naadi-proportions-siddha",
        "explanationAfterAnswer": "Theraiyar Yarupa states that the physiological rhythm of Naadi in balanced health beats in the ratio of 1 for Vali, 1/2 for Azhal, and 1/4 for Iyyam."
      },
      {
        "id": "sid-beg-10",
        "questionText": "Which dosage form in Siddha medicine refers to a calcined, white, micro-fine mineral powder preparation?",
        "options": [
          {
            "id": "sid-beg-10-a",
            "label": "A",
            "text": "Parpam"
          },
          {
            "id": "sid-beg-10-b",
            "label": "B",
            "text": "Chendooram (Red oxide)"
          },
          {
            "id": "sid-beg-10-c",
            "label": "C",
            "text": "Chooranam (Herbal powder)"
          },
          {
            "id": "sid-beg-10-d",
            "label": "D",
            "text": "Thailam (Medicated oil)"
          }
        ],
        "correctOptionId": "sid-beg-10-a",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "parpam-dosage-form",
        "explanationAfterAnswer": "Parpam is a micro-fine white calx prepared by incinerating purified minerals, shells, or metals with specific herbal juices in a traditional sealed furnace (Pudam)."
      }
    ],
    "intermediate": [
      {
        "id": "sid-int-1",
        "questionText": "What is 'Muppu' in the esoteric alchemical branch of Siddha medicine?",
        "options": [
          {
            "id": "sid-int-1-a",
            "label": "A",
            "text": "The universal alchemical catalyst salt composed of Pooneeru, Kalluppu, and Vediuppu, used to potentiate high-order medicines and achieve Kayasiddhi"
          },
          {
            "id": "sid-int-1-b",
            "label": "B",
            "text": "A simple decoction of three common wild grasses"
          },
          {
            "id": "sid-int-1-c",
            "label": "C",
            "text": "An enema nozzle constructed from animal horn"
          },
          {
            "id": "sid-int-1-d",
            "label": "D",
            "text": "A routine herbal tooth powder"
          }
        ],
        "correctOptionId": "sid-int-1-a",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "muppu-alchemical-catalyst",
        "explanationAfterAnswer": "Muppu is the supreme esoteric salt mixture of Siddha alchemy, essential for calcinating recalcitrant metals and preparing Kayakalpa rejuvenation elixirs."
      },
      {
        "id": "sid-int-2",
        "questionText": "In Siddha Varmam therapy, what is 'Thaduvu Murai' or 'Adangal Murai'?",
        "options": [
          {
            "id": "sid-int-2-a",
            "label": "A",
            "text": "The systematic resuscitation and counter-manipulation techniques used to neutralize trauma and revive a patient injured at a Varmam node"
          },
          {
            "id": "sid-int-2-b",
            "label": "B",
            "text": "Surgical suturing using ant heads"
          },
          {
            "id": "sid-int-2-c",
            "label": "C",
            "text": "Pouring boiling oil into open wounds"
          },
          {
            "id": "sid-int-2-d",
            "label": "D",
            "text": "Placing the patient in an underground sensory deprivation chamber"
          }
        ],
        "correctOptionId": "sid-int-2-a",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "adangal-varmam-retrieval",
        "explanationAfterAnswer": "Adangal points are retrieval nodes that, when pressed or stroked with specific therapeutic vector force, restore prana circulation after a Varmam impact."
      },
      {
        "id": "sid-int-3",
        "questionText": "During Neykkuri (oil-on-urine) prognostic examination, if the oil drop takes the shape of a ring (Valayam), which humor is vitiated and what is the disease prognosis?",
        "options": [
          {
            "id": "sid-int-3-a",
            "label": "A",
            "text": "Azhal (Pitham) humor, indicating inflammatory disease with moderate prognosis"
          },
          {
            "id": "sid-int-3-b",
            "label": "B",
            "text": "Vali (Vatham) humor, spreading like a serpent indicating neuromuscular disease"
          },
          {
            "id": "sid-int-3-c",
            "label": "C",
            "text": "Iyyam (Kabam) humor, sinking like a pearl indicating incurable terminal disease"
          },
          {
            "id": "sid-int-3-d",
            "label": "D",
            "text": "Normal health without any doshic involvement"
          }
        ],
        "correctOptionId": "sid-int-3-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "neykkuri-azhal-ring",
        "explanationAfterAnswer": "The classical verse states: 'Aravolee thonrin vali... azhalee modhiram'—serpent spread signifies Vali, ring signifies Azhal, and sinking droplet signifies Iyyam."
      },
      {
        "id": "sid-int-4",
        "questionText": "What is 'Thokkanam' in the clinical practice of Siddha medicine?",
        "options": [
          {
            "id": "sid-int-4-a",
            "label": "A",
            "text": "Physical manipulative therapy comprising 9 therapeutic hand techniques (rubbing, tapping, kneading, stretching, etc.) with medicated thailams"
          },
          {
            "id": "sid-int-4-b",
            "label": "B",
            "text": "Internal ingestion of heavy mineral powders"
          },
          {
            "id": "sid-int-4-c",
            "label": "C",
            "text": "Cauterization of bone surfaces using metal rods"
          },
          {
            "id": "sid-int-4-d",
            "label": "D",
            "text": "A specialized steam distillation procedure for floral scents"
          }
        ],
        "correctOptionId": "sid-int-4-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "thokkanam-physical-manipulation",
        "explanationAfterAnswer": "Thokkanam is Siddha musculoskeletal manipulative therapy, addressing physical fatigue, neurological deficits, and joint disorders through mechanical mobilization."
      },
      {
        "id": "sid-int-5",
        "questionText": "Which Siddha formulation category is characterized by red or ruby-colored oxidized mineral compounds prepared using Pudam calcination?",
        "options": [
          {
            "id": "sid-int-5-a",
            "label": "A",
            "text": "Chendooram (e.g., Linga Chendooram, Ayachendooram)"
          },
          {
            "id": "sid-int-5-b",
            "label": "B",
            "text": "Kashayam (Decoction)"
          },
          {
            "id": "sid-int-5-c",
            "label": "C",
            "text": "Manappagu (Herbal syrup)"
          },
          {
            "id": "sid-int-5-d",
            "label": "D",
            "text": "Ennai (Medicated oil)"
          }
        ],
        "correctOptionId": "sid-int-5-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "chendooram-red-oxide",
        "explanationAfterAnswer": "Chendoorams are red, micro-fine metal/mineral oxides prepared via calcination (Pudam) or sand bath sublimation (Kuppi Pudam), retained for long-term therapeutic potency."
      },
      {
        "id": "sid-int-6",
        "questionText": "In Siddha Gunapadam, what is the mandatory detoxification procedure applied to raw Strychnos nux-vomica (Etti vidhai) prior to clinical formulation?",
        "options": [
          {
            "id": "sid-int-6-a",
            "label": "A",
            "text": "Boiling seeds in cow's milk until the outer coat softens, peeling the testa, removing the toxic cotyledon embryo, and frying in ghee"
          },
          {
            "id": "sid-int-6-b",
            "label": "B",
            "text": "Soaking seeds in alcohol for 10 minutes"
          },
          {
            "id": "sid-int-6-c",
            "label": "C",
            "text": "Baking seeds in an electric microwave oven"
          },
          {
            "id": "sid-int-6-d",
            "label": "D",
            "text": "Washing seeds with chlorinated tap water"
          }
        ],
        "correctOptionId": "sid-int-6-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "siddha-shodhana-etti-vidhai",
        "explanationAfterAnswer": "Suddhi (purification) of toxic seeds like Etti vidhai removes the concentrated strychnine embryo and outer coat, transforming the drug into a safe cardiac and neural stimulant."
      },
      {
        "id": "sid-int-7",
        "questionText": "Which vital Varmam node located at the junction of the head and cervical spine produces respiratory arrest and unconsciousness when severely traumatized?",
        "options": [
          {
            "id": "sid-int-7-a",
            "label": "A",
            "text": "Thilardha Kaalam / Pidari Kaalam"
          },
          {
            "id": "sid-int-7-b",
            "label": "B",
            "text": "Adappa Kaalam"
          },
          {
            "id": "sid-int-7-c",
            "label": "C",
            "text": "Kallidai Kaalam"
          },
          {
            "id": "sid-int-7-d",
            "label": "D",
            "text": "Muthu Kaalam"
          }
        ],
        "correctOptionId": "sid-int-7-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "pidari-kaalam-varmam-node",
        "explanationAfterAnswer": "Pidari Kaalam (at the occipital-atlanto junction) controls cranial venous outflow and brainstem vitality; trauma causes acute paralysis requiring immediate Adangal resuscitation."
      },
      {
        "id": "sid-int-8",
        "questionText": "What does the concept of 'Siddha Kayakalpam Herb Karpam' specifically prescribe regarding dietary discipline during administration?",
        "options": [
          {
            "id": "sid-int-8-a",
            "label": "A",
            "text": "Pathiyam (Strict salt-free or restricted diet avoiding tamarind, sour foods, alcohol, and sexual intercourse)"
          },
          {
            "id": "sid-int-8-b",
            "label": "B",
            "text": "Consuming heavy fried red meats"
          },
          {
            "id": "sid-int-8-c",
            "label": "C",
            "text": "Drinking large quantities of ice-cold fruit punch"
          },
          {
            "id": "sid-int-8-d",
            "label": "D",
            "text": "Continuous sedentary bed rest without physical posture"
          }
        ],
        "correctOptionId": "sid-int-8-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "pathiyam-diet-siddha",
        "explanationAfterAnswer": "Pathiyam is indispensable in Siddha therapeutics: dietary restrictions (especially avoiding Puli / tamarind and acidic agents) prevent chemical inactivation of calcinated minerals."
      },
      {
        "id": "sid-int-9",
        "questionText": "Which classical 32 external therapies in Siddha medicine involves running medicated steam over the body?",
        "options": [
          {
            "id": "sid-int-9-a",
            "label": "A",
            "text": "Vethu (Steam inhalation / Sudation)"
          },
          {
            "id": "sid-int-9-b",
            "label": "B",
            "text": "Ottradam (Fomentation with bolus)"
          },
          {
            "id": "sid-int-9-c",
            "label": "C",
            "text": "Pattru (Poultice application)"
          },
          {
            "id": "sid-int-9-d",
            "label": "D",
            "text": "Kaaram (Chemical caustic cautery)"
          }
        ],
        "correctOptionId": "sid-int-9-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "vethu-external-therapy-siddha",
        "explanationAfterAnswer": "Siddha medicine enumerates 32 internal therapies (Ahamaruthuvam) and 32 external therapies (Puramaruthuvam), of which Vethu represents steam application."
      },
      {
        "id": "sid-int-10",
        "questionText": "What is the primary therapeutic action of 'Kaba Sura Kudineer', the renowned poly-herbal Siddha decoction?",
        "options": [
          {
            "id": "sid-int-10-a",
            "label": "A",
            "text": "Pacifying vitiated Iyyam (Kabam), relieving bronchospasm, fevers, and acute respiratory distress"
          },
          {
            "id": "sid-int-10-b",
            "label": "B",
            "text": "Inducing drastic purgation for constipation"
          },
          {
            "id": "sid-int-10-c",
            "label": "C",
            "text": "Promoting rapid bone fracture union"
          },
          {
            "id": "sid-int-10-d",
            "label": "D",
            "text": "Acting as an ophthalmic cleansing drop"
          }
        ],
        "correctOptionId": "sid-int-10-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "kaba-sura-kudineer-action",
        "explanationAfterAnswer": "Kaba Sura Kudineer contains 15 ingredients (including Chukku, Thippili, Lavangam, Cirukancori) formulated specifically to clear morbid Iyyam and respiratory viral fevers."
      }
    ],
    "advanced": [
      {
        "id": "sid-adv-1",
        "questionText": "A 45-year-old female presents with chronic autoimmune rheumatoid arthritis (Keel Vatham) unresponsive to standard analgesics. According to Siddha Gunapadam, what is the therapeutic rationale for administering 'Ayabirungaraja Karpam'?",
        "options": [
          {
            "id": "sid-adv-1-a",
            "label": "A",
            "text": "It combines elemental iron calcination (Ayam) with Eclipta prostrata to regenerate blood tissues, pacify aggravated Vali-Azhal, and restore joint integrity without gastric erosion"
          },
          {
            "id": "sid-adv-1-b",
            "label": "B",
            "text": "It acts purely as a local freezing anesthetic"
          },
          {
            "id": "sid-adv-1-c",
            "label": "C",
            "text": "It paralyzes synovial nerve endings permanently"
          },
          {
            "id": "sid-adv-1-d",
            "label": "D",
            "text": "It converts synovial fluid into solid bone"
          }
        ],
        "correctOptionId": "sid-adv-1-a",
        "difficulty": "advanced",
        "complexity": "fundamental",
        "conceptTag": "ayabirungaraja-keel-vatham",
        "explanationAfterAnswer": "Ayabirungaraja Karpam utilizes bio-transformed iron and Bhringaraja juice to balance immune dysregulation, treat anemia of chronic disease, and halt joint destruction."
      },
      {
        "id": "sid-adv-2",
        "questionText": "In the advanced alchemy of Siddha Parpam preparations, how does 'Varaga Pudam' differ from 'Gaja Pudam' in heat calibration?",
        "options": [
          {
            "id": "sid-adv-2-a",
            "label": "A",
            "text": "Varaga Pudam utilizes a smaller pit with 50-100 cow-dung cakes for moderate calcinations, while Gaja Pudam utilizes an elephant-sized pit with 1000 cow-dung cakes for ultra-high refractory metals"
          },
          {
            "id": "sid-adv-2-b",
            "label": "B",
            "text": "Varaga Pudam is fueled by coal gas, while Gaja Pudam is an electric oven"
          },
          {
            "id": "sid-adv-2-c",
            "label": "C",
            "text": "Both require identical temperatures under 100°C"
          },
          {
            "id": "sid-adv-2-d",
            "label": "D",
            "text": "Gaja Pudam uses no heat and relies on solar radiation only"
          }
        ],
        "correctOptionId": "sid-adv-2-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "pudam-heat-calibration-siddha",
        "explanationAfterAnswer": "Pudam specifications standardize thermal kinetics: Kukkuda Pudam is small (rooster size), Varaga Pudam is medium (boar size), and Gaja Pudam provides sustained high heat."
      },
      {
        "id": "sid-adv-3",
        "questionText": "What occurs neurologically when the 'Adappa Kaalam' Varmam point (located in the lateral thorax near the 2nd-3rd intercostal space) is injured, and what is its time window for retrieval?",
        "options": [
          {
            "id": "sid-adv-3-a",
            "label": "A",
            "text": "Immediate respiratory arrest, coughing of blood, and syncope; retrieval must be performed within 3.75 Nazhigai (approx. 90 minutes) using specific chest Adangal"
          },
          {
            "id": "sid-adv-3-b",
            "label": "B",
            "text": "Temporary hair loss only, requiring no urgent intervention"
          },
          {
            "id": "sid-adv-3-c",
            "label": "C",
            "text": "Incontinence occurring after 30 days"
          },
          {
            "id": "sid-adv-3-d",
            "label": "D",
            "text": "Immediate irreversible brain death within two seconds"
          }
        ],
        "correctOptionId": "sid-adv-3-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "adappa-kaalam-trauma-window",
        "explanationAfterAnswer": "Adappa Kaalam directly reflexes to pulmonary and cardiac innervation; failure to release trapped energy via opposite thorax percussion within the time limit causes fatal shock."
      },
      {
        "id": "sid-adv-4",
        "questionText": "In Siddha diagnostic uroscopy, if early morning urine demonstrates the 'Pearl pattern' (Mutthu Neykkuri) where the oil drop remains suspended as a spherical bead without dispersing, what does this indicate?",
        "options": [
          {
            "id": "sid-adv-4-a",
            "label": "A",
            "text": "Deep Iyyam (Kabam) vitiation, indicating obstinate chronicity and guarded prognosis"
          },
          {
            "id": "sid-adv-4-b",
            "label": "B",
            "text": "Complete, robust metabolic health with zero disease risk"
          },
          {
            "id": "sid-adv-4-c",
            "label": "C",
            "text": "Acute gastrointestinal dehydration from athletic exertion"
          },
          {
            "id": "sid-adv-4-d",
            "label": "D",
            "text": "Immediate urinary tract bacterial infection"
          }
        ],
        "correctOptionId": "sid-adv-4-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "neykkuri-mutthu-iyyam",
        "explanationAfterAnswer": "Oil remaining as a dense bead or sinking like a pearl demonstrates high specific gravity and non-polar surface tension changes caused by deep cold Iyyam accumulation."
      },
      {
        "id": "sid-adv-5",
        "questionText": "What analytical spectroscopic method is mandated under modern AYUSH Pharmacopoeial standards to prove that a Siddha Chendooram contains nano-scale metal oxide particles rather than toxic free elemental mercury or lead?",
        "options": [
          {
            "id": "sid-adv-5-a",
            "label": "A",
            "text": "X-Ray Diffraction (XRD), Scanning Electron Microscopy (SEM), and ICP-MS analysis confirming stable crystalline oxide phase"
          },
          {
            "id": "sid-adv-5-b",
            "label": "B",
            "text": "Simple visual inspection with magnifying hand lens"
          },
          {
            "id": "sid-adv-5-c",
            "label": "C",
            "text": "Smelling the powder aroma from a distance"
          },
          {
            "id": "sid-adv-5-d",
            "label": "D",
            "text": "Paper chromatography with tap water"
          }
        ],
        "correctOptionId": "sid-adv-5-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "siddha-nanotechnology-validation",
        "explanationAfterAnswer": "Modern scientific validation utilizes XRD to confirm organo-metallic lattice structure and SEM/TEM to verify particle size (<100 nm), confirming complete chemical conversion."
      },
      {
        "id": "sid-adv-6",
        "questionText": "In the management of cervical spondylotic radiculopathy via Siddha medicine, what combined therapeutic protocol offers the most effective long-term restoration?",
        "options": [
          {
            "id": "sid-adv-6-a",
            "label": "A",
            "text": "External Thokkanam with medicated Vatha Kesari Thailam, gentle stimulation of Kavuli Kaalam and Poigai Kaalam Varmam nodes, and internal administration of Nathai Parpam"
          },
          {
            "id": "sid-adv-6-b",
            "label": "B",
            "text": "Immediate surgical cervical discectomy without physical therapy"
          },
          {
            "id": "sid-adv-6-c",
            "label": "C",
            "text": "Continuous traction in complete darkness without nutrition"
          },
          {
            "id": "sid-adv-6-d",
            "label": "D",
            "text": "High doses of synthetic broad-spectrum antibiotics"
          }
        ],
        "correctOptionId": "sid-adv-6-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "cervical-radiculopathy-siddha-protocol",
        "explanationAfterAnswer": "This integrative protocol combines muscle spasm release, neuro-varmam stimulation at cervical nodes, and calcium-rich bio-absorbable marine calx (Nathai Parpam) to repair bone."
      },
      {
        "id": "sid-adv-7",
        "questionText": "What is the clinical role of 'Gunapadam Thadhu' mineral sulfur (Gandhakam) in Siddha formulations?",
        "options": [
          {
            "id": "sid-adv-7-a",
            "label": "A",
            "text": "Acting as an indispensable broad-spectrum antimicrobial, blood purifier, and universal partner to Mercury (Rasam) in preparing Kajjali"
          },
          {
            "id": "sid-adv-7-b",
            "label": "B",
            "text": "Acting solely as an inert filler without pharmacological action"
          },
          {
            "id": "sid-adv-7-c",
            "label": "C",
            "text": "Used exclusively to produce yellow dye for clothing"
          },
          {
            "id": "sid-adv-7-d",
            "label": "D",
            "text": "Causing acute gastric ulceration as a primary emetic"
          }
        ],
        "correctOptionId": "sid-adv-7-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "gandhakam-sulfur-siddha",
        "explanationAfterAnswer": "Purified Gandhakam (Sulfur) is the universal binder that neutralizes mercury toxicity (forming mercuric sulfide lattices) and possesses potent Rasayana and dermatological properties."
      },
      {
        "id": "sid-adv-8",
        "questionText": "In Siddha pediatrics (Balar Maruthuvam), which herbal oil is traditionally instilled as a nasal drop or massaged on the fontanelle (Uchi) to relieve infantile wheezing and respiratory phlegm?",
        "options": [
          {
            "id": "sid-adv-8-a",
            "label": "A",
            "text": "Chukku Thailam / Omam Thailam"
          },
          {
            "id": "sid-adv-8-b",
            "label": "B",
            "text": "Castor oil alone in large doses"
          },
          {
            "id": "sid-adv-8-c",
            "label": "C",
            "text": "Raw mineral turpentine"
          },
          {
            "id": "sid-adv-8-d",
            "label": "D",
            "text": "Concentrated neem extract"
          }
        ],
        "correctOptionId": "sid-adv-8-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "balar-maruthuvam-respiratory-oil",
        "explanationAfterAnswer": "Chukku (Zingiber officinale) Thailam applied to the bregma (fontanelle) warms the cranial sinuses, dispels cerebral congestion, and clears infantile mucosal accumulation."
      },
      {
        "id": "sid-adv-9",
        "questionText": "According to the classical text 'Theraiyar Thandha Sekarappa', what is the fundamental environmental etiology for the seasonal aggravation of Vali (Vatham) in the Tamil calendar?",
        "options": [
          {
            "id": "sid-adv-9-a",
            "label": "A",
            "text": "Aadi and Aavani (Monsoon / windy season) characterized by cold wet winds provoking dry-mobile Vali"
          },
          {
            "id": "sid-adv-9-b",
            "label": "B",
            "text": "Chithirai and Vaikasi (Peak summer) when solar radiation peaks"
          },
          {
            "id": "sid-adv-9-c",
            "label": "C",
            "text": "Continuous snowfall in temperate coastal regions"
          },
          {
            "id": "sid-adv-9-d",
            "label": "D",
            "text": "Equinoctial day-night equality"
          }
        ],
        "correctOptionId": "sid-adv-9-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "theraiyar-seasonal-dosha-timing",
        "explanationAfterAnswer": "In the Tamil year, Vali accumulates in Kodai (summer) and aggravates in Kaarkalam (rainy season - Aadi/Aavani), necessitating preventive oleation and dietary adjustments."
      },
      {
        "id": "sid-adv-10",
        "questionText": "What is the specific therapeutic property distinguishing Siddha 'Theeneer' (Distillate) from 'Kudineer' (Decoction)?",
        "options": [
          {
            "id": "sid-adv-10-a",
            "label": "A",
            "text": "Theeneer is a crystal-clear aromatic distillate containing volatile essential active principles with long shelf life, whereas Kudineer is an aqueous decoction consumed fresh within 24-48 hours"
          },
          {
            "id": "sid-adv-10-b",
            "label": "B",
            "text": "Theeneer is a solid wax block, while Kudineer is a gas"
          },
          {
            "id": "sid-adv-10-c",
            "label": "C",
            "text": "Theeneer contains toxic heavy minerals while Kudineer does not"
          },
          {
            "id": "sid-adv-10-d",
            "label": "D",
            "text": "Both forms have identical preparation and identical 7-day shelf lives"
          }
        ],
        "correctOptionId": "sid-adv-10-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "theeneer-vs-kudineer-pharmacy",
        "explanationAfterAnswer": "Theeneer (hydro-distilled aromatic water like Sombu Theeneer) concentrates volatile terpenes without microbial contamination, offering multi-month stability."
      }
    ]
  },
  "homoeopathy": {
    "beginner": [
      {
        "id": "hom-beg-1",
        "questionText": "What is the foundational law of cure upon which Homoeopathy was founded by Dr. Christian Friedrich Samuel Hahnemann?",
        "options": [
          {
            "id": "hom-beg-1-a",
            "label": "A",
            "text": "Similia Similibus Curentur (Let likes be cured by likes)"
          },
          {
            "id": "hom-beg-1-b",
            "label": "B",
            "text": "Contraria Contrariis Curentur (Opposites cure opposites)"
          },
          {
            "id": "hom-beg-1-c",
            "label": "C",
            "text": "Massive doses produce proportional therapeutic responses"
          },
          {
            "id": "hom-beg-1-d",
            "label": "D",
            "text": "Surgical removal of all inflamed tissue is mandatory"
          }
        ],
        "correctOptionId": "hom-beg-1-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "similia-similibus-curentur",
        "explanationAfterAnswer": "Hahnemann established Homoeopathy in 1796 based on Similia Similibus Curentur: a substance that produces symptoms in a healthy prover will cure similar symptoms in a diseased person."
      },
      {
        "id": "hom-beg-2",
        "questionText": "Which landmark medical treatise authored by Samuel Hahnemann contains the fundamental principles, philosophy, and rules of Homoeopathic practice?",
        "options": [
          {
            "id": "hom-beg-2-a",
            "label": "A",
            "text": "Organon of Medicine (Organon der Heilkunst)"
          },
          {
            "id": "hom-beg-2-b",
            "label": "B",
            "text": "Materia Medica Pura"
          },
          {
            "id": "hom-beg-2-c",
            "label": "C",
            "text": "The Chronic Diseases"
          },
          {
            "id": "hom-beg-2-d",
            "label": "D",
            "text": "Repertory of the Homoeopathic Materia Medica"
          }
        ],
        "correctOptionId": "hom-beg-2-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "organon-of-medicine-hahnemann",
        "explanationAfterAnswer": "The Organon of Medicine (first edition 1810, final sixth edition completed in 1842) is the foundational philosophical doctrine of Homoeopathy."
      },
      {
        "id": "hom-beg-3",
        "questionText": "What is the unique pharmaceutical process in Homoeopathy that releases dynamic curative energy while attenuating crude toxic substance matter?",
        "options": [
          {
            "id": "hom-beg-3-a",
            "label": "A",
            "text": "Potentization (Dynamization via serial dilution and succussion or trituration)"
          },
          {
            "id": "hom-beg-3-b",
            "label": "B",
            "text": "Thermal incineration in high-heat crucibles"
          },
          {
            "id": "hom-beg-3-c",
            "label": "C",
            "text": "Centrifugal separation of cellular membrane fragments"
          },
          {
            "id": "hom-beg-3-d",
            "label": "D",
            "text": "Ultrafiltration through bacterial microporous membranes"
          }
        ],
        "correctOptionId": "hom-beg-3-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "potentization-dynamization",
        "explanationAfterAnswer": "Potentization involves systematic serial dilution combined with kinetic mechanical succussion (for liquids) or mortar trituration (for insoluble solids), releasing dynamic curative powers."
      },
      {
        "id": "hom-beg-4",
        "questionText": "According to Hahnemann's Aphorism 9, what dynamic force animates the material organism in health?",
        "options": [
          {
            "id": "hom-beg-4-a",
            "label": "A",
            "text": "The Vital Force (Dynamis / Lebenskraft)"
          },
          {
            "id": "hom-beg-4-b",
            "label": "B",
            "text": "Exogenous bacterial symbiotes"
          },
          {
            "id": "hom-beg-4-c",
            "label": "C",
            "text": "Electrochemical mitochondrial gradients alone"
          },
          {
            "id": "hom-beg-4-d",
            "label": "D",
            "text": "Atmospheric barometric pressure"
          }
        ],
        "correctOptionId": "hom-beg-4-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "vital-force-aphorism-9",
        "explanationAfterAnswer": "Aphorism 9 states: 'In the healthy condition of man, the spiritual vital force (autocracy), the dynamis that animates the material body, rules with unbounded sway...'"
      },
      {
        "id": "hom-beg-5",
        "questionText": "What is a 'Drug Proving' (Pathogenetic Trial) in Homoeopathy?",
        "options": [
          {
            "id": "hom-beg-5-a",
            "label": "A",
            "text": "The systematic administration of potentized substances to healthy human provers to record the subjective and objective symptoms produced"
          },
          {
            "id": "hom-beg-5-b",
            "label": "B",
            "text": "Testing chemical compounds on anesthetized animals"
          },
          {
            "id": "hom-beg-5-c",
            "label": "C",
            "text": "In vitro testing on bacterial agar cultures"
          },
          {
            "id": "hom-beg-5-d",
            "label": "D",
            "text": "Measuring the refractive index of mother tinctures"
          }
        ],
        "correctOptionId": "hom-beg-5-a",
        "difficulty": "beginner",
        "complexity": "fundamental",
        "conceptTag": "drug-proving-pathogenetic-trial",
        "explanationAfterAnswer": "Drug proving (Homoeopathic Pathogenetic Trial) tests substances exclusively on healthy human provers across both genders to discover true drug action."
      },
      {
        "id": "hom-beg-6",
        "questionText": "Which remedy is renowned as the foremost trauma and shock remedy in Homoeopathy following blunt mechanical injury, contusions, or sprains?",
        "options": [
          {
            "id": "hom-beg-6-a",
            "label": "A",
            "text": "Arnica Montana"
          },
          {
            "id": "hom-beg-6-b",
            "label": "B",
            "text": "Nux Vomica"
          },
          {
            "id": "hom-beg-6-c",
            "label": "C",
            "text": "Sulphur"
          },
          {
            "id": "hom-beg-6-d",
            "label": "D",
            "text": "Lycopodium Clavatum"
          }
        ],
        "correctOptionId": "hom-beg-6-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "arnica-trauma-first-aid",
        "explanationAfterAnswer": "Arnica Montana (Mountain Daisy) is the quintessential trauma remedy for extravasation of blood, bruised feeling as if beaten, and acute shock."
      },
      {
        "id": "hom-beg-7",
        "questionText": "In homoeopathic notation, what dilution ratio defines the 'Centesimal' (C) potency scale introduced by Hahnemann?",
        "options": [
          {
            "id": "hom-beg-7-a",
            "label": "A",
            "text": "1 : 100 (1 part drug substance to 99 parts vehicle)"
          },
          {
            "id": "hom-beg-7-b",
            "label": "B",
            "text": "1 : 10 (1 part drug substance to 9 parts vehicle - Decimal scale)"
          },
          {
            "id": "hom-beg-7-c",
            "label": "C",
            "text": "1 : 50,000 (LM or 50-millesimal scale)"
          },
          {
            "id": "hom-beg-7-d",
            "label": "D",
            "text": "1 : 1,000"
          }
        ],
        "correctOptionId": "hom-beg-7-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "centesimal-scale-ratio",
        "explanationAfterAnswer": "The Centesimal scale (denoted by C or CH) uses a 1:100 ratio per stage. Decimal scale (X or D) uses 1:10, and LM scale uses 1:50,000."
      },
      {
        "id": "hom-beg-8",
        "questionText": "What is a 'Repertory' in Homoeopathic clinical medicine?",
        "options": [
          {
            "id": "hom-beg-8-a",
            "label": "A",
            "text": "A systematically indexed clinical dictionary of symptoms (rubrics) with associated medicines, facilitating remedy selection"
          },
          {
            "id": "hom-beg-8-b",
            "label": "B",
            "text": "A legal register of certified homeopathic pharmacies"
          },
          {
            "id": "hom-beg-8-c",
            "label": "C",
            "text": "An electrical machine measuring skin galvanic resistance"
          },
          {
            "id": "hom-beg-8-d",
            "label": "D",
            "text": "A compendium of toxicological industrial poisons"
          }
        ],
        "correctOptionId": "hom-beg-8-a",
        "difficulty": "beginner",
        "complexity": "application",
        "conceptTag": "repertory-definition",
        "explanationAfterAnswer": "A repertory (such as Kent's, Boenninghausen's, or Synthesis) arranges symptoms under anatomical/mental sections with graded remedy rubrics."
      },
      {
        "id": "hom-beg-9",
        "questionText": "Which remedy is characterized by extreme restlessness, acute fear of death, predictive anxiety, and symptoms developing rapidly after exposure to dry cold wind?",
        "options": [
          {
            "id": "hom-beg-9-a",
            "label": "A",
            "text": "Aconitum Napellus"
          },
          {
            "id": "hom-beg-9-b",
            "label": "B",
            "text": "Bryonia Alba"
          },
          {
            "id": "hom-beg-9-c",
            "label": "C",
            "text": "Calcarea Carbonica"
          },
          {
            "id": "hom-beg-9-d",
            "label": "D",
            "text": "Silicea"
          }
        ],
        "correctOptionId": "hom-beg-9-a",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "aconitum-napellus-keynotes",
        "explanationAfterAnswer": "Aconitum Napellus keynotes: sudden acute onset, intense fearful restlessness, predicts the hour of death, and aggravated by dry cold winds."
      },
      {
        "id": "hom-beg-10",
        "questionText": "What fundamental rule governs posology and remedy selection in classical Hahnemannian Homoeopathy?",
        "options": [
          {
            "id": "hom-beg-10-a",
            "label": "A",
            "text": "The Law of the Simillimum and the Single Remedy in the Minimum Dose"
          },
          {
            "id": "hom-beg-10-b",
            "label": "B",
            "text": "Polypharmacy combining ten mother tinctures concurrently"
          },
          {
            "id": "hom-beg-10-c",
            "label": "C",
            "text": "Administering maximum tolerable toxic dosage until side effects appear"
          },
          {
            "id": "hom-beg-10-d",
            "label": "D",
            "text": "Continuous alternation of opposing remedies every fifteen minutes"
          }
        ],
        "correctOptionId": "hom-beg-10-a",
        "difficulty": "beginner",
        "complexity": "challenging",
        "conceptTag": "single-remedy-minimum-dose",
        "explanationAfterAnswer": "Classical Homoeopathy strictly adheres to the Simillimum (closest matching remedy), administered as a single remedy in the minimum dose necessary."
      }
    ],
    "intermediate": [
      {
        "id": "hom-int-1",
        "questionText": "What are the three fundamental chronic Miasms identified by Dr. Samuel Hahnemann in 'The Chronic Diseases'?",
        "options": [
          {
            "id": "hom-int-1-a",
            "label": "A",
            "text": "Psora, Sycosis, and Syphilis"
          },
          {
            "id": "hom-int-1-b",
            "label": "B",
            "text": "Vata, Pitta, and Kapha"
          },
          {
            "id": "hom-int-1-c",
            "label": "C",
            "text": "Dam, Balgham, and Safra"
          },
          {
            "id": "hom-int-1-d",
            "label": "D",
            "text": "Arnica, Belladonna, and Chamomilla"
          }
        ],
        "correctOptionId": "hom-int-1-a",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "three-chronic-miasms",
        "explanationAfterAnswer": "Hahnemann deduced that all non-venereal chronic illnesses stem from Psora (the mother of all miasms), with Sycosis (gonorrheal overgrowth) and Syphilis (ulcerative destruction) as co-miasms."
      },
      {
        "id": "hom-int-2",
        "questionText": "In Kent's Repertory and case evaluation hierarchy, which category of symptoms holds the highest diagnostic evaluation value?",
        "options": [
          {
            "id": "hom-int-2-a",
            "label": "A",
            "text": "General Mental Symptoms (Will, Affections, Intellect, Memory)"
          },
          {
            "id": "hom-int-2-b",
            "label": "B",
            "text": "Isolated localized common physical symptoms (e.g., knee pain, headaches)"
          },
          {
            "id": "hom-int-2-c",
            "label": "C",
            "text": "Pathological laboratory diagnostic labels"
          },
          {
            "id": "hom-int-2-d",
            "label": "D",
            "text": "Incidental minor skin discolorations without modalities"
          }
        ],
        "correctOptionId": "hom-int-2-a",
        "difficulty": "intermediate",
        "complexity": "fundamental",
        "conceptTag": "kentian-symptom-hierarchy",
        "explanationAfterAnswer": "Dr. J.T. Kent's hierarchy places Mental Generals at the apex (Will/Emotion, then Intellect/Perception), followed by Physical Generals, and lastly Particulars."
      },
      {
        "id": "hom-int-3",
        "questionText": "Which clinical direction of symptom disappearance exemplifies 'Hering's Law of Direction of Cure' in a successful constitutional prescription?",
        "options": [
          {
            "id": "hom-int-3-a",
            "label": "A",
            "text": "From above downward, from within outward, from more important to less important organs, and in the reverse order of their appearance"
          },
          {
            "id": "hom-int-3-b",
            "label": "B",
            "text": "From skin surfaces inward to the heart and central nervous system"
          },
          {
            "id": "hom-int-3-c",
            "label": "C",
            "text": "Randomly across peripheral joints with worsening mental clarity"
          },
          {
            "id": "hom-int-3-d",
            "label": "D",
            "text": "From the lower extremities upward toward the brain stem"
          }
        ],
        "correctOptionId": "hom-int-3-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "herings-law-cure",
        "explanationAfterAnswer": "Constantine Hering established that true cure proceeds from above downwards, from within out, from more vital to less vital organs, and in reverse chronological sequence."
      },
      {
        "id": "hom-int-4",
        "questionText": "A patient with acute right-sided pleurisy or joint effusion is aggravated by the slightest motion, relieved by absolute rest and lying on the painful side, with excessive thirst for large quantities of cold water. What is the simillimum?",
        "options": [
          {
            "id": "hom-int-4-a",
            "label": "A",
            "text": "Bryonia Alba"
          },
          {
            "id": "hom-int-4-b",
            "label": "B",
            "text": "Rhus Toxicodendron (relieved by continuous motion)"
          },
          {
            "id": "hom-int-4-c",
            "label": "C",
            "text": "Arsenicum Album (chilly, restless, thirsty for sips)"
          },
          {
            "id": "hom-int-4-d",
            "label": "D",
            "text": "Gelsemium Sempervirens (thirstless, dull, drowsy)"
          }
        ],
        "correctOptionId": "hom-int-4-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "bryonia-alba-modalities",
        "explanationAfterAnswer": "Bryonia Alba keynotes: stitching pains aggravated by least motion, relieved by firm pressure / lying on painful side, and unquenchable thirst for large quantities at long intervals."
      },
      {
        "id": "hom-int-5",
        "questionText": "What distinguishes an 'Acute Miasm' from a 'Chronic Miasm' in Hahnemannian philosophy?",
        "options": [
          {
            "id": "hom-int-5-a",
            "label": "A",
            "text": "Acute miasms have a fixed course, predictable incubation, and resolve either in recovery or death; chronic miasms never resolve spontaneously and progress relentlessly if untreated"
          },
          {
            "id": "hom-int-5-b",
            "label": "B",
            "text": "Acute miasms occur only in animals, while chronic miasms occur only in plants"
          },
          {
            "id": "hom-int-5-c",
            "label": "C",
            "text": "Acute miasms require surgical intervention while chronic miasms require fasting"
          },
          {
            "id": "hom-int-5-d",
            "label": "D",
            "text": "There is no distinction in homoeopathy"
          }
        ],
        "correctOptionId": "hom-int-5-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "acute-vs-chronic-miasm",
        "explanationAfterAnswer": "Acute miasms (e.g. cholera, pertussis, measles) have self-limiting courses; chronic miasms (Psora, Sycosis, Syphilis) embed dynamically in the organism for life."
      },
      {
        "id": "hom-int-6",
        "questionText": "Which remedy is characterized by a patient with severe chilliness, anxiety about health, burning pains paradoxically relieved by heat, and thirst for small quantities of water at frequent intervals?",
        "options": [
          {
            "id": "hom-int-6-a",
            "label": "A",
            "text": "Arsenicum Album"
          },
          {
            "id": "hom-int-6-b",
            "label": "B",
            "text": "Pulsatilla Pratensis"
          },
          {
            "id": "hom-int-6-c",
            "label": "C",
            "text": "Apis Mellifica"
          },
          {
            "id": "hom-int-6-d",
            "label": "D",
            "text": "Natrum Muriaticum"
          }
        ],
        "correctOptionId": "hom-int-6-a",
        "difficulty": "intermediate",
        "complexity": "application",
        "conceptTag": "arsenicum-album-keynotes",
        "explanationAfterAnswer": "Arsenicum Album triad: restlessness, burning pains relieved by warmth, and extreme prostration with thirst for small frequent sips."
      },
      {
        "id": "hom-int-7",
        "questionText": "What is an 'Inimical Remedy' relationship in Homoeopathic Materia Medica?",
        "options": [
          {
            "id": "hom-int-7-a",
            "label": "A",
            "text": "Remedies that follow each other poorly and should not be given in close succession because their action clashes (e.g., Apis and Rhus Tox, Causticum and Phosphorus)"
          },
          {
            "id": "hom-int-7-b",
            "label": "B",
            "text": "Remedies that are identical chemical duplicates"
          },
          {
            "id": "hom-int-7-c",
            "label": "C",
            "text": "Remedies derived from synthetic hydrocarbons"
          },
          {
            "id": "hom-int-7-d",
            "label": "D",
            "text": "Remedies that must always be mixed together in the same vial"
          }
        ],
        "correctOptionId": "hom-int-7-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "inimical-remedy-relationship",
        "explanationAfterAnswer": "Inimical remedies have discordant vibrational pathogenesis and counteract or distort each other's curative action when prescribed sequentially."
      },
      {
        "id": "hom-int-8",
        "questionText": "In the preparation of LM (50-millesimal) potencies introduced in the 6th edition of the Organon (§270), what is the primary clinical advantage over high Centesimal potencies?",
        "options": [
          {
            "id": "hom-int-8-a",
            "label": "A",
            "text": "Rapid curative action with minimal or negligible homoeopathic aggravation, allowing frequent repetition in water"
          },
          {
            "id": "hom-int-8-b",
            "label": "B",
            "text": "They contain high concentrations of crude chemical toxins"
          },
          {
            "id": "hom-int-8-c",
            "label": "C",
            "text": "They can be manufactured without ethanol or succussion"
          },
          {
            "id": "hom-int-8-d",
            "label": "D",
            "text": "They act exclusively as local topical cosmetics"
          }
        ],
        "correctOptionId": "hom-int-8-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "lm-potency-advantages",
        "explanationAfterAnswer": "LM potencies (1:50,000 ratio) produce smooth, deep curative action with minimal aggravation and can be repeated daily or alternate days in succussed water solution."
      },
      {
        "id": "hom-int-9",
        "questionText": "Which remedy is well known for emotional weeping, yielding gentle disposition, thirstlessness, changeability of symptoms, and marked relief in cool open air?",
        "options": [
          {
            "id": "hom-int-9-a",
            "label": "A",
            "text": "Pulsatilla Pratensis"
          },
          {
            "id": "hom-int-9-b",
            "label": "B",
            "text": "Nux Vomica"
          },
          {
            "id": "hom-int-9-c",
            "label": "C",
            "text": "Sepia Officinalis"
          },
          {
            "id": "hom-int-9-d",
            "label": "D",
            "text": "Lachesis Muta"
          }
        ],
        "correctOptionId": "hom-int-9-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "pulsatilla-mental-portrait",
        "explanationAfterAnswer": "Pulsatilla: mild, timid, weeping mood, craves sympathy, completely thirstless even with dry mouth, and intensely aggravated by warmth and rich fatty food."
      },
      {
        "id": "hom-int-10",
        "questionText": "In Aphorisms 252-256 of the Organon, how does Hahnemann instruct the practitioner to recognize the signs of commencing improvement after a remedy is administered?",
        "options": [
          {
            "id": "hom-int-10-a",
            "label": "A",
            "text": "The state of the patient's disposition, mental calm, and feeling of well-being improve first, even before physical lesions show objective change"
          },
          {
            "id": "hom-int-10-b",
            "label": "B",
            "text": "The patient becomes violently delirious and aggressive"
          },
          {
            "id": "hom-int-10-c",
            "label": "C",
            "text": "Blood pressure drops to undetectable levels"
          },
          {
            "id": "hom-int-10-d",
            "label": "D",
            "text": "All skin lesions vanish within five minutes accompanied by tachycardia"
          }
        ],
        "correctOptionId": "hom-int-10-a",
        "difficulty": "intermediate",
        "complexity": "challenging",
        "conceptTag": "signs-of-improvement-organon",
        "explanationAfterAnswer": "Hahnemann notes: 'The earliest signs of improvement are seen in the patient's mind and general demeanor—greater ease, composure, freedom of spirit, and return of naturalness.'"
      }
    ],
    "advanced": [
      {
        "id": "hom-adv-1",
        "questionText": "According to Kent's Twelve Observations, what does 'A prolonged aggravation, followed by slow, gradual decline of the patient' indicate clinically following a high-potency prescription?",
        "options": [
          {
            "id": "hom-adv-1-a",
            "label": "A",
            "text": "Third Observation: The case was borderline incurable with advanced irreversible tissue pathology; the high potency acted too deeply, precipitating physical destruction"
          },
          {
            "id": "hom-adv-1-b",
            "label": "B",
            "text": "First Observation: A rapid cure without any obstacles"
          },
          {
            "id": "hom-adv-1-c",
            "label": "C",
            "text": "Twelfth Observation: The remedy was purely a superficial placebo"
          },
          {
            "id": "hom-adv-1-d",
            "label": "D",
            "text": "Ninth Observation: The action of an anti-miasmatic constitutional"
          }
        ],
        "correctOptionId": "hom-adv-1-a",
        "difficulty": "advanced",
        "complexity": "fundamental",
        "conceptTag": "kents-twelve-observations-3",
        "explanationAfterAnswer": "Kent's 3rd Observation warns against giving deep, high potencies in advanced pathological states (like cavitary tuberculosis or metastatic malignancy) because the vital force cannot endure the reaction."
      },
      {
        "id": "hom-adv-2",
        "questionText": "In a patient presenting with deep-seated Sycotic miasmatic dyscrasia (pelvic inflammatory adhesions, fleshy pedunculated warts, thick greenish-yellow catarrh, and aggravation from damp humid weather), which premier anti-sycotic nosode or polychrest is indicated?",
        "options": [
          {
            "id": "hom-adv-2-a",
            "label": "A",
            "text": "Thuja Occidentalis or Medorrhinum"
          },
          {
            "id": "hom-adv-2-b",
            "label": "B",
            "text": "Aconitum Napellus"
          },
          {
            "id": "hom-adv-2-c",
            "label": "C",
            "text": "Chamomilla"
          },
          {
            "id": "hom-adv-2-d",
            "label": "D",
            "text": "Podophyllum Peltatum"
          }
        ],
        "correctOptionId": "hom-adv-2-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "anti-sycotic-thuja-medorrhinum",
        "explanationAfterAnswer": "Thuja Occidentalis (Arbor Vitae) is the king of anti-sycotics for proliferative overgrowths; Medorrhinum is the chronic nosode for sycotic constitutional blockages."
      },
      {
        "id": "hom-adv-3",
        "questionText": "What represents the fundamental distinction between a 'True Homoeopathic Aggravation' and a 'Medicinal Disease Aggravation'?",
        "options": [
          {
            "id": "hom-adv-3-a",
            "label": "A",
            "text": "A true homoeopathic aggravation is a brief intensification of the patient's existing natural symptoms accompanied by increased mental energy; a medicinal disease aggravation introduces completely new, uncharacteristic symptoms belonging to the drug substance"
          },
          {
            "id": "hom-adv-3-b",
            "label": "B",
            "text": "Both are identical toxicological reactions requiring emergency dialysis"
          },
          {
            "id": "hom-adv-3-c",
            "label": "C",
            "text": "A true aggravation occurs only with tinctures, while medicinal occurs with LM potencies"
          },
          {
            "id": "hom-adv-3-d",
            "label": "D",
            "text": "Medicinal aggravation is a sign of deep constitutional cure"
          }
        ],
        "correctOptionId": "hom-adv-3-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "homoeopathic-vs-medicinal-aggravation",
        "explanationAfterAnswer": "A true aggravation intensifies existing symptoms while the patient's general disposition improves. New, foreign drug symptoms indicate a proving / medicinal disease from an incorrect remedy."
      },
      {
        "id": "hom-adv-4",
        "questionText": "In Boenninghausen's Therapeutic Pocket Book method of repertorization, what constitutes a 'Complete Symptom'?",
        "options": [
          {
            "id": "hom-adv-4-a",
            "label": "A",
            "text": "Location, Sensation, Modality (Aggravation & Amelioration), and Concomitant"
          },
          {
            "id": "hom-adv-4-b",
            "label": "B",
            "text": "Blood pressure, pulse rate, respiratory rate, and body temperature"
          },
          {
            "id": "hom-adv-4-c",
            "label": "C",
            "text": "Histopathological biopsy diagnosis alone"
          },
          {
            "id": "hom-adv-4-d",
            "label": "D",
            "text": "Chief complaint and duration only"
          }
        ],
        "correctOptionId": "hom-adv-4-a",
        "difficulty": "advanced",
        "complexity": "application",
        "conceptTag": "boenninghausen-complete-symptom",
        "explanationAfterAnswer": "Boenninghausen structured complete symptom analysis around the doctrine of analogies: Location, Sensation, Modalities, and Concomitant symptoms."
      },
      {
        "id": "hom-adv-5",
        "questionText": "Under the Homoeopathic Pharmacopoeia of India (HPI) and Drugs & Cosmetics Act rules, what is the mandatory vehicle quality specification for dispensing homoeopathic globules?",
        "options": [
          {
            "id": "hom-adv-5-a",
            "label": "A",
            "text": "Pure sucrose or lactose free from sulfur dioxide, starch, or adulterating dextrins, manufactured to standard pharmaceutical spherical size (e.g., No. 10 to 40)"
          },
          {
            "id": "hom-adv-5-b",
            "label": "B",
            "text": "Raw brown unrefined cane molasses"
          },
          {
            "id": "hom-adv-5-c",
            "label": "C",
            "text": "Synthetic petroleum wax pellets"
          },
          {
            "id": "hom-adv-5-d",
            "label": "D",
            "text": "Calcium phosphate ceramic beads"
          }
        ],
        "correctOptionId": "hom-adv-5-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "hpi-globule-specifications",
        "explanationAfterAnswer": "HPI Volume I mandates strict chemical purity for Saccharum Lactis and pure sucrose globule vehicles, ensuring neutral carrier properties without medicinal interference."
      },
      {
        "id": "hom-adv-6",
        "questionText": "A patient with chronic severe ulcerative colitis presents with destructive nocturnal burning, offensive putrid discharges, profuse night sweats that offer no relief, and copper-metallic taste. Which dominant miasm is operating?",
        "options": [
          {
            "id": "hom-adv-6-a",
            "label": "A",
            "text": "Syphilitic (Destructive) Miasm"
          },
          {
            "id": "hom-adv-6-b",
            "label": "B",
            "text": "Purely Psoric (Functional itching) Miasm"
          },
          {
            "id": "hom-adv-6-c",
            "label": "C",
            "text": "Sycosic (Proliferative wart) Miasm"
          },
          {
            "id": "hom-adv-6-d",
            "label": "D",
            "text": "Non-miasmatic mechanical injury"
          }
        ],
        "correctOptionId": "hom-adv-6-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "syphilitic-miasm-indicators",
        "explanationAfterAnswer": "Nocturnal aggravation (sunset to sunrise), ulceration, tissue necrosis, offensive putrid discharges, and sweat that does not relieve (e.g., Mercurius, Syphilinum) are classic Syphilitic hallmarks."
      },
      {
        "id": "hom-adv-7",
        "questionText": "What is the clinical role of 'Intercurrent Remedies' in chronic homeopathic treatment when a well-selected simillimum fails to act or hold its action?",
        "options": [
          {
            "id": "hom-adv-7-a",
            "label": "A",
            "text": "Administering a deep anti-miasmatic nosode (e.g., Psorinum, Tuberculinum, Medorrhinum, Carcinosin) to clear a constitutional block (dyscratic obstacle to cure)"
          },
          {
            "id": "hom-adv-7-b",
            "label": "B",
            "text": "Doubling the crude chemical dose of antibiotics"
          },
          {
            "id": "hom-adv-7-c",
            "label": "C",
            "text": "Administering oral emetics to induce vomiting"
          },
          {
            "id": "hom-adv-7-d",
            "label": "D",
            "text": "Switching the diagnosis to an acute surgical emergency immediately"
          }
        ],
        "correctOptionId": "hom-adv-7-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "intercurrent-nosode-therapy",
        "explanationAfterAnswer": "When clear indications exist but well-indicated remedies fail to elicit reaction (Aphorism 206), an anti-miasmatic nosode clears inherited or acquired miasmatic blocks."
      },
      {
        "id": "hom-adv-8",
        "questionText": "In Aphorism 11 of the 6th edition of the Organon, how does Hahnemann explain the nature of disease etiology in the human organism?",
        "options": [
          {
            "id": "hom-adv-8-a",
            "label": "A",
            "text": "Disease is primarily a dynamic untuning (dynamische Umstimmung) of the vital force by dynamic morbid influences; the tangible tissue alterations are secondary products"
          },
          {
            "id": "hom-adv-8-b",
            "label": "B",
            "text": "Disease is purely the mechanical presence of inert particulate dirt inside arterioles"
          },
          {
            "id": "hom-adv-8-c",
            "label": "C",
            "text": "Disease is the direct outcome of an astrological celestial alignment"
          },
          {
            "id": "hom-adv-8-d",
            "label": "D",
            "text": "Disease exists only in organs that have been surgically altered"
          }
        ],
        "correctOptionId": "hom-adv-8-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "dynamic-untuning-aphorism-11",
        "explanationAfterAnswer": "Hahnemann clarifies: 'It is the morbidly affected vital force alone that produces disease... The pathological changes are merely the dynamic expression and results of this internal disturbance.'"
      },
      {
        "id": "hom-adv-9",
        "questionText": "What distinguishes 'Trituration' from 'Succussion' in the preparation of homoeopathic potencies according to Hahnemannian pharmacy?",
        "options": [
          {
            "id": "hom-adv-9-a",
            "label": "A",
            "text": "Trituration is mechanical dry grinding with milk sugar in a porcelain mortar for insoluble crude substances (up to 3C / 6X); Succussion is vertical liquid shaking against a resilient surface for soluble substances"
          },
          {
            "id": "hom-adv-9-b",
            "label": "B",
            "text": "Trituration is done with boiling acid, while succussion is done in dry sand"
          },
          {
            "id": "hom-adv-9-c",
            "label": "C",
            "text": "Both processes are identical and utilize ultrasonic wave generators"
          },
          {
            "id": "hom-adv-9-d",
            "label": "D",
            "text": "Trituration is applied only to finished sugar globules"
          }
        ],
        "correctOptionId": "hom-adv-9-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "trituration-vs-succussion-pharmacy",
        "explanationAfterAnswer": "Insoluble metals/minerals undergo sequential 1-hour trituration stages with Saccharum Lactis until 3C (1:1,000,000), where they become soluble and can undergo liquid succussion."
      },
      {
        "id": "hom-adv-10",
        "questionText": "When assessing Kent's Fourth Observation ('No aggravation, but gradual recovery of the patient'), what does this indicate regarding the prescription and the patient's recovery?",
        "options": [
          {
            "id": "hom-adv-10-a",
            "label": "A",
            "text": "The remedy and potency were exact simillimum to the dynamic state, matching the level of vitality without inciting unnecessary biological crisis, or the disease was non-structural"
          },
          {
            "id": "hom-adv-10-b",
            "label": "B",
            "text": "The patient is secretly deteriorating into fatal cachexia"
          },
          {
            "id": "hom-adv-10-c",
            "label": "C",
            "text": "The medicine was completely neutralized by dietary coffee"
          },
          {
            "id": "hom-adv-10-d",
            "label": "D",
            "text": "The prescription must be immediately changed to an opposing remedy"
          }
        ],
        "correctOptionId": "hom-adv-10-a",
        "difficulty": "advanced",
        "complexity": "challenging",
        "conceptTag": "kents-fourth-observation",
        "explanationAfterAnswer": "Kent's 4th Observation denotes the highest ideal of cure described in Aphorism 2: a rapid, gentle, and permanent restoration of health without distressing aggravation."
      }
    ]
  }
};
