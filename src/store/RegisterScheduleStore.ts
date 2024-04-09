// store/RegisterScheduleStoreState.js
import { create } from 'zustand'

interface Schedule {
    date: string;
    times: string[];
}

interface RegisterScheduleStoreState {
    schedules: Schedule[];
    selectedDates: string[];
    setSelectedDates: (dates: string[]) => void;
    addSchedule: (date: string) => void;
    addTimeToSchedule: (date: string, time: string) => void;
    removeSchedule: (date: string) => void; // 날짜 삭제 기능 추가
    removeTimeFromSchedule: (date: string, time: string) => void; // 시간 삭제 기능 추가
    // setTimesForDate: (date: string, times: string[]) => void;
}

const RegisterScheduleStore = create<RegisterScheduleStoreState>(set => ({
    schedules: [], 
    selectedDates: [],
    setSelectedDates: (dates) => set({ selectedDates: dates }),
    addSchedule: (date) => set(state => ({ schedules: [...state.schedules, { date, times: [] }] })),
    addTimeToSchedule: (date, time) => set(state => ({
        schedules: state.schedules.map(schedule => 
        schedule.date === date ? { ...schedule, times: [...schedule.times, time] } : schedule
        )
    })),
    removeSchedule: (date) => set(state => ({
        schedules: state.schedules.filter(schedule => schedule.date !== date)
    })),
    removeTimeFromSchedule: (date, time) => set(state => ({
        schedules: state.schedules.map(schedule => 
        schedule.date === date ? { ...schedule, times: schedule.times.filter(t => t !== time) } : schedule
        )
    })),
    // setTimesForDate: (date, times) => set(state => ({
    //     schedules: state.schedules.map(schedule => 
    //     schedule.date === date ? { ...schedule, times } : schedule
    //     )
    // })),
}));

export default RegisterScheduleStore;
