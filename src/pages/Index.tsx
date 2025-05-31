
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ExerciseEditor } from '@/components/ExerciseEditor';
import { ApiKeyManager } from '@/components/ApiKeyManager';
import { exerciseData } from '@/data/exercises';

const Index = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedExercise, setSelectedExercise] = useState(0);
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const currentExercise = exerciseData[selectedWeek]?.exercises[selectedExercise];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        selectedWeek={selectedWeek}
        selectedExercise={selectedExercise}
        onWeekSelect={setSelectedWeek}
        onExerciseSelect={setSelectedExercise}
        onApiKeyClick={() => setShowApiKeyModal(true)}
        hasApiKey={!!apiKey}
      />
      
      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                LLM Engineering Exercise Platform
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Based on "LLM Engineering: Master AI, Large Language Models & Agents" by Ed Donner
              </p>
            </div>
            <button
              onClick={() => setShowApiKeyModal(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                apiKey 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              {apiKey ? 'API Key Set' : 'Set API Key'}
            </button>
          </div>
        </header>

        <div className="flex-1 p-6">
          {currentExercise ? (
            <ExerciseEditor
              exercise={currentExercise}
              weekNumber={selectedWeek}
              exerciseNumber={selectedExercise + 1}
              apiKey={apiKey}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Select an Exercise
                </h2>
                <p className="text-gray-500">
                  Choose a week and exercise from the sidebar to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <ApiKeyManager
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        apiKey={apiKey}
        onApiKeyChange={setApiKey}
      />
    </div>
  );
};

export default Index;
