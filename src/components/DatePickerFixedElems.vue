<template>
  <transition name="fade">
    <div class="modal-fixed-element">
      <div class="modal-header fixed-header absolute w-full bg-white">
        <div class="modal-close" @click="closeDatePicker(false)"></div>
        <div class="text-center mt-3">
          <span class="year-tabs justify-center inline-flex">
            <a
              v-for="(year, index) in yearsInRange"
              :key="index"
              :href="'#first-month-' + year"
              :class="{
                selected:
                  year == selectedYear || (index == 0 && selectedYear == 0),
              }"
              class="year-item text-sm font-semibold"
              @click.prevent="updateSelectedDatePickerYear(year)"
              ><span>{{ year }}</span></a
            >
          </span>
        </div>
        <div
          class="days-header mt-4 flex-align-center justify-center border-b pb-1"
        >
          <span class="day-item text-center text-xxs">Mo</span>
          <span class="day-item text-center text-xxs">Tu</span>
          <span class="day-item text-center text-xxs">We</span>
          <span class="day-item text-center text-xxs">Th</span>
          <span class="day-item text-center text-xxs">Fr</span>
          <span class="day-item text-center text-xxs">Sa</span>
          <span class="day-item text-center text-xxs">Su</span>
        </div>
      </div>
      <div
        class="fixed-footer absolute inner-section section-bg flex-align-center justify-center border-t text-xs"
      >
        <button
          class="buttons buttons-secondary py-3 px-6 mr-4"
          :class="{ disabled: !startDateSelected }"
          @click="clearUnconfirmedSelectedDates()"
        >
          Clear Dates
        </button>
        <button
          class="buttons buttons-primary py-3 px-6"
          :class="{ disabled: !showDatesButtonShow }"
          @click="updateSelectedDates()"
        >
          Show dates
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: [],
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
    selectedYear() {
      return this.store.datePickerSelectedYear;
    },
    monthsInRange() {
      return this.$store.getters.monthsInRange;
    },
    yearsInRange() {
      return this.$store.getters.yearsInRange;
    },
    selectedDates() {
      return this.store.filters.datesSelected;
    },
    startDateSelected() {
      return this.store.unconfirmedDates.start;
    },
    showDatesButtonShow() {
      if (
        this.store.unconfirmedDates.start &&
        !this.store.unconfirmedDates.end
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    closeDatePicker(val) {
      this.$store.dispatch("openCloseDatePicker", val);
    },
    updateSelectedDatePickerYear(year) {
      let clicked = true;
      this.$store.dispatch("updateSelectedDatePickerYear", { year, clicked });
    },
    updateSelectedDates() {
      this.$store.dispatch("updateSelectedDates");
      this.$store.dispatch("openCloseDatePicker", false);
    },
    clearUnconfirmedSelectedDates() {
      let clearedDates = {
        start: "",
        end: "",
      };
      this.$store.dispatch("clearUnconfirmedSelectedDates", clearedDates);
    },
  },
};
</script>
