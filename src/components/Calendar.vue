<template>
  <slot :calendar="context"> </slot>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { type CalendarInstance, Day } from "../types/calendar-instance";
const isOpenCalendar = ref(false);

const generateCalendar = () => {
  context.days = [];
  const days: Day[] = [];
  const daysInMonth = new Date(context.year, context.month, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      day: d,
      month: d,
      year: d,
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
const nextYear = () => {
  context.year += 1;
};

const today = new Date();

const context = reactive<CalendarInstance>({
  today: today,
  selectDate: new Date(),
  toggle: openCalendar,
  isOpenCalendar: () => isOpenCalendar.value,
  days: [],
  month: today.getMonth(),
  year: today.getFullYear(),
  trigger: {
    nextMonth: nextMonth,
    nextYear: nextYear,
  },
});

onMounted(async () => {
  generateCalendar();
  console.log("mounted!");
});
</script>
