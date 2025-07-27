import React, { useState } from 'react';
import { MessageSquare, Calendar, Users, Star, Clock, ChevronRight, Video, Mic, FileText } from 'lucide-react';

interface Interview {
  id: string;
  type: 'AI' | 'Peer';
  title: string;
  description: string;
  duration: number; // in minutes
  scheduledFor?: string;
  status: 'scheduled' | 'completed' | 'available';
  feedback?: {
    rating: number;
    comments: string;
  };
}

interface InterviewQuestion {
  id: string;
  question: string;
  type: 'technical' | 'behavioral';
  difficulty: 'easy' | 'medium' | 'hard';
  sampleAnswer?: string;
}

const mockInterviews: Interview[] = [
  {
    id: '1',
    type: 'AI',
    title: 'Data Structures & Algorithms',
    description: 'Focus on arrays, linked lists, and basic algorithm questions',
    duration: 45,
    scheduledFor: '2025-03-25T14:00:00',
    status: 'scheduled'
  },
  {
    id: '2',
    type: 'Peer',
    title: 'System Design Basics',
    description: 'Practice designing scalable systems and discussing trade-offs',
    duration: 60,
    status: 'available'
  },
  {
    id: '3',
    type: 'AI',
    title: 'Behavioral Interview',
    description: 'Practice answering common behavioral questions',
    duration: 30,
    scheduledFor: '2025-03-20T10:00:00',
    status: 'completed',
    feedback: {
      rating: 4,
      comments: 'Good communication skills. Work on providing more specific examples.'
    }
  }
];

