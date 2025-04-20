import { z } from "zod";
export const promptSchema = z.object({
  prompt: z.string().min(10, {
    message: "Prompt is required",
  }),
});

export type PromptSchema = z.infer<typeof promptSchema>;
