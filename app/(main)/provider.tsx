"use client"; // Ensure this runs in a client environment
import { useEffect, useContext } from 'react'; 
import { useRouter } from 'next/navigation';
import React from 'react';
import Header from './_components/Header';
import { GetAuthUserData } from '@/services/GlobalApi'; 
import { useConvex } from 'convex/react'; 
import { AuthContext } from '@/context/AuthContext';

function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
   const router = useRouter(); 
   const convex = useConvex();
   const { user, setUser } = useContext(AuthContext);

   useEffect(() => {
      CheckUseAuth(); 
   }, []);

  const CheckUseAuth = async () => {
    const token = localStorage.getItem('user_token');
    const userData = token && await GetAuthUserData(token);
    if (!userData?.email) {
      router.replace('/sign-in'); 
      return;
    }
    try {
      const result = await convex.query(api.users.GetUser, { email: userData.email });
      setUser(result);
    } catch (e) {}
  };

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Provider;
