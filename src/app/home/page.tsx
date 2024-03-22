import { auth } from '@/services/auth'

import { UserInfo } from './_components/user-info'

export default async function Home() {
  const session = await auth()

  return (
    <main className="flex h-screen items-center justify-center">
      <UserInfo user={session?.user} />
    </main>
  )
}
