// Pagination.tsx

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface PaginationProps {
  totalItems: number; // 데이터의 총 개수
  itemCountPerPage: number; // 페이지 당 보여줄 데이터 개수
  pageCount: number; // 보여줄 페이지 개수
  currentPage: number; // 현재 페이지
}

const Pagination = ({ totalItems, itemCountPerPage, pageCount, currentPage }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  // updating searchParams : 기존의 params 뒤에 새로운 query 추가하기
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex items-center justify-center mt-6">
      <ul className="flex list-none items-center">
        <li className={`${noPrev && 'invisible'}`}>
          <Link href={pathname + '?' + createQueryString('page', `${start - 1}`)}>
            <div className="px-3 py-1 text-dark-purple-color">
              <IoIosArrowBack size={20} />
            </div>
          </Link>
        </li>
        {[...Array(pageCount)].map((_, i) => (
          <>
            {start + i <= totalPages && (
              <li key={start + i}>
                <Link href={pathname + '?' + createQueryString('page', `${start + i}`)}>
                  <p
                    className={`px-3 py-1 m-2 rounded-full ${
                      currentPage === start + i
                        ? 'bg-dark-purple-color text-white'
                        : 'border border-dark-purple-color text-dark-purple-color'
                    }`}
                  >
                    {start + i}
                  </p>
                </Link>
              </li>
            )}
          </>
        ))}
        <li className={`${noNext && 'invisible'}`}>
          <Link href={pathname + '?' + createQueryString('page', `${start + pageCount}`)}>
            <div className="px-3 py-1 text-dark-purple-color">
              <IoIosArrowForward size={20} />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
