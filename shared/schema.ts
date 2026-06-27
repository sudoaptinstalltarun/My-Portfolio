import { z } from "zod";

export const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()).optional(),
  link: z.string().optional(),
  category: z.string(),
});

export const skillSchema = z.object({
  id: z.number(),
  category: z.string(),
  items: z.array(z.string()),
});

export const experienceSchema = z.object({
  id: z.number(),
  role: z.string(),
  company: z.string(),
  duration: z.string(),
  description: z.string(),
});

export const educationSchema = z.object({
  id: z.number(),
  degree: z.string(),
  institution: z.string(),
  year: z.string(),
});

export const contactMessageSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  message: z.string(),
  createdAt: z.string().nullable(),
});

export const insertContactMessageSchema = contactMessageSchema.omit({ id: true, createdAt: true });

export type Project = z.infer<typeof projectSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type ContactMessage = z.infer<typeof contactMessageSchema>;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
