from typing import List, Optional, Literal
from pydantic import BaseModel, EmailStr, Field

class UserRegister(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: Literal['teacher', 'student']

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str

class TokenResponse(BaseModel):
    message: str
    user: UserResponse
    token: str

class SyllabusTopic(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    subtopics: Optional[List[str]] = None
    estimatedHours: int
    complexity: Literal['Easy', 'Medium', 'Hard']
    importanceScore: int
    learningOutcomes: Optional[List[str]] = None

class SyllabusUnit(BaseModel):
    id: str
    unitNumber: int
    title: str
    description: Optional[str] = None
    topics: List[SyllabusTopic]

class TeachingSession(BaseModel):
    sessionNumber: int
    title: str
    unitReferences: List[str]
    topicsCovered: List[str]
    estimatedDurationMinutes: int
    learningObjectives: List[str]
    teachingApproach: str
    suggestedPracticalActivity: Optional[str] = None
    quickRevisionQuestions: List[str]
    expectedLearningOutcome: str
    difficulty: Literal['Beginner', 'Intermediate', 'Advanced']
    coverageStatus: Literal['Full', 'Condensed', 'Review Needed']

class TeachingPlan(BaseModel):
    id: str
    syllabusId: str
    totalUnitsCount: int
    totalTopicsCount: int
    estimatedInstructionalHours: int
    estimatedSessionsRequired: int
    requestedSessions: int
    coveragePercentage: int
    sessions: List[TeachingSession]
    topicsRequiringReview: List[str]
    uncoveredOrAmbiguousTopics: List[str]
    workloadWarning: Optional[str] = None
    createdAt: str

class SyllabusResponse(BaseModel):
    id: str
    userId: str
    subjectName: str
    subjectCode: Optional[str] = None
    department: Optional[str] = None
    semester: Optional[str] = None
    university: Optional[str] = None
    originalFileName: Optional[str] = None
    fileType: Literal['pdf', 'docx', 'txt', 'text']
    rawText: str
    status: Literal['Uploaded', 'Processing', 'Completed', 'Needs Review', 'Failed']
    processingError: Optional[str] = None
    isDemo: Optional[bool] = False
    version: str
    units: List[SyllabusUnit]
    teachingPlan: Optional[TeachingPlan] = None
    createdAt: str
    updatedAt: str

class QuestionGenerateRequest(BaseModel):
    syllabusId: str
    selectedUnits: List[str] = []
    selectedTopics: List[str] = []
    marks: Literal[1, 2, 5, 10, 14, 16]
    questionType: Literal['Theory', 'Numerical', 'Programming', 'Diagram Based', 'Case Study', 'Problem Solving', 'Mixed']
    difficulty: Literal['Easy', 'Medium', 'Hard', 'Mixed']
    questionCount: int = Field(default=5, ge=1, le=20)
    importanceFilter: Literal['Very High', 'High', 'Medium', 'All'] = 'All'
    universityName: Optional[str] = None

class GeneratedQuestion(BaseModel):
    id: str
    questionNumber: int
    questionText: str
    marks: int
    questionType: str
    unitTitle: str
    topicTitle: str
    difficulty: Literal['Easy', 'Medium', 'Hard']
    predictedImportance: Literal['Very High', 'High', 'Medium', 'Low']
    starRating: int
    scorePercentage: int
    sourceSyllabusRef: str
    rationale: str
    suggestedAnswerOutline: Optional[List[str]] = None

class QuestionRequestRecord(BaseModel):
    id: str
    studentId: str
    syllabusId: str
    subjectName: str
    selectedUnits: List[str]
    selectedTopics: List[str]
    marks: int
    questionType: str
    difficulty: str
    questionCount: int
    importanceFilter: str
    universityName: Optional[str] = None
    isDemoGeneration: Optional[bool] = False
    questions: List[GeneratedQuestion]
    createdAt: str
