<template>
  <div class="mt-4">
    <div
      class="month-header flex-align-center justify-center text-sm font-semibold"
      :id="
        firstAvailableMonthInYear ? 'first-month-' + month.getFullYear() : null
      "
      :class="{
        'first-month': firstAvailableMonthInYear,
        'first-month-in-range': isFirstMonthInSelectedRange,
      }"
    >
      <span
        class="capitalize mr-1"
        v-text="store.months[month.getMonth()].toLowerCase()"
      ></span>
      <span>{{ month.getFullYear() }}</span>
    </div>
    <div class="days-container text-left flex flex-wrap">
      <span
        v-for="(day, index) in daysInMonth"
        :key="index"
        class="day inline-block cursor-pointer"
        @click="selectDay(day)"
        :class="[
          dayClass(day),
          hasNote(day) === 'Sold out' ? 'disabled' : null,
        ]"
        ><div
          v-if="day"
          class="padding-top-full relative day-container text-center"
          :class="dayisAvailable(day)"
        >
          <span class="day-text" v-text="day.getDate()"></span
          ><span
            v-if="!dayClass(day) && hasNote(day)"
            class="day-info w-full"
            :class="hasNote(day) === 'Limited' ? 'text-orange-500' : null"
            >{{ hasNote(day) }}</span
          >
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["month"],
  data() {
    return {};
  },
  computed: {
    store() {
      return this.$store.state;
    },
    numberOfDaysInMonth() {
      let thisYear = this.month.getFullYear();
      let thisMonth = this.month.getMonth();
      return new Date(thisYear, thisMonth + 1, 0).getDate();
    },
    daysInMonth() {
      let thisYear = this.month.getFullYear();
      let thisMonth = this.month.getMonth();
      let daysInMonth = this.numberOfDaysInMonth;
      let daysArray = [];
      for (let d = 1; d <= daysInMonth; d++) {
        daysArray.push(new Date(thisYear, thisMonth, d));
      }
      let firstDayOfMonth = this.month.getDay();
      if (firstDayOfMonth == 0) {
        daysArray.unshift(0, 0, 0, 0, 0, 0);
      } else {
        for (let wd = 0; wd < firstDayOfMonth - 1; wd++) {
          daysArray.unshift(0);
        }
      }
      return daysArray;
    },
    startAndEndDatesSelected() {
      return (
        this.unconfirmedDates.start !== "" && this.unconfirmedDates.end !== ""
      );
    },
    firstAvailableMonthInYear() {
      let thisMonthFirstOfMonth = new Date(
        this.month.getFullYear(),
        this.month.getMonth(),
        1
      );
      let minDateFirstOfMonth = new Date(
        this.minDate.getFullYear(),
        this.minDate.getMonth(),
        1
      );
      if (
        this.month.getMonth() == 0 ||
        String(thisMonthFirstOfMonth) === String(minDateFirstOfMonth)
      ) {
        return true;
      } else {
        return false;
      }
    },
    minDate() {
      return this.store.minDate;
    },
    isFirstMonthInSelectedRange() {
      if (this.confirmedDates.end) {
        let thisMonth = new Date(
          this.month.getFullYear(),
          this.month.getMonth(),
          1
        );
        let startSelectedMonth = new Date(
          this.confirmedDates.start.getFullYear(),
          this.confirmedDates.start.getMonth(),
          1
        );
        return String(thisMonth) === String(startSelectedMonth);
      }
    },
    unconfirmedDates() {
      return this.store.unconfirmedDates;
    },
    confirmedDates() {
      return this.store.filters.datesSelected;
    },
    availableTrips() {
      const allTrips = this.store.datesRates.data.datesRates;
      let availableTripsList = [];
      allTrips.forEach((month) => {
        month.datesRates.forEach((departure) => {
          if (departure.isAvailable && departure.availability === "available") {
            availableTripsList.push(new Date(departure.fromDateValue));
          }
        });
      });
      return availableTripsList;
    },
    soldOutTrips() {
      const allTrips = this.store.datesRates.data.datesRates;
      let soldOutTripsList = [];
      allTrips.forEach((month) => {
        month.datesRates.forEach((departure) => {
          if (!departure.isAvailable) {
            soldOutTripsList.push(new Date(departure.fromDateValue));
          }
        });
      });
      return soldOutTripsList;
    },
    limitedAvailTrips() {
      const allTrips = this.store.datesRates.data.datesRates;
      let limitedAvailTripsList = [];
      allTrips.forEach((month) => {
        month.datesRates.forEach((departure) => {
          if (departure.isAvailable && departure.availability === "onRequest") {
            limitedAvailTripsList.push(new Date(departure.fromDateValue));
          }
        });
      });
      return limitedAvailTripsList;
    },
  },
  methods: {
    selectDay(day) {
      this.$store.dispatch("updateUnconfirmedDates", day);
    },
    dayClass(day) {
      let daysInMonth = this.numberOfDaysInMonth;
      if (String(day) == this.unconfirmedDates.start) {
        if (day.getDate() == daysInMonth) {
          if (this.startAndEndDatesSelected) {
            return "start-date last-day-of-month date-range-selected";
          } else {
            return "start-date last-day-of-month";
          }
        } else {
          if (this.startAndEndDatesSelected) {
            return "start-date date-range-selected";
          } else {
            return "start-date";
          }
        }
      } else if (String(day) == this.unconfirmedDates.end) {
        if (day <= this.month) {
          if (this.startAndEndDatesSelected) {
            return "end-date first-day-of-month date-range-selected";
          } else {
            return "end-date first-day-of-month";
          }
        } else {
          if (this.startAndEndDatesSelected) {
            return "end-date date-range-selected";
          } else {
            return "end-date";
          }
        }
      } else if (
        day > this.unconfirmedDates.start &&
        day < this.unconfirmedDates.end
      ) {
        if (day.getDate() == daysInMonth) {
          return "in-date-range last-day-of-month";
        } else if (day <= this.month) {
          return "in-date-range first-day-of-month";
        } else {
          return "in-date-range";
        }
      }
      if (day < this.store.minDate || day > this.store.maxDate) {
        return "disabled";
      }
    },
    hasNote(day) {
      let soldOuts = this.soldOutTrips;
      let soldOutMatches = soldOuts.filter(
        (soldOutDay) => String(soldOutDay) === String(day)
      );
      let limitedTrips = this.limitedAvailTrips;
      let limitedMatches = limitedTrips.filter(
        (limitedDay) => String(limitedDay) === String(day)
      );
      if (soldOutMatches.length) {
        return "Sold out";
      } else if (limitedMatches.length) {
        return "Limited";
      }
    },
    dayisAvailable(day) {
      let availTrips = this.availableTrips;
      let availTripsMatches = availTrips.filter(
        (availableDay) => String(availableDay) === String(day)
      );
      if (availTripsMatches.length) {
        return "available";
      }
    },
  },
};
</script>
