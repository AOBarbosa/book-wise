'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'

const signInFormSchema = z.object({
  email: z.string().email(),
})

type SignInFormSchema = z.infer<typeof signInFormSchema>

export function SignInForm() {
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
        title: 'O link de acesso foi enviado',
        description: 'Verifique seu e-mail para efetuar o login!',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Alguma coisa deu errado',
        description:
          'Ocorreu um problema com seu link de acesso, por favor tente novamente',
      })
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Boas vindas!</h1>

        <p className="text-gray-500 dark:text-gray-400">
          Informe seu e-mail e faça login na sua conta
        </p>
      </div>

      <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="email@exemplo.com"
            required
            type="email"
            {...register('email')}
          />
        </div>

        <Button
          className="w-full bg-card hover:bg-card/90"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando' : 'Enviar Magic Link'}
        </Button>
      </form>
    </div>
  )
}
