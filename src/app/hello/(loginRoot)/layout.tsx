import { ReactNode } from 'react';

interface LoginType {
  children: React.ReactNode;
}

export default function Layout({ children }: LoginType) {
  return <div>{children}</div>;
}
