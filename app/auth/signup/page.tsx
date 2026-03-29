'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { signUp, loading } = useAuth();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signUp(email, password, fullName);
      toast.success('Account created! Check your email to confirm.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Signup failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Logo />
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>Start building with Bentwix OS today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="label-base mb-2 block">Full Name</label>
                <input
                  className="input-base"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="label-base mb-2 block">Email</label>
                <input
                  className="input-base"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="label-base mb-2 block">Password</label>
                <input
                  className="input-base"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={loading}>
                Create Account
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
