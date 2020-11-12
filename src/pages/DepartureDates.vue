<template>
  <transition name="slide-fade">
    <div
      v-if="store.state.pagination.activePage === 'departures'"
      class="departure-dates-container w-full px-2"
      :class="[
        store.state.isLoading ? 'is-loading' : null,
        store.state.pagination.direction,
      ]"
    >
      <header class="mt-4">
        <h1 v-text="tripsInfo.title"></h1>
        <div class="text-sm" v-text="tripsInfo.subTitle"></div>
      </header>
      <section class="pb-4 border-b">
        <div
          class="date-range-picker-button mt-4 mb-2 section-bg section-border cursor-pointer"
          :class="{ 'date-selected': selectedDates.end }"
          @click="openDatePicker(true)"
        >
          <div
            class="placeholder text-left text-gray-700"
            v-text="startAndEndDatesSelected ? dateRange : 'Add dates'"
          ></div>
        </div>
        <add-guests-picker
          :guestpickeractive="guestPickerActive"
          @open-guest-picker="openGuestPicker()"
          @close-guest-picker="closeGuestPicker()"
        ></add-guests-picker>
        <div class="flex-align-center justify-between mt-4">
          <div>
            <label
              class="flex-align-center justify-between input-container select-none"
            >
              <span class="text-xs mr-2">Hide sold out</span>
              <input
                type="checkbox"
                :id="hideSoldOut"
                :name="hideSoldOut"
                v-model="hideSoldOut"
              /><span class="slidecheck"></span>
            </label>
          </div>
          <span
            class="filters-button buttons px-3 py-1 flex-align-center text-xs"
            :class="
              store.state.filters.filtersAppliedCount
                ? 'buttons-add'
                : 'bg-white text-black border'
            "
            @click="openFiltersModal()"
          >
            <div class="flex-align-center">
              <i class="material-icons mr-1">filter_list</i>
              <span class="font-semibold"
                ><span v-if="!store.state.filters.filtersAppliedCount"
                  >Filters</span
                ><span v-if="store.state.filters.filtersAppliedCount"
                  >{{ store.state.filters.filtersAppliedCount }}
                  <span
                    v-text="
                      store.state.filters.filtersAppliedCount !== 1
                        ? 'filters applied'
                        : 'filter applied'
                    "
                  ></span> </span
              ></span>
            </div>
          </span>
        </div>
      </section>
      <section class="pb-4 border-b py-3">
        <div
          v-if="store.state.filters.hideSoldOut"
          class="flex-align-center rounded selected-icon-bg p-2 text-xs"
        >
          <i class="material-icons text-base mr-1 text-blue-main">info</i>
          Showing earliest available dates
        </div>
        <keys-container :isfixed="false"></keys-container>
      </section>
      <div class="dates-rates-container">
        <div v-if="!trips.length" class="p-2 mt-3">
          <h3 class="text-base">
            There are no departures based on your selection, please update or
            clear filters.
          </h3>
        </div>
        <div
          v-for="(monthYear, index) in trips.slice(0, monthsToShow)"
          :key="index"
          class="dates-rates-item"
        >
          <div
            class="month-year-header p-1 mt-5 mb-1 text-gray-700"
            v-text="monthYear.name"
          ></div>
          <dates-rates-item
            v-for="(dateRate, index) in monthYear.datesRates"
            :key="index"
            :daterate="dateRate"
          ></dates-rates-item>
        </div>
      </div>

      <div v-if="showMoreButton" class="my-12">
        <div class="flex justify-center mt-2">
          <button
            class="buttons buttons-tertiary shadow-lg text-sm py-2 px-3"
            @click="showMoreDates()"
          >
            Show more dates
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as searchConstants from "../js/searchConstants";
import axios from "axios";
import AddGuestsPicker from "../components/AddGuestsPicker.vue";
import DatesRatesItem from "../components/DatesRatesItem.vue";
import KeysContainer from "../components/KeysContainer.vue";
import { stickyOnScroll } from "../js/stickyOnScroll.js";
import { backToTop } from "../js/backToTop.js";

export default {
  components: {
    "add-guests-picker": AddGuestsPicker,
    "dates-rates-item": DatesRatesItem,
    "keys-container": KeysContainer,
  },
  data() {
    return {
      selectedDates: {},
      guestPickerActive: false,
      monthsToShow: 3,
      months: [
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
      ],
      hideSoldOut: true,
    };
  },
  computed: {
    selectedAdults() {
      return this.$store.state.userSelectedData.adults;
    },
    selectedChildren() {
      return this.$store.state.userSelectedData.children;
    },
    store() {
      return this.$store;
    },
    trips() {
      return this.store.getters.filteredTrips.filter(
        (month) => month.datesRates.length
      );
    },
    tripsInfo() {
      return this.$store.state.datesRates.data;
    },
    showMoreButton() {
      if (this.monthsToShow >= this.trips.length) {
        return false;
      }
      return true;
    },
    datesSelected() {
      return this.store.state.filters.datesSelected;
    },
    startAndEndDatesSelected() {
      return this.datesSelected.start !== "" && this.datesSelected.end !== "";
    },
    dateRange() {
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };

      let fromDate = this.datesSelected.start
        .toLocaleString("en-us", options)
        .slice(0, 10);
      let toDate = this.datesSelected.end
        .toLocaleString("en-us", options)
        .slice(0, 10);
      return fromDate + " - " + toDate;
    },
  },
  methods: {
    getDatesRates() {
      this.$store.dispatch("updateIsLoading", true);
      axios
        .get(
          searchConstants.tripApi +
            searchConstants.region +
            "/" +
            searchConstants.brand +
            "/" +
            searchConstants.tourId +
            "/" +
            searchConstants.optionId
        )
        .then((data) => {
          let minDateAvailable =
            data.data.datesRates[0].datesRates[0].fromDateValue;
          let minDate = new Date(minDateAvailable);
          let maxDateAvailable = data.data.datesRates
            .slice(-1)
            .pop()
            .datesRates.slice(-1)
            .pop().toDateValue;
          let maxDate = new Date(maxDateAvailable);
          this.$store.dispatch("loadDatesRates", { data, minDate, maxDate });
          this.$store.dispatch("updateIsLoading", false);
        });
    },
    openGuestPicker() {
      this.guestPickerActive = true;
    },
    closeGuestPicker() {
      this.guestPickerActive = false;
    },
    openFiltersModal() {
      this.$store.dispatch("openFiltersModal");
    },
    showMoreDates() {
      this.monthsToShow += this.monthsToShow;
    },
    stickyOnScroll,
    backToTop,
    openDatePicker(val) {
      this.$store.dispatch("openCloseDatePicker", val);
    },
  },
  created() {
    this.getDatesRates();
  },
  mounted() {
    this.stickyOnScroll();
    this.backToTop();
  },
  watch: {
    hideSoldOut() {
      this.$store.dispatch("updateHideSoldOut", this.hideSoldOut);
    },
  },
};
</script>
