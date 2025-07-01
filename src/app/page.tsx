'use client';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!document.cookie.includes('token')) {
      router.push('/login');
    } else {
      router.push('/users');
    }
  }, [router]);
  return <div>메인 페이지</div>;
}
