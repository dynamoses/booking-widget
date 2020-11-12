<template>
  <div class="trip-item mb-4 items-start">
    <div class="flex-align-center">
      <div class="w-1/6 itinerary-icon-container">
        <div class="itinerary-icon" :class="{ itinerary: tripitinerary }">
          <i class="material-icons text-base">{{ itineraryIcon }}</i>
        </div>
        <div class="line-horizontal"></div>
      </div>
      <div class="w-5/6 section-bg section-border trip-itinerary-header">
        <div class="flex-align-center py-2 px-4">
          <div class="flex-align-center text-xxs">
            <div class="start-date text-blue-main font-semibold">
              {{ itemDate }}
            </div>
            <div>&nbsp;-&nbsp;{{ itemHeaderDescription }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="w-1/6">
        <div class="line-vertical"></div>
      </div>
      <div
        class="section-border section-bg text-left w-5/6 z-20 trip-itinerary-main-section"
      >
        <flights
          v-if="outboundflight"
          :outboundflight="true"
          :journey="store.flights.journeyDetails.journeys.outbound"
        ></flights>
        <extra-nights
          v-if="extranightsbefore"
          :nights="store.addedNights.before"
        ></extra-nights>
        <trip-itinerary v-if="tripitinerary"></trip-itinerary>
        <extra-nights
          v-if="extranightsafter"
          :nights="store.addedNights.after"
        ></extra-nights>

        <flights
          v-if="returnflight"
          :returnflight="true"
          :journey="store.flights.journeyDetails.journeys.return"
        ></flights>
      </div>
    </div>
  </div>
</template>

<script>
import Flights from "../components/itinerary-sections/flights.vue";
import TripItinerary from "../components/itinerary-sections/trip-itinerary.vue";
import ExtraNights from "../components/itinerary-sections/extra-nights.vue";
export default {
  props: [
    "outboundflight",
    "extranightsbefore",
    "tripitinerary",
    "extranightsafter",
    "returnflight",
  ],
  components: {
    flights: Flights,
    "trip-itinerary": TripItinerary,
    "extra-nights": ExtraNights,
  },
  data() {
    return {};
  },
  computed: {
    store() {
      return this.$store.state.userSelectedData;
    },
    itemDate() {
      if (this.outboundflight) {
        return this.store.outboundFlightDate;
      } else if (this.tripitinerary) {
        return this.store.tripStartDate;
      } else if (this.returnflight) {
        return this.store.returnFlightDate;
      } else if (this.extranightsbefore) {
        return this.store.extraNightsBeforeStartDate;
      } else if (this.extranightsafter) {
        return this.store.extraNightsAfterStartDate;
      }
    },
    itemHeaderDescription() {
      if (this.outboundflight) {
        return "Outbound flight";
      } else if (this.tripitinerary) {
        return "Trip begins";
      } else if (this.returnflight) {
        return "Return Flight";
      } else if (this.extranightsbefore || this.extranightsafter) {
        return "Extra nights";
      }
    },
    itineraryIcon() {
      if (this.outboundflight) {
        return "flight_takeoff";
      } else if (this.tripitinerary) {
        return "location_on";
      } else if (this.returnflight) {
        return "flight_land";
      } else if (this.extranightsbefore || this.extranightsafter) {
        return "business";
      }
    },
  },
  methods: {},
};
</script>
