interface CalendarInstance {
  today: Date;
  initMonthYear: Date;
  selectDate: Date;
  toggle: () => void;
  isOpenCalendar: () => boolean;
  days: Day[];
  month: number;
  year: number;
  monthName: string;
  trigger: Trigger;
  onGenerateDay?: (day: Day) => void;
}

interface CalendarOptions {
  day?: Date;
  toggle?: boolean;
}

interface Trigger {
  nextMonth: () => void;
  nextYear: () => void;
  prevMonth: () => void;
  prevYear: () => void;
}

interface Day {
  day: number;
  year: number;
  month: number;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export { type CalendarInstance, type Day, type CalendarOptions, months };
