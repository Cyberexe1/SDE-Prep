import React, { useState } from 'react';
import { MessageCircle, FileText, Award, CheckCircle, ChevronRight, Briefcase, Users, Brain } from 'lucide-react';

interface Exercise {
  id: string;
  title: string;
  type: 'quiz' | 'interactive' | 'assessment';
  category: 'communication' | 'teamwork' | 'problem-solving' | 'leadership';
  description: string;
  completed: boolean;
  questions?: Question[];
}

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface ProfileReview {
  id: string;
  type: 'resume' | 'linkedin';
  status: 'pending' | 'completed';
  submittedAt: string;
  feedback?: string;
  score?: number;
}

const mockExercises: Exercise[] = [
  {
    id: '1',
    title: 'Effective Communication Quiz',
    type: 'quiz',
    category: 'communication',
    description: 'Test your knowledge of effective communication principles in a professional setting.',
    completed: true,
    questions: [
      {
        id: 'q1',
        text: 'Which of the following is NOT an effective active listening technique?',
        options: [
          'Maintaining eye contact',
          'Interrupting to show engagement',
          'Nodding to show understanding',
          'Asking clarifying questions'
        ],
        correctAnswer: 1
      },
      {
        id: 'q2',
        text: 'What is the best way to handle a disagreement with a team member?',
        options: [
          'Avoid the topic completely',
          'Discuss it privately with other team members',
          'Address it directly but respectfully',
          'Escalate to management immediately'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '2',
    title: 'Team Collaboration Scenarios',
    type: 'interactive',
    category: 'teamwork',
    description: 'Practice responding to common team collaboration challenges through interactive scenarios.',
    completed: false
  },
  {
    id: '3',
    title: 'Problem-Solving Assessment',
    type: 'assessment',
    category: 'problem-solving',
    description: 'Evaluate your approach to solving complex problems under time constraints.',
    completed: false
  },
  {
    id: '4',
    title: 'Leadership Style Analysis',
    type: 'quiz',
    category: 'leadership',
    description: 'Discover your natural leadership style and learn how to adapt it to different situations.',
    completed: false
  }
];

const mockProfileReviews: ProfileReview[] = [
  {
    id: '1',
    type: 'resume',
    status: 'completed',
    submittedAt: '2025-03-15T10:30:00',
    feedback: 'Your resume effectively highlights your technical skills, but could benefit from more quantifiable achievements. Consider adding metrics to demonstrate impact in your previous roles.',
    score: 85
  },
  {
    id: '2',
    type: 'linkedin',
    status: 'pending',
    submittedAt: '2025-03-18T14:45:00'
  }
];

export function SoftSkillsTraining() {
  const [activeTab, setActiveTab] = useState<'exercises' | 'profile-review'>('exercises');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [reviewType, setReviewType] = useState<'resume' | 'linkedin'>('resume');

  const categories = [
    { id: 'communication', name: 'Communication', icon: MessageCircle },
    { id: 'teamwork', name: 'Teamwork', icon: Users },
    { id: 'problem-solving', name: 'Problem Solving', icon: Brain },
    { id: 'leadership', name: 'Leadership', icon: Briefcase }
  ];

  const filteredExercises = selectedCategory 
    ? mockExercises.filter(exercise => exercise.category === selectedCategory)
    : mockExercises;

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (selectedExercise?.questions && currentQuestionIndex < selectedExercise.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    if (!selectedExercise?.questions) return 0;
    
    let correctCount = 0;
    selectedExercise.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    return Math.round((correctCount / selectedExercise.questions.length) * 100);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileUpload(e.target.files[0]);
    }
  };

  const handleSubmitReview = () => {
    // In a real app, this would upload the file and submit for review
    alert('Your file has been submitted for review. You will receive feedback within 48 hours.');
    setFileUpload(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <Award className="w-6 h-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold">Soft Skills Training</h2>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('exercises')}
            className={`pb-2 px-1 ${
              activeTab === 'exercises'
                ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Exercises & Quizzes
          </button>
          <button
            onClick={() => setActiveTab('profile-review')}
            className={`pb-2 px-1 ${
              activeTab === 'profile-review'
                ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Profile Review
          </button>
        </div>
      </div>

      {/* Exercises Tab */}
      {activeTab === 'exercises' && !selectedExercise && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                className={`p-4 rounded-lg border flex flex-col items-center text-center ${
                  selectedCategory === category.id
                    ? 'bg-indigo-50 border-indigo-300'
                    : 'hover:bg-gray-50'
                }`}
              >
                <category.icon className={`w-8 h-8 mb-2 ${
                  selectedCategory === category.id ? 'text-indigo-600' : 'text-gray-500'
                }`} />
                <span className={selectedCategory === category.id ? 'text-indigo-700' : 'text-gray-700'}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredExercises.map(exercise => (
              <div
                key={exercise.id}
                onClick={() => setSelectedExercise(exercise)}
                className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center">
                      {exercise.completed && (
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      )}
                      <h3 className="font-medium">{exercise.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
                    <div className="mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        exercise.type === 'quiz'
                          ? 'bg-blue-100 text-blue-800'
                          : exercise.type === 'interactive'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {exercise.type.charAt(0).toUpperCase() + exercise.type.slice(1)}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Exercise View */}
      {activeTab === 'exercises' && selectedExercise && (
        <div>
          <button
            onClick={() => {
              setSelectedExercise(null);
              setCurrentQuestionIndex(0);
              setSelectedAnswers({});
              setShowResults(false);
            }}
            className="flex items-center text-indigo-600 mb-4"
          >
            <ChevronRight className="w-4 h-4 transform rotate-180 mr-1" />
            Back to Exercises
          </button>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-medium mb-2">{selectedExercise.title}</h3>
            <p className="text-gray-600 mb-6">{selectedExercise.description}</p>

            {selectedExercise.type === 'quiz' && selectedExercise.questions && !showResults ? (
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Question {currentQuestionIndex + 1} of {selectedExercise.questions.length}
                  </span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600"
                      style={{ width: `${((currentQuestionIndex + 1) / selectedExercise.questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-4">
                    {selectedExercise.questions[currentQuestionIndex].text}
                  </h4>
                  <div className="space-y-3">
                    {selectedExercise.questions[currentQuestionIndex].options.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => handleAnswerSelect(selectedExercise.questions![currentQuestionIndex].id, index)}
                        className={`p-3 border rounded-lg cursor-pointer ${
                          selectedAnswers[selectedExercise.questions![currentQuestionIndex].id] === index
                            ? 'bg-indigo-50 border-indigo-300'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswers[selectedExercise.questions[currentQuestionIndex].id] === undefined}
                    className={`px-4 py-2 rounded-md ${
                      selectedAnswers[selectedExercise.questions[currentQuestionIndex].id] !== undefined
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {currentQuestionIndex < selectedExercise.questions.length - 1 ? 'Next Question' : 'See Results'}
                  </button>
                </div>
              </div>
            ) : showResults ? (
              <div className="text-center py-6">
                <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-700">{calculateScore()}%</span>
                </div>
                <h4 className="text-xl font-medium mb-2">Quiz Completed!</h4>
                <p className="text-gray-600 mb-6">
                  {calculateScore() >= 70
                    ? 'Great job! You have a good understanding of this topic.'
                    : 'Keep practicing! Review the material and try again.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedExercise(null);
                    setCurrentQuestionIndex(0);
                    setSelectedAnswers({});
                    setShowResults(false);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Back to Exercises
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-600 mb-4">
                  This interactive exercise will guide you through various scenarios to practice your skills.
                </p>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Start Exercise
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Profile Review Tab */}
      {activeTab === 'profile-review' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-lg font-medium">Resume Review</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Get professional feedback on your resume from our AI-powered tool and career experts.
              </p>
              <button
                onClick={() => setReviewType('resume')}
                className={`w-full py-2 rounded-md ${
                  reviewType === 'resume'
                    ? 'bg-indigo-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Upload Resume
              </button>
            </div>
            <div className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium">LinkedIn Profile Review</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Optimize your LinkedIn profile with personalized recommendations to attract recruiters.
              </p>
              <button
                onClick={() => setReviewType('linkedin')}
                className={`w-full py-2 rounded-md ${
                  reviewType === 'linkedin'
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Upload Screenshot
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium mb-4">
              {reviewType === 'resume' ? 'Resume Review' : 'LinkedIn Profile Review'}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload your {reviewType === 'resume' ? 'resume (PDF)' : 'LinkedIn profile screenshot (PNG/JPG)'}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {fileUpload ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Selected file: {fileUpload.name}</p>
                    <button
                      onClick={() => setFileUpload(null)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop your file here, or click to select
                    </p>
                    <input
                      type="file"
                      accept={reviewType === 'resume' ? '.pdf' : '.png,.jpg,.jpeg'}
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200 inline-block"
                    >
                      Select File
                    </label>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleSubmitReview}
              disabled={!fileUpload}
              className={`w-full py-2 rounded-md ${
                fileUpload
                  ? reviewType === 'resume'
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit for Review
            </button>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Previous Reviews</h3>
            {mockProfileReviews.length > 0 ? (
              <div className="space-y-4">
                {mockProfileReviews.map(review => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          {review.type === 'resume' ? (
                            <FileText className="w-4 h-4 text-indigo-600 mr-2" />
                          ) : (
                            <Briefcase className="w-4 h-4 text-blue-600 mr-2" />
                          )}
                          <h4 className="font-medium">
                            {review.type === 'resume' ? 'Resume Review' : 'LinkedIn Profile Review'}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Submitted on {new Date(review.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          review.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    {review.status === 'completed' && review.feedback && (
                      <div className="mt-3">
                        {review.score !== undefined && (
                          <div className="flex items-center mb-2">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full"
                                style={{ width: `${review.score}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{review.score}%</span>
                          </div>
                        )}
                        <div className="p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-700">{review.feedback}</p>
                        </div>
                      </div>
                    )}
                    
                    {review.status === 'pending' && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded-md">
                        <p className="text-sm text-yellow-800">
                          Your review is in progress. You will receive feedback within 48 hours.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No previous reviews found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 