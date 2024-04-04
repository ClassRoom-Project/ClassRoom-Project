// 24시간제를 12시간제로 변환하는 함수
export const convertTimeTo12HourClock = (classTime: string) => {
  // ex) classTime = ['14:30']
  const hour = Number(classTime.slice(0, 2));
  const minute = classTime.slice(2, 5);

  // 시간이 12 초과 (오후)
  if (hour > 12) {
    const pmHour = hour - 12;
    const formatHour = pmHour < 10 ? '0' + pmHour : pmHour; // 시간이 10보다 작으면 0 붙임
    return formatHour + minute + ' PM';

    // 시간이 12 미만 (오전) && 00시가 아닐 때
  } else if (hour < 12 && hour !== 0) {
    const amHour = hour;
    const formatHour = amHour < 10 ? '0' + amHour : amHour;
    return formatHour + minute + ' AM';

    // 00시 = 12 AM, 12시 = 12 PM
  } else {
    return hour === 0 ? 12 + minute + ' AM' : hour + minute + ' PM';
  }
};
