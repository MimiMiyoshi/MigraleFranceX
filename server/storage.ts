import { 
  User, InsertUser, Question, AnswerOption, VisaType, Task, 
  InsertTask, UserResponse, InsertUserResponse, Recommendation, 
  InsertRecommendation, InsertQuestion, InsertAnswerOption, InsertVisaType 
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// Define the Storage interface
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllQuestions(): Promise<Question[]>;
  getQuestion(id: number): Promise<Question | undefined>;
  getRootQuestion(): Promise<Question | undefined>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  getAnswerOptionsByQuestionId(questionId: number): Promise<AnswerOption[]>;
  getAnswerOption(id: number): Promise<AnswerOption | undefined>;
  createAnswerOption(answerOption: InsertAnswerOption): Promise<AnswerOption>;
  
  getAllVisaTypes(): Promise<VisaType[]>;
  getVisaType(id: number): Promise<VisaType | undefined>;
  createVisaType(visaType: InsertVisaType): Promise<VisaType>;
  
  getTasksByUserId(userId: number): Promise<Task[]>;
  getTasksByUserAndVisaType(userId: number, visaTypeId: number): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: Partial<Task>): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;
  
  getUserResponsesByUserId(userId: number): Promise<UserResponse[]>;
  createUserResponse(userResponse: InsertUserResponse): Promise<UserResponse>;
  
  getRecommendationsByUserId(userId: number): Promise<Recommendation[]>;
  createRecommendation(recommendation: InsertRecommendation): Promise<Recommendation>;
  
  sessionStore: session.SessionStore;
}

