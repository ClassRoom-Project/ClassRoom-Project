import { ReactNode } from 'react';
import LoginPage from './_component/LoginPage';

interface LoginType {
  children: ReactNode;
}

export default function Layout({ children }: LoginType) {
  return (
    <div>
      {children}
    </div>
  );
}