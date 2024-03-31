import Link from 'next/link';

export function Modal({ modal, children }: { modal: React.ReactNode; children: React.ReactNode }) {
  return (
    <>
      <Link href="/">Close modal</Link>
      <div>
        {modal}
        {children}
      </div>
    </>
  );
}
