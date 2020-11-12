<template>
  <transition name="fade">
    <div v-if="store.datePickerIsOpen" class="modal">
      <div class="date-range-picker pb-24">
        <div class="outer-section months-container">
          <days-in-month
            v-for="(month, index) in monthsInRange"
            :key="index"
            :month="month"
          ></days-in-month>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import DaysInMonth from "./DaysInMonth.vue";
export default {
  props: [],
  components: { "days-in-month": DaysInMonth },
  data() {
    return {
      datesSelected: {
        start: "",
        end: "",
      },
    };
  },
  computed: {
    store() {
      return this.$store.state;
    },
    monthsInRange() {
      return this.$store.getters.monthsInRange;
    },
    yearsInRange() {
      return this.$store.getters.yearsInRange;
    },
    selectedYear() {
      return this.store.datePickerSelectedYear;
    },
    datePickerIsOpen() {
      return this.store.datePickerIsOpen;
    },
    confirmedDates() {
      return this.store.filters.datesSelected;
    },
    datePickerScrollTop() {},
  },
  methods: {
    scrollDatePicker() {
      let widgetContainer = document.querySelector(".widget-container");
      let scrollPos;
      let scrolling;
      widgetContainer.addEventListener("scroll", () => {
        if (!scrolling) {
          scrolling = true;
          scrollPos = widgetContainer.scrollTop;
          let firstMonths = Array.prototype.slice.call(
            document.getElementsByClassName("first-month")
          );
          firstMonths.forEach((month) => {
            let target = month.offsetTop;
            let year = Number(month.id.slice(-4));
            let clicked = false;
            if (scrollPos + 125 > target) {
              this.$store.dispatch("updateSelectedDatePickerYear", {
                year,
                clicked,
              });
            }
          });
          setTimeout(function() {
            scrolling = false;
          }, 200);
        }
      });
    },
    startMonthElem() {
      let monthElem = document.querySelector(".first-month-in-range");
      if (this.datePickerIsOpen && monthElem) {
        let widgetContainer = document.querySelector(".widget-container");
        let scrollPos = monthElem.offsetTop - 120;
        widgetContainer.scrollTo(0, scrollPos);
      }
    },
  },
  watch: {
    selectedYear() {
      if (this.store.datePickerChangedWithClick) {
        let year = this.selectedYear;
        let widgetContainer = document.querySelector(".widget-container");
        let monthElem = document.getElementById("first-month-" + year);
        let scrollPos = monthElem.offsetTop - 120;
        widgetContainer.scrollTo(0, scrollPos);
      }
    },
  },
  mounted() {
    this.scrollDatePicker();
  },
  updated() {
    this.startMonthElem();
  },
};
</script>
