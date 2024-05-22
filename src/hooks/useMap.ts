import { useDetailClassInfoStore } from '@/store/classInfoStore';
import { useEffect, useState } from 'react';

export const useMapData = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [name, setName] = useState<string | null>('');

  const { classInfo } = useDetailClassInfoStore();
  console.log('classInfo', classInfo);

  const placeAddress = location || null;
  console.log('placeAddress', placeAddress);

  useEffect(() => {
    const fetchData = async () => {
      if (!placeAddress) return;

      const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(placeAddress)}`;
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_MAP_REST_API_KEY}`
          }
        });

        if (!response.ok) {
          throw new Error('Kakao API 요청 실패');
        }

        const data = await response.json();

        const fetchLongitue = data.documents[0].x; // 경도
        const fetchLatitude = data.documents[0].y; // 위도
        const addressName = data.documents[0].address.address_name;
        setLatitude(fetchLatitude);
        setLongitude(fetchLongitue);
        setName(addressName);
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [placeAddress]);

  return { latitude, longitude, name };
};
