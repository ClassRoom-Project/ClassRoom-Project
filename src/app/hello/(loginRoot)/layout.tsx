import { ReactNode } from 'react';
import LoginPage from './_component/LoginPage';

type Props = { children: ReactNode; modal: ReactNode };

export default function Layout({ children, modal }: Props) {
  return (
    <div>
      <LoginPage />
      {children}
      {modal}
    </div>
  );
}
