import { FarmRecord, SeasonType } from '../types/agriculture';

// Mulberry32 deterministic PRNG
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(1734508441); // Seeded with STU ID suffix for reproducible academic verification

function normalRandom(mean: number, stdDev: number): number {
  const u1 = Math.max(0.0001, random());
  const u2 = random();
  const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return mean + z * stdDev;
}

const STATES_AND_DISTRICTS: Record<string, string[]> = {
  Telangana: ['Rangareddy', 'Medak', 'Sangareddy', 'Nalgonda', 'Warangal'],
  'Andhra Pradesh': ['Krishna', 'Guntur', 'Kurnool', 'Anantapur', 'Chittoor'],
  Maharashtra: ['Nashik', 'Pune', 'Nagpur', 'Aurangabad', 'Solapur'],
  Punjab: ['Ludhiana', 'Amritsar', 'Patiala', 'Jalandhar', 'Bathinda'],
  Haryana: ['Karnal', 'Hisar', 'Ambala', 'Rohtak', 'Kurukshetra'],
  Karnataka: ['Dharwad', 'Belagavi', 'Mysuru', 'Shimoga', 'Raichur'],
  'Madhya Pradesh': ['Indore', 'Bhopal', 'Ujjain', 'Jabalpur', 'Gwalior'],
  'Uttar Pradesh': ['Varanasi', 'Lucknow', 'Kanpur', 'Agra', 'Meerut'],
  Gujarat: ['Rajkot', 'Ahmedabad', 'Surat', 'Vadodara', 'Junagadh'],
  'Tamil Nadu': ['Coimbatore', 'Thanjavur', 'Madurai', 'Salem', 'Tiruchirappalli']
};

const STATE_NAMES = Object.keys(STATES_AND_DISTRICTS);

const CROPS_BY_SEASON: Record<SeasonType, string[]> = {
  Kharif: ['Rice', 'Cotton', 'Maize', 'Groundnut', 'Soybean'],
  Rabi: ['Wheat', 'Mustard', 'Gram', 'Barley', 'Potato'],
  Zaid: ['Watermelon', 'Muskmelon', 'Cucumber', 'Moong', 'Fodder']
};

const IRRIGATION_METHODS = ['Drip', 'Sprinkler', 'Canal', 'Tube Well', 'Rainfed'];

