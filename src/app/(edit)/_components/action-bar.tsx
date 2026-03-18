"use client";

import React from "react";

import { LuDownload, LuEye } from "react-icons/lu";

interface ActionBarProps {
  onPreview: () => void;
  onExport: () => void;
  editable: boolean;
  onToggleEditable: (value: boolean) => void;
}

const ActionBar = ({
  onPreview,
  onExport,
  editable,
  onToggleEditable,
}: ActionBarProps) => {
  return (
    <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
      {/* Toggle Editable */}
      <label className="flex items-center gap-2 cursor-pointer">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Editable
        </span>
        <div className="relative">
          <input
            type="checkbox"
            checked={editable}
            onChange={(e) => onToggleEditable(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-9 h-5 rounded-full transition ${
              editable ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-600"
            }`}
          />
          <div
            className={`absolute top-0.5 left-0.5 size-4 bg-white rounded-full transition-transform ${
              editable ? "translate-x-4" : ""
            }`}
          />
        </div>
      </label>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onPreview}
          className="flex items-center gap-2 px-2 sm:px-4 h-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium text-sm"
        >
          <LuEye className="size-4" />
          <span className="hidden sm:inline">Preview</span>
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-2 px-2 sm:px-4 h-8 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md font-medium border border-slate-200 dark:border-slate-700 text-sm"
        >
          <LuDownload className="size-4" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
