import PaymentFailPage from '@/components/payments/PaymentFailPage';
import { Suspense } from 'react';

export default function FailPage() {
  return (
    <Suspense>
      <PaymentFailPage />
    </Suspense>
  );
}
