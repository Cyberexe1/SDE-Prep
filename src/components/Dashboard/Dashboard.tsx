import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, Calendar, BarChart, BookOpen, Plus, X, Code, LogOut } from 'lucide-react';
import type { StudyTask, JobApplication } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { CodingChallenges } from './CodingChallenges';
import { MockInterviews } from './MockInterviews';
import { SoftSkillsTraining } from './SoftSkillsTraining';

const initialStudyPlan = [
  { id: '1', title: 'Arrays & Strings', description: 'Master basic array operations and string manipulation', completed: true, dueDate: '2025-03-20' },
  { id: '2', title: 'Linked Lists', description: 'Understanding singly and doubly linked lists', completed: false, dueDate: '2025-03-22' },
  { id: '3', title: 'Trees & Graphs', description: 'Binary trees, BST, and graph traversal', completed: false, dueDate: '2025-03-25' },
];

const initialProgress = {
  completedChallenges: 25,
  totalChallenges: 100,
  streak: 7,
  badges: ['Quick Learner', 'Problem Solver', 'Consistent'],
  mockTestsPending: 2,
  upcomingInterviews: 1
};

const initialApplications: JobApplication[] = [
  { id: '1', company: 'Tech Corp', role: 'SDE I', status: 'interview' as const, nextInterview: '2025-03-21' },
  { id: '2', company: 'Innovation Labs', role: 'Junior Developer', status: 'applied' as const },
];

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [studyPlan, setStudyPlan] = useState<StudyTask[]>(initialStudyPlan);
  const [applications, setApplications] = useState<JobApplication[]>(initialApplications);
  const [progress] = useState(initialProgress);
  const [showAddApplication, setShowAddApplication] = useState(false);
  const [newApplication, setNewApplication] = useState({
    company: '',
    role: '',
    status: 'applied'
  });
  const [activeSection, setActiveSection] = useState<'overview' | 'coding' | 'interviews' | 'soft-skills'>('overview');

  const toggleTaskCompletion = (taskId: string) => {
    setStudyPlan(studyPlan.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp: JobApplication = {
      id: Date.now().toString(),
      ...newApplication,
      status: 'applied'
    };
    setApplications([...applications, newApp]);
    setShowAddApplication(false);
    setNewApplication({ company: '', role: '', status: 'applied' });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-md w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Code className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">SDE Prep</span>
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome back, {user?.name}!</h1>
        
        {/* Navigation Tabs */}
        <div className="mb-8 border-b">
          <div className="flex flex-wrap -mb-px">
            <button
              onClick={() => setActiveSection('overview')}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'overview'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveSection('coding')}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'coding'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Coding Challenges
            </button>
            <button
              onClick={() => setActiveSection('interviews')}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'interviews'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Mock Interviews
            </button>
            <button
              onClick={() => setActiveSection('soft-skills')}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'soft-skills'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Soft Skills Training
            </button>
          </div>
        </div>
        
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Study Plan Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <BookOpen className="w-6 h-6 text-indigo-600 mr-2" />
                  <h2 className="text-xl font-semibold">Your Study Plan</h2>
                </div>
                <span className="text-sm text-gray-500">Daily Progress</span>
              </div>
              <div className="space-y-4">
                {studyPlan.map(task => (
                  <div key={task.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleTaskCompletion(task.id)}
                          className="focus:outline-none"
                        >
                          <CheckCircle 
                            className={`w-5 h-5 ${task.completed ? 'text-green-500' : 'text-gray-300'} 
                            hover:text-green-600 transition-colors`}
                          />
                        </button>
                        <div className="ml-3">
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-500">{task.description}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Tracking Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-6">
                <BarChart className="w-6 h-6 text-indigo-600 mr-2" />
                <h2 className="text-xl font-semibold">Progress Overview</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Challenges Completed</span>
                    <span className="font-medium">{progress.completedChallenges}/{progress.totalChallenges}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(progress.completedChallenges / progress.totalChallenges) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="text-indigo-900 font-medium mb-1">Current Streak</h3>
                    <p className="text-2xl font-bold text-indigo-600">{progress.streak} days</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="text-orange-900 font-medium mb-1">Mock Tests</h3>
                    <p className="text-2xl font-bold text-orange-600">{progress.mockTestsPending} pending</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-green-900 font-medium mb-1">Interviews</h3>
                    <p className="text-2xl font-bold text-green-600">{progress.upcomingInterviews} upcoming</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Earned Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    {progress.badges.map(badge => (
                      <span key={badge} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Job Applications Section */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Calendar className="w-6 h-6 text-indigo-600 mr-2" />
                  <h2 className="text-xl font-semibold">Job Applications</h2>
                </div>
                <button
                  onClick={() => setShowAddApplication(true)}
                  className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Application
                </button>
              </div>

              {/* Add Application Modal */}
              {showAddApplication && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Add New Application</h3>
                      <button onClick={() => setShowAddApplication(false)}>
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <form onSubmit={handleAddApplication}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={newApplication.company}
                            onChange={(e) => setNewApplication({
                              ...newApplication,
                              company: e.target.value
                            })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={newApplication.role}
                            onChange={(e) => setNewApplication({
                              ...newApplication,
                              role: e.target.value
                            })}
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                          Add Application
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Step</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map(app => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{app.company}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{app.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${app.status === 'interview' ? 'bg-green-100 text-green-800' : 
                            app.status === 'offer' ? 'bg-blue-100 text-blue-800' :
                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {app.nextInterview || 'Waiting for response'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Coding Challenges Section */}
        {activeSection === 'coding' && <CodingChallenges />}

        {/* Mock Interviews Section */}
        {activeSection === 'interviews' && <MockInterviews />}

        {/* Soft Skills Training Section */}
        {activeSection === 'soft-skills' && <SoftSkillsTraining />}
      </div>
    </div>
  );
}