// Implement the in-memory storage
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private questions: Map<number, Question>;
  private answerOptions: Map<number, AnswerOption>;
  private visaTypes: Map<number, VisaType>;
  private tasks: Map<number, Task>;
  private userResponses: Map<number, UserResponse>;
  private recommendations: Map<number, Recommendation>;
  
  sessionStore: session.SessionStore;
  
  private currentUserId: number = 1;
  private currentQuestionId: number = 1;
  private currentAnswerOptionId: number = 1;
  private currentVisaTypeId: number = 1;
  private currentTaskId: number = 1;
  private currentUserResponseId: number = 1;
  private currentRecommendationId: number = 1;

  constructor() {
    this.users = new Map();
    this.questions = new Map();
    this.answerOptions = new Map();
    this.visaTypes = new Map();
    this.tasks = new Map();
    this.userResponses = new Map();
    this.recommendations = new Map();
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // One day in ms
    });
    
    // Initialize with some sample data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Question methods
  async getAllQuestions(): Promise<Question[]> {
    return Array.from(this.questions.values());
  }

  async getQuestion(id: number): Promise<Question | undefined> {
    return this.questions.get(id);
  }

  async getRootQuestion(): Promise<Question | undefined> {
    return Array.from(this.questions.values()).find(
      (question) => question.isRoot === true,
    );
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = this.currentQuestionId++;
    const question: Question = { ...insertQuestion, id };
    this.questions.set(id, question);
    return question;
  }

  // Answer option methods
  async getAnswerOptionsByQuestionId(questionId: number): Promise<AnswerOption[]> {
    return Array.from(this.answerOptions.values()).filter(
      (option) => option.questionId === questionId,
    );
  }

  async getAnswerOption(id: number): Promise<AnswerOption | undefined> {
    return this.answerOptions.get(id);
  }

  async createAnswerOption(insertAnswerOption: InsertAnswerOption): Promise<AnswerOption> {
    const id = this.currentAnswerOptionId++;
    const answerOption: AnswerOption = { ...insertAnswerOption, id };
    this.answerOptions.set(id, answerOption);
    return answerOption;
  }

  // Visa type methods
  async getAllVisaTypes(): Promise<VisaType[]> {
    return Array.from(this.visaTypes.values());
  }

  async getVisaType(id: number): Promise<VisaType | undefined> {
    return this.visaTypes.get(id);
  }

  async createVisaType(insertVisaType: InsertVisaType): Promise<VisaType> {
    const id = this.currentVisaTypeId++;
    const visaType: VisaType = { ...insertVisaType, id };
    this.visaTypes.set(id, visaType);
    return visaType;
  }

  // Task methods
  async getTasksByUserId(userId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      (task) => task.userId === userId,
    );
  }

  async getTasksByUserAndVisaType(userId: number, visaTypeId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      (task) => task.userId === userId && task.visaTypeId === visaTypeId,
    );
  }

  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.currentTaskId++;
    const now = new Date();
    const task: Task = { 
      ...insertTask, 
      id, 
      createdAt: now, 
      updatedAt: now 
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: number, taskUpdate: Partial<Task>): Promise<Task | undefined> {
    const existingTask = this.tasks.get(id);
    if (!existingTask) return undefined;
    
    const updatedTask: Task = {
      ...existingTask,
      ...taskUpdate,
      updatedAt: new Date(),
    };
    
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<boolean> {
    return this.tasks.delete(id);
  }

  // User response methods
  async getUserResponsesByUserId(userId: number): Promise<UserResponse[]> {
    return Array.from(this.userResponses.values()).filter(
      (response) => response.userId === userId,
    );
  }

  async createUserResponse(insertUserResponse: InsertUserResponse): Promise<UserResponse> {
    const id = this.currentUserResponseId++;
    const userResponse: UserResponse = { 
      ...insertUserResponse, 
      id, 
      createdAt: new Date() 
    };
    this.userResponses.set(id, userResponse);
    return userResponse;
  }

  // Recommendation methods
  async getRecommendationsByUserId(userId: number): Promise<Recommendation[]> {
    return Array.from(this.recommendations.values()).filter(
      (recommendation) => recommendation.userId === userId,
    );
  }

  async createRecommendation(insertRecommendation: InsertRecommendation): Promise<Recommendation> {
    const id = this.currentRecommendationId++;
    const recommendation: Recommendation = { 
      ...insertRecommendation, 
      id, 
      createdAt: new Date() 
    };
    this.recommendations.set(id, recommendation);
    return recommendation;
  }

  // Initialize with sample data
  private async initializeData() {
    // Create visa types
    const touristVisa = await this.createVisaType({
      name: "Tourist Visa (Short Stay)",
      description: "For stays less than 90 days without work purposes",
      requirements: "Valid passport, return ticket, proof of accommodation, travel insurance"
    });

    const studentVisa = await this.createVisaType({
      name: "Student Visa (Long Stay)",
      description: "For studies in France lasting more than 90 days",
      requirements: "Acceptance letter from French institution, proof of financial means, housing"
    });

    const workVisa = await this.createVisaType({
      name: "Work Visa (Long Stay)",
      description: "For employment in France lasting more than 90 days",
      requirements: "Work contract, employer sponsorship, qualification documents"
    });

    const workingHolidayVisa = await this.createVisaType({
      name: "Working Holiday Visa",
      description: "For young adults (18-30) to travel and work temporarily",
      requirements: "Valid passport, return ticket, proof of funds, under 30 years old"
    });

    // Create questions
    const q1 = await this.createQuestion({
      text: "How long do you plan to stay in France?",
      category: "Duration",
      isRoot: true,
      nextQuestionId: null
    });

    const q2 = await this.createQuestion({
      text: "What is the primary purpose of your stay?",
      category: "Purpose",
      isRoot: false,
      nextQuestionId: null
    });

    const q3 = await this.createQuestion({
      text: "Are you planning to work during your stay in France?",
      category: "Work",
      isRoot: false,
      nextQuestionId: null
    });

    const q4 = await this.createQuestion({
      text: "Are you enrolled or planning to enroll in a French educational institution?",
      category: "Education",
      isRoot: false,
      nextQuestionId: null
    });

    const q5 = await this.createQuestion({
      text: "What is your age group?",
      category: "Personal",
      isRoot: false,
      nextQuestionId: null
    });

    // Create answer options
    await this.createAnswerOption({
      questionId: q1.id,
      text: "Less than 90 days",
      nextQuestionId: q2.id
    });

    await this.createAnswerOption({
      questionId: q1.id,
      text: "90 days to 1 year",
      nextQuestionId: q2.id
    });

    await this.createAnswerOption({
      questionId: q1.id,
      text: "More than 1 year",
      nextQuestionId: q2.id
    });

    await this.createAnswerOption({
      questionId: q2.id,
      text: "Tourism/Visiting",
      nextQuestionId: q3.id
    });

    await this.createAnswerOption({
      questionId: q2.id,
      text: "Study",
      nextQuestionId: q4.id
    });

    await this.createAnswerOption({
      questionId: q2.id,
      text: "Work",
      nextQuestionId: q3.id
    });

    await this.createAnswerOption({
      questionId: q2.id,
      text: "Family Reunion",
      nextQuestionId: q5.id
    });

    await this.createAnswerOption({
      questionId: q3.id,
      text: "Yes, full-time",
      nextQuestionId: q5.id
    });

    await this.createAnswerOption({
      questionId: q3.id,
      text: "Yes, part-time",
      nextQuestionId: q5.id
    });

    await this.createAnswerOption({
      questionId: q3.id,
      text: "No",
      nextQuestionId: q5.id
    });

    await this.createAnswerOption({
      questionId: q4.id,
      text: "Yes, in a university",
      nextQuestionId: q5.id
    });

    await this.createAnswerOption({
      questionId: q4.id,
      text: "Yes, in a language school",
      nextQuestionId: q5.id
    });

    await this.createAnswerOption({
      questionId: q4.id,
      text: "No",
      nextQuestionId: q5.id
    });

    await this.createAnswerOption({
      questionId: q5.id,
      text: "Under 18",
      nextQuestionId: null
    });

    await this.createAnswerOption({
      questionId: q5.id,
      text: "18-30",
      nextQuestionId: null
    });

    await this.createAnswerOption({
      questionId: q5.id,
      text: "31-60",
      nextQuestionId: null
    });

    await this.createAnswerOption({
      questionId: q5.id,
      text: "Over 60",
      nextQuestionId: null
    });
  }
}

export const storage = new MemStorage();
