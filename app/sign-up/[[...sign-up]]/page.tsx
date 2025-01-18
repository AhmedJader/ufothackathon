import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import logo from "@/public/broke4.png"

export default function Page() {
  return (
    <div className='flex h-screen justify-center items-center bg-gradient-to-br from-custom-black via-custom-black to-custom-yellow'>
    {/* Reduced negative gap */}

      <div className='flex items-center justify-center'>
        <Image src={logo} alt="Logo" className='sizeshrink' /> {/* Adjust size as needed */}
      </div>
      <div className='flex items-center justify-center'>
        <SignUp afterSignOutUrl='/' />
      </div>
    </div>
  )
}


