export interface ClassItem {
    reserve_id: string;
    image?: string;
    title: string;
    reserve_date: string;
    reserved_at: string;
    class_id: string;
}

export interface ClassRegister {
    class_id?: string;
    user_id?: string;
    category: string;
    subCategory: string;
    classTitle: string;
    classContent: string;
    address: string;
    detailAddress: string;
    maxNumber: number;
    minNumber: number;
    price: number;
    personnel: number;
    difficulty: string;
    selectDay: string[];
    selectedTime: string[];
    classType: string;
    image: string[];
    totalTime: number;
}