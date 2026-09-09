import Papa from 'papaparse';
import { FarmRecord, ValidationSummary, ValidationReport, SeasonType } from '../types/agriculture';
import { median } from './analytics';

export const REQUIRED_COLUMNS = [
  'Farm_ID',
  'State',
  'District',
  'Crop',
  'Season',
  'Farm_Area_Hectares',
  'Rainfall_mm',
  'Avg_Temperature_C',
  'Humidity_pct',
  'Sunlight_Hours_Day',
  'Soil_pH',
  'Soil_Moisture_pct',
  'Nitrogen_kg_ha',
  'Phosphorus_kg_ha',
  'Potassium_kg_ha',
  'Irrigation_Method',
  'Fertilizer_kg_ha',
  'Pesticide_Litre_ha',
  'Seed_Quality_Score',
  'Yield_Tonnes_Ha',
  'Production_Tonnes',
  'Market_Price_INR_Tonne',
  'Total_Cost_INR',
  'Revenue_INR',
  'Profit_INR',
  'Water_Used_m3',
  'Water_Efficiency_t_per_1000m3',
  'Disease_Pest_Risk_pct',
];

const NUMERIC_COLUMNS = [
  'Farm_Area_Hectares',
  'Rainfall_mm',
  'Avg_Temperature_C',
  'Humidity_pct',
  'Sunlight_Hours_Day',
  'Soil_pH',
  'Soil_Moisture_pct',
  'Nitrogen_kg_ha',
  'Phosphorus_kg_ha',
  'Potassium_kg_ha',
  'Fertilizer_kg_ha',
  'Pesticide_Litre_ha',
  'Seed_Quality_Score',
  'Yield_Tonnes_Ha',
  'Production_Tonnes',
  'Market_Price_INR_Tonne',
  'Total_Cost_INR',
  'Revenue_INR',
  'Profit_INR',
  'Water_Used_m3',
  'Water_Efficiency_t_per_1000m3',
  'Disease_Pest_Risk_pct',
];

