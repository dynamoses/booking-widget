<template>
  <div>
    <div
      @click="daterate.isAvailable ? loadRoomsPage('rooms', 'forwards') : null"
      class="dates-rates-item-details border border-gray-400 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 mb-2 flex-col cursor-pointer"
      :class="{
        'sold-out pointer-events-none': !daterate.isAvailable,
        'section-bg': daterate.isAvailable,
      }"
    >
      <div
        class="dates-rates-item-details__dates-bar flex justify-between p-3"
        :class="{ 'text-gray-500': !daterate.isAvailable }"
      >
        <span class="dates-bar-dates flex">
          <span class="date-from flex flex-col justify-between">
            <div class="date-from__day text-xxs text-left pt-1">
              {{ getDay(daterate.fromDateValue) }}
            </div>
            <div class="date-from__date text-base font-semibold">
              {{ getDate(daterate.fromDateValue) }}
              <span class="capitalize">{{
                getMonth(daterate.fromDateValue)
              }}</span>
            </div>
          </span>
          <span class="px-2 pt-2 flex">
            <i class="material-icons">arrow_right_alt</i>
          </span>
          <span class="date-to flex flex-col justify-between text-left">
            <div class="date-to__day text-xxs text-left pt-1">
              {{ getDay(daterate.toDateValue) }}
            </div>
            <div class="date-to__date text-base font-semibold">
              {{ getDate(daterate.toDateValue) }}
              <span class="capitalize">{{
                getMonth(daterate.toDateValue)
              }}</span>
            </div>
          </span>
        </span>
        <span
          v-if="daterate.isAvailable"
          class="dates-bar-prices flex flex-col justify-between"
        >
          <div>
            <div v-if="daterate.adultPrice" class="flex-align-center">
              <span class="old-price text-xxs line-through text-gray-700"
                >{{ store.currency
                }}{{ numberWithComma(daterate.adultPrice) }}</span
              >
              <span
                class="saving text-tiny ml-1 p-1 text-white rounded bg-red-primary"
                v-text="daterate.saveInfo"
              ></span>
            </div>
          </div>
          <span class="dates-price self-end text-base font-semibold"
            >{{ store.currency
            }}{{ numberWithComma(daterate.adultDiscountedPrice) }}</span
          >
        </span>
        <span
          v-if="!daterate.isAvailable"
          class="dates-bar-prices justify-center flex-align-center mr-2"
        >
          <span class="dates-price text-sm font-semibold">Sold out</span>
        </span>
      </div>
      <div
        v-if="showBottomBar"
        class="dates-rates-item-details__bottom-bar flex justify-between px-3 py-2 border-t"
      >
        <span class="flex-align-center dates-icons">
          <i v-if="daterate.isDefinite" class="material-icons text-success"
            >verified_user
          </i>
          <i v-if="daterate.discountsApplied.length" class="material-icons"
            >favorite</i
          >
          <i v-if="daterate.isInternational" class="material-icons">flight</i>
          <i v-if="daterate.flightsAvailable" class="material-icons"
            >airplanemode_inactive</i
          >
          <span
            v-if="daterate.availability === 'onRequest'"
            class="warning p-1 text-tiny rounded"
            >Limited seats</span
          >
        </span>
        <span class="flex-align-center">
          <span
            v-if="daterate.discountsApplied.length"
            class="deal-flag flex items-end"
          >
            <i class="material-icons text-sm mr-1 text-red-primary">{{
              dealIcon(daterate.discountsApplied)
            }}</i>
            <span class="text-tiny">{{
              dealText(daterate.discountsApplied)
            }}</span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["daterate"],
  data() {
    return {
      adults: 0,
      children: 0,
    };
  },
  computed: {
    store() {
      return this.$store.state;
    },
    showBottomBar() {
      if (this.daterate.isAvailable) {
        return (
          this.daterate.isDefinite ||
          this.daterate.discountsApplied.length ||
          this.daterate.availability === "onRequest"
        );
      }
    },
  },
  methods: {
    loadRoomsPage(page, direction) {
      this.$store.dispatch("newPage", { page, direction });
    },
    getDay(val) {
      return this.$store.state.days[new Date(val).getDay()];
    },
    getDate(val) {
      return ("0" + new Date(val).getDate()).slice(-2);
    },
    getMonth(val) {
      return this.$store.state.months[new Date(val).getMonth()]
        .substring(0, 3)
        .toLowerCase();
    },
    dealIcon(deals) {
      if (deals.length > 1) {
        return "local_offer";
      } else {
        if (deals[0].paymentBy) {
          return "alarm";
        }
      }
    },
    dealText(deals) {
      if (deals.length > 1) {
        return deals.length + " deals applied";
      } else {
        if (deals[0].paymentBy) {
          return (
            "Book & pay before " +
            new Date(deals[0].paymentBy).toLocaleString("en-GB").slice(0, 10)
          );
        }
      }
    },
    numberWithComma(val) {
      return Number(val).toLocaleString();
    },
  },
};
</script>
