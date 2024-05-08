import LoadingSpinner from '@/components/common/LoadingSpinner';
import PaymentPageasync from '@/components/payments/PaymentPage';
import { Suspense } from 'react';

export default function PaymentSuspensePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PaymentPageasync />
    </Suspense>
  );
}
