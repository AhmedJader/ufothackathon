import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import logo from "@/public/AI_Generated_Logo_2025-01-18_676a4f25-bc8c-4d7c-90b7-01823d67f9bd.png"

export default function Page() {
  return (
    <div className='flex h-full justify-center'> {/* Reduced negative gap */}
      <div className='flex items-center justify-center'>
        <Image src={logo} alt="Logo" className='sizeshrink' /> {/* Adjust size as needed */}
      </div>
      <div className='flex items-center justify-center'>
        <SignUp afterSignOutUrl='/' />
      </div>
    </div>
  )
}
