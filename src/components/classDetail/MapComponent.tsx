'use client';

import { useDetailClassInfoStore } from '@/store/classInfoStore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GrLocation } from 'react-icons/gr';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const MapComponent = ({
  location,
  detailLocation
}: {
  location: string | undefined;
  detailLocation: string | undefined;
}) => {
  const { classInfo } = useDetailClassInfoStore();

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [name, setName] = useState<string | null>('');

  const placeAddress = location || null;

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
        console.log('data', data);

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
  console.log('name', name);
  return (
    <div className="z-0 mb-8 w-full lg:w-3/5">
      <div className="flex w-full items-center justify-center">
        {location ? (
          <div className="w-full">
            <Link href={`https://map.kakao.com/link/to/${name},${latitude},${longitude}`}>
              <Map
                className="h-full w-full rounded-lg border border-solid border-button-disable-color p-40 " // 지도 크기
                center={{ lat: latitude ?? 0, lng: longitude ?? 0 }} // 지도의 중심 좌표
                level={3} // 지도 확대 레벨
              >
                <MapMarker position={{ lat: latitude ?? 0, lng: longitude ?? 0 }} />
              </Map>
            </Link>
            <div className="mt-2 flex items-center gap-1 text-sm md:text-base">
              <GrLocation size={20} className="mr-0.5 text-main-color" />
              {location} {detailLocation}
            </div>
          </div>
        ) : (
          <p>등록된 주소가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
