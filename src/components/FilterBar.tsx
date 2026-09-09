import React, { useMemo } from 'react';
import { Filter, X, Search, SlidersHorizontal, Database } from 'lucide-react';
import { FarmRecord, FilterState } from '../types/agriculture';

interface FilterBarProps {
  allRecords: FarmRecord[];
  filteredCount: number;
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  allRecords,
  filteredCount,
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const seasons = useMemo(() => ['Kharif', 'Rabi', 'Zaid'], []);

  const states = useMemo(() => {
    return Array.from(new Set(allRecords.map((r) => r.State))).sort();
  }, [allRecords]);

  const districts = useMemo(() => {
    const subset = filters.state
      ? allRecords.filter((r) => r.State === filters.state)
      : allRecords;
    return Array.from(new Set(subset.map((r) => r.District))).sort();
  }, [allRecords, filters.state]);

  const crops = useMemo(() => {
    const subset = filters.season
      ? allRecords.filter((r) => r.Season === filters.season)
      : allRecords;
    return Array.from(new Set(subset.map((r) => r.Crop))).sort();
  }, [allRecords, filters.season]);

  const irrigationMethods = useMemo(() => {
    return Array.from(new Set(allRecords.map((r) => r.Irrigation_Method))).sort();
  }, [allRecords]);

  const isFiltered =
    filters.season !== '' ||
    filters.state !== '' ||
    filters.district !== '' ||
    filters.crop !== '' ||
    filters.irrigationMethod !== '' ||
    filters.searchQuery !== '';

  return (
    <div id="filter-bar" className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Multivariate Filters
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Database className="w-3 h-3 text-emerald-600" />
              <span>
                {filteredCount.toLocaleString()} / {allRecords.length.toLocaleString()} Farms
              </span>
            </span>
          </div>

          {isFiltered && (
            <button
              id="clear-all-filters-btn"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {/* Season Filter */}
          <div>
            <label htmlFor="filter-season" className="block text-[11px] font-semibold text-slate-500 mb-1">
              Season
            </label>
            <select
              id="filter-season"
              value={filters.season}
              onChange={(e) => onFilterChange('season', e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 font-medium"
            >
              <option value="">All Seasons</option>
              {seasons.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* State Filter */}
          <div>
            <label htmlFor="filter-state" className="block text-[11px] font-semibold text-slate-500 mb-1">
              State
            </label>
            <select
              id="filter-state"
              value={filters.state}
              onChange={(e) => {
                onFilterChange('state', e.target.value);
                onFilterChange('district', '');
              }}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 font-medium"
            >
              <option value="">All States ({states.length})</option>
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label htmlFor="filter-district" className="block text-[11px] font-semibold text-slate-500 mb-1">
              District
            </label>
            <select
              id="filter-district"
              value={filters.district}
              onChange={(e) => onFilterChange('district', e.target.value)}
              disabled={districts.length === 0}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 font-medium disabled:opacity-50"
            >
              <option value="">All Districts ({districts.length})</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Crop Filter */}
          <div>
            <label htmlFor="filter-crop" className="block text-[11px] font-semibold text-slate-500 mb-1">
              Crop
            </label>
            <select
              id="filter-crop"
              value={filters.crop}
              onChange={(e) => onFilterChange('crop', e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 font-medium"
            >
              <option value="">All Crops ({crops.length})</option>
              {crops.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Irrigation Method Filter */}
          <div>
            <label htmlFor="filter-irrigation" className="block text-[11px] font-semibold text-slate-500 mb-1">
              Irrigation Method
            </label>
            <select
              id="filter-irrigation"
              value={filters.irrigationMethod}
              onChange={(e) => onFilterChange('irrigationMethod', e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 font-medium"
            >
              <option value="">All Methods</option>
              {irrigationMethods.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div>
            <label htmlFor="filter-search" className="block text-[11px] font-semibold text-slate-500 mb-1">
              Search Farm / District
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              <input
                id="filter-search"
                type="text"
                value={filters.searchQuery}
                onChange={(e) => onFilterChange('searchQuery', e.target.value)}
                placeholder="FARM_1001, Rice..."
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
