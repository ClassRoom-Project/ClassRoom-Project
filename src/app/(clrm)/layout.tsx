import Header from '@/components/common/bars/Header';
import SideBar from '@/components/common/bars/SideBar';

interface ClrmRootLayoutProps {
  children: React.ReactNode;
}

export default function ClrmRootLayout({ children }: ClrmRootLayoutProps) {
  return (
    <div>
      <SideBar />
      <Header />
      {children}
    </div>
  );
}
