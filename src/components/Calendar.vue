<template>
  <slot :calendar="context"> </slot>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { type CalendarInstance } from "../types/calendar-instance";
const isOpenCalendar = ref(false);

// const generateCalendar = () => {

// }

const openCalendar = () => {
  isOpenCalendar.value = !isOpenCalendar.value;
};

const context = reactive<CalendarInstance>({
  today: new Date(),
  selectDate: new Date(),
  toggle: openCalendar,
  isOpenCalendar: () => isOpenCalendar.value,
});

onMounted(async () => {
  console.log("mounted!");
});
</script>
