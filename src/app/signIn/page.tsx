import { BookMarked } from 'lucide-react'

import { SignInForm } from './_components/sign-in-form'

export default function LoginPage() {
  return (
    <main className="grid h-screen grid-cols-2 items-center justify-center">
      <div className="h-full p-5">
        <div className="flex h-full flex-col items-start justify-between  rounded bg-card p-8">
          <div className="flex items-center space-x-3 font-semibold">
            <BookMarked className="size-7" />

            <span className="text-2xl">Book Wise</span>
          </div>

          <footer className="text-xs text-muted-foreground">
            Painel do usuário &copy; Book Wise - 2024
          </footer>
        </div>
      </div>

      <div>
        <SignInForm />
      </div>
    </main>
  )
}
