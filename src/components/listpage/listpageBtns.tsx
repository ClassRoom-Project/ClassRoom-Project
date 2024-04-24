import React, { PropsWithChildren } from 'react';
import { ClassFiltersType } from '@/types/classFilter';
interface PriceBtnProps {
  classFilters: ClassFiltersType; // ClassFiltersType는 해당 타입이 정의되어 있어야 함
  minPrice: number;
  maxPrice: number;
  filterText: string;
}
export const PriceBtn: React.FC<PriceBtnProps> = ({ classFilters, minPrice, maxPrice, filterText }) => {
  const isPriceSelected = (min: number, max: number) => {
    return classFilters.selectedPrice?.min === min && classFilters.selectedPrice?.max === max;
  };

  return (
    <button
      className={`rounded-2xl border-[1px] border-solid border-point-purple py-1  ${
        isPriceSelected(minPrice, maxPrice)
          ? 'bg-point-purple text-white'
          : 'bg-pale-purple transition-all hover:bg-button-disable-color'
      }`}
    >
      {filterText}
    </button>
  );
};
