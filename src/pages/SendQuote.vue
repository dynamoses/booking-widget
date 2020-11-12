<template>
  <transition name="slide-fade">
    <div
      v-if="this.$store.state.pagination.activePage === 'send-quote'"
      :class="this.$store.state.pagination.direction"
      class="send-quote pb-8"
    >
      <button
        class="back-to-quote flex-align-center justify-center buttons buttons-back w-2/5 text-xxs mt-2 py-2 mb-4"
        @click="loadNextPage('rooms', 'backwards')"
      >
        <i class="material-icons text-base mr-1">arrow_back</i>
        Back to quote
      </button>
      <div class="email-quote-header mb-4">
        <h1 class="text-left mb-3 font-semibold header-main">
          Email my trip quote
        </h1>
        <div class="description text-left text-xs">
          Take a moment to review the details below ensuring the information is
          correct, then simply click the 'Send my quote' button at the bottom.
        </div>
      </div>
      <trip-summary></trip-summary>
      <div class="add-your-details mt-12">
        <h1 class="text-left mb-3 font-semibold header-main">
          Add your details
        </h1>
        <div class="form">
          <div class="form-item">
            <label class="label required">First name</label>
            <div class="form-input-container text">
              <input type="text" placeholder="What should we call you" />
            </div>
          </div>
          <div class="form-item">
            <label class="label required">Last name</label>
            <div class="form-input-container text">
              <input type="text" placeholder="What should we call you" />
            </div>
          </div>
          <div class="form-item">
            <label class="label required">Email address</label>
            <div class="form-input-container text">
              <input type="email" placeholder="e.e. yourname@example.com" />
            </div>
          </div>
          <div class="form-item">
            <label class="label required">Phone number</label>
            <div class="form-input-container text w-3/5">
              <input type="tel" placeholder="202-555-0150" />
            </div>
          </div>
        </div>
      </div>
      <div class="terms text-left text-xs my-6">
        <div>
          I have read the following documents;
          <a href="#" class="link-text">Terms &amp; Conditions</a>,
          <a href="#" class="link-text">Data usage policy</a> and
          <a href="#" class="link-text">Privacy policy</a> and agree with their
          contents.
        </div>
        <div class="mt-4">
          <label
            for="agree-terms"
            class="input-container cursor-pointer flex-align-center"
            ><input
              type="checkbox"
              id="agree-terms"
              name="agree-terms"
              v-model="agreeTerms"
            /><span class="checkmark text-base"></span
            ><span class="text-xs font-semibold"
              >I agree to the conditions and policies</span
            ></label
          >
        </div>
      </div>

      <div class="w-full flex justify-center">
        <button
          class="buttons buttons-primary flex-align-center justify-center py-3 w-3/4 shadow-lg my-4"
          :class="{ disabled: !agreeTerms }"
          @click="loadNextPage('quote-success', 'forwards')"
        >
          <span class="mr-1 text-base">Send my quote</span>
          <i class="material-icons text-lg">arrow_forward</i>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import TripSummary from "../components/TripSummary.vue";
export default {
  components: {
    "trip-summary": TripSummary,
  },
  data() {
    return { agreeTerms: false };
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
