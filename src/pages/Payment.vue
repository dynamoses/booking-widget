<template>
  <transition name="slide-fade">
    <div
      v-if="this.$store.state.pagination.activePage === 'payment'"
      :class="this.$store.state.pagination.direction"
      class="payment slide-vertical pb-24"
    >
      <div class="border-b border-gray-400 pb-4">
        <trip-config :dates="true"></trip-config>
        <trip-config :rooms="true"></trip-config>
        <trip-config :addons="true"></trip-config>
        <trip-config
          v-if="store.flights.flightsAdded"
          :flights="true"
        ></trip-config>
        <trip-config :mainguestdetails="true"></trip-config>
        <trip-config
          v-for="(adultGuest, adultIndex) in store.guestDetails.otherGuests
            .adults"
          :key="'adult-' + adultIndex"
          :guestindex="adultIndex"
          :adult="true"
          :otherguestdetails="true"
        ></trip-config>
        <trip-config
          v-for="(childGuest, childIndex) in store.guestDetails.otherGuests
            .children"
          :key="'child-' + childIndex"
          :guestindex="childIndex"
          :child="true"
          :otherguestdetails="true"
        ></trip-config>
      </div>
      <div class="discount-details mt-4 border-b pb-4">
        <div>
          <h1 class="text-left mb-3 font-semibold header-main">
            Discounts and promos
          </h1>
        </div>
        <div class="mt-4 mb-4">
          <h3 class="text-left">Have a promo code?</h3>
          <div class="mt-1">
            <promo-code></promo-code>
          </div>
        </div>

        <div class="my-6">
          <included-promo
            v-for="(promo, promoIndex) in store.discountsAndPromos.tripDeals"
            :key="promoIndex"
            :promo="promo"
          ></included-promo>
        </div>
        <div class="previous-traveller-container section-border section-bg">
          <div class="inner-section text-left border-b">
            <h3 class="mb-1 font-semibold text-base">
              Travelled with us before?
            </h3>
            <div class="text-xs">
              Guests who have travelled with any of
              <a href="#" class="link-text">TTC's family of brands</a> before
              are eligible for a discount! Select guests below and tell us about
              the last trip you took with us.
            </div>
          </div>
          <previous-traveller
            :guest="store.guestDetails.mainGuest"
            :mainguest="true"
          ></previous-traveller>
          <previous-traveller
            v-for="(previousTraveller, adultIndex) in store.guestDetails
              .otherGuests.adults"
            :key="'adult-' + adultIndex"
            :index="adultIndex"
            :guest="previousTraveller"
            :adult="true"
          ></previous-traveller>
          <previous-traveller
            v-for="(previousTraveller, childIndex) in store.guestDetails
              .otherGuests.children"
            :key="'child-' + childIndex"
            :index="childIndex"
            :guest="previousTraveller"
            :child="true"
          ></previous-traveller>
        </div>
      </div>
      <div class="mt-4">
        <h1 class="text-left mb-4 font-semibold header-main">
          Complete your purchase
        </h1>
        <div class="payment-plans">
          <payment-plan
            v-for="(plan, planIndex) in store.paymentData.paymentPlans"
            :key="planIndex"
            :plan="plan"
          ></payment-plan>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import TripConfig from "../components/TripConfig.vue";
import PreviousTraveller from "../components/PreviousTraveller.vue";
import IncludedPromo from "../components/IncludedPromo.vue";
import PaymentPlan from "../components/PaymentPlan.vue";
import PromoCode from "../components/PromoCode.vue";

export default {
  components: {
    "trip-config": TripConfig,
    "previous-traveller": PreviousTraveller,
    "included-promo": IncludedPromo,
    "payment-plan": PaymentPlan,
    "promo-code": PromoCode,
  },
  data() {
    return {};
  },
  computed: {
    store() {
      return this.$store.state.userSelectedData;
    },
  },
  methods: {
    updateSelectedChildren(val) {
      this.$store.dispatch("updateSelectedChildren", val);
    },
  },
};
</script>
