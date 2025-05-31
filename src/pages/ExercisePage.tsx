
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ExerciseEditor } from '@/components/ExerciseEditor';
import { ApiKeyManager } from '@/components/ApiKeyManager';
import { exerciseData } from '@/data/exercises';

const ExercisePage = () => {
  const { weekNumber, exerciseNumber } = useParams<{ 
    weekNumber: string; 
    exerciseNumber: string; 
  }>();
  
  const week = weekNumber ? parseInt(weekNumber) : 1;
  const exerciseIndex = exerciseNumber ? parseInt(exerciseNumber) - 1 : 0;
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const weekData = exerciseData[week];
  const exercise = weekData?.exercises[exerciseIndex];

  if (!weekData || !exercise) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Exercise Not Found</h1>
          <p className="text-gray-600 mb-4">The requested exercise does not exist.</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to={`/week/${week}`}
              className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Week {week}
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Week {week}, Exercise {exerciseNumber}: {exercise.title}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {weekData.title}
              </p>
            </div>
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
        <ExerciseEditor
          exercise={exercise}
          weekNumber={week}
          exerciseNumber={exerciseIndex + 1}
          apiKey={apiKey}
        />
      </div>

      <ApiKeyManager
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        apiKey={apiKey}
        onApiKeyChange={setApiKey}
      />
    </div>
  );
};

export default ExercisePage;
