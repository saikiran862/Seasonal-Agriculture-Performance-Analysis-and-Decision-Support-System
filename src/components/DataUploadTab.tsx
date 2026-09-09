import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Download,
  RotateCcw,
  Search,
  ChevronLeft,
  ChevronRight,
  Database,
  Layers,
} from 'lucide-react';
import { FarmRecord, ValidationReport } from '../types/agriculture';
import { parseCSVData, exportToCSV } from '../utils/csvHandler';

interface DataUploadTabProps {
  records: FarmRecord[];
  allRecords: FarmRecord[];
  validationReport: ValidationReport;
  onDataLoaded: (newRecords: FarmRecord[], report: ValidationReport) => void;
  onResetBenchmark: () => void;
}

export const DataUploadTab: React.FC<DataUploadTabProps> = ({
  records,
  allRecords,
  validationReport,
  onDataLoaded,
  onResetBenchmark,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    setUploadError(null);
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
      setUploadError('Please upload a valid .csv file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) {
        setUploadError('Uploaded file appears to be empty.');
        return;
      }

      const { records: parsedRecords, report } = parseCSVData(text);
      if (parsedRecords.length === 0) {
        setUploadError('No valid farm records found in the uploaded file.');
        return;
      }

      onDataLoaded(parsedRecords, report);
    };
    reader.onerror = () => {
      setUploadError('Failed to read file.');
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDownloadBenchmark = () => {
    exportToCSV(allRecords, 'seasonal_agriculture_performance_dataset.csv');
  };

  // Table pagination & filtering
  const filteredTableRecords = records.filter((r) => {
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return (
      r.Farm_ID.toLowerCase().includes(q) ||
      r.State.toLowerCase().includes(q) ||
      r.District.toLowerCase().includes(q) ||
      r.Crop.toLowerCase().includes(q) ||
      r.Season.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filteredTableRecords.length / pageSize);
  const paginatedRecords = filteredTableRecords.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div id="data-upload-tab-content" className="space-y-6">
      {/* Upload Drag-and-Drop Area & Cleaning Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Box */}
        <div
          id="csv-dropzone"
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`lg:col-span-1 border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-slate-300 hover:border-emerald-500 bg-white hover:bg-slate-50/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <UploadCloud className="w-10 h-10 text-emerald-600 mb-2" />
          <h3 className="text-sm font-bold text-slate-800">Upload Agriculture Dataset (.CSV)</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            Drag & drop your CSV file here, or click to browse files from your system.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              CSV Auto-Cleaning & Imputation
            </span>
          </div>
        </div>

        {/* Live Validation & Cleaning Summary Report */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Data Ingestion & Preprocessing Audit
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Schema: 28 Variables Verified
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 text-[11px]">Active Rows:</span>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  {validationReport.totalRows.toLocaleString()}
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 text-[11px]">Missing Imputed:</span>
                <div className="text-lg font-bold text-emerald-700 mt-0.5">
                  {validationReport.missingValuesHandled}
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 text-[11px]">Deduplicated:</span>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  {validationReport.duplicatesRemoved}
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 text-[11px]">Cleaning Method:</span>
                <div className="text-xs font-bold text-slate-800 mt-1">
                  Median Imputation
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              As per our project requirements, data cleaning is automated upon file ingestion. Incomplete numerical entries undergo median imputation to prevent skewness from outliers, string formats are normalized, and duplicate Farm IDs are purged.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={handleDownloadBenchmark}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Download Benchmark CSV (4,000 Rows)</span>
            </button>
            <button
              onClick={onResetBenchmark}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
              <span>Reset to Standard Benchmark</span>
            </button>
          </div>
        </div>
      </div>

      {uploadError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Paginated Dataset Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Raw Farm Records Explorer ({filteredTableRecords.length.toLocaleString()} Records)
            </h3>
            <p className="text-xs text-slate-500">
              Inspect individual farm features across geographic and agronomic dimensions
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => {
                  setSearchFilter(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search farm, crop, district..."
                className="text-xs bg-white border border-slate-300 rounded-lg pl-8 pr-2.5 py-1.5 w-48"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Farm ID</th>
                <th className="py-2.5 px-3">State</th>
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Crop</th>
                <th className="py-2.5 px-3">Season</th>
                <th className="py-2.5 px-3">Yield (t/ha)</th>
                <th className="py-2.5 px-3">Water (m³)</th>
                <th className="py-2.5 px-3">Irrigation</th>
                <th className="py-2.5 px-3">Rainfall</th>
                <th className="py-2.5 px-3">Temp</th>
                <th className="py-2.5 px-3">Profit (₹)</th>
                <th className="py-2.5 px-3">Risk %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {paginatedRecords.map((r) => (
                <tr key={r.Farm_ID} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{r.Farm_ID}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-700">{r.State}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-700">{r.District}</td>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">{r.Crop}</td>
                  <td className="py-2.5 px-3 font-sans">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        r.Season === 'Kharif'
                          ? 'bg-emerald-50 text-emerald-800'
                          : r.Season === 'Rabi'
                          ? 'bg-sky-50 text-sky-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {r.Season}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{r.Yield_Tonnes_Ha}</td>
                  <td className="py-2.5 px-3 text-slate-600">{r.Water_Used_m3.toLocaleString()}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-600">{r.Irrigation_Method}</td>
                  <td className="py-2.5 px-3 text-slate-600">{r.Rainfall_mm}</td>
                  <td className="py-2.5 px-3 text-slate-600">{r.Avg_Temperature_C}°C</td>
                  <td className="py-2.5 px-3 font-bold">
                    <span className={r.Profit_INR >= 0 ? 'text-emerald-700' : 'text-rose-600'}>
                      {r.Profit_INR >= 0 ? `₹${Math.round(r.Profit_INR).toLocaleString('en-IN')}` : `-₹${Math.abs(Math.round(r.Profit_INR)).toLocaleString('en-IN')}`}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{r.Disease_Pest_Risk_pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Navigation */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, filteredTableRecords.length)} of{' '}
            {filteredTableRecords.length.toLocaleString()} entries
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-slate-700">
              Page {currentPage} of {Math.max(1, totalPages)}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
