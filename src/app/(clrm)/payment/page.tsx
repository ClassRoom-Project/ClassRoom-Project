import PaymentPageasync from '@/components/payments/PaymentPage';
import { Suspense } from 'react';

export default function PaymentSuspensePage() {
  return (
    <Suspense>
      <PaymentPageasync />
    </Suspense>
  );
}
