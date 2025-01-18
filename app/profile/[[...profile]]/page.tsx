import { UserProfile } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const Profile = async () => {
    // Await the result of auth()
    const authResult = await auth();
    const userId = authResult.userId;

    // Check if user is authenticated
    if (!userId) {
        redirect('/');
    }

    // Fetch the current user details
    const user = await currentUser();

    return (
        <div className='flex flex-col items-center justify-center h-full mt-8'>
            <h1 className='text-2xl text-center'>Welcome {user?.username || "User"}</h1>
            <UserProfile />
        </div>
    );
};

export default Profile;