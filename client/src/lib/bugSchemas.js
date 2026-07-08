import { z } from 'zod'

export const bugSchema = z.object({
  title: z.string().trim().min(3, 'A title is required.'),
  shortDescription: z.string().trim().min(8, 'Add a concise summary.'),
  detailedDescription: z.string().trim().min(12, 'Add more detail about the bug.'),
  technology: z.array(z.string()).default([]),
  programmingLanguage: z.string().trim().min(1, 'Programming language is required.'),
  framework: z.string().trim().min(1, 'Framework is required.'),
  severity: z.enum(['Low', 'Medium', 'High', 'Critical']),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']),
  status: z.enum(['Open', 'Solved', 'Recurring', 'Archived']),
  errorMessage: z.string().trim().min(3, 'Add the error message.'),
  solution: z.string().trim().min(6, 'Capture the solution you used.'),
  rootCause: z.string().trim().min(6, 'Describe the root cause.'),
  lessonsLearned: z.string().trim().min(4, 'Add a note for future reference.'),
  tags: z.array(z.string()).default([]),
  screenshotUrl: z.string().optional(),
  codeSnippet: z.string().optional(),
  referenceLinks: z.array(z.string()).default([]),
  favorite: z.boolean().optional(),
  archived: z.boolean().optional(),
})
