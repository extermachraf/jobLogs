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
      <main className="pt-20">
        {!value ? (
          <AiJobGenerator />
        ) : (
          <div className=" ">
            <ManualJobGenerator />
          </div>
        )}
      </main>
    </JobProvider>
  );
}
