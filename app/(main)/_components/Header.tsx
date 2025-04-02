"use client";  // Add this at the top

import React, { useContext } from 'react';
import Image from 'next/image';
import { AuthContext } from '@/context/AuthContext';
import { useEffect } from 'react';

function Header() {
  const { user } = useContext(AuthContext);

    return (
    <div className='p-3 fixed shadow-sm flex justify-between items-center bg-white px-14'>
      <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
      
    {user?.picture && <Image src={user?.picture} alt='logo' width={40} height={40}
    className='rounded-full' />}
     
    </div>
  );
}

export default Header;
