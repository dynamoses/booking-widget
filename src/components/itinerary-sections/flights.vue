<template>
  <div>
    <div
      v-for="(flight, index) in journey.flights"
      :key="index"
      class="py-3 px-4"
    >
      <div class="flex-align-center justify-center">
        <div class="text-right w-5/12">
          <div class="text-sm font-semibold">
            {{ flight.departureAirportCode }}
          </div>
          <div class="text-xxs">{{ flight.departureLocation }}</div>
        </div>
        <div class="flex-align-center px-2 w-2/12">
          <div class="flight-line"></div>
          <i class="material-icons transform rotate-90 text-gray-600 text-xs"
            >flight</i
          >
        </div>
        <div class="text-left w-5/12">
          <div class="text-sm font-semibold">
            {{ flight.arrivalAirportCode }}
          </div>
          <div class="text-xxs">{{ flight.arrivalLocation }}</div>
        </div>
      </div>
      <div class="flex-align-center justify-center text-xs mt-2">
        <div class="mr-3">
          <strong>Depart:&nbsp;</strong>{{ flight.departureTime }}
        </div>
        <div><strong>Cabin Class:&nbsp;</strong>{{ flight.cabinClass }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["outboundflight", "journey"],
  components: {},
  data() {
    return {};
  },
  computed: {
    store() {
      return this.$store.state.userSelectedData;
    },
  },
  methods: {
    loadNextPage(page, direction) {
      this.$store.dispatch("newPage", { page, direction });
    },
    formatDate(date) {
      return date.getDay() + " " + date.getDate() + " " + (date.getMonth() + 1);
    },
  },
};
</script>