export function generateBenchmarkDataset(): FarmRecord[] {
  const records: FarmRecord[] = [];
  const TOTAL_RECORDS = 4000;
  // Season counts: Kharif: 1500, Rabi: 1500, Zaid: 1000
  const KHARIF_COUNT = 1500;
  const RABI_COUNT = 1500;
  const ZAID_COUNT = 1000;

  const seasonConfigs: {
    season: SeasonType;
    count: number;
    targetYield: number;
    targetProduction: number;
    targetRevenue: number;
    targetProfit: number;
    targetWater: number;
    targetWaterEff: number;
    targetRainfall: number;
    targetTemp: number;
    targetHumidity: number;
    targetRisk: number;
  }[] = [
    {
      season: 'Kharif',
      count: KHARIF_COUNT,
      targetYield: 5.64,
      targetProduction: 46.31,
      targetRevenue: 710719.06,
      targetProfit: 178914.65,
      targetWater: 6102.20,
      targetWaterEff: 5.89,
      targetRainfall: 852.08,
      targetTemp: 28.45,
      targetHumidity: 71.81,
      targetRisk: 54.47
    },
    {
      season: 'Rabi',
      count: RABI_COUNT,
      targetYield: 5.08,
      targetProduction: 41.49,
      targetRevenue: 601526.05,
      targetProfit: 87689.47,
      targetWater: 5846.99,
      targetWaterEff: 5.19,
      targetRainfall: 436.00,
      targetTemp: 23.49,
      targetHumidity: 57.89,
      targetRisk: 40.48
    },
    {
      season: 'Zaid',
      count: ZAID_COUNT,
      targetYield: 4.67,
      targetProduction: 38.89,
      targetRevenue: 519171.90,
      targetProfit: -24804.82,
      targetWater: 6419.89,
      targetWaterEff: 4.41,
      targetRainfall: 299.42,
      targetTemp: 31.04,
      targetHumidity: 52.01,
      targetRisk: 38.22
    }
  ];

  let farmIdCounter = 1001;

  for (const cfg of seasonConfigs) {
    const crops = CROPS_BY_SEASON[cfg.season];

    for (let i = 0; i < cfg.count; i++) {
      const state = STATE_NAMES[Math.floor(random() * STATE_NAMES.length)];
      const districtList = STATES_AND_DISTRICTS[state];
      const district = districtList[Math.floor(random() * districtList.length)];
      const crop = crops[Math.floor(random() * crops.length)];
      const irrigation = IRRIGATION_METHODS[Math.floor(random() * IRRIGATION_METHODS.length)];

      const farmArea = Math.round((normalRandom(8.2, 1.8)) * 10) / 10;
      const validFarmArea = Math.max(1.5, Math.min(18.0, farmArea));

      // Small deliberate anomalies on ~2% of records for IQR anomaly detection showcase
      const isAnomaly = i % 45 === 0;
      const anomalyMultiplier = isAnomaly ? (i % 90 === 0 ? 1.75 : 0.45) : 1.0;

      const yieldVal = Math.max(
        1.2,
        Math.round((normalRandom(cfg.targetYield, 0.72) * anomalyMultiplier) * 100) / 100
      );

      const production = Math.max(
        5.0,
        Math.round((yieldVal * validFarmArea * normalRandom(1.0, 0.05)) * 100) / 100
      );

      const rainfall = Math.max(
        80,
        Math.round(normalRandom(cfg.targetRainfall, cfg.targetRainfall * 0.16) * 10) / 10
      );

      const temperature = Math.round(normalRandom(cfg.targetTemp, 2.4) * 10) / 10;
      const humidity = Math.max(20, Math.min(95, Math.round(normalRandom(cfg.targetHumidity, 7.5) * 10) / 10));
      const sunlight = Math.max(4.0, Math.min(11.5, Math.round(normalRandom(7.2, 1.1) * 10) / 10));

      const soilPh = Math.max(5.2, Math.min(8.8, Math.round(normalRandom(6.8, 0.45) * 100) / 100));
      const soilMoisture = Math.max(15, Math.min(85, Math.round(normalRandom(cfg.season === 'Kharif' ? 58 : (cfg.season === 'Rabi' ? 44 : 34), 8.5) * 10) / 10));

      const nitrogen = Math.round(normalRandom(120, 22));
      const phosphorus = Math.round(normalRandom(55, 12));
      const potassium = Math.round(normalRandom(45, 10));
      const fertilizer = Math.round(normalRandom(180, 30));
      const pesticide = Math.max(0.5, Math.round(normalRandom(cfg.season === 'Kharif' ? 3.8 : 2.4, 0.6) * 10) / 10);
      const seedQuality = Math.max(55, Math.min(98, Math.round(normalRandom(82, 6))));

      // Water consumption
      const waterUsed = Math.max(
        2200,
        Math.round(normalRandom(cfg.targetWater, 820) * 10) / 10
      );
      // Water efficiency = Yield / (Water_Used / 1000)
      const waterEff = Math.round((yieldVal / (waterUsed / 1000) * 10) * 100) / 100;

      // Economics
      const marketPrice = Math.round(normalRandom(cfg.season === 'Kharif' ? 16500 : (cfg.season === 'Rabi' ? 15200 : 13800), 1200));
      const revenue = Math.round(production * marketPrice);
      
      // Cost calibrated to match seasonal average profit
      const baseCost = cfg.targetRevenue - cfg.targetProfit;
      const costPerTon = baseCost / cfg.targetProduction;
      const totalCost = Math.round(production * costPerTon * normalRandom(1.0, 0.08));
      const profit = revenue - totalCost;

      const pestRisk = Math.max(
        10,
        Math.min(95, Math.round(normalRandom(cfg.targetRisk, 8.2) * 10) / 10)
      );

      records.push({
        Farm_ID: `FARM_${farmIdCounter++}`,
        State: state,
        District: district,
        Crop: crop,
        Season: cfg.season,
        Farm_Area_Hectares: validFarmArea,
        Rainfall_mm: rainfall,
        Avg_Temperature_C: temperature,
        Humidity_pct: humidity,
        Sunlight_Hours_Day: sunlight,
        Soil_pH: soilPh,
        Soil_Moisture_pct: soilMoisture,
        Nitrogen_kg_ha: nitrogen,
        Phosphorus_kg_ha: phosphorus,
        Potassium_kg_ha: potassium,
        Irrigation_Method: irrigation,
        Fertilizer_kg_ha: fertilizer,
        Pesticide_Litre_ha: pesticide,
        Seed_Quality_Score: seedQuality,
        Yield_Tonnes_Ha: yieldVal,
        Production_Tonnes: production,
        Market_Price_INR_Tonne: marketPrice,
        Total_Cost_INR: totalCost,
        Revenue_INR: revenue,
        Profit_INR: profit,
        Water_Used_m3: waterUsed,
        Water_Efficiency_t_per_1000m3: waterEff,
        Disease_Pest_Risk_pct: pestRisk
      });
    }
  }

  return records;
}

let cachedBenchmark: FarmRecord[] | null = null;

export function getBenchmarkDataset(): FarmRecord[] {
  if (!cachedBenchmark) {
    cachedBenchmark = generateBenchmarkDataset();
  }
  return cachedBenchmark;
}
