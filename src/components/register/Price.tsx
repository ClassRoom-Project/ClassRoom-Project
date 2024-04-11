"use client";
import React from 'react'
import useRegisterStore from '@/store/registerStore';

const Price = () => {
  const { price, setPrice } = useRegisterStore();

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setPrice(value);
  };
  return (
    <div className='mt-2'>
        <div className="flex items-center justify-between space-x-4"> {/* justify-between 추가 */}
          <div> {/* p태그를 감싸는 div 추가 */}
            <p className='text-base font-bold'>클래스 1인 수강 금액</p>
          </div>
          <div className="relative w-1/3"> {/* ml-auto 삭제 */}
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
  )
}

export default Price