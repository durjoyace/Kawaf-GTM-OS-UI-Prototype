"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowRight, CheckCircle, Loader2, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [mode, setMode] = useState<"magic" | "credentials">("magic");
  const [credError, setCredError] = useState("");
  const router = useRouter();

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn("resend", { email, redirect: false });
    setLoading(false);
    setSent(true);
  }

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setCredError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setCredError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center mb-2">
            <span className="text-black font-bold text-lg">K</span>
          </div>
          <CardTitle className="text-2xl text-white">
            {sent ? "Check your email" : "Sign in to Kawaf"}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {sent
              ? "We sent a magic link to your email. Click it to sign in."
              : mode === "magic"
                ? "Enter your email to receive a magic sign-in link."
                : "Sign in with your test credentials."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <p className="text-sm text-slate-400 text-center">
                Sent to <span className="text-white font-medium">{email}</span>
              </p>
              <Button
                variant="ghost"
                className="text-slate-400 hover:text-white"
                onClick={() => setSent(false)}
              >
                Use a different email
              </Button>
            </div>
          ) : mode === "magic" ? (
            <div className="space-y-4">
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !email}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Continue with Email
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-slate-900 px-2 text-slate-500">or</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
                onClick={() => setMode("credentials")}
              >
                <Lock className="w-4 h-4 mr-2" />
                Sign in with password
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <form onSubmit={handleCredentials} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                {credError && (
                  <p className="text-sm text-red-400">{credError}</p>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !email || !password}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
              <Button
                variant="ghost"
                className="w-full text-slate-400 hover:text-white"
                onClick={() => setMode("magic")}
              >
                Use magic link instead
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
