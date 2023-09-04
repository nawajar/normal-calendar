<template>
  <slot :calendar="context"> </slot>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import {
  type CalendarInstance,
  Day,
  CalendarOptions,
  months,
} from "../types/calendar-instance";
const isOpenCalendar = ref(false);

const props = defineProps({
  init: {
    type: Object as () => CalendarOptions,
  },
});

const generateCalendar = () => {
  context.monthName = months[context.month];
  context.days = [];
  const days: Day[] = [];
  const daysInMonths = daysInMonth(context.year, context.month + 1);

  const startDayInWeekOfMonth = new Date(context.year, context.month, 1);

  let startNumberInWeek = startDayInWeekOfMonth.getDay();
  console.log(
    "start day in week ",
    startDayInWeekOfMonth,
    startDayInWeekOfMonth.getDay()
  );

  if (startNumberInWeek > 0) {
    const prevMonth = new Date(context.year, context.month - 1, 1);
    let daysInMonths = daysInMonth(context.year, context.month);
    console.log("prev ", daysInMonths);
    while (startNumberInWeek > 0) {
      days.push({
        day: (daysInMonths--),
        month: prevMonth.getMonth(),
        year: prevMonth.getFullYear(),
      });
      startNumberInWeek -= 1;
    }
    days.reverse();
  }

  for (let d = 1; d <= daysInMonths; d++) {
    days.push({
      day: d,
      month: context.month,
      year: context.year,
    });
  }
  context.days.push(...days);
};

const openCalendar = () => {
  isOpenCalendar.value = !isOpenCalendar.value;
};

const nextMonth = () => {
  context.month += 1;
  generateCalendar();
};

const prevMonth = () => {
  context.month -= 1;
  generateCalendar();
};

const nextYear = () => {
  context.year += 1;
  generateCalendar();
};

const prevYear = () => {
  context.year -= 1;
  generateCalendar();
};

const today = new Date();

const daysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

const context = reactive<CalendarInstance>({
  today: today,
  initMonthYear: today,
  selectDate: new Date(),
  toggle: openCalendar,
  isOpenCalendar: () => isOpenCalendar.value,
  days: [],
  month: today.getMonth(),
  year: today.getFullYear(),
  monthName: months[today.getMonth()],
  trigger: {
    nextMonth: nextMonth,
    prevMonth: prevMonth,
    nextYear: nextYear,
    prevYear: prevYear,
  },
});

onMounted(async () => {
  if (props.init?.toggle) {
    openCalendar();
  }

  //console.log(props.init?.day);
  if (props.init?.day) {
    const initDay = props.init?.day;
    context.month = initDay.getMonth();
    context.year = initDay.getFullYear();
    context.monthName = months[context.month];
  }
  //console.log(context);

  generateCalendar();
  console.log("mounted!");
});
</script>
