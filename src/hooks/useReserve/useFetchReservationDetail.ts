import { fetchReservationDetails } from '@/app/api/reserve/fetchReservationDetails';
import { QueryKeys } from '@/constants/QueryKeys';
import { ReservationDetailsType } from '@/types/reserve';
import { useQuery } from '@tanstack/react-query';

export const useFetchReservationDetail = (reserveId: string) => {
  const {
    data: reservationDetails,
    isError,
    isLoading
  } = useQuery<ReservationDetailsType>({
    queryKey: [QueryKeys.RESERVATION_DETAIL],
    queryFn: () => fetchReservationDetails(reserveId),
    enabled: !!reserveId
  });

  return { reservationDetails, isError, isLoading };
};
