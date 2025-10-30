export const library = {
  conditions: [
    {
      id: 'insomnia',
      name: 'Insomnia',
      aliases: ['sleep issues', 'sleep disturbance', 'difficulty sleeping'],
      tags: ['sleep', 'stress'],
      recommend: [
        { itemId: 'chamomile_tea', strength: 'moderate', rationale: 'Traditional use and small RCTs show improved sleep latency.' },
        { itemId: 'valerian_root', strength: 'mixed', rationale: 'Mixed evidence; some benefit for sleep quality.' },
        { itemId: 'magnesium_glycinate', strength: 'moderate', rationale: 'May support relaxation and sleep efficiency.' }
      ]
    },
    {
      id: 'anxiety',
      name: 'Anxiety',
      aliases: ['stress', 'tension'],
      tags: ['mood', 'stress'],
      recommend: [
        { itemId: 'ashwagandha', strength: 'moderate', rationale: 'Several RCTs support reduced perceived stress and cortisol.' },
        { itemId: 'l_theanine', strength: 'emerging', rationale: 'May promote calm without sedation.' },
        { itemId: 'lavender_oil', strength: 'emerging', rationale: 'Aromatherapy can reduce acute anxiety in small studies.' }
      ]
    },
    {
      id: 'reflux',
      name: 'Acid Reflux (GERD)',
      aliases: ['heartburn', 'indigestion'],
      tags: ['digestive'],
      recommend: [
        { itemId: 'ginger', strength: 'emerging', rationale: 'Supports gastric motility and nausea relief.' },
        { itemId: 'dgl_licorice', strength: 'mixed', rationale: 'May soothe mucosa; evidence is limited.' },
        { itemId: 'slippery_elm', strength: 'traditional', rationale: 'Mucilage supports mucosal lining; traditional use.' }
      ]
    },
    {
      id: 'common_cold',
      name: 'Common Cold',
      aliases: ['viral cold', 'upper respiratory infection'],
      tags: ['immune'],
      recommend: [
        { itemId: 'elderberry', strength: 'emerging', rationale: 'May reduce duration when used at onset.' },
        { itemId: 'zinc_lozenges', strength: 'mixed', rationale: 'Some studies show reduced duration if started early.' },
        { itemId: 'vitamin_c', strength: 'mixed', rationale: 'Limited prevention; may slightly reduce duration.' }
      ]
    },
    {
      id: 'allergies',
      name: 'Seasonal Allergies',
      aliases: ['hay fever', 'allergic rhinitis'],
      tags: ['immune'],
      recommend: [
        { itemId: 'nettles', strength: 'traditional', rationale: 'Traditional use for rhinitis; limited evidence.' },
        { itemId: 'quercetin', strength: 'emerging', rationale: 'Mast-cell stabilizing properties in preclinical studies.' },
        { itemId: 'butterbur', strength: 'mixed', rationale: 'Some efficacy but safety concerns with unprocessed forms.' }
      ]
    },
    {
      id: 'inflammation',
      name: 'Inflammation',
      aliases: ['joint pain', 'soreness'],
      tags: ['anti-inflammatory'],
      recommend: [
        { itemId: 'turmeric_curcumin', strength: 'emerging', rationale: 'Curcumin shows anti-inflammatory effects; bioavailability matters.' },
        { itemId: 'omega_3', strength: 'moderate', rationale: 'EPA/DHA support anti-inflammatory pathways.' },
        { itemId: 'boswellia', strength: 'emerging', rationale: 'Potential COX-2 modulating properties.' }
      ]
    },
    {
      id: 'headache',
      name: 'Headache (Tension/Migraine)',
      aliases: ['migraine', 'tension headache'],
      tags: ['pain'],
      recommend: [
        { itemId: 'peppermint_oil', strength: 'emerging', rationale: 'Topical application can ease tension headaches.' },
        { itemId: 'feverfew', strength: 'mixed', rationale: 'Mixed results in migraine prophylaxis.' },
        { itemId: 'magnesium_glycinate', strength: 'moderate', rationale: 'Magnesium may reduce migraine frequency in some people.' }
      ]
    }
  ],
  items: [
    {
      id: 'chamomile_tea',
      name: 'Chamomile Tea',
      type: 'herb',
      tags: ['sleep', 'calming'],
      dosage: '1–2 tea bags (2–3 g) steeped 5–10 min before bed',
      evidence: 'emerging',
      cautions: 'Allergy to Asteraceae; may interact with sedatives.'
    },
    {
      id: 'valerian_root',
      name: 'Valerian Root',
      type: 'herb',
      tags: ['sleep'],
      dosage: '300–600 mg extract 30–60 min before bed',
      evidence: 'mixed',
      cautions: 'Daytime drowsiness; avoid with alcohol/sedatives.'
    },
    {
      id: 'magnesium_glycinate',
      name: 'Magnesium (Glycinate)',
      type: 'supplement',
      tags: ['sleep', 'migraine'],
      dosage: '100–200 mg elemental in evening',
      evidence: 'moderate',
      cautions: 'Can cause GI upset; adjust for kidney disease.'
    },
    {
      id: 'ashwagandha',
      name: 'Ashwagandha',
      type: 'herb',
      tags: ['stress', 'mood'],
      dosage: '300–600 mg KSM-66 or equivalent daily',
      evidence: 'moderate',
      cautions: 'Consult if thyroid issues; may cause GI upset.'
    },
    {
      id: 'l_theanine',
      name: 'L-Theanine',
      type: 'supplement',
      tags: ['calm', 'focus'],
      dosage: '100–200 mg as needed; often with caffeine',
      evidence: 'emerging',
      cautions: 'Generally well tolerated.'
    },
    {
      id: 'lavender_oil',
      name: 'Lavender Oil (Aromatherapy)',
      type: 'practice',
      tags: ['calm'],
      dosage: 'Diffuse or topical (diluted) 15–30 min',
      evidence: 'emerging',
      cautions: 'Topical sensitivities possible; do not ingest essential oil.'
    },
    {
      id: 'ginger',
      name: 'Ginger',
      type: 'food',
      tags: ['digestive', 'nausea'],
      dosage: '1–2 g powdered/day or tea; with meals',
      evidence: 'emerging',
      cautions: 'May thin blood at high doses.'
    },
    {
      id: 'dgl_licorice',
      name: 'DGL Licorice',
      type: 'supplement',
      tags: ['digestive'],
      dosage: '350–400 mg chewable before meals',
      evidence: 'mixed',
      cautions: 'DGL is deglycyrrhizinated; standard licorice can raise BP.'
    },
    {
      id: 'slippery_elm',
      name: 'Slippery Elm',
      type: 'herb',
      tags: ['soothing', 'digestive'],
      dosage: '1–2 tsp powder in warm water up to 3x/day',
      evidence: 'traditional',
      cautions: 'May affect absorption of medications if taken together.'
    },
    {
      id: 'elderberry',
      name: 'Elderberry',
      type: 'supplement',
      tags: ['immune'],
      dosage: 'Syrup or capsules per label at onset',
      evidence: 'emerging',
      cautions: 'Avoid raw berries; monitor for autoimmune conditions.'
    },
    {
      id: 'zinc_lozenges',
      name: 'Zinc Lozenges',
      type: 'supplement',
      tags: ['immune'],
      dosage: 'Total 50–75 mg/day divided for ≤7 days at onset',
      evidence: 'mixed',
      cautions: 'High dose short-term only; nausea possible.'
    },
    {
      id: 'vitamin_c',
      name: 'Vitamin C',
      type: 'supplement',
      tags: ['immune', 'antioxidant'],
      dosage: '500–1000 mg/day for 3–5 days at onset',
      evidence: 'mixed',
      cautions: 'GI upset at high doses; kidney stone risk in some.'
    },
    {
      id: 'nettles',
      name: 'Stinging Nettle',
      type: 'herb',
      tags: ['allergies'],
      dosage: 'Capsule or tea per label during season',
      evidence: 'traditional',
      cautions: 'May interact with blood pressure/diuretic meds.'
    },
    {
      id: 'quercetin',
      name: 'Quercetin',
      type: 'supplement',
      tags: ['allergies', 'antioxidant'],
      dosage: '250–500 mg 1–2x/day during season',
      evidence: 'emerging',
      cautions: 'May interact with some medications.'
    },
    {
      id: 'butterbur',
      name: 'Butterbur (PA-free)',
      type: 'herb',
      tags: ['allergies'],
      dosage: 'Per standardized extract label',
      evidence: 'mixed',
      cautions: 'Only use PA-free extracts; liver safety concerns otherwise.'
    },
    {
      id: 'turmeric_curcumin',
      name: 'Turmeric/Curcumin (enhanced bioavailability)',
      type: 'supplement',
      tags: ['anti-inflammatory'],
      dosage: '500–1000 mg/day curcuminoids with piperine or phytosome',
      evidence: 'emerging',
      cautions: 'May thin blood; GI upset possible.'
    },
    {
      id: 'omega_3',
      name: 'Omega-3 (EPA/DHA)',
      type: 'supplement',
      tags: ['anti-inflammatory', 'cardio'],
      dosage: '1000–2000 mg combined EPA/DHA daily with food',
      evidence: 'moderate',
      cautions: 'Blood-thinning effect; choose quality sources.'
    },
    {
      id: 'boswellia',
      name: 'Boswellia',
      type: 'herb',
      tags: ['anti-inflammatory'],
      dosage: 'Per standardized extract label',
      evidence: 'emerging',
      cautions: 'Generally well tolerated; GI upset possible.'
    },
    {
      id: 'peppermint_oil',
      name: 'Peppermint Oil (topical)',
      type: 'practice',
      tags: ['pain', 'tension'],
      dosage: 'Diluted topical apply to temples/neck for tension',
      evidence: 'emerging',
      cautions: 'Avoid near eyes; skin sensitivity possible.'
    },
    {
      id: 'feverfew',
      name: 'Feverfew',
      type: 'herb',
      tags: ['migraine'],
      dosage: 'Standardized extract per label for prophylaxis',
      evidence: 'mixed',
      cautions: 'Avoid in pregnancy; mouth irritation possible.'
    }
  ]
};

export const tags = [
  'sleep', 'stress', 'digestive', 'immune', 'anti-inflammatory', 'pain', 'mood', 'calm', 'antioxidant', 'cardio', 'tension', 'migraine', 'soothing'
];