const mockQuestions: InterviewQuestion[] = [
  {
    id: '1',
    question: 'Explain the difference between an array and a linked list.',
    type: 'technical',
    difficulty: 'easy',
    sampleAnswer: 'Arrays store elements in contiguous memory locations, allowing for constant-time access using indices. Linked lists store elements as nodes with pointers to the next node, allowing for efficient insertions and deletions but requiring linear-time access to elements.'
  },
  {
    id: '2',
    question: 'Tell me about a time when you had to work under pressure to meet a deadline.',
    type: 'behavioral',
    difficulty: 'medium',
    sampleAnswer: 'During my final year project, our team faced a critical deadline due to unexpected technical challenges. I organized the team, prioritized tasks, and worked extra hours to ensure we delivered on time. This experience taught me the importance of adaptability and clear communication under pressure.'
  },
  {
    id: '3',
    question: 'Design a URL shortening service like bit.ly.',
    type: 'technical',
    difficulty: 'hard',
    sampleAnswer: 'I would design a system with a web server, application logic, and database. The core functionality would involve generating a unique short code for each URL using techniques like hashing or base62 encoding. The system would need to handle high read throughput, so I would implement caching and potentially a NoSQL database for storage.'
  },
  {
    id: '4',
    question: 'What is the difference between process and thread?',
    type: 'technical',
    difficulty: 'medium',
    sampleAnswer: 'A process is an instance of a program execution with its own memory space, while a thread is a lightweight execution unit within a process that shares the same memory space with other threads in the same process. Processes are isolated from each other, while threads can communicate more easily but require synchronization mechanisms to avoid race conditions.'
  },
  {
    id: '5',
    question: 'Describe a situation where you had to resolve a conflict within your team.',
    type: 'behavioral',
    difficulty: 'medium',
    sampleAnswer: 'In my previous role, two team members had different approaches to implementing a feature, which led to tension. I organized a meeting where both could present their ideas, facilitated a discussion of pros and cons, and helped the team reach a consensus by combining the best aspects of both approaches. This experience taught me the value of active listening and finding common ground.'
  },
  {
    id: '6',
    question: 'Explain the concept of database normalization and its benefits.',
    type: 'technical',
    difficulty: 'medium',
    sampleAnswer: 'Database normalization is the process of structuring a relational database to reduce data redundancy and improve data integrity. It involves organizing fields and tables to minimize dependency and redundancy by dividing large tables into smaller ones and defining relationships. Benefits include reduced storage space, better performance for certain queries, and elimination of anomalies that could lead to inconsistent data.'
  },
  {
    id: '7',
    question: 'Tell me about a time when you received critical feedback and how you responded to it.',
    type: 'behavioral',
    difficulty: 'medium',
    sampleAnswer: 'During a code review, a senior developer pointed out that my solution was inefficient and would not scale well. Initially, I felt defensive, but I took time to understand their perspective. I asked for specific suggestions, researched better approaches, and implemented an improved solution. I now actively seek feedback earlier in the development process and view it as an opportunity for growth rather than criticism.'
  },
  {
    id: '8',
    question: 'What are promises in JavaScript and how do they work?',
    type: 'technical',
    difficulty: 'easy',
    sampleAnswer: 'Promises in JavaScript are objects representing the eventual completion or failure of an asynchronous operation. They allow you to write asynchronous code in a more manageable way compared to callbacks. A promise has three states: pending, fulfilled, or rejected. You can chain promises using .then() for success cases and .catch() for error handling, making asynchronous code more readable and maintainable.'
  },
  {
    id: '9',
    question: 'Describe a situation where you had to learn a new technology or skill quickly.',
    type: 'behavioral',
    difficulty: 'easy',
    sampleAnswer: 'When my team needed to implement a new feature using GraphQL, which none of us had experience with, I volunteered to lead the learning effort. I created a structured learning plan, including official documentation, tutorials, and small practice projects. Within two weeks, I was able to implement a basic prototype and share my knowledge with the team through a workshop. This approach allowed us to deliver the feature on time while building valuable team expertise.'
  },
  {
    id: '10',
    question: 'Explain the concept of time and space complexity in algorithms.',
    type: 'technical',
    difficulty: 'medium',
    sampleAnswer: 'Time complexity measures how the runtime of an algorithm grows as the input size increases, while space complexity measures the amount of memory an algorithm needs. Both are typically expressed using Big O notation. For example, an algorithm with O(n) time complexity has a linear relationship between input size and runtime, while O(n²) indicates quadratic growth. When designing algorithms, we often need to balance these complexities, sometimes trading memory for speed or vice versa depending on the constraints.'
  },
  {
    id: '11',
    question: 'How would you design a distributed cache system?',
    type: 'technical',
    difficulty: 'hard',
    sampleAnswer: 'I would design a distributed cache with a consistent hashing mechanism to distribute data across multiple nodes, ensuring scalability and fault tolerance. The system would include features like data partitioning, replication for redundancy, a TTL (Time-To-Live) mechanism for cache invalidation, and an eviction policy like LRU. I would implement a monitoring system to track hit/miss ratios and latency. For consistency, I might use techniques like write-through or write-behind caching depending on the specific requirements for data freshness versus performance.'
  },
  {
    id: '12',
    question: 'Tell me about a time when you had to make a difficult decision with limited information.',
    type: 'behavioral',
    difficulty: 'hard',
    sampleAnswer: 'During a critical production issue, I had to decide whether to roll back a major feature release or attempt a fix with limited understanding of the root cause. With the system partially down and only fragmented error logs, I quickly gathered the available data, consulted with team members who had context on different components, and evaluated the risks of both options. I decided to implement a targeted fix rather than a full rollback, which proved successful. This experience taught me to establish better monitoring and create a structured decision-making framework for emergency situations.'
  },
  {
    id: '13',
    question: 'Explain the CAP theorem and its implications for distributed systems.',
    type: 'technical',
    difficulty: 'hard',
    sampleAnswer: 'The CAP theorem states that a distributed system cannot simultaneously provide all three of the following guarantees: Consistency (all nodes see the same data at the same time), Availability (every request receives a response), and Partition tolerance (the system continues to operate despite network failures). In practice, when a network partition occurs, you must choose between consistency and availability. Systems like traditional RDBMS prioritize consistency, while NoSQL databases like Cassandra prioritize availability. Understanding these trade-offs is crucial when designing distributed systems based on specific business requirements.'
  },
  {
    id: '14',
    question: 'Describe a situation where you demonstrated leadership without having a formal leadership role.',
    type: 'behavioral',
    difficulty: 'hard',
    sampleAnswer: 'When our team was struggling with an increasing number of bugs and technical debt, despite not being a team lead, I took initiative by analyzing patterns in our defects and creating a proposal for addressing root causes. I organized voluntary brown bag sessions to discuss code quality practices and volunteered to create a starter template for unit tests. By focusing on collaboration rather than criticism, I was able to get buy-in from both developers and management. Over three months, we reduced new defects by 40% and established better development practices that the team continues to follow.'
  },
  {
    id: '15',
    question: 'What is the difference between REST and GraphQL APIs?',
    type: 'technical',
    difficulty: 'medium',
    sampleAnswer: 'REST APIs use standard HTTP methods and typically have multiple endpoints for different resources, while GraphQL provides a single endpoint where clients can specify exactly what data they need. REST often results in over-fetching or under-fetching data, requiring multiple requests for complex data needs. GraphQL solves this by allowing clients to request precisely the data they need in a single request. However, GraphQL has a steeper learning curve, can be more complex to implement on the server side, and may have performance challenges with deeply nested queries that REST APIs might handle more efficiently with purpose-built endpoints.'
  }
];

