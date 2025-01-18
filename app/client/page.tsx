"use client";
import React from 'react'
import { useUser } from '@clerk/nextjs'
import Hero from '@/components/chatbot.jsx';

const ClientPage = () => {
    const { isLoaded, isSignedIn, user } = useUser()

    if (!isLoaded || !isSignedIn) {
        return null
    }
    return (
        <div className='h-full flex flex-col items-center justify-center text-2xl'>
            Hello {user.firstName}, welcome to clerk
            <Hero />
        </div>
    )
}

export default ClientPage