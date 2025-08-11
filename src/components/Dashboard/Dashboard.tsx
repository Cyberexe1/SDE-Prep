import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, Calendar, BarChart, BookOpen, Plus, X, Code, LogOut, ChevronRight } from 'lucide-react';
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
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [newApplication, setNewApplication] = useState({
    company: '',
    role: '',
    status: 'applied'
  });
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [activeSection, setActiveSection] = useState<'overview' | 'coding' | 'interviews' | 'soft-skills'>('overview');

  const toggleTaskCompletion = (taskId: string) => {
    setStudyPlan(studyPlan.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTaskItem: StudyTask = {
      id: Date.now().toString(),
      ...newTask,
      completed: false
    };
    setStudyPlan([...studyPlan, newTaskItem]);
    setShowAddTask(false);
    setNewTask({ title: '', description: '', dueDate: '' });
  };

  const handleEditTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTaskId) {
      setStudyPlan(studyPlan.map(task =>
        task.id === editingTaskId ? { 
          ...task, 
          title: newTask.title || task.title,
          description: newTask.description || task.description,
          dueDate: newTask.dueDate || task.dueDate
        } : task
      ));
      setEditingTaskId(null);
      setNewTask({ title: '', description: '', dueDate: '' });
    }
  };

  const startEditTask = (task: StudyTask) => {
    setEditingTaskId(task.id);
    setNewTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate
    });
  };

  const deleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setStudyPlan(studyPlan.filter(task => task.id !== taskId));
    }
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

  const updateApplicationStatus = (appId: string, newStatus: 'applied' | 'interview' | 'offer' | 'rejected') => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
  };

  const deleteApplication = (appId: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setApplications(applications.filter(app => app.id !== appId));
    }
  };

  const scheduleInterview = (appId: string, date: string) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: 'interview', nextInterview: date } : app
    ));
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
                <button
                  onClick={() => setShowAddTask(true)}
                  className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Task
                </button>
              </div>
              
              {/* Add Task Modal */}
              {showAddTask && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Add New Study Task</h3>
                      <button onClick={() => setShowAddTask(false)}>
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <form onSubmit={handleAddTask}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={newTask.title}
                            onChange={(e) => setNewTask({
                              ...newTask,
                              title: e.target.value
                            })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={newTask.description}
                            onChange={(e) => setNewTask({
                              ...newTask,
                              description: e.target.value
                            })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Due Date
                          </label>
                          <input
                            type="date"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({
                              ...newTask,
                              dueDate: e.target.value
                            })}
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                          Add Task
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              {/* Edit Task Modal */}
              {editingTaskId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Edit Study Task</h3>
                      <button onClick={() => setEditingTaskId(null)}>
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <form onSubmit={handleEditTask}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={newTask.title}
                            onChange={(e) => setNewTask({
                              ...newTask,
                              title: e.target.value
                            })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={newTask.description}
                            onChange={(e) => setNewTask({
                              ...newTask,
                              description: e.target.value
                            })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Due Date
                          </label>
                          <input
                            type="date"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({
                              ...newTask,
                              dueDate: e.target.value
                            })}
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                {studyPlan.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No study tasks yet. Add your first task to get started!</p>
                ) : (
                  studyPlan.map(task => (
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
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
                          <button 
                            onClick={() => startEditTask(task)}
                            className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => deleteTask(task.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
                  <button 
                    onClick={() => setActiveSection('coding')} 
                    className="bg-indigo-50 p-4 rounded-lg text-left hover:bg-indigo-100 transition-colors"
                  >
                    <h3 className="text-indigo-900 font-medium mb-1">Current Streak</h3>
                    <p className="text-2xl font-bold text-indigo-600">{progress.streak} days</p>
                    <p className="text-xs text-indigo-700 mt-2">Click to view coding challenges</p>
                  </button>
                  <button 
                    onClick={() => setActiveSection('interviews')} 
                    className="bg-orange-50 p-4 rounded-lg text-left hover:bg-orange-100 transition-colors"
                  >
                    <h3 className="text-orange-900 font-medium mb-1">Mock Tests</h3>
                    <p className="text-2xl font-bold text-orange-600">{progress.mockTestsPending} pending</p>
                    <p className="text-xs text-orange-700 mt-2">Click to view mock interviews</p>
                  </button>
                  <button 
                    onClick={() => setActiveSection('soft-skills')} 
                    className="bg-green-50 p-4 rounded-lg text-left hover:bg-green-100 transition-colors"
                  >
                    <h3 className="text-green-900 font-medium mb-1">Interviews</h3>
                    <p className="text-2xl font-bold text-green-600">{progress.upcomingInterviews} upcoming</p>
                    <p className="text-xs text-green-700 mt-2">Click to view soft skills training</p>
                  </button>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Earned Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    {progress.badges.map(badge => (
                      <button 
                        key={badge} 
                        onClick={() => alert(`Badge: ${badge}\n\nThis badge was earned for your achievements in the SDE Prep platform. Continue your learning journey to earn more badges!`)}
                        className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm hover:bg-indigo-200 transition-colors cursor-pointer"
                      >
                        {badge}
                      </button>
                    ))}
                  </div>
                  <button 
                    className="mt-3 text-sm text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
                    onClick={() => alert('View all available badges and how to earn them')}
                  >
                    <span>View all badges</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          No applications yet. Add your first application to get started!
                        </td>
                      </tr>
                    ) : (
                      applications.map(app => (
                        <tr key={app.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">{app.company}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{app.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="relative inline-block text-left">
                              <button 
                                type="button" 
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer
                                  ${app.status === 'interview' ? 'bg-green-100 text-green-800' : 
                                  app.status === 'offer' ? 'bg-blue-100 text-blue-800' :
                                  app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'}`}
                                onClick={() => {
                                  const statusOptions = ['applied', 'interview', 'offer', 'rejected'];
                                  const currentIndex = statusOptions.indexOf(app.status);
                                  const nextStatus = statusOptions[(currentIndex + 1) % statusOptions.length] as 'applied' | 'interview' | 'offer' | 'rejected';
                                  updateApplicationStatus(app.id, nextStatus);
                                }}
                              >
                                {app.status}
                                <svg className="-mr-1 ml-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {app.status === 'interview' ? (
                              <div className="flex items-center">
                                <span className="text-gray-500 mr-2">{app.nextInterview || 'Set date:'}</span>
                                <input 
                                  type="date" 
                                  className="border border-gray-300 rounded-md px-2 py-1 text-xs"
                                  value={app.nextInterview || ''}
                                  onChange={(e) => scheduleInterview(app.id, e.target.value)}
                                />
                              </div>
                            ) : (
                              <span className="text-gray-500">
                                {app.status === 'applied' ? 'Waiting for response' : 
                                 app.status === 'offer' ? 'Received offer' : 'Application closed'}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              onClick={() => deleteApplication(app.id)}
                              className="text-red-600 hover:text-red-900 mr-2"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
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