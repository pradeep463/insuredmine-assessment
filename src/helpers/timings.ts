export const getNextDayOfWeek = (targetDay: number): number => {
    const today = new Date().getDay();
    const offset = targetDay - today;
    return offset >= 0 ? offset + 1 : offset + 8; // Adjust for today being 1 day ahead
  };
  
  export const getDayOfWeek = (day: string): number => {
    const dayOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ]
      .map((d) => d.toLowerCase())
      .indexOf(day.toLowerCase());
    return dayOfWeek;
  };