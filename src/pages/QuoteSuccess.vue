<template>
  <transition name="slide-fade">
    <div
      v-if="this.$store.state.pagination.activePage === 'quote-success'"
      :class="this.$store.state.pagination.direction"
      class="quote-success"
    >
      <success-header :note="note"></success-header>
      <div>
        <div class="text-xs mt-6 p-8">
          Thank you for creating a quote, this has now been emailed to
          <strong>{{ store.guestDetails.mainGuest.email }}</strong
          >. If it doesn't show up in your inbox shortly please make sure to
          check your junk folder.
        </div>
        <div class="flex flex-col justify-center mt-8">
          <div class="text-xxs">Fancy creating another quote?</div>
          <div class="w-full flex justify-center">
            <button
              class="buttons buttons-back flex-align-center justify-center py-3 w-1/2 my-4"
              @click="loadNextPage('departures', 'backwards')"
            >
              <span class="mr-1 text-xs">Create new quote</span>
              <i class="material-icons text-lg">arrow_forward</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import SuccessHeader from "../components/SuccessHeader.vue";
export default {
  components: { "success-header": SuccessHeader },
  data() {
    return {
      note: "Your trip quote has been sent!",
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
