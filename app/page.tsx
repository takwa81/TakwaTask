"use client"
import UpdateProfilePage from '@/components/Profile/UpdateProfilePage'
import Image from 'next/image';
// import { UserProvider } from '@/components/contexts/UserContext';

export default function Home() {
  return (
    <>
      {/* <UserProvider> */}
        <UpdateProfilePage />
      {/* </UserProvider> */}
    </>
  )
}
