import React, { useState } from 'react';
import { Code, Filter, Play, Check, X, Trophy } from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  companies: string[];
  description: string;
  solved: boolean;
}

const mockProblems: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    topics: ['Arrays', 'Hash Table'],
    companies: ['Google', 'Amazon', 'Facebook'],
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    solved: true
  },
  {
    id: '2',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    topics: ['Arrays', 'Sorting'],
    companies: ['Amazon', 'Microsoft'],
    description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
    solved: false
  },
  {
    id: '3',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    topics: ['Arrays', 'Two Pointers', 'Dynamic Programming'],
    companies: ['Google', 'Amazon', 'Microsoft'],
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    solved: false
  },
  {
    id: '4',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topics: ['Stack', 'String'],
    companies: ['Google', 'Facebook'],
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    solved: true
  },
  {
    id: '5',
    title: 'LRU Cache',
    difficulty: 'Medium',
    topics: ['Hash Table', 'Linked List', 'Design'],
    companies: ['Amazon', 'Microsoft', 'Facebook'],
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
    solved: false
  },
];

const topics = ['Arrays', 'Strings', 'Hash Table', 'Linked List', 'Stack', 'Queue', 'Tree', 'Graph', 'Dynamic Programming', 'Greedy', 'Binary Search', 'Sorting'];
const companies = ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple', 'Netflix', 'Uber', 'LinkedIn'];
const languages = ['JavaScript', 'Python', 'Java', 'C++', 'Go'];

export function CodingChallenges() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('// Write your code here');
  const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');
  const [showFilters, setShowFilters] = useState(false);
  const [testResults, setTestResults] = useState<null | { passed: boolean; message: string }>(null);

  const toggleDifficulty = (difficulty: string) => {
    if (selectedDifficulty.includes(difficulty)) {
      setSelectedDifficulty(selectedDifficulty.filter(d => d !== difficulty));
    } else {
      setSelectedDifficulty([...selectedDifficulty, difficulty]);
    }
  };

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const toggleCompany = (company: string) => {
    if (selectedCompanies.includes(company)) {
      setSelectedCompanies(selectedCompanies.filter(c => c !== company));
    } else {
      setSelectedCompanies([...selectedCompanies, company]);
    }
  };

  const filteredProblems = mockProblems.filter(problem => {
    // Filter by difficulty
    if (selectedDifficulty.length > 0 && !selectedDifficulty.includes(problem.difficulty)) {
      return false;
    }
    
    // Filter by topics
    if (selectedTopics.length > 0 && !problem.topics.some(topic => selectedTopics.includes(topic))) {
      return false;
    }
    
    // Filter by companies
    if (selectedCompanies.length > 0 && !problem.companies.some(company => selectedCompanies.includes(company))) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !problem.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const runCode = () => {
    // Mock implementation of code execution
    setTimeout(() => {
      const passed = Math.random() > 0.5;
      setTestResults({
        passed,
        message: passed 
          ? 'All test cases passed!' 
          : 'Test case failed: Expected [0, 1] but got [1, 0]'
      });
    }, 1000);
  };

  const submitSolution = () => {
    // Mock implementation of solution submission
    alert('Solution submitted successfully!');
    if (selectedProblem) {
      // Mark problem as solved
      const updatedProblems = mockProblems.map(p => 
        p.id === selectedProblem.id ? { ...p, solved: true } : p
      );
      // In a real app, you would update the state or make an API call here
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Code className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold">Coding Challenges</h2>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          <Filter className="w-4 h-4 mr-1" />
          Filters
        </button>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium mb-2">Difficulty</h3>
              <div className="flex flex-wrap gap-2">
                {['Easy', 'Medium', 'Hard'].map(difficulty => (
                  <button
                    key={difficulty}
                    onClick={() => toggleDifficulty(difficulty)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedDifficulty.includes(difficulty)
                        ? difficulty === 'Easy'
                          ? 'bg-green-100 text-green-800'
                          : difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Topics</h3>
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                {topics.map(topic => (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTopics.includes(topic)
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Companies</h3>
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                {companies.map(company => (
                  <button
                    key={company}
                    onClick={() => toggleCompany(company)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCompanies.includes(company)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {company}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search problems..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Problem List */}
        <div className="lg:col-span-1 border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <h3 className="font-medium">Problems ({filteredProblems.length})</h3>
          </div>
          <div className="overflow-y-auto max-h-96">
            {filteredProblems.length > 0 ? (
              filteredProblems.map(problem => (
                <div
                  key={problem.id}
                  onClick={() => setSelectedProblem(problem)}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedProblem?.id === problem.id ? 'bg-indigo-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {problem.solved && (
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                      )}
                      <span className={problem.solved ? 'text-green-600' : ''}>
                        {problem.title}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        problem.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-800'
                          : problem.difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {problem.topics.slice(0, 2).map(topic => (
                      <span
                        key={topic}
                        className="text-xs bg-gray-100 px-2 py-0.5 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                    {problem.topics.length > 2 && (
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                        +{problem.topics.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No problems match your filters
              </div>
            )}
          </div>
        </div>

        {/* Problem Description and Code Editor */}
        <div className="lg:col-span-2 border rounded-lg overflow-hidden">
          {selectedProblem ? (
            <div className="h-full flex flex-col">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <h3 className="font-medium">{selectedProblem.title}</h3>
              </div>
              
              <div className="p-4 border-b overflow-y-auto">
                <p className="text-gray-700">{selectedProblem.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {selectedProblem.topics.map(topic => (
                    <span
                      key={topic}
                      className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedProblem.companies.map(company => (
                    <span
                      key={company}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-b">
                <div className="flex justify-between items-center mb-2">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={runCode}
                      className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Run
                    </button>
                    <button
                      onClick={submitSolution}
                      className="flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Submit
                    </button>
                  </div>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-48 p-3 font-mono text-sm focus:outline-none"
                    spellCheck="false"
                  />
                </div>
                
                {testResults && (
                  <div className={`mt-3 p-3 rounded-md ${
                    testResults.passed ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <div className="flex items-center">
                      {testResults.passed ? (
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                      ) : (
                        <X className="w-4 h-4 text-red-600 mr-2" />
                      )}
                      <span className={testResults.passed ? 'text-green-700' : 'text-red-700'}>
                        {testResults.message}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8 text-center text-gray-500">
              <div>
                <Trophy className="w-12 h-12 text-indigo-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">Select a Problem</h3>
                <p>Choose a coding challenge from the list to start solving</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 