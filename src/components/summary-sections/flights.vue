<template>
  <div class="flights-section flex-col border w-4/5 section-bg">
    <div
      v-for="(journey, index) in store.userSelectedData.flights.journeyDetails
        .journeys"
      :key="index"
      :class="{ 'border-b': index == 0 }"
    >
      <flights :journey="journey"></flights>
    </div>
  </div>
</template>

<script>
import Flights from "../Flights.vue";
export default {
  props: [],
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
  methods: {},
};
</script>
