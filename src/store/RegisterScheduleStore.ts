import { create } from 'zustand';

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
    removeSchedule: (date: string) => void;
    removeTimeFromSchedule: (date: string, time: string) => void;
}

const RegisterScheduleStore = create<RegisterScheduleStoreState>((set) => ({
  schedules: [],
  selectedDates: [],
  setSelectedDates: (dates) => set({ selectedDates: dates }),
  addSchedule: (date) => set((state) => ({ schedules: [...state.schedules, { date, times: [] }] })),
  addTimeToSchedule: (date, time) =>
    set((state) => ({
      schedules: state.schedules.map((schedule) =>
        schedule.date === date ? { ...schedule, times: [...schedule.times, time] } : schedule
      )
    })),
  removeSchedule: (date) => set((state) => ({
      schedules: state.schedules.filter((schedule) => schedule.date !== date)
  })),
  removeTimeFromSchedule: (date, time) => set(state => ({
      schedules: state.schedules.map(schedule => 
      schedule.date === date ? { ...schedule, times: schedule.times.filter(t => t !== time) } : schedule
      )
  })),
}));

export default RegisterScheduleStore;
