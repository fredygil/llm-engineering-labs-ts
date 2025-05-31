
import React from 'react';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface ExecutionResultsProps {
  results: string | null;
  error: string | null;
  isExecuting: boolean;
}

export const ExecutionResults: React.FC<ExecutionResultsProps> = ({
  results,
  error,
  isExecuting
}) => {
  if (isExecuting) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Executing code...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-red-700 mb-2">
            <AlertCircle className="w-4 h-4" />
            <span className="font-medium">Execution Error</span>
          </div>
          <pre className="text-sm text-red-600 whitespace-pre-wrap">{error}</pre>
        </div>
      </div>
    );
  }

  if (results) {
    return (
      <div className="h-full p-4 overflow-y-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-green-700 mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">Execution Complete</span>
          </div>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{results}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center text-gray-500">
        <p className="text-sm">Click "Execute" to run your code</p>
        <p className="text-xs mt-1">Results will appear here</p>
      </div>
    </div>
  );
};
