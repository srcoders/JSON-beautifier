import React from 'react';
import { Copy, Check, FileText } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('json', json);

interface OutputPanelProps {
  formattedJson: string;
}

export function OutputPanel({ formattedJson }: OutputPanelProps) {
  const [copied, setCopied] = React.useState(false);
  
  const getFileSize = (str: string) => {
    const bytes = new Blob([str]).size;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Formatted Output</label>
          {formattedJson && (
            <div className="flex items-center text-sm text-gray-500">
              <FileText className="w-4 h-4 mr-1" />
              <span>{formattedJson.length.toLocaleString()} chars ({getFileSize(formattedJson)})</span>
            </div>
          )}
        </div>
        <button
          onClick={handleCopy}
          disabled={!formattedJson}
          className={`flex items-center px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
            formattedJson
              ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1.5" />
              <span className="font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1.5" />
              <span className="font-medium">Copy JSON</span>
            </>
          )}
        </button>
      </div>
      <div className="relative flex-1 rounded-lg border border-gray-300 bg-[#1e293b] overflow-hidden">
        <div className="absolute inset-0 overflow-auto">
          <SyntaxHighlighter
            language="json"
            style={atomOneDark}
            customStyle={{
              margin: 0,
              padding: '1rem',
              minHeight: '100%',
              backgroundColor: 'transparent',
            }}
            wrapLongLines={true}
          >
            {formattedJson || '// Formatted JSON will appear here'}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}