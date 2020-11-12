<template>
  <transition name="slide-fade">
    <div
      v-if="this.$store.state.pagination.activePage === 'flight-search-results'"
      :class="store.state.pagination.direction"
    >
      <div class="edit-container flex section-border section-bg">
        <div
          class="flight-summary w-4/5 text-left inner-section text-xs border-r inner-section"
        >
          <div class="text-gray-700">Flight search</div>
          <div class="font-semibold mt-2">New York (Any) - Rome (FCO)</div>
          <div class="flex-align-center">
            <div class="flex-align-center mr-4">
              <i class="material-icons mr-1 text-sm">flight_takeoff</i>
              <div>Sat, 03 Oct</div>
            </div>
            <div class="flex-align-center">
              <i class="material-icons mr-1 text-sm">flight_land</i>
              <div>Thu, 21 Oct</div>
            </div>
          </div>
          <div class="flex-align-center">
            <i class="material-icons mr-1 text-sm">group</i>
            <div>1 adult, economy</div>
          </div>
        </div>
        <div
          class="flight-search w-1/5 flex items-start justify-center inner-section"
        >
          <button
            class="buttons buttons-soft"
            @click="loadNextPage('find-flights', 'backwards')"
          >
            <i class="material-icons text-blue-700 text-lg">search</i>
          </button>
        </div>
      </div>
      <div class="flight-options py-6 mt-6 border-t">
        <div class="flight-filters">
          <div class="flex-align-center form text-xs">
            <div class="flex-align-center form-item w-2/3">
              <div class="font-semibold w-1/4">Sory by:</div>
              <div class="form-input-container select w-3/4">
                <select class="text-sm small" v-model="sortBy">
                  <option>Best available</option>
                  <option>Cheapest</option>
                  <option>Fastest</option>
                </select>
              </div>
            </div>

            <div class="w-1/3 text-right">
              <div>20 of 116 results</div>
              <a href="" class="link-text">View all</a>
            </div>
          </div>
          <div class="flex-align-center filters my-4">
            <div
              v-for="filter in filters"
              :key="filter.index"
              :class="{ 'selected shadow-xl': chosenFilter === filter.name }"
              class="filter-item w-1/3 bg-white py-3"
            >
              <label :for="filter.name">
                <div class="text-xs font-semibold filter-name">
                  {{ filter.name }}
                </div>
                <div class="text-sm font-semibold filter-price">
                  {{ filter.topPrice }}
                </div>
                <div class="text-xs filter filter-duration">
                  {{ filter.topDuration }}
                </div>
                <input
                  :id="filter.name"
                  type="radio"
                  :value="filter.name"
                  v-model="chosenFilter"
                />
              </label>
            </div>
          </div>
          <div
            v-for="trip in tripOptions"
            :key="trip.index"
            class="section-border mb-4"
          >
            <div class="border-b">
              <flights :journey="trip.outbound"></flights>
            </div>
            <div class="border-b">
              <flights :journey="trip.return"></flights>
            </div>
            <div
              class="flights-actions flex-align-center justify-between inner-section section-bg"
            >
              <div class="text-left">
                <div class="text-xxs text-gray-800">Your trip + flights</div>
                <div class="font-semibold text-base">$4,669</div>
              </div>
              <div class="flights-details-button">
                <button
                  class="buttons buttons-tertiary text-xxs py-2 px-4"
                  @click="updateAndOpenFlightModal(trip)"
                >
                  View Details
                </button>
              </div>
            </div>
            <!-- <flights :journey="journey"></flights> -->
          </div>
        </div>
      </div>
      <div>
        <div class="text-sm">Show more flights</div>
        <div class="flex justify-center mt-2">
          <button class="buttons buttons-floating shadow-lg">
            <i class="material-icons transform rotate-90 text-3xl"
              >arrow_right_alt</i
            >
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Flights from "../components/Flights.vue";
import { trips } from "../js/trips.js";
export default {
  props: {},
  components: {
    flights: Flights,
  },
  data() {
    return {
      sortBy: "",
      chosenFilter: "Best",
      filters: [
        {
          name: "Best",
          topPrice: "$4,669",
          topDuration: "13h 11m",
        },
        {
          name: "Cheapest",
          topPrice: "$4,669",
          topDuration: "13h 11m",
        },
        {
          name: "Fastest",
          topPrice: "$4,915",
          topDuration: "13h 11m",
        },
      ],
      tripOptions: trips,
    };
  },
  computed: {
    store() {
      return this.$store;
    },
  },
  methods: {
    updateAndOpenFlightModal(trip) {
      this.$store.dispatch("updateAndOpenFlightModal", trip);
    },
    loadNextPage(page, direction) {
      this.$store.dispatch("newPage", { page, direction });
    },
  },
};
</script>
