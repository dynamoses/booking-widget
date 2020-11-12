<template>
  <div class="flight-item inner-section section-bg">
    <div
      v-if="!store.showConfigSummary"
      class="flex-align-center justify-between text-xs mb-2"
    >
      <div class="airline flex-align-center w-2/5">
        <img class="w-2/12 mr-1" :src="journey.airlineLogoUrl" />
        <div class="text-tiny">
          {{ journey.airline }}
        </div>
      </div>
      <div
        v-if="journey.operatedBy"
        class="operated-by w-3/5 text-right text-tiny"
      >
        Operated by:
        {{ journey.operatedBy }}
      </div>
    </div>
    <div class="flex">
      <div class="departure-container w-1/4 text-right">
        <div class="departure-time font-semibold text-sm">
          {{ journey.departureTime }}
        </div>
        <div class="departure-airport text-xs">
          {{ journey.departureAirportCode }}
        </div>
      </div>
      <div class="duration-container w-2/4">
        <div class="duration-time text-xxs text-center">
          {{ journey.duration }}
        </div>
        <div class="flex-align-center">
          <div
            class="duration-line ml-2 w-5/6 flex-align-center justify-center"
          >
            <div
              v-for="connection in journey.connectionsCount"
              :key="connection.index"
              class="connection-dots flex-align-center justify-center mx-1"
            ></div>
          </div>
          <div class="w-1/6 flex-align-center justify-center">
            <i
              class="material-icons transform rotate-90 text-base text-gray-700"
              >flight</i
            >
          </div>
        </div>
        <div>
          <div
            v-if="journey.connectionsCount == 0"
            class="text-xxs text-success text-center"
          >
            Direct
          </div>
          <div
            v-if="journey.connectionsCount > 0"
            class="text-xxs text-center text-red-primary"
          >
            {{ journey.connectionsCount }} stop
            <span v-if="journey.connectionsCount > 1">s</span>
          </div>
        </div>
      </div>
      <div class="arrival-container w-1/4 text-left">
        <div class="departure-time font-semibold text-sm">
          {{ journey.arrivalTime }}
          <sup v-if="journey.arrivalDayDifference">{{
            journey.arrivalDayDifference
          }}</sup>
        </div>
        <div class="departure-airport text-xs">
          {{ journey.arrivalAirportCode }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["journey"],
  data() {
    return {};
  },
  computed: {
    store() {
      return this.$store.state;
    },
  },
  methods: {},
};
</script>
