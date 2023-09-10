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
const props = defineProps({
  init: {
    type: Object as () => CalendarOptions,
  },
});

const isOpenCalendar = ref(false);
const calendarMaxSize = 6 * 7;

const generateCalendar = () => {
  context.monthName = months[context.month];
  context.days = [];
  const days: Day[] = [];
  const daysInMonths = daysInMonth(context.year, context.month + 1);

  const startDayInWeekOfMonth = new Date(context.year, context.month, 1);

  let startNumberInWeek = startDayInWeekOfMonth.getDay();
  if (startNumberInWeek > 0) {
    const prevMonth = new Date(context.year, context.month - 1, 1);
    let daysInMonths = daysInMonth(context.year, context.month);
    while (startNumberInWeek > 0) {
      const day = {
        day: daysInMonths--,
        month: prevMonth.getMonth(),
        year: prevMonth.getFullYear(),
      };

      if (props?.init?.onGenerateDay) {
        props?.init?.onGenerateDay(day);
      }
      days.push(day);
      startNumberInWeek -= 1;
    }
    days.reverse();
  }

  for (let d = 1; d <= daysInMonths; d++) {
    const day = {
      day: d,
      month: context.month,
      year: context.year,
    };
    if (props?.init?.onGenerateDay) {
      props?.init?.onGenerateDay(day);
    }
    days.push(day);
  }

  const calendarSize = days.length;

  for (let tail = 1; tail <= calendarMaxSize - calendarSize; tail++) {
    const day = {
      day: tail,
      month: context.month + 1,
      year: context.year,
    };
    if (props?.init?.onGenerateDay) {
      props?.init?.onGenerateDay(day);
    }
    days.push(day);
  }

  context.days.push(...days);
};

const openCalendar = () => {
  isOpenCalendar.value = !isOpenCalendar.value;
};

const nextMonth = () => {
  if (context.month == 11) {
    context.month = 0;
    nextYear();
    return;
  }
  context.month += 1;
  generateCalendar();
};

const prevMonth = () => {
  if (context.month == 0) {
    context.month = 11;
    prevYear();
    return;
  }
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

const jumpTo = (month: number, year: number) => {
  context.month = month;
  context.year = year;
  generateCalendar();
}

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
    jumpTo: jumpTo,
  },
});

onMounted(async () => {
  if (props.init?.toggle) {
    openCalendar();
  }

  if (props.init?.day) {
    const initDay = props.init?.day;
    context.month = initDay.getMonth();
    context.year = initDay.getFullYear();
    context.monthName = months[context.month];
  }
  generateCalendar();
});
defineExpose({ context });
</script>
