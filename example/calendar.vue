<template>
  <div
    style="
      display: flex;
      flex-flow: wrap;
      margin: 20px;
      row-gap: 1rem;
      column-gap: 1rem;
    "
  >
    <div style="height: 400px; border: solid 1px">
      <h1>Input toggle</h1>
      Click on input to toggle.
      <Calendar #default="{ calendar }">
        <div class="calendar-container">
          <input type="text" @click="calendar.toggle" v-model="pickDate" />
          <div v-if="calendar.isOpenCalendar()">
            <div class="head">
              <div>
                {{ calendar.month }} {{ calendar.monthName }}
                {{ calendar.year }}
              </div>
              <button @click="calendar.trigger.prevMonth()">prev month</button>
              <button @click="calendar.trigger.nextMonth()">next month</button>

              <button @click="calendar.trigger.prevYear()">prev Year</button>
              <button @click="calendar.trigger.nextYear()">next Year</button>
            </div>
            <div class="calendar">
              <template v-for="day of calendar.days">
                <button @click="onSelectDay(day)">{{ day.day }}</button>
              </template>
            </div>
          </div>
        </div>
      </Calendar>
    </div>
    <div style="height: 400px; border: solid 1px">
      <h1>Calendar</h1>
      <Calendar
        ref="calendarRef"
        #default="{ calendar }"
        :init="{
          toggle: true,
          day: new Date(2023, 10, 0),
        }"
      >
        <div class="calendar-container">
          <div v-if="calendar.isOpenCalendar()">
            <div class="head">
              <button @click="calendar.trigger.prevMonth()">prev month</button>
              <button @click="calendar.trigger.nextMonth()">next month</button>
              <div>
                {{ calendar.month }} - {{ calendar.monthName }}
                {{ calendar.year }}
              </div>
              <button @click="calendar.trigger.prevYear()">prev Year</button>
              <button @click="calendar.trigger.nextYear()">next Year</button>
            </div>
            <div>
              <select v-model="monthYear">
                <option :value="{ m: 10, y: 2023 }">november 2023</option>
                <option :value="{ m: 11, y: 2023 }">december 2023</option>
                <option :value="{ m: 0, y: 2024 }">jan 2024</option>
              </select>
            </div>
            <div class="calendar">
              <template v-for="day of calendar.days">
                <button>{{ day.day }}</button>
              </template>
            </div>
          </div>
        </div>
      </Calendar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, type Day } from "normal-calendar";
import { ref, watch } from "vue";

const calendarRef = ref();
const monthYear = ref({ m: 10, y: 2023 });

watch([monthYear], () => {
  const { m, y } = monthYear.value;
  calendarRef.value.context.trigger.jumpTo(m, y);
});

const onSelectDay = (day: Day) => {
  pickDate.value = new Date(day.year, day.month, day.day).toLocaleString(
    "th-TH",
    { timeZone: "Asia/Jakarta" }
  );
};

const pickDate = ref<String>("");
</script>
<style lang="css" scoped>
.head {
  display: flex;
  flex-direction: column;
}

.calendar-container {
  width: 400px;
  input {
    width: 400px;
  }
}

.calendar {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, auto);
}
</style>
