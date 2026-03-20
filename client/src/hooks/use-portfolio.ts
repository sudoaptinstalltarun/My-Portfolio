import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import type { InsertContactMessage } from "@shared/schema";

import * as portfolioData from "../data/portfolio";

// Helper to throw on error
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => portfolioData.projects,
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => portfolioData.skills,
  });
}

export function useExperience() {
  return useQuery({
    queryKey: ["experience"],
    queryFn: async () => portfolioData.experience,
  });
}

export function useEducation() {
  return useQuery({
    queryKey: ["education"],
    queryFn: async () => portfolioData.education,
  });
}

export function useContact() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      // Client-side validation using Zod schema from routes if needed, 
      // but api.contact.create.input.parse(data) would be redundant if using form lib
      const res = await fetch(api.contact.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to send message");
      }
      
      return api.contact.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
