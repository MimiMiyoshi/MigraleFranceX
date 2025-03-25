import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Questions API
  app.get("/api/questions", async (req, res) => {
    try {
      const questions = await storage.getAllQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  app.get("/api/questions/:id", async (req, res) => {
    try {
      const question = await storage.getQuestion(parseInt(req.params.id));
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch question" });
    }
  });

  app.get("/api/questions/root", async (req, res) => {
    try {
      const rootQuestion = await storage.getRootQuestion();
      if (!rootQuestion) {
        return res.status(404).json({ message: "Root question not found" });
      }
      res.json(rootQuestion);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch root question" });
    }
  });

  // Answer options API
  app.get("/api/questions/:id/options", async (req, res) => {
    try {
      const options = await storage.getAnswerOptionsByQuestionId(parseInt(req.params.id));
      res.json(options);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch answer options" });
    }
  });

  // Visa types API
  app.get("/api/visa-types", async (req, res) => {
    try {
      const visaTypes = await storage.getAllVisaTypes();
      res.json(visaTypes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch visa types" });
    }
  });

  app.get("/api/visa-types/:id", async (req, res) => {
    try {
      const visaType = await storage.getVisaType(parseInt(req.params.id));
      if (!visaType) {
        return res.status(404).json({ message: "Visa type not found" });
      }
      res.json(visaType);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch visa type" });
    }
  });

  // Tasks API (protected routes)
  app.get("/api/tasks", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const tasks = await storage.getTasksByUserId(req.user!.id);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });

  app.get("/api/tasks/visa/:visaTypeId", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const tasks = await storage.getTasksByUserAndVisaType(
        req.user!.id, 
        parseInt(req.params.visaTypeId)
      );
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tasks for visa type" });
    }
  });

  app.post("/api/tasks", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const task = await storage.createTask({
        ...req.body,
        userId: req.user!.id,
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: "Failed to create task" });
    }
  });

  app.patch("/api/tasks/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const taskId = parseInt(req.params.id);
      const task = await storage.getTask(taskId);
      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      if (task.userId !== req.user!.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const updatedTask = await storage.updateTask(taskId, req.body);
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: "Failed to update task" });
    }
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const taskId = parseInt(req.params.id);
      const task = await storage.getTask(taskId);
      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      if (task.userId !== req.user!.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const success = await storage.deleteTask(taskId);
      if (success) {
        res.status(204).send();
      } else {
        res.status(500).json({ message: "Failed to delete task" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete task" });
    }
  });

  // User responses API (protected routes)
  app.post("/api/responses", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const response = await storage.createUserResponse({
        ...req.body,
        userId: req.user!.id,
      });
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Failed to save response" });
    }
  });

  app.get("/api/responses", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const responses = await storage.getUserResponsesByUserId(req.user!.id);
      res.json(responses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch responses" });
    }
  });

  // Recommendations API (protected routes)
  app.post("/api/recommendations", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const recommendation = await storage.createRecommendation({
        ...req.body,
        userId: req.user!.id,
      });
      res.status(201).json(recommendation);
    } catch (error) {
      res.status(500).json({ message: "Failed to create recommendation" });
    }
  });

  app.get("/api/recommendations", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const recommendations = await storage.getRecommendationsByUserId(req.user!.id);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recommendations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
