import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().trim().min(3, 'Project title is required.'),
  description: z.string().trim().min(12, 'Add a brief description.'),
  status: z.enum(['Planning', 'In Progress', 'Completed', 'Archived']),
  category: z.string().trim().min(2, 'Category is required.'),
  techStack: z.array(z.string()).default([]),
  githubRepoUrl: z.string().trim().url('Enter a valid repository URL').or(z.literal('')).optional(),
  liveDemoUrl: z.string().trim().url('Enter a valid URL').or(z.literal('')).optional(),
  tags: z.array(z.string()).default([]),
  startDate: z.string().optional(),
  notes: z.string().optional(),
  favorite: z.boolean().optional(),
  archived: z.boolean().optional(),
})
