import BorderLayout from '@/components/common/bars/BorderLayout';
import MainPage from './(clrm)/main/page';
import UserLayout from '@/components/common/bars/UserLayout';

export default function page() {
  return (
    <div>
      <BorderLayout>
        <UserLayout />
        <MainPage />
      </BorderLayout>
    </div>
  );
}
