import Link from 'next/link';

export function Modal({ modal, children }: { modal: React.ReactNode; children: React.ReactNode }) {
  return (
    <>
      <Link href="/">닫기</Link>
      <div>
        {modal}
        {children}
      </div>
    </>
  );
}
