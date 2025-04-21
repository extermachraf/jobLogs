"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useJobContext } from "./JobContext";
import useManuallSave from "@/states/ManuallSave";
import { Button } from "./ui/button";
import useCompanyState, { CompanyState } from "@/states/Company";
import useJobState from "@/states/Job";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { jobtSchema } from "@/schema/jobSchema";
import JobForm from "./forms/JobForm";

export default function ManualJobGenerator() {
  const { value, setValue } = useManuallSave();

  return (
    <div className="mx-auto container h-full pb-16">
      <JobForm />
    </div>
  );
}