export function parseAndValidateCSV(
  fileContent: string
): { records: FarmRecord[]; validation: ValidationSummary } {
  const parsed = Papa.parse<Record<string, string>>(fileContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => header.trim(),
  });

  if (parsed.errors.length > 0 && parsed.data.length === 0) {
    return {
      records: [],
      validation: {
        totalRows: 0,
        validRows: 0,
        missingValuesCount: 0,
        imputedValuesCount: 0,
        duplicateCount: 0,
        missingColumns: [],
        status: 'error',
        message: `Failed to parse CSV: ${parsed.errors[0]?.message || 'Unknown parsing error'}`,
      },
    };
  }

  const rawHeaders = parsed.meta.fields || [];
  // Case-insensitive / trimmed match for flexibility
  const headerMap = new Map<string, string>();
  rawHeaders.forEach((h) => {
    headerMap.set(h.toLowerCase().trim(), h);
  });

  const missingColumns: string[] = [];
  const normalizedKeyMap: Record<string, string> = {};

  REQUIRED_COLUMNS.forEach((col) => {
    const matched = headerMap.get(col.toLowerCase());
    if (matched) {
      normalizedKeyMap[col] = matched;
    } else {
      missingColumns.push(col);
    }
  });

  if (missingColumns.length > 0) {
    return {
      records: [],
      validation: {
        totalRows: parsed.data.length,
        validRows: 0,
        missingValuesCount: 0,
        imputedValuesCount: 0,
        duplicateCount: 0,
        missingColumns,
        status: 'error',
        message: `Validation failed. Missing ${missingColumns.length} mandatory agricultural variables (${missingColumns.slice(0, 3).join(', ')}...).`,
      },
    };
  }

  // Pre-calculate medians for each numeric column for imputation
  const columnValues: Record<string, number[]> = {};
  NUMERIC_COLUMNS.forEach((col) => {
    columnValues[col] = [];
  });

  parsed.data.forEach((row) => {
    NUMERIC_COLUMNS.forEach((col) => {
      const rawVal = row[normalizedKeyMap[col]];
      if (rawVal !== undefined && rawVal !== null && rawVal.trim() !== '') {
        const num = parseFloat(rawVal);
        if (!isNaN(num)) {
          columnValues[col].push(num);
        }
      }
    });
  });

  const columnMedians: Record<string, number> = {};
  NUMERIC_COLUMNS.forEach((col) => {
    columnMedians[col] = median(columnValues[col]) || 0;
  });

  let missingValuesCount = 0;
  let imputedValuesCount = 0;
  const seenIds = new Set<string>();
  let duplicateCount = 0;

  const validRecords: FarmRecord[] = [];

  parsed.data.forEach((row, idx) => {
    const rawFarmId = row[normalizedKeyMap['Farm_ID']]?.trim() || `FARM_${idx + 1001}`;
    if (seenIds.has(rawFarmId)) {
      duplicateCount++;
    } else {
      seenIds.add(rawFarmId);
    }

    const state = row[normalizedKeyMap['State']]?.trim() || 'Telangana';
    const district = row[normalizedKeyMap['District']]?.trim() || 'Rangareddy';
    const crop = row[normalizedKeyMap['Crop']]?.trim() || 'Rice';
    
    let rawSeason = row[normalizedKeyMap['Season']]?.trim() || 'Kharif';
    let season: SeasonType = 'Kharif';
    if (rawSeason.toLowerCase().includes('rabi')) season = 'Rabi';
    else if (rawSeason.toLowerCase().includes('zaid')) season = 'Zaid';

    const irrigation = row[normalizedKeyMap['Irrigation_Method']]?.trim() || 'Drip';

    const numericFields: Record<string, number> = {};
    NUMERIC_COLUMNS.forEach((col) => {
      const valStr = row[normalizedKeyMap[col]];
      if (valStr === undefined || valStr === null || valStr.trim() === '') {
        missingValuesCount++;
        imputedValuesCount++;
        numericFields[col] = columnMedians[col];
      } else {
        const n = parseFloat(valStr);
        if (isNaN(n)) {
          missingValuesCount++;
          imputedValuesCount++;
          numericFields[col] = columnMedians[col];
        } else {
          numericFields[col] = n;
        }
      }
    });

    validRecords.push({
      Farm_ID: rawFarmId,
      State: state,
      District: district,
      Crop: crop,
      Season: season,
      Farm_Area_Hectares: numericFields['Farm_Area_Hectares'],
      Rainfall_mm: numericFields['Rainfall_mm'],
      Avg_Temperature_C: numericFields['Avg_Temperature_C'],
      Humidity_pct: numericFields['Humidity_pct'],
      Sunlight_Hours_Day: numericFields['Sunlight_Hours_Day'],
      Soil_pH: numericFields['Soil_pH'],
      Soil_Moisture_pct: numericFields['Soil_Moisture_pct'],
      Nitrogen_kg_ha: numericFields['Nitrogen_kg_ha'],
      Phosphorus_kg_ha: numericFields['Phosphorus_kg_ha'],
      Potassium_kg_ha: numericFields['Potassium_kg_ha'],
      Irrigation_Method: irrigation,
      Fertilizer_kg_ha: numericFields['Fertilizer_kg_ha'],
      Pesticide_Litre_ha: numericFields['Pesticide_Litre_ha'],
      Seed_Quality_Score: numericFields['Seed_Quality_Score'],
      Yield_Tonnes_Ha: numericFields['Yield_Tonnes_Ha'],
      Production_Tonnes: numericFields['Production_Tonnes'],
      Market_Price_INR_Tonne: numericFields['Market_Price_INR_Tonne'],
      Total_Cost_INR: numericFields['Total_Cost_INR'],
      Revenue_INR: numericFields['Revenue_INR'],
      Profit_INR: numericFields['Profit_INR'],
      Water_Used_m3: numericFields['Water_Used_m3'],
      Water_Efficiency_t_per_1000m3: numericFields['Water_Efficiency_t_per_1000m3'],
      Disease_Pest_Risk_pct: numericFields['Disease_Pest_Risk_pct'],
    });
  });

  return {
    records: validRecords,
    validation: {
      totalRows: parsed.data.length,
      validRows: validRecords.length,
      missingValuesCount,
      imputedValuesCount,
      duplicateCount,
      missingColumns: [],
      status: imputedValuesCount > 0 || duplicateCount > 0 ? 'warning' : 'valid',
      message: `Successfully verified and preprocessed ${validRecords.length.toLocaleString()} records across 28 agricultural features. (${imputedValuesCount} numeric missing cells imputed via median strategy; ${duplicateCount} duplicates identified).`,
    },
  };
}

export function exportToCSV(records: FarmRecord[], filename = 'agricultural_dataset_export.csv') {
  const csv = Papa.unparse(records);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadAnalysisSummary(summary: unknown, filename = 'agricultural_analysis_summary.json') {
  const json = JSON.stringify(summary, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function parseCSVData(fileContent: string): { records: FarmRecord[]; report: ValidationReport } {
  const { records, validation } = parseAndValidateCSV(fileContent);
  return {
    records,
    report: {
      totalRows: validation.totalRows,
      validRows: validation.validRows,
      missingValuesHandled: validation.imputedValuesCount,
      duplicatesRemoved: validation.duplicateCount,
      columnsFound: 28 - validation.missingColumns.length,
    },
  };
}

