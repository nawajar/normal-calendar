interface CalendarInstance {
  today: Date;
  selectDate: Date;
  toggle: () => void;
  isOpenCalendar: () => boolean;
  days:  Day[];
  month: number;
  year: number;
  trigger: Trigger;
}

interface Trigger {
  nextMonth: () => void;
  nextYear: () => void;
}

interface Day {
  day: number;
  year: number;
  month: number;
}

export { type CalendarInstance, type Day };
