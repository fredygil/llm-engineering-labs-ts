
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Code } from 'lucide-react';
import { exerciseData } from '@/data/exercises';

const WeekPage = () => {
  const { weekNumber } = useParams<{ weekNumber: string }>();
  const week = weekNumber ? parseInt(weekNumber) : 1;
  const weekData = exerciseData[week];

  if (!weekData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Week Not Found</h1>
          <p className="text-gray-600 mb-4">The requested week does not exist.</p>
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Week {week}: {weekData.title}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Choose an exercise to start coding
            </p>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {weekData.exercises.map((exercise, index) => (
              <Link
                key={index}
                to={`/week/${week}/exercise/${index + 1}`}
                className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Code className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Exercise {index + 1}
                    </h3>
                    <h4 className="text-md font-medium text-gray-700 mb-2">
                      {exercise.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {exercise.description}
                    </p>
                    <div className="mt-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {exercise.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WeekPage;
