<template>
  <div class="mt-8">
    <div class="flight-date flex-align-center text-sm mb-1">
      <div
        class="font-semibold mr-1"
        v-text="journey.outbound ? 'Outbound:' : 'Return:'"
      ></div>
      <div>{{ journey.date }}</div>
    </div>
    <div class="section-border">
      <flights :journey="journey"></flights>
      <div class="journey-more-details inner-section border-t mt-4 relative">
        <div
          class="more-details-trigger flex items-center justify-center cursor-pointer"
          @click="toggleMoreDetails($event)"
        ></div>
        <div
          v-for="flight in journey.flights"
          :key="flight.index"
          class="flight-info"
        >
          <div class="flex-align-center justify-between mb-2">
            <div class="w-1/2 flex-align-center">
              <img class="w-2/12 mr-1" :src="journey.airlineLogoUrl" />
              <div class="text-xxs mx-1">
                {{ flight.airline }}
              </div>
              <div class="text-xxs">{{ flight.flightNumber }}</div>
            </div>
            <div
              v-if="journey.operatedBy"
              class="operated-by w-3/5 text-right text-xxs"
            >
              Operated by:
              {{ journey.operatedBy }}
            </div>
          </div>
          <div class="flex mb-4">
            <div class="flight-points my-1 mr-3"></div>
            <div class="flex-col">
              <div class="flex-align-center text-sm w-full">
                <div class="mr-3">{{ flight.departureTime }}</div>
                <div class="flex-align-center">
                  <div class="mr-1">{{ flight.departureAirportCode }}</div>
                  <div>{{ flight.departureAirport }}</div>
                </div>
              </div>
              <div class="flex-align-center text-xxs py-2">
                <i class="material-icons text-sm mr-1">schedule</i
                >{{ flight.duration }}
              </div>
              <div class="flex-align-center text-sm">
                <div class="mr-3">{{ flight.arrivalTime }}</div>
                <div class="flex-align-center">
                  <div class="mr-1">{{ flight.arrivalAirportCode }}</div>
                  <div>{{ flight.arrivalAirport }}</div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="flight.connection"
            class="connection-info flex-align-center inner-section text-red-primary info-container mb-3"
          >
            <div class="text-xxs mr-3">{{ flight.connectionTime }}</div>
            <div class="text-sm">{{ flight.connectionDetails }}</div>
          </div>
          <div class="flex-align-center justify-between text-xxs">
            <div class="flex-align-center">
              <div class="font-semibold mr-1">Arrives:</div>
              <div>{{ journey.date }}</div>
            </div>
            <div class="flex-align-center">
              <div class="font-semibold mr-1">Journey duration:</div>
              <div>{{ journey.duration }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Flights from "../components/Flights.vue";
export default {
  props: ["journey", "outbound", "return"],
  data() {
    return {};
  },
  components: {
    flights: Flights,
  },
  computed: {
    store() {
      return this.$store.state;
    },
  },
  methods: {
    toggleMoreDetails(e) {
      const className = "open";
      const target = e.target;
      const targetParent = e.target.parentNode;
      target.classList.toggle(className);
      targetParent.classList.toggle(className);
    },
  },
};
</script>
