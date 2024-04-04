import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function useSetSessionStorage() {
  const { data: session } = useSession();

  useEffect(() => {
    const userEmail = session?.user?.email ?? null;
    if (userEmail) {
      sessionStorage.setItem('userEmail', userEmail);
    }
  }, [session]);
  return;
}
