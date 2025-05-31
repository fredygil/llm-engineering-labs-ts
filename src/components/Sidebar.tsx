
import React from 'react';
import { ChevronRight, Key, Book, Code } from 'lucide-react';
import { exerciseData } from '@/data/exercises';

interface SidebarProps {
  selectedWeek: number;
  selectedExercise: number;
  onWeekSelect: (week: number) => void;
  onExerciseSelect: (exercise: number) => void;
  onApiKeyClick: () => void;
  hasApiKey: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedWeek,
  selectedExercise,
  onWeekSelect,
  onExerciseSelect,
  onApiKeyClick,
  hasApiKey
}) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Book className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">LLM Engineering</h2>
            <p className="text-sm text-gray-500">8-Week Course</p>
          </div>
        </div>
        
        <button
          onClick={onApiKeyClick}
          className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            hasApiKey 
              ? 'bg-green-50 text-green-700 hover:bg-green-100' 
              : 'bg-red-50 text-red-700 hover:bg-red-100'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>{hasApiKey ? 'API Key Configured' : 'Configure API Key'}</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {Object.entries(exerciseData).map(([week, weekData]) => (
          <div key={week} className="border-b border-gray-100">
            <button
              onClick={() => onWeekSelect(parseInt(week))}
              className={`w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
                selectedWeek === parseInt(week) ? 'bg-blue-50 border-r-2 border-blue-600' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Week {week}</h3>
                  <p className="text-sm text-gray-500 mt-1">{weekData.title}</p>
                </div>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${
                  selectedWeek === parseInt(week) ? 'rotate-90' : ''
                }`} />
              </div>
            </button>
            
            {selectedWeek === parseInt(week) && (
              <div className="bg-gray-50">
                {weekData.exercises.map((exercise, index) => (
                  <button
                    key={index}
                    onClick={() => onExerciseSelect(index)}
                    className={`w-full px-8 py-3 text-left text-sm hover:bg-gray-100 transition-colors ${
                      selectedExercise === index ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4" />
                      <span>{exercise.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
