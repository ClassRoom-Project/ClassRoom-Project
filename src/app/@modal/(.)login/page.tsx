import LoginPage from '@/app/login/page';
import { Modal } from '@/components/common/Modal';
import SigninModal from '../signin/page';

export default function Page() {
  const closSigninModal = <SigninModal />;

  return (
    <Modal modal={closSigninModal}>
      <LoginPage />
    </Modal>
  );
}
