// scripts/build-polished-question-bank.mjs
import fs from "fs";

// We will construct all 150 questions across 5 domains and 3 difficulty tiers
// with:
// 1. Equal or near-equal option lengths (max/min ratio < 1.8)
// 2. Same conceptual neighborhood for all 4 options
// 3. Realistic, technically plausible distractors
// 4. Exact balanced distribution of correctOptionId across A, B, C, D (38 A, 38 B, 37 C, 37 D)

console.log("Building polished question bank...");
