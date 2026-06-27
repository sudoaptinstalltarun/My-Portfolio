import { z } from 'zod';
import { 
  insertContactMessageSchema, 
  projectSchema, 
  skillSchema, 
  experienceSchema, 
  educationSchema 
} from './schema';

export const api = {
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects' as const,
      responses: {
        200: z.array(projectSchema),
      },
    },
  },
  skills: {
    list: {
      method: 'GET' as const,
      path: '/api/skills' as const,
      responses: {
        200: z.array(skillSchema),
      },
    },
  },
  experience: {
    list: {
      method: 'GET' as const,
      path: '/api/experience' as const,
      responses: {
        200: z.array(experienceSchema),
      },
    },
  },
  education: {
    list: {
      method: 'GET' as const,
      path: '/api/education' as const,
      responses: {
        200: z.array(educationSchema),
      },
    },
  },
  contact: {
    create: {
      method: 'POST' as const,
      path: '/api/contact' as const,
      input: insertContactMessageSchema,
      responses: {
        201: z.object({ success: z.boolean() }),
        400: z.object({ message: z.string() }),
      },
    },
  },
};
