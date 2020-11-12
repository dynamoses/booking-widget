<template>
  <transition name="slide-fade">
    <div
      class="outer-section"
      v-if="this.$store.state.pagination.activePage === 'find-flights'"
      :class="store.state.pagination.direction"
    >
      <button
        class="back-to-quote flex-align-center justify-center buttons buttons-back w-2/5 text-xxs py-2 mb-8"
        @click="loadNextPage('rooms', 'backwards')"
      >
        <i class="material-icons text-base mr-1">arrow_back</i>
        Back to quote
      </button>
      <h1 class="text-left mb-6 font-semibold header-main">
        Find your flights
      </h1>
      <div class="form mb-4">
        <div class="airport-search text-left">
          <div class="form-item">
            <div class="text-sm required label">My preferred airport</div>
            <div class="form-input-container search">
              <input
                class="airport-search__input"
                type="text"
                v-model="searchedAirport"
                placeholder="Search for city/airport"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <div class="text-xs flex-align-center">
          <span class="mr-1">Flying to:</span>
          <span class="font-semibold">Rome (FCO)</span>
        </div>
        <div class="text-xs flex-align-center">
          <span class="mr-1">Return from:</span>
          <span class="font-semibold">Florence (FLR)</span>
        </div>
      </div>
      <div
        class="note-info text-left text-xs inner-section section-border section-bg"
      >
        <div class="mb-4">
          <span class="font-semibold note mr-1">Note:</span>Trips to Europe
          require overnight flights, so you'll need to leave the day prior
          toarrive on time. We have populated the fields below with the best
          dates for your trip.
        </div>

        <div>
          <div>For reference, your trip dates (inc. extra nights) are:</div>
          <div class="mt-1">
            Starts: <span class="font-semibold">Sun 04 Oct</span>, 09:00am -
            Rome
          </div>
          <div>
            Ends: <span class="font-semibold">Thu 21 Oct</span>, 11:00am -
            Florence
          </div>
        </div>
      </div>
      <div class="form mt-4 form-column">
        <div class="form-item">
          <label class="label label-light">Departs</label>
          <div
            class="form-input-container date"
            :class="{ selected: departureDate }"
          >
            <datepicker
              format="dd/MM/yyyy"
              v-model="departureDate"
            ></datepicker>
          </div>
        </div>

        <div class="form-item">
          <label class="label label-light">Returns</label>
          <div
            class="form-input-container date"
            :class="{ selected: returnDate }"
          >
            <datepicker format="dd/MM/yyyy" v-model="returnDate"></datepicker>
          </div>
        </div>
        <div class="form-item">
          <label class="label label-light">Cabin class</label>
          <div class="form-input-container select">
            <select v-model="cabinClass">
              <option value="Economy">Economy</option>
              <option value="First Class">First Class</option>
            </select>
          </div>
        </div>
        <div class="form-item">
          <label class="label">Airline(s)</label>
          <div class="form-input-container select">
            <select v-model="airlineChosen">
              <option
                v-for="airline in airlines"
                :key="airline.index"
                :value="airline"
                >{{ airline }}</option
              >
            </select>
          </div>
        </div>
        <div class="form-item">
          <label class="label input-container flex-align-center">
            <input
              type="checkbox"
              id="direct-only"
              name="direct-only"
              v-model="directOnly"
            /><span class="checkmark text-base"></span
            ><span class="text-base label">Direct flights only</span>
          </label>
        </div>
        <div class="my-12 flex justify-center">
          <button
            class="buttons buttons-primary text-sm py-3 px-8"
            @click="loadNextPage('flight-search-results', 'forwards')"
          >
            Search for flights
          </button>
        </div>
        <div class="terms-container pt-6 border-t text-xs">
          <div class="mb-3">
            For your benefit and clarity, the total airfare shown includes
            airline imposed fuel surcharges, government taxes and fees. If you
            need more clarafication please see our
            <a href="#" class="link-text">terms &amp; conditions</a>.
          </div>
          <div>
            For more information regarding free baggage allowance and/or the
            applicable fee for a carry-on bag and first and second checked bag,
            please visit
            <a href="https://www.trafalgar.com/baggage" class="link-text"
              >https://www.trafalgar.com/baggage</a
            >.
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Datepicker from "vuejs-datepicker";
export default {
  props: {},
  data() {
    return {
      searchedAirport: "",
      departureDate: new Date(),
      returnDate: "",
      cabinClass: "Economy",
      airlineChosen: "",
      airlines: [
        "Aegean Airlines",
        "Aer Lingus Airlines",
        "Air Seychelles",
        "Alaska Airlines",
        "British Airways",
      ],
      directOnly: true,
    };
  },
  components: {
    datepicker: Datepicker,
  },
  computed: {
    store() {
      return this.$store;
    },
  },
  methods: {
    loadNextPage(page, direction) {
      this.$store.dispatch("newPage", { page, direction });
    },
  },
};
</script>
