"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { Loader2, MailCheck } from "lucide-react";
import { motion } from "framer-motion";
import useAuthStore from "@/store/useAuthstore";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export const dynamic = "force-dynamic"; 

export default function EmailVerify() {
  const router = useRouter();
  const { user } = useAuthStore();
  const userEmail = user?.email || "";
  const [email, setEmail] = useState(userEmail);
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  async function verifyOtp(otp: string, email: string) {
    if (!email || !otp) {
      toast.error("Email and OTP are required");
      return;
    }
    try {
      const res = await axiosInstance.post(`/auth/verify-email`, {
        email,
        otp,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        router.push("/sign-in");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Verification failed");
    }
  }

  const mutation = useMutation({
    mutationFn: () => verifyOtp(otp, email),
  });

  const resendMutation = useMutation({
    mutationFn: async (email: string) => {
      if (!email) throw new Error("Email is required to resend OTP");
      const res = await axiosInstance.post(`/auth/send-otp`, { email });
      return res.data;
    },
    onSuccess: (data) => {
      setResendTimer(30);
      toast.message(data.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    },
  });

  // countdown
  useEffect(() => {
    if (resendTimer === 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="w-[400px] rounded-2xl shadow-2xl border backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold">
              Verify Your Email
            </CardTitle>
            <p className="text-sm">Enter the 6-digit code sent to your email</p>
          </CardHeader>

          <CardContent className="flex flex-col items-start space-y-2">
            {!userEmail && (
              <>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}

            <Label>OTP</Label>
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <Button
              className="w-full rounded-xl mt-2"
              disabled={mutation.isPending || otp.length !== 6 || !email}
              onClick={() => mutation.mutate()}
            >
              {mutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <MailCheck className="w-4 h-4 mr-2" />
              )}
              {mutation.isPending ? "Verifying..." : "Verify"}
            </Button>

            {/* Resend OTP */}
            <div className="text-sm">
              Didn’t get the code?{" "}
              {resendTimer > 0 ? (
                <span>Resend in {resendTimer}s</span>
              ) : (
                <button
                  onClick={() => resendMutation.mutate(email)}
                  disabled={resendMutation.isPending || !email}
                  className="underline"
                >
                  {resendMutation.isPending ? "Sending..." : "Resend OTP"}
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
