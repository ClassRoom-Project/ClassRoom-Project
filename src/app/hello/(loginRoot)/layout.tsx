import { ReactNode } from 'react';

interface LoginType {
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
}

export default function Layout({ children }: LoginType) {
  return <div>{children}</div>;
}
>>>>>>> 7a185cc75031371768ab0774ff73bd3f5bbd7707
