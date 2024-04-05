import { ReactNode } from 'react';
import LoginPage from './_component/LoginPage';

interface LoginType {
  children: ReactNode;
  modal: ReactNode;
}

export default function Layout({ children, modal }: LoginType) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}
