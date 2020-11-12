<template>
  <transition name="slide-fade">
    <div
      v-if="this.$store.state.pagination.activePage === 'book-success'"
      :class="this.$store.state.pagination.direction"
      class="book-success"
    >
      <success-header :note="note"></success-header>
      <div class="outer-section">
        <trip-summary></trip-summary>
        <div class="trip-itinerary-container mt-8">
          <h3 class="text-left font-semibold text-base mb-3">
            Your trip itinerary
          </h3>
          <div class="trip-itinerary-container">
            <trip-itinerary-item :outboundflight="true"></trip-itinerary-item>
            <trip-itinerary-item
              v-if="store.addedNights.before.added"
              :extranightsbefore="true"
            ></trip-itinerary-item>
            <trip-itinerary-item :tripitinerary="true"></trip-itinerary-item>
            <trip-itinerary-item
              v-if="store.addedNights.after.added"
              :extranightsafter="true"
            ></trip-itinerary-item>
            <trip-itinerary-item :returnflight="true"></trip-itinerary-item>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import SuccessHeader from "../components/SuccessHeader.vue";
import TripSummary from "../components/TripSummary.vue";
import TripItineraryItem from "../components/TripItineraryItem.vue";
export default {
  components: {
    "success-header": SuccessHeader,
    "trip-summary": TripSummary,
    "trip-itinerary-item": TripItineraryItem,
  },

  data() {
    return {
      note: "Pack your bags, your trip is booked!",
    };
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
  },
};
</script>
