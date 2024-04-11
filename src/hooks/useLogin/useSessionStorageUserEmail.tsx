import { useEffect, useState } from 'react';

export default function useSessionStorageUserEmail() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const userEmailFromStorage = sessionStorage.getItem('userEmail');
    if (userEmailFromStorage) {
      setUserEmail(userEmailFromStorage);
    }
  }, [userEmail]);

  return userEmail;
}
