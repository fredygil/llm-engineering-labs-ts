
import React, { useState } from 'react';
import { Loader2, AlertCircle, CheckCircle, Info } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ExecutionMetadata {
  executionTime: number;
  tokensUsed?: number;
  weekNumber: number;
  exerciseNumber: number;
  exerciseTitle: string;
  status: 'success' | 'error';
}

interface ExecutionResultsProps {
  results: string | null;
  error: string | null;
  isExecuting: boolean;
  metadata?: ExecutionMetadata | null;
}

export const ExecutionResults: React.FC<ExecutionResultsProps> = ({
  results,
  error,
  isExecuting,
  metadata
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
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">Execution Error</span>
            </div>
            {metadata && (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-red-600 hover:text-red-800 transition-colors">
                    <Info className="w-4 h-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Execution Details</h4>
                    <div className="text-xs space-y-1 text-gray-600">
                      <div>Status: <span className="text-red-600 font-medium">Error</span></div>
                      <div>Week: {metadata.weekNumber}</div>
                      <div>Exercise: {metadata.exerciseNumber}</div>
                      <div>Title: {metadata.exerciseTitle}</div>
                      <div>Execution Time: {metadata.executionTime.toFixed(2)}s</div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
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
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 text-green-700">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">Output</span>
            </div>
            {metadata && (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-green-600 hover:text-green-800 transition-colors">
                    <Info className="w-4 h-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Execution Details</h4>
                    <div className="text-xs space-y-1 text-gray-600">
                      <div>Status: <span className="text-green-600 font-medium">Success</span></div>
                      <div>Week: {metadata.weekNumber}</div>
                      <div>Exercise: {metadata.exerciseNumber}</div>
                      <div>Title: {metadata.exerciseTitle}</div>
                      <div>Execution Time: {metadata.executionTime.toFixed(2)}s</div>
                      {metadata.tokensUsed && (
                        <div>Tokens Used: {metadata.tokensUsed}</div>
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
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
