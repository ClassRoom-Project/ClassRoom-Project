import { ReactNode } from 'react';

interface LoginType {
<<<<<<< HEAD
<<<<<<< HEAD
  children: ReactNode;
}

export default function Layout({ children }: LoginType) {
  return (
    <div>
      {children}
    </div>
  );
}
=======
  children: React.ReactNode;
=======
  children: ReactNode;
>>>>>>> bca7105f1d67cabc7a120c4c11a8dd403970eed7
}

export default function Layout({ children }: LoginType) {
  return <div>{children}</div>;
}
>>>>>>> 7a185cc75031371768ab0774ff73bd3f5bbd7707
