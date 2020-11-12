<template>
  <transition name="fade">
    <div v-if="store.state.flightModalOpen" class="modal outer-section">
      <div class="modal-header">
        <div class="modal-close" @click="closeFlightModal()"></div>
        <h2 class="text-center font-semibold">Flight details</h2>
      </div>
      <modal-flight-item
        outbound="true"
        :journey="store.state.flightModalTrip.outbound"
      ></modal-flight-item>
      <modal-flight-item
        return="true"
        :journey="store.state.flightModalTrip.return"
      ></modal-flight-item>
      <div class="flights-summary section-bg section-border mt-8">
        <div class="inner-section border-b">
          <div class="flex-align-center">
            <div class="font-semibold text-sm mr-1">Guests:</div>
            <div class="flex-align-center text-xs">
              <div>
                Adults: {{ store.state.userSelectedData.guests.adults }}
              </div>
              <div v-if="store.state.userSelectedData.guests.children">
                , Children: {{ store.state.userSelectedData.guests.children }}
              </div>
            </div>
          </div>
          <div class="flex-align-center">
            <div class="font-semibold text-sm mr-1">Cabin class:</div>
            <div class="text-xs">
              {{ store.state.flightModalTrip.outbound.flights[0].cabinClass }}
            </div>
          </div>
        </div>
        <div class="inner-section flex-align-center justify-between">
          <div>
            <div class="text-sm">Your trip + flights</div>
            <div class="flex-align-center text-xs text-gray-600">Trip Only</div>
          </div>
          <div class="flex-align-center">
            <div class="text-right">
              <div class="font-semibold text-base">$4,669</div>
              <div class="text-xs text-gray-600">$3,456</div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!store.state.userSelectedData.flights.flightsAdded"
        class="w-full flex justify-center mt-8"
      >
        <button
          class="buttons buttons-primary flex-align-center justify-center py-3 w-2/3 shadow-lg my-4"
          @click="
            [
              loadNextPage('rooms', 'forwards'),
              closeFlightModal(),
              addFlights(trip),
            ]
          "
        >
          <span class="text-base">Add flights to trip</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalFlightItem from "../components/ModalFlightItem.vue";
export default {
  props: [],
  components: {
    "modal-flight-item": ModalFlightItem,
  },
  data() {
    return {};
  },
  computed: {
    store() {
      return this.$store;
    },
    trip() {
      return this.store.state.flightModalTrip;
    },
  },
  methods: {
    closeFlightModal() {
      this.$store.dispatch("closeFlightModal");
    },
    loadNextPage(page, direction) {
      this.$store.dispatch("newPage", { page, direction });
    },
    addFlights(trip) {
      this.$store.dispatch("addedFlights", trip);
    },
  },
};
</script>
