'use client';
import React, {useEffect} from 'react';
import useRegisterStore from '@/store/registerStore';

interface InitialDataType {
  price: number;
}

interface PriceProps {
  isEditMode: boolean;
  initialData?: InitialDataType;
}

const Price:React.FC<PriceProps> = ({ isEditMode, initialData }) => {
  const { price, setPrice } = useRegisterStore();

  useEffect(() => {
    if (isEditMode && initialData) {
      setPrice(initialData.price);
    }
  }, [isEditMode, initialData, setPrice]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (isNaN(value) || value < 0) value = 0;
    setPrice(value);
  };
  return (
    <div className="my-4">
      <div className="flex items-center justify-between space-x-4">
        <div>
          <p className="text-sm md:text-base lg:text-base text-[#3F3F3F] flex-shrink-0 font-bold">클래스 1인 수강 금액</p>
        </div>
        <div className="relative w-1/3">
          <input
            className="form-input px-3 py-2 border rounded w-full pr-8 text-right"
            type="text"
            value={price}
            onChange={handlePriceChange}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span>원</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
