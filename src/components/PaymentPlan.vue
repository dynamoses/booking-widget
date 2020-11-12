<template>
  <label
    :for="plan.id"
    class="payment-plan-item section-border section-bg my-3 flex flex-col cursor-pointer"
  >
    <div class="inner-section" :class="{ 'border-b': selectedPlan }">
      <div class="flex-align-center justify-between w-full">
        <div class="font-semibold text-base">{{ plan.name }}</div>
        <div class="flex-align-center">
          <div class="mr-2">
            <div v-if="plan.id !== 'monthly'" class="flex-align-center">
              <div class="text-xxs text-gray-700 mr-1 line-through">
                ${{ plan.priceBefore }}
              </div>
              <div class="font-semibold" :class="boldPrice">
                ${{ plan.priceNow }}
              </div>
            </div>
            <div v-if="plan.id === 'monthly'" class="text-sm">
              from ${{ plan.priceNow }}/month
            </div>
          </div>
          <input
            type="radio"
            :id="plan.id"
            :value="plan.id"
            v-model="store.paymentData.selectedPaymentPlan"
          />
          <div class="radio-control text-3xl flex-align-center"></div>
        </div>
      </div>

      <div class="text-left">
        <div v-if="plan.mainNote" class="text-xxs font-semibold">
          {{ plan.mainNote }}
        </div>
        <div class="text-xxs text-gray-800">{{ plan.subNote }}</div>
      </div>
    </div>
    <div v-if="selectedPlan">
      <label
        :for="paymentMethodId(paymentMethod.name)"
        v-for="(paymentMethod, methodIndex) in store.paymentData.paymentMethods"
        :key="methodIndex"
        class="inner-section flex cursor-pointer flex-col"
        :class="{
          'border-b': methodIndex < store.paymentData.paymentMethods.length - 1,
        }"
      >
        <div class="flex-align-center justify-between w-full">
          <div class="flex-align-center">
            <div v-if="paymentMethod.name === 'card'">
              <div class="flex-align-center">
                <div class="flex-align-center">
                  <div class="font-semibold text-base w-2/5">
                    Pay by card
                  </div>
                  <div class="ml-2 flex-align-center w-3/5">
                    <div
                      v-for="provider in paymentMethod.providers"
                      :key="provider.index"
                      class="card-logo"
                      :class="'w-1/' + (paymentMethod.providers.length + 1)"
                    >
                      <img :src="provider.logoUrl" />
                    </div>
                  </div>
                </div>
                <input
                  type="radio"
                  :id="paymentMethodId(paymentMethod.name)"
                  :value="paymentMethodId(paymentMethod.name)"
                  v-model="store.paymentData.selectedPaymentMethod"
                />
                <div class="radio-control text-3xl flex-align-center"></div>
              </div>
              <div
                v-if="
                  store.paymentData.selectedPaymentMethod ===
                    paymentMethodId(paymentMethod.name)
                "
              >
                <pay-by-card></pay-by-card>
                <div class="billing-address mt-6">
                  <h3 class="text-gray-700 text-left text-sm">
                    Billing address
                  </h3>
                  <billing-address-option
                    :myaddress="true"
                    :paymentmethod="paymentMethod.name"
                    :paymentplan="plan.id"
                  ></billing-address-option>
                  <billing-address-option
                    :myaddress="false"
                    :paymentmethod="paymentMethod.name"
                    :paymentplan="plan.id"
                  ></billing-address-option>
                </div>

                <div
                  v-if="
                    store.paymentData.selectedBillingAddressOption.includes(
                      paymentMethodId(paymentMethod.name)
                    )
                  "
                  class="confirm-payment-container inner-section section-border border-thick mt-8"
                >
                  <div class="flex-align-center justify-center mt-2">
                    <span class="text-sm mr-1">Amount due:</span
                    ><strong class="text-base">${{ plan.priceNow }}</strong>
                  </div>

                  <div class="w-full flex justify-center">
                    <button
                      class="proceed-to-booking buttons buttons-primary flex-align-center justify-center py-3 w-3/4 shadow-lg my-4"
                      @click="loadNextPage('success', 'forwards')"
                    >
                      <span class="mr-1 text-sm">Pay now</span>
                      <i class="material-icons text-lg">arrow_forward</i>
                    </button>
                  </div>
                  <div class="plan-benefits mt-4">
                    <div
                      class="flex-align-center text-xs mb-1"
                      v-for="benefit in plan.benefits"
                      :key="benefit.index"
                    >
                      <i class="material-icons mr-2 text-success">check</i>
                      <div class="text-xxs text-left">{{ benefit }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="paymentMethod.name === 'paypal'"
            class="flex-align-center justify-between"
          >
            <div class="w-1/3">
              <img
                src="https://blog.beforward.jp/wp-content/uploads/2020/04/paypal-logo.png"
              />
            </div>
            <div class="flex-align-center">
              <input
                type="radio"
                :id="paymentMethodId(paymentMethod.name)"
                :value="paymentMethodId(paymentMethod.name)"
                v-model="store.paymentData.selectedPaymentMethod"
              />
              <div class="radio-control text-3xl flex-align-center"></div>
            </div>
          </div>
        </div>
      </label>
    </div>
  </label>
</template>

<script>
import PayByCard from "./PayByCard.vue";
import BillingAddressOption from "./BillingAddressOption.vue";
export default {
  props: ["plan"],
  data() {
    return {};
  },
  components: {
    "pay-by-card": PayByCard,
    "billing-address-option": BillingAddressOption,
  },
  computed: {
    store() {
      return this.$store.state.userSelectedData;
    },
    boldPrice() {
      if (this.plan.id === "deposit") {
        return "text-red-primary";
      } else {
        return "text-sm";
      }
    },
    selectedPlan() {
      if (this.plan.id === this.store.paymentData.selectedPaymentPlan) {
        return true;
      }
    },
  },
  methods: {
    paymentMethodId(method) {
      return this.plan.id + "-" + method;
    },
    loadNextPage(page, direction) {
      this.$store.dispatch("newPage", { page, direction });
    },
  },
};
</script>
