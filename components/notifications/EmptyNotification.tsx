"use client";
import Image from 'next/image';
import React from 'react';

function EmptyNotification() {
  return (
    <div className='flex-center flex-col space-y-4'>
      <Image
        src="/Images/emptyNotification.png"
        alt="Empty Notification"
        width={200}
        height={200}
      />
      <p className='text-black text-xl'>No Notifications</p>
      <p className="text-textGray3 text-sm">Notification Inbox Empty</p>
    </div>
  );
}

export default EmptyNotification