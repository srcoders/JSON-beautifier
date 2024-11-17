import React from 'react';
import { AlertCircle, FileText, Trash2 } from 'lucide-react';

interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

export function JsonInput({ value, onChange, error }: JsonInputProps) {
  const handleClear = () => {
    onChange('');
  };

  const getFileSize = (str: string) => {
    const bytes = new Blob([str]).size;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Input JSON</label>
          {value && (
            <div className="flex items-center text-sm text-gray-500">
              <FileText className="w-4 h-4 mr-1" />
              <span>{value.length.toLocaleString()} chars ({getFileSize(value)})</span>
            </div>
          )}
        </div>
        {value && (
          <button
            onClick={handleClear}
            className="flex items-center px-3 py-1.5 text-sm text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            <span className="font-medium">Clear</span>
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center text-red-500 text-sm mb-2 bg-red-50 px-3 py-2 rounded-md">
          <AlertCircle className="w-4 h-4 mr-1.5" />
          {error}
        </div>
      )}
      <div className="relative flex-1">
        <textarea
          className={`absolute inset-0 w-full h-full p-4 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your JSON here..."
          spellCheck={false}
        />
      </div>
    </div>
  );
}