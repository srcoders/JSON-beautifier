import React, { useState } from 'react';
import { Code2, Github } from 'lucide-react';
import { JsonInput } from './components/JsonInput';
import { OutputPanel } from './components/OutputPanel';

function App() {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [formattedJson, setFormattedJson] = useState('');

  const formatJson = (value: string) => {
    if (!value.trim()) {
      setFormattedJson('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(value);
      const formatted = JSON.stringify(parsed, null, 2);
      setFormattedJson(formatted);
      setError(null);
    } catch (err) {
      setError('Invalid JSON format');
      setFormattedJson('');
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    formatJson(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col">
      <header className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Code2 className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">JSON Beautifier</h1>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-8rem)]">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden h-full">
            <div className="p-6 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <JsonInput
                  value={input}
                  onChange={handleInputChange}
                  error={error}
                />
                <OutputPanel formattedJson={formattedJson} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-800/50 border-t border-slate-700 py-4">
        <p className="text-center text-gray-400 text-sm">
          Built with React and Tailwind CSS
        </p>
      </footer>
    </div>
  );
}

export default App;