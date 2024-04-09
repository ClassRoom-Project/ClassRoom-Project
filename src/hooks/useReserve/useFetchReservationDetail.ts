import { fetchReservationDetails } from '@/app/api/reserve/fetchReservationDetails';
import { useQuery } from '@tanstack/react-query';

export const useFetchReservationDetail = (reserveId: string) => {
  const {
    data: reservationDetails,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['reservationDetail'],
    queryFn: () => fetchReservationDetails(reserveId),
    enabled: !!reserveId
  });

  return { reservationDetails, isError, isLoading };
};
