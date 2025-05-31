
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, ChevronRight, Code } from 'lucide-react';
import { exerciseData } from '@/data/exercises';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Book className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              LLM Engineering Exercise Platform
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Based on "LLM Engineering: Master AI, Large Language Models & Agents" by Ed Donner. 
            Navigate through 8 weeks of hands-on exercises to master LLM engineering.
          </p>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {Object.entries(exerciseData).map(([week, weekData]) => (
              <Link
                key={week}
                to={`/week/${week}`}
                className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold">W{week}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Week {week}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {weekData.exercises.length} exercises
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                
                <h4 className="text-md font-medium text-gray-800 mb-3">
                  {weekData.title}
                </h4>
                
                <div className="space-y-2">
                  {weekData.exercises.slice(0, 3).map((exercise, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <Code className="w-3 h-3" />
                      <span className="truncate">{exercise.title}</span>
                    </div>
                  ))}
                  {weekData.exercises.length > 3 && (
                    <div className="text-sm text-gray-500">
                      +{weekData.exercises.length - 3} more exercises
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