export function MockInterviews() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'question-bank' | 'feedback'>('upcoming');
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [selectedQuestionType, setSelectedQuestionType] = useState<'all' | 'technical' | 'behavioral'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [showQuestionDetails, setShowQuestionDetails] = useState<string | null>(null);

  const upcomingInterviews = mockInterviews.filter(interview => interview.status === 'scheduled');
  const completedInterviews = mockInterviews.filter(interview => interview.status === 'completed');

  const filteredQuestions = mockQuestions.filter(question => {
    if (selectedQuestionType !== 'all' && question.type !== selectedQuestionType) {
      return false;
    }
    if (selectedDifficulty !== 'all' && question.difficulty !== selectedDifficulty) {
      return false;
    }
    return true;
  });

  const handleScheduleInterview = () => {
    // In a real app, this would make an API call to schedule the interview
    alert(`Interview scheduled for ${scheduleDate} at ${scheduleTime}`);
    setShowScheduleModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <MessageSquare className="w-6 h-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold">Mock Interviews</h2>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-2 px-1 ${
              activeTab === 'upcoming'
                ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Upcoming Interviews
          </button>
          <button
            onClick={() => setActiveTab('question-bank')}
            className={`pb-2 px-1 ${
              activeTab === 'question-bank'
                ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Question Bank
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`pb-2 px-1 ${
              activeTab === 'feedback'
                ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Feedback & History
          </button>
        </div>
      </div>

      {/* Upcoming Interviews Tab */}
      {activeTab === 'upcoming' && (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Scheduled Interviews</h3>
            {upcomingInterviews.length > 0 ? (
              <div className="space-y-4">
                {upcomingInterviews.map(interview => (
                  <div key={interview.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          {interview.type === 'AI' ? (
                            <Mic className="w-4 h-4 text-purple-600 mr-2" />
                          ) : (
                            <Users className="w-4 h-4 text-blue-600 mr-2" />
                          )}
                          <h4 className="font-medium">{interview.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{interview.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(interview.scheduledFor!).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(interview.scheduledFor!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="mt-2">
                          <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors">
                            Join
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No scheduled interviews.</p>
            )}
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Available Interview Types</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center mb-2">
                  <Mic className="w-5 h-5 text-purple-600 mr-2" />
                  <h4 className="font-medium">AI-Powered Interview</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Practice with our AI interviewer that adapts to your responses and provides instant feedback.
                </p>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors"
                >
                  Schedule
                </button>
              </div>
              <div className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-medium">Peer Interview</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Connect with another student for a mock interview session and exchange feedback.
                </p>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  Find a Partner
                </button>
              </div>
            </div>
          </div>

          {/* Schedule Modal */}
          {showScheduleModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-medium mb-4">Schedule Interview</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setShowScheduleModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleScheduleInterview}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Question Bank Tab */}
      {activeTab === 'question-bank' && (
        <div>
          <div className="flex flex-wrap gap-3 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question Type
              </label>
              <select
                value={selectedQuestionType}
                onChange={(e) => setSelectedQuestionType(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Types</option>
                <option value="technical">Technical</option>
                <option value="behavioral">Behavioral</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredQuestions.map(question => (
              <div key={question.id} className="border rounded-lg overflow-hidden">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setShowQuestionDetails(showQuestionDetails === question.id ? null : question.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {question.type === 'technical' ? (
                        <FileText className="w-4 h-4 text-indigo-600 mr-2" />
                      ) : (
                        <MessageSquare className="w-4 h-4 text-green-600 mr-2" />
                      )}
                      <span>{question.question}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-xs px-2 py-1 rounded-full mr-2 ${
                        question.difficulty === 'easy'
                          ? 'bg-green-100 text-green-800'
                          : question.difficulty === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {question.difficulty}
                      </span>
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${
                        showQuestionDetails === question.id ? 'transform rotate-90' : ''
                      }`} />
                    </div>
                  </div>
                </div>
                
                {showQuestionDetails === question.id && question.sampleAnswer && (
                  <div className="p-4 bg-gray-50 border-t">
                    <h4 className="font-medium mb-2">Sample Answer:</h4>
                    <p className="text-sm text-gray-700">{question.sampleAnswer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <div>
          <h3 className="text-lg font-medium mb-4">Interview History</h3>
          {completedInterviews.length > 0 ? (
            <div className="space-y-4">
              {completedInterviews.map(interview => (
                <div key={interview.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        {interview.type === 'AI' ? (
                          <Mic className="w-4 h-4 text-purple-600 mr-2" />
                        ) : (
                          <Users className="w-4 h-4 text-blue-600 mr-2" />
                        )}
                        <h4 className="font-medium">{interview.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{interview.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= (interview.feedback?.rating || 0)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {new Date(interview.scheduledFor!).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  {interview.feedback && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                      <h5 className="text-sm font-medium mb-1">Feedback:</h5>
                      <p className="text-sm text-gray-700">{interview.feedback.comments}</p>
                    </div>
                  )}
                  
                  <div className="mt-3 flex justify-end">
                    <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No completed interviews yet.</p>
          )}
        </div>
      )}
    </div>
  );
}