export type SeasonType = 'Kharif' | 'Rabi' | 'Zaid';

export interface FarmRecord {
  Farm_ID: string;
  State: string;
  District: string;
  Crop: string;
  Season: SeasonType;
  Farm_Area_Hectares: number;
  Rainfall_mm: number;
  Avg_Temperature_C: number;
  Humidity_pct: number;
  Sunlight_Hours_Day: number;
  Soil_pH: number;
  Soil_Moisture_pct: number;
  Nitrogen_kg_ha: number;
  Phosphorus_kg_ha: number;
  Potassium_kg_ha: number;
  Irrigation_Method: string;
  Fertilizer_kg_ha: number;
  Pesticide_Litre_ha: number;
  Seed_Quality_Score: number;
  Yield_Tonnes_Ha: number;
  Production_Tonnes: number;
  Market_Price_INR_Tonne: number;
  Total_Cost_INR: number;
  Revenue_INR: number;
  Profit_INR: number;
  Water_Used_m3: number;
  Water_Efficiency_t_per_1000m3: number;
  Disease_Pest_Risk_pct: number;
}

export interface OverallKPIs {
  totalRecords: number;
  totalSeasons: number;
  totalCrops: number;
  totalStates: number;
  avgYield: number;
  avgProfit: number;
  avgWaterEfficiency: number;
  bestSeason: SeasonType;
  bestSeasonYield: number;
  bestSeasonProfit: number;
  bestSeasonWaterEff: number;
  weakestEconomicSeason: SeasonType;
}

export interface SeasonSummary {
  season: SeasonType;
  recordCount: number;
  avgYield: number;
  avgProduction: number;
  avgRevenue: number;
  avgCost: number;
  avgProfit: number;
  profitMarginPct: number;
  avgWaterUsed: number;
  waterEfficiency: number;
  avgRainfall: number;
  avgTemperature: number;
  avgHumidity: number;
  avgDiseasePestRisk: number;
  avgSoilMoisture: number;
  avgFertilizer: number;
}

export interface CropSeasonStat {
  crop: string;
  season: SeasonType;
  avgYield: number;
  avgProfit: number;
  recordCount: number;
  avgProduction: number;
  avgRevenue: number;
}

export interface CorrelationPair {
  featureA: string;
  featureB: string;
  coefficient: number;
}

export interface AnomalyRecord {
  record: FarmRecord;
  reason: string;
  severity: 'High' | 'Moderate';
  metric: string;
  value: number;
  threshold: number;
}

export interface ValidationSummary {
  totalRows: number;
  validRows: number;
  missingValuesCount: number;
  imputedValuesCount: number;
  duplicateCount: number;
  missingColumns: string[];
  status: 'valid' | 'warning' | 'error';
  message: string;
}

export interface ValidationReport {
  totalRows: number;
  validRows: number;
  missingValuesHandled: number;
  duplicatesRemoved: number;
  columnsFound: number;
}

export interface ColumnDefinition {
  name: string;
  category: string;
  type: string;
  unit: string;
}

export const DATASET_COLUMNS: ColumnDefinition[] = [
  { name: 'Farm_ID', category: 'Identifier', type: 'string', unit: 'Unique Alpha-numeric' },
  { name: 'State', category: 'Geographic', type: 'string', unit: 'Indian State' },
  { name: 'District', category: 'Geographic', type: 'string', unit: 'District Name' },
  { name: 'Crop', category: 'Cropping', type: 'string', unit: 'Crop Variety' },
  { name: 'Season', category: 'Cropping', type: 'string', unit: 'Kharif / Rabi / Zaid' },
  { name: 'Farm_Area_Hectares', category: 'Cropping', type: 'float', unit: 'Hectares (ha)' },
  { name: 'Rainfall_mm', category: 'Environmental', type: 'float', unit: 'Millimeters (mm)' },
  { name: 'Avg_Temperature_C', category: 'Environmental', type: 'float', unit: 'Celsius (°C)' },
  { name: 'Humidity_pct', category: 'Environmental', type: 'float', unit: 'Percentage (%)' },
  { name: 'Sunlight_Hours_Day', category: 'Environmental', type: 'float', unit: 'Hours / Day' },
  { name: 'Soil_pH', category: 'Edaphic (Soil)', type: 'float', unit: 'pH scale (0-14)' },
  { name: 'Soil_Moisture_pct', category: 'Edaphic (Soil)', type: 'float', unit: 'Percentage (%)' },
  { name: 'Nitrogen_kg_ha', category: 'Edaphic (Soil)', type: 'float', unit: 'kg / ha' },
  { name: 'Phosphorus_kg_ha', category: 'Edaphic (Soil)', type: 'float', unit: 'kg / ha' },
  { name: 'Potassium_kg_ha', category: 'Edaphic (Soil)', type: 'float', unit: 'kg / ha' },
  { name: 'Irrigation_Method', category: 'Resource Input', type: 'string', unit: 'Technological type' },
  { name: 'Fertilizer_kg_ha', category: 'Resource Input', type: 'float', unit: 'kg / ha' },
  { name: 'Pesticide_Litre_ha', category: 'Resource Input', type: 'float', unit: 'Litres / ha' },
  { name: 'Seed_Quality_Score', category: 'Resource Input', type: 'float', unit: 'Index (1-10)' },
  { name: 'Yield_Tonnes_Ha', category: 'Production Output', type: 'float', unit: 'Tonnes / ha' },
  { name: 'Production_Tonnes', category: 'Production Output', type: 'float', unit: 'Metric Tonnes' },
  { name: 'Market_Price_INR_Tonne', category: 'Economic', type: 'float', unit: '₹ / Tonne' },
  { name: 'Total_Cost_INR', category: 'Economic', type: 'float', unit: 'Indian Rupee (₹)' },
  { name: 'Revenue_INR', category: 'Economic', type: 'float', unit: 'Indian Rupee (₹)' },
  { name: 'Profit_INR', category: 'Economic', type: 'float', unit: 'Indian Rupee (₹)' },
  { name: 'Water_Used_m3', category: 'Hydrological', type: 'float', unit: 'Cubic Meters (m³)' },
  { name: 'Water_Efficiency_t_per_1000m3', category: 'Hydrological', type: 'float', unit: 'Tonnes / 1000 m³' },
  { name: 'Disease_Pest_Risk_pct', category: 'Risk & Anomaly', type: 'float', unit: 'Probability (%)' },
];

export interface FilterState {
  season: string;
  state: string;
  district: string;
  crop: string;
  irrigationMethod: string;
  searchQuery: string;
}

export interface AIInsightData {
  executiveSummary: string;
  keyFindings: string[];
  possibleExplanations: string[];
  riskAssessment: string;
  actionableRecommendations: string[];
  generatedAt: string;
  source: 'gemini' | 'statistical_engine';
}
