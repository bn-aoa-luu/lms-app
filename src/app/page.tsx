'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      router.push('/courses');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin size="large" />
    </div>
  );
}