'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

interface UserInfoProps {
  user: Session['user']
}

export async function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Avatar>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      <span>{user?.email}</span>

      <Button variant={'outline'} onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  )
}
