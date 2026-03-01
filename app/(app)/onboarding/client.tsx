"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepCompany } from "@/components/onboarding/step-company";
import { StepIcp } from "@/components/onboarding/step-icp";
import { StepCrm } from "@/components/onboarding/step-crm";
import { StepTracking } from "@/components/onboarding/step-tracking";
import { StepFirstSignal } from "@/components/onboarding/step-first-signal";

const STEPS = ["Company", "ICP", "CRM", "Tracking", "Ready"];

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [company, setCompany] = useState({ name: "", website: "", industry: "", size: "" });
  const [icp, setIcp] = useState({ industries: [] as string[], sizes: [] as string[], titles: [] as string[] });

  async function handleComplete() {
    await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, icp }),
    });
    router.push("/dashboard");
  }

  return (
    <div className="mx-auto max-w-lg">
      {/* Progress */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                i <= step
                  ? "bg-green-500 text-white"
                  : "border bg-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 w-6 ${i < step ? "bg-green-500" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Steps */}
      {step === 0 && (
        <StepCompany data={company} onChange={setCompany} onNext={() => setStep(1)} />
      )}
      {step === 1 && (
        <StepIcp data={icp} onChange={setIcp} onNext={() => setStep(2)} onBack={() => setStep(0)} />
      )}
      {step === 2 && (
        <StepCrm onNext={() => setStep(3)} onBack={() => setStep(1)} />
      )}
      {step === 3 && (
        <StepTracking onNext={() => setStep(4)} onBack={() => setStep(2)} />
      )}
      {step === 4 && (
        <StepFirstSignal onComplete={handleComplete} onBack={() => setStep(3)} />
      )}
    </div>
  );
}
