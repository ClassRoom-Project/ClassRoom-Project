import Link from 'next/link';

export function Modal({ teacher, children }: { teacher: React.ReactNode; children: React.ReactNode }) {
  return (
    <>
      <Link href="/">Close modal</Link>
      <div>
        {teacher}
        {children}
      </div>
    </>
  );
}
