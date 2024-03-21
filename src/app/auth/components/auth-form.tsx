'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'

const signInFormSchema = z.object({
  email: z.string().email(),
})

type SignInFormSchema = z.infer<typeof signInFormSchema>

export function AuthForm() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
  })

  async function handleSignIn({ email }: SignInFormSchema) {
    try {
      await signIn('nodemailer', {
        email,
        redirect: false,
        callbackUrl: '/home',
      })

      toast({
        title: 'Magic Link Sent',
        description: 'Check your email for the magic link to login!',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your magic link.',
        action: (
          <ToastAction altText="Resend Magic Link">
            Resend Magic Link
          </ToastAction>
        ),
      })
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email below to login to your account
        </p>
      </div>
      <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="m@example.com"
            required
            type="email"
            {...register('email')}
          />
        </div>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Magic Link'}
        </Button>
      </form>
    </div>
  )
}
