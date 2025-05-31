import React, { useState } from 'react';
import { Play, Save, RotateCcw, AlertCircle } from 'lucide-react';
import { CodeEditor } from '@/components/CodeEditor';
import { ExecutionResults } from '@/components/ExecutionResults';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

interface Exercise {
  title: string;
  description: string;
  initialCode: string;
  category: string;
}

interface ExerciseEditorProps {
  exercise: Exercise;
  weekNumber: number;
  exerciseNumber: number;
  apiKey: string;
}

export const ExerciseEditor: React.FC<ExerciseEditorProps> = ({
  exercise,
  weekNumber,
  exerciseNumber,
  apiKey
}) => {
  const [code, setCode] = useState(exercise.initialCode);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResults, setExecutionResults] = useState<string | null>(null);
  const [executionError, setExecutionError] = useState<string | null>(null);

  const handleExecute = async () => {
    if (!apiKey) {
      setExecutionError('Please set your OpenAI API key first');
      return;
    }

    setIsExecuting(true);
    setExecutionError(null);
    setExecutionResults(null);

    // Simulate code execution
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful execution
      const mockResults = `
Execution completed successfully!

Week ${weekNumber}, Exercise ${exerciseNumber}: ${exercise.title}

Sample output:
${exercise.category === 'text-generation' ? 
  '✅ Generated text: "The future of AI is bright and full of possibilities..."' :
  exercise.category === 'embeddings' ?
  '✅ Embeddings computed: [0.1234, -0.5678, 0.9012, ...]' :
  exercise.category === 'fine-tuning' ?
  '✅ Model fine-tuned successfully with 95% accuracy' :
  '✅ Code executed successfully'
}

API calls made: 1
Tokens used: 150
Execution time: 1.2s
      `.trim();
      
      setExecutionResults(mockResults);
    } catch (error) {
      setExecutionError('An error occurred during execution');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleReset = () => {
    setCode(exercise.initialCode);
    setExecutionResults(null);
    setExecutionError(null);
  };

  const handleSave = () => {
    localStorage.setItem(`exercise_${weekNumber}_${exerciseNumber}`, code);
    console.log('Code saved locally');
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-gray-900">
            {exercise.title}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
              {exercise.category}
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-sm">{exercise.description}</p>
      </div>

      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={70} minSize={30}>
            <div className="flex flex-col h-full">
              <div className="border-b border-gray-200 px-4 py-2 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">Code Editor</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors flex items-center space-x-1"
                    >
                      <Save className="w-3 h-3" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors flex items-center space-x-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                    <button
                      onClick={handleExecute}
                      disabled={isExecuting || !apiKey}
                      className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 transition-colors flex items-center space-x-1"
                    >
                      <Play className="w-3 h-3" />
                      <span>{isExecuting ? 'Executing...' : 'Execute'}</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <CodeEditor code={code} onChange={setCode} />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="flex flex-col h-full">
              <div className="border-b border-gray-200 px-4 py-2 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-700">Results</h3>
              </div>
              
              <div className="flex-1">
                <ExecutionResults
                  results={executionResults}
                  error={executionError}
                  isExecuting={isExecuting}
                />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {!apiKey && (
        <div className="border-t border-gray-200 p-4 bg-yellow-50">
          <div className="flex items-center space-x-2 text-yellow-700">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">
              Set your OpenAI API key to execute code
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
