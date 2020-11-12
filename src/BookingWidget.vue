<template>
  <div
    class="text-xl flex-col items-center justify-center app-booking-widget overflow-hidden border-2 relative"
    :class="
      store.state.flightModalOpen ? 'overflow-y-scroll' : 'overflow-y-hidden'
    "
  >
    <div
      class="widget-container relative w-full min-h-full self-center shadow-2xl rounded-md text-center items-center overflow-x-hidden"
      :class="[
        !store.state.flightModalOpen
          ? 'overflow-y-scroll'
          : 'overflow-y-hidden',
        containerHasPadding,
      ]"
    >
      <departure-dates></departure-dates>
      <rooms></rooms>
      <send-quote></send-quote>
      <quote-success></quote-success>
      <protection></protection>
      <find-flights></find-flights>
      <flight-search-results></flight-search-results>
      <guest-details></guest-details>
      <payment></payment>
      <book-success></book-success>
      <datepicker></datepicker>
    </div>
    <trip-breakdown></trip-breakdown>
    <flight-modal></flight-modal>
    <filters-modal></filters-modal>
    <keys-container
      v-if="store.state.pagination.activePage === 'departures'"
      :isfixed="true"
    ></keys-container>
    <back-to-top
      v-if="store.state.pagination.activePage === 'departures'"
    ></back-to-top>
    <div>
      <date-picker-fixed-elems
        v-if="store.state.datePickerIsOpen"
      ></date-picker-fixed-elems>
    </div>
  </div>
</template>

<script>
import DepartureDates from "./pages/DepartureDates.vue";
import rooms from "./pages/Rooms.vue";
import SendQuote from "./pages/SendQuote.vue";
import QuoteSuccess from "./pages/QuoteSuccess.vue";
import Protection from "./pages/Protection.vue";
import TripBreakdown from "./components/TripBreakdown.vue";
import FlightModal from "./components/FlightModal.vue";
import FindFlights from "./pages/FindFlights.vue";
import FlightSearchResults from "./pages/FlightSearchResults.vue";
import GuestDetails from "./pages/GuestDetails.vue";
import Payment from "./pages/Payment.vue";
import BookSuccess from "./pages/BookSuccess.vue";
import FiltersModal from "./components/FiltersModal.vue";
import KeysContainer from "./components/KeysContainer.vue";
import BackToTop from "./components/BackToTop.vue";
import DatePicker from "./components/DatePicker.vue";
import DatePickerFixedElems from "./components/DatePickerFixedElems.vue";
export default {
  components: {
    "departure-dates": DepartureDates,
    rooms,
    "send-quote": SendQuote,
    "quote-success": QuoteSuccess,
    "trip-breakdown": TripBreakdown,
    protection: Protection,
    "flight-modal": FlightModal,
    "find-flights": FindFlights,
    "flight-search-results": FlightSearchResults,
    "guest-details": GuestDetails,
    payment: Payment,
    "book-success": BookSuccess,
    "filters-modal": FiltersModal,
    "keys-container": KeysContainer,
    "back-to-top": BackToTop,
    datepicker: DatePicker,
    "date-picker-fixed-elems": DatePickerFixedElems,
  },
  computed: {
    store() {
      return this.$store;
    },
    containerHasPadding() {
      if (!this.store.state.pagination.activePage.includes("success")) {
        return "outer-section";
      }
    },
  },
};
</script>
