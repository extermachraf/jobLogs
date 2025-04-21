"use client";
import { useState } from "react";
import { useJobContext } from "./JobContext";
import PromptForm from "./forms/PromptForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promptSchema, PromptSchema } from "@/schema/promptSchema";

export default function AiJobGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setJobData } = useJobContext();

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/job-parser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: prompt }),
      });

      const result = await response.json();
      console.log("Parsed job data:", result);

      if (!result.success) {
        throw new Error(result.error || "Failed to parse job description");
      }

      // Set the parsed data in context
      setJobData(result.data);
    } catch (error) {
      console.error("Error generating job:", error);
      // TODO: Add error handling UI
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container h-full flex flex-col justify-center gap-[200px] pt-28">
      <h2 className="text-2xl font-bold text-center">
        Take Control of Your Job Search Journey with <br />
        Clarity and Confidence
      </h2>
      <div className="">
        <PromptForm />
      </div>
    </div>
  );
}
