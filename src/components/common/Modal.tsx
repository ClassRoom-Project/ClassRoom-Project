import Link from 'next/link';

export function Modal({ admin, children }: { admin: React.ReactNode; children: React.ReactNode }) {
  return (
    <>
      <Link href="/">Close modal</Link>
      <div>
        {admin}
        {children}
      </div>
    </>
  );
}
