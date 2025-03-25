import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
});

export const loginUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Question model
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  category: text("category").notNull(),
  nextQuestionId: integer("next_question_id"),
  isRoot: boolean("is_root").default(false),
});

export const insertQuestionSchema = createInsertSchema(questions).pick({
  text: true,
  category: true,
  nextQuestionId: true,
  isRoot: true,
});

// Answer options model
export const answerOptions = pgTable("answer_options", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id").notNull(),
  text: text("text").notNull(),
  nextQuestionId: integer("next_question_id"),
});

export const insertAnswerOptionSchema = createInsertSchema(answerOptions).pick({
  questionId: true,
  text: true,
  nextQuestionId: true,
});

// Visa type model
export const visaTypes = pgTable("visa_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
});

export const insertVisaTypeSchema = createInsertSchema(visaTypes).pick({
  name: true,
  description: true,
  requirements: true,
});

// Tasks model
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  visaTypeId: integer("visa_type_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  dueDate: timestamp("due_date"),
  isCompleted: boolean("is_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  userId: true,
  visaTypeId: true,
  title: true,
  description: true,
  dueDate: true,
  isCompleted: true,
});

// UserResponses model
export const userResponses = pgTable("user_responses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  questionId: integer("question_id").notNull(),
  answerOptionId: integer("answer_option_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserResponseSchema = createInsertSchema(userResponses).pick({
  userId: true,
  questionId: true,
  answerOptionId: true,
});

// Recommendations model
export const recommendations = pgTable("recommendations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  visaTypeId: integer("visa_type_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRecommendationSchema = createInsertSchema(recommendations).pick({
  userId: true,
  visaTypeId: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type User = typeof users.$inferSelect;
export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type AnswerOption = typeof answerOptions.$inferSelect;
export type InsertAnswerOption = z.infer<typeof insertAnswerOptionSchema>;
export type VisaType = typeof visaTypes.$inferSelect;
export type InsertVisaType = z.infer<typeof insertVisaTypeSchema>;
export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type UserResponse = typeof userResponses.$inferSelect;
export type InsertUserResponse = z.infer<typeof insertUserResponseSchema>;
export type Recommendation = typeof recommendations.$inferSelect;
export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;
