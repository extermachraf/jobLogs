"use client";
import AiJobGenerator from "@/components/AiJobGenerator";
import ManualJobGenerator from "@/components/ManualJobGenerator";
import { JobProvider } from "@/components/JobContext";
import { useState } from "react";
import useManuallSave from "@/states/ManuallSave";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { value, setValue } = useManuallSave();
  return (
    <JobProvider>
      <main className="h-screen">
        {!value ? (
          <AiJobGenerator />
        ) : (
          <div className="text-2xl">
            <ManualJobGenerator />
          </div>
        )}
        {value && <Button onClick={() => setValue(!value)}>use Ai</Button>}
      </main>
    </JobProvider>
  );
}
