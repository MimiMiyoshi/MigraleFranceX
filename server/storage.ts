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
  
  sessionStore: any;
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
      name: "観光ビザ（短期滞在）",
      description: "就労目的のない90日未満の滞在のためのビザ",
      requirements: "有効なパスポート、往復航空券、宿泊施設の証明、旅行保険"
    });

    const studentVisa = await this.createVisaType({
      name: "学生ビザ（長期滞在）",
      description: "90日以上のフランスでの勉学を目的としたビザ",
      requirements: "フランスの教育機関からの入学許可証、資金証明、住居証明"
    });

    const workVisa = await this.createVisaType({
      name: "就労ビザ（長期滞在）",
      description: "90日以上のフランスでの就労を目的としたビザ",
      requirements: "雇用契約書、雇用主からの推薦状、資格証明書"
    });

    const workingHolidayVisa = await this.createVisaType({
      name: "ワーキングホリデービザ",
      description: "若年層（18〜30歳）の旅行と一時的な就労のためのビザ",
      requirements: "有効なパスポート、往復航空券、資金証明、30歳未満であること"
    });

    // Create questions
    const q1 = await this.createQuestion({
      text: "フランスでの滞在予定期間はどのくらいですか？",
      category: "滞在期間",
      isRoot: true,
      nextQuestionId: null
    });

    const q2 = await this.createQuestion({
      text: "フランス滞在の主な目的は何ですか？",
      category: "目的",
      isRoot: false,
      nextQuestionId: null
    });

    const q3 = await this.createQuestion({
      text: "フランス滞在中に働く予定はありますか？",
      category: "就労",
      isRoot: false,
      nextQuestionId: null
    });

    const q4 = await this.createQuestion({
      text: "フランスの教育機関に在籍している、または入学予定ですか？",
      category: "教育",
      isRoot: false,
      nextQuestionId: null
    });

    const q5 = await this.createQuestion({
      text: "あなたの年齢層を教えてください",
      category: "個人情報",
      isRoot: false,
      nextQuestionId: null
    });

    // Create answer options
    await this.createAnswerOption({
      questionId: q1.id,
      text: "90日未満",
      nextQuestionId: q2.id
    });

    await this.createAnswerOption({
      questionId: q1.id,
      text: "90日〜1年",
      nextQuestionId: q2.id
    });

    await this.createAnswerOption({
      questionId: q1.id,
      text: "1年以上",
      nextQuestionId: q2.id
    });

    await this.createAnswerOption({
      questionId: q2.id,
      text: "観光・家族訪問",
      nextQuestionId: q3.id
    });

    await this.createAnswerOption({
      questionId: q2.id,
      text: "勉学",
      nextQuestionId: q4.id
    });

    await this.createAnswerOption({
      questionId: q2.id,
      text: "就労",
      nextQuestionId: q3.id
    });

    await this.createAnswerOption({
      questionId: q2.id,
      text: "家族との同居",
      nextQuestionId: q5.id
    });

    await this.createAnswerOption({
      questionId: q3.id,
      text: "はい、フルタイム",
      nextQuestionId: q5.id
    });

    await this.createAnswerOption({
      questionId: q3.id,
      text: "はい、パートタイム",
      nextQuestionId: q5.id
    });

    await this.createAnswerOption({
      questionId: q3.id,
      text: "いいえ",
      nextQuestionId: q5.id
    });

    await this.createAnswerOption({
      questionId: q4.id,
      text: "はい、大学",
      nextQuestionId: q5.id
    });

    await this.createAnswerOption({
      questionId: q4.id,
      text: "はい、語学学校",
      nextQuestionId: q5.id
    });

    await this.createAnswerOption({
      questionId: q4.id,
      text: "いいえ",
      nextQuestionId: q5.id
    });

    await this.createAnswerOption({
      questionId: q5.id,
      text: "18歳未満",
      nextQuestionId: null
    });

    await this.createAnswerOption({
      questionId: q5.id,
      text: "18〜30歳",
      nextQuestionId: null
    });

    await this.createAnswerOption({
      questionId: q5.id,
      text: "31〜60歳",
      nextQuestionId: null
    });

    await this.createAnswerOption({
      questionId: q5.id,
      text: "60歳以上",
      nextQuestionId: null
    });
  }
}

export const storage = new MemStorage();
