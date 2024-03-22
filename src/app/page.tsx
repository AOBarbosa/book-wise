import { redirect } from 'next/navigation'

import { auth } from '@/services/auth'

export default async function Page() {
  const session = await auth()

  return <div>{session ? redirect('/home') : redirect('/signIn')}</div>
}
