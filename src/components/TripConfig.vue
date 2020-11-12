<template>
  <div>
    <h3 class="text-left text-gray-600 mb-2" :class="dates ? 'mt-2' : 'mt-6'">
      {{ headerText }}
    </h3>
    <div class="departure-dates flex">
      <dates v-if="dates"></dates>
      <rooms v-if="rooms"></rooms>
      <addons v-if="addons"></addons>
      <flights v-if="flights"></flights>
      <main-guest-details v-if="mainguestdetails"></main-guest-details>
      <other-guest-details
        v-if="otherguestdetails"
        :child="child"
        :adult="adult"
        :guestindex="guestindex"
      ></other-guest-details>
      <div
        class="edit-section border border-l-0 w-1/5 flex-align-center flex-col p-3 justify-center section-bg"
        :class="{ 'justify-between': !dates }"
      >
        <button
          class="buttons buttons-soft"
          :class="{ 'mb-2': !dates }"
          @click="loadNextPage(returnToPage, 'backwards')"
        >
          <i class="material-icons text-base">edit</i>
        </button>
        <button
          v-if="addons || flights"
          class="buttons buttons-soft buttons-remove"
        >
          <i class="material-icons text-base">delete_forever</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Dates from "./summary-sections/dates.vue";
import Rooms from "./summary-sections/rooms.vue";
import Addons from "./summary-sections/addons.vue";
import Flights from "./summary-sections/flights.vue";
import MainGuestDetails from "./summary-sections/main-guest-details.vue";
import OtherGuestDetails from "./summary-sections/other-guest-details.vue";

export default {
  props: [
    "dates",
    "rooms",
    "addons",
    "flights",
    "mainguestdetails",
    "otherguestdetails",
    "guestindex",
    "adult",
    "child",
  ],
  components: {
    dates: Dates,
    rooms: Rooms,
    addons: Addons,
    flights: Flights,
    "main-guest-details": MainGuestDetails,
    "other-guest-details": OtherGuestDetails,
  },
  data() {
    return {};
  },
  computed: {
    store() {
      return this.$store.state.userSelectedData;
    },
    headerText() {
      if (this.dates) {
        return "Trip configuration";
      } else if (this.addons) {
        return "Trip add-ons";
      } else if (this.flights) {
        return "Flights";
      } else if (this.maindetails) {
        return "Your details";
      } else if (this.otherdetails) {
        return "Other guests details";
      }
    },
    returnToPage() {
      if (this.dates) {
        return "departures";
      } else if (this.rooms || this.addons) {
        return "rooms";
      } else if (this.flights) {
        return "find-flights";
      } else if (this.mainguestdetails || this.otherguestdetails) {
        return "guest-details";
      }
    },
  },
  methods: {
    loadNextPage(page, direction) {
      this.$store.dispatch("newPage", { page, direction });
    },
  },
};
</script>
