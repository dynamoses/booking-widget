<template>
  <transition name="slide-fade">
    <div
      v-if="this.$store.state.pagination.activePage === 'guest-details'"
      :class="this.$store.state.pagination.direction"
      class="guest-details"
    >
      <div class="border-b border-gray-400 pb-4">
        <trip-config :dates="true"></trip-config>
        <trip-config :rooms="true"></trip-config>
        <trip-config :addons="true"></trip-config>
        <trip-config :flights="true"></trip-config>
        <trip-config :mainguestdetails="true"></trip-config>
      </div>
      <div class="add-details mt-4">
        <div>
          <h1 class="text-left mb-3 font-semibold header-main">
            Add your details
          </h1>
          <div class="info-description text-left text-xs">
            Please take some time to enter the details below so we are able to
            process your booking efficiently.
          </div>
          <div
            class="note-info text-left text-xxs section-border section-bg mt-3 mb-4"
          >
            <div class="p-3">
              <span class="font-semibold note mr-1">Note:</span
              >{{ passportTerms }}
            </div>
          </div>
        </div>
        <div class="form-container">
          <personal-details mainguest="true"></personal-details>
          <main-guest-other-details></main-guest-other-details>
          <div class="mt-12">
            <h1 class="text-left mb-3 font-semibold header-main">
              Add other guests details
            </h1>
            <div class="info-description text-left text-xs">
              We need to ask for some basic details of the other people you are
              booking for. This will help us provide support for all members of
              your party.
            </div>
            <div
              class="note-info text-left text-xxs section-border section-bg mt-3 mb-4"
            >
              <div class="p-3">
                <span class="font-semibold note mr-1">Note:</span
                >{{ passportTerms }}
              </div>
            </div>
          </div>
          <div v-if="store.guestDetails.otherGuests.adults.length">
            <personal-details
              v-for="(adult, index) in store.guestDetails.otherGuests.adults"
              :key="index"
              :adult="adult"
              :index="index"
            ></personal-details>
          </div>
          <div v-if="store.guestDetails.otherGuests.children.length">
            <personal-details
              v-for="(child, index) in store.guestDetails.otherGuests.children"
              :key="index"
              :child="child"
              :index="index"
            ></personal-details>
          </div>
        </div>
      </div>

      <div class="w-full flex justify-center">
        <button
          class="buttons buttons-primary flex-align-center justify-center py-3 w-3/4 shadow-lg mt-8 mb-32"
          @click="loadNextPage('payment', 'forwards')"
        >
          <span class="mr-1 text-sm">Proceed to payment</span>
          <i class="material-icons text-lg">arrow_forward</i>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import TripConfig from "../components/TripConfig.vue";
import PersonalDetails from "../components/PersonalDetails.vue";
import MainGuestOtherDetails from "../components/MainGuestOtherDetails.vue";

export default {
  components: {
    "trip-config": TripConfig,
    "personal-details": PersonalDetails,
    "main-guest-other-details": MainGuestOtherDetails,
  },
  data() {
    return {
      passportTerms:
        "All details below should exactly match those shown on your passport.",
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
