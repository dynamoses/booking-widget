<template>
  <div class="trip-summary-container section-border section-bg text-left">
    <div class="inner-section border-b">
      <div class="main-details">
        <h3 class="text-base font-semibold">{{ store.tripName }}</h3>
        <div class="text-xxs text-gray-800">
          {{ store.dates.daysWithoutExtraNights }} days,
          {{ store.dates.nightsWithoutExtraNights }} nights
        </div>
        <div class="my-3 text-xs">
          <div class="flex-align-center mb-2">
            <i class="material-icons mr-1 text-xl">date_range</i>
            <div>
              {{ store.dates.tripStartDate.long }} -
              {{ store.dates.tripEndDate.long }}
            </div>
          </div>
          <div class="flex-align-center mb-2">
            <i class="material-icons mr-1 text-xl">people_outline</i>
            <div class="flex-align-center">
              <div>{{ store.guests.adults }} adults</div>
              <div v-if="store.guests.adults">
                , {{ store.guests.adults }} children
              </div>
            </div>
          </div>
          <div class="flex-align-center mb-2">
            <i class="material-icons mr-1 text-xl">king_bed</i>
            <div class="flex-align-center">
              <div v-for="(room, index) in store.accommodation" :key="index">
                <div>
                  {{ room.quantity }}x {{ room.roomType
                  }}<span v-if="index < store.accommodation.length - 1"
                    >,&nbsp;</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div v-if="store.flights.flightsAdded" class="flex-align-center mb-1">
            <i class="material-icons mr-1 text-xl transform rotate-45"
              >flight</i
            >
            <div class="flex-align-center">
              <div
                v-text="
                  store.flights.hasInternationalFlights
                    ? 'International flights'
                    : 'Domestic flights'
                "
              ></div>
            </div>
          </div>
        </div>
        <div class="flex-align-center justify-between mt-3">
          <div class="text-sm">Trip total</div>
          <div class="text-sm">${{ store.tripOnlyTotal }}</div>
        </div>
      </div>
    </div>
    <div class="inner-section border-b">
      <div
        v-for="(addedNights, index) in store.addedNights"
        :key="index"
        class="flex justify-between"
        :class="{ 'mb-4': index < store.addedNights.length - 1 }"
      >
        <div class="flex items-start">
          <div>
            <i class="material-icons text-xl mr-2">business</i>
          </div>
          <div class="mt-1">
            <div class="text-xs font-semibold">
              Added nights<span
                v-text="addedNights.before ? ' before ' : ' after '"
              ></span
              >trip
            </div>
            <div class="text-xxs flex-align-center mt-1">
              <div>{{ addedNights.nights }} nights,&nbsp;</div>
              <div v-for="(room, index) in addedNights.rooms" :key="index">
                {{ room.quantity }}x {{ room.roomType
                }}<span v-if="index < addedNights.rooms.length - 1"
                  >,&nbsp;</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="text-sm">${{ addedNights.totalPrice }}</div>
      </div>
    </div>
    <div v-if="store.insuranceAdded" class="inner-section insurance border-b">
      <div class="flex justify-between">
        <div class="flex items-start">
          <div>
            <i class="material-icons text-xl mr-2">security</i>
          </div>
          <div class="mt-1">
            <div class="text-xs font-semibold">
              Travel Insurance
            </div>
            <div class="text-xxs flex-align-center mt-1">
              Comprehensive coverage for
              {{ store.guests.adults + store.guests.children }} guests for the
              entirity of this trip ({{
                store.dates.totalNightsWithExtraNights
              }}
              days).
            </div>
          </div>
        </div>
        <div class="text-sm">${{ store.insurancePrice }}</div>
      </div>
    </div>
    <div class="inner-section discounts-and-promos border-b">
      <div class="flex justify-between">
        <div class="flex items-start">
          <div>
            <i class="material-icons text-xl mr-2">local_offer</i>
          </div>
          <div class="mt-1">
            <div class="text-xs font-semibold">
              Discounts &amp; promos
            </div>
            <div class="text-xxs mt-1">
              <div
                v-for="(deal, index) in store.discountsAndPromos.tripDeals"
                :key="index"
                class="flex-align-center"
              >
                <div class="font-semibold">{{ deal.code }} -</div>
                <div>&nbsp;{{ deal.note }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-sm text-red-primary">
          - ${{ store.discountsAndPromos.totalSavings }}
        </div>
      </div>
      <div class="mt-4">
        <promo-code></promo-code>
      </div>
    </div>

    <your-price-summary></your-price-summary>
  </div>
</template>

<script>
import YourPriceSummary from "./YourPriceSummary.vue";
import PromoCode from "../components/PromoCode.vue";

export default {
  components: {
    "your-price-summary": YourPriceSummary,
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
    loadNextPage(page, direction) {
      this.$store.dispatch("newPage", { page, direction });
    },
  },
};
</script>
