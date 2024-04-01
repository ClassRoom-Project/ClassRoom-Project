import LoginPage from '../_component/LoginPage';
import RedirectToSignUp from './_component/RedirectToLogin';

export default async function Login() {
  // const session = await auth();

  // if (session?.user) {
  //   redirect('/main');
  // }

  return (
    <>
      <RedirectToSignUp />
      <LoginPage />
    </>
  );
}
