"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useForgotPassword, useSendOtp } from "@/hooks/useAuth"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showResetForm, setShowResetForm] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const forgotPasswordMutation = useForgotPassword()
  const sendOtpMutation = useSendOtp()

  const sendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await sendOtpMutation.mutateAsync({ phone: phone })
      toast.success("OTP sent to your phone")
      setShowResetForm(true)
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.")
    }
  }

  const handleResetPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    try {
      await forgotPasswordMutation.mutateAsync({
        phone,
        otp,
        password: newPassword
      })
      toast.success("Password reset successful")
      setIsSubmitted(true)
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <span className="text-xl font-bold text-primary-foreground">P</span>
            </div>
          </div>
          <CardTitle className="text-2xl">
            {isSubmitted
              ? "Password Reset"
              : showResetForm
                ? "Reset Your Password"
                : "Forgot Password"
            }
          </CardTitle>
          <CardDescription>
            {isSubmitted
              ? "Your password has been reset successfully"
              : showResetForm
                ? "Enter the OTP and your new password"
                : "Enter your phone address and we'll send you an OTP to reset your password"
            }
          </CardDescription>
        </CardHeader>
        {isSubmitted ? (
          <CardContent className="space-y-4">
            <Alert className="border-primary/50 bg-primary/10">
              <AlertDescription>
                Your password has been reset successfully. You can now login with your new password.
              </AlertDescription>
            </Alert>
            <div className="text-center">
              <Link href="/auth/login">
                <Button variant="link" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </Button>
              </Link>
            </div>
          </CardContent>
        ) : showResetForm ? (
          <form onSubmit={handleResetPasswordSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  placeholder="Enter OTP sent to your phone"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="button"
                variant="outline"
                className="w-full mt-4"
                onClick={() => setShowResetForm(false)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="submit" className="w-full" disabled={forgotPasswordMutation.isPending}>
                {forgotPasswordMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Resetting Password...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4" />
                    <span>Reset Password</span>
                  </div>
                )}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={sendOtp}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">phone</Label>
                <Input
                  id="phone"
                  type="phone"
                  placeholder="1236579562"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full mt-4" disabled={sendOtpMutation.isPending}>
                {sendOtpMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Sending OTP...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    <span>Send OTP</span>
                  </div>
                )}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Back to login
                </Link>
              </p>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}

