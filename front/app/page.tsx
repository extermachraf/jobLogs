"use client";
import AiJobGenerator from "@/components/AiJobGenerator";
import ManualJobGenerator from "@/components/ManualJobGenerator";
import { JobProvider } from "@/components/JobContext";
import { useState } from "react";
import useManuallSave from "@/states/ManuallSave";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { value } = useManuallSave();
  return (
    <JobProvider>
      <main className="h-screen pt-14 overflow-hidden">
        {!value ? (
          <AiJobGenerator />
        ) : (
          <div className="text-2xl h-screen">
            <ManualJobGenerator />
          </div>
        )}
      </main>
    </JobProvider>
  );
}
