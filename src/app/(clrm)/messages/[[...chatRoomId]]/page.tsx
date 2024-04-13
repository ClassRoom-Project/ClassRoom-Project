import { Suspense } from 'react';
import MessagesPage from './_components/MessagesPage';

export default function ChatMessagePage() {
  return (
    <Suspense>
      <MessagesPage />
    </Suspense>
  );
}
