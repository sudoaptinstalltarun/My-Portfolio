import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed data on startup
  await storage.seedData();

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get(api.experience.list.path, async (req, res) => {
    const experience = await storage.getExperience();
    res.json(experience);
  });

  app.get(api.education.list.path, async (req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      await storage.createContactMessage(input);

      // Email Notification
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: "tarunkotian10@gmail.com",
          subject: `New Portfolio Message from ${input.name}`,
          text: `Name: ${input.name}\nEmail: ${input.email}\nMessage: ${input.message}`,
        };

        transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
          if (error) {
            console.error("Email error:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
      }

      res.status(201).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data" });
      } else {
        console.error("Server error:", err);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return httpServer;
}
