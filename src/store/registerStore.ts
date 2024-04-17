import { create } from 'zustand';
import { ClassRegister } from '@/types/register';

const useRegisterStore = create<ClassRegister>((set) => ({
    category: '',
    subCategory: [],
    address: '',
    detailAddress: '',
    classContent: '',
    classTitle: '',
    classType: '',
    difficulty: '',
    minNumber: 0,
    personnel: 0,
    price: 0,
    totalTime: 0,
    selectDay: [],
    selectedTime: [],

    setCategory: (category:string) => set({ category }),
    setSubCategory: (subCategory:string[]) => set({ subCategory }),
    setAddress: (address:string) => set({ address }),
    setDetailAddress: (detailAddress:string) => set({ detailAddress }),
    setSelectDay: (selectDay:Date[]) => set({ selectDay }),
    setClassContent: (classContent:string) => set({ classContent }),
    setClassTitle: (classTitle:string) => set({ classTitle }),
    setClassType: (classType:string) => set({ classType }),
    setDifficulty: (difficulty:string) => set({ difficulty }),
    setMinNumber: (minNumber:number) => set({ minNumber }),
    setPersonnel: (personnel:number) => set({ personnel }),
    setPrice: (price:number) => set({ price }),
    setSelectedTime: (selectedTime:string[]) => set({ selectedTime }),
    setTotalTime: (totalTime:number) => set({ totalTime }),
}));

export default useRegisterStore;
