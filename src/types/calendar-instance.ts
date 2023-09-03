interface CalendarInstance {
  today: Date;
  selectDate: Date;
  toggle: () => void;
  isOpenCalendar: () => boolean;
}
export { type CalendarInstance };
