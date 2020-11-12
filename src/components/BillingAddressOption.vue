<template>
  <label
    class="billing-address-item inner-section section-border flex flex-col my-2 cursor-pointer"
    :class="{
      'selected-border':
        store.paymentData.selectedBillingAddressOption === optionId,
    }"
    :for="optionId"
  >
    <div class="flex-align-center justify-between">
      <div class="text-left">
        <div
          v-text="myaddress ? 'Use my address' : 'Use different address'"
          class="text-sm"
          :class="{ 'font-semibold': myaddress }"
        ></div>
        <div
          v-if="myaddress"
          v-text="myAddressText"
          class="text-tiny mt-1"
        ></div>
      </div>
      <div class="flex-align-center">
        <input
          type="radio"
          :id="optionId"
          :value="optionId"
          v-model="store.paymentData.selectedBillingAddressOption"
        />
        <div class="radio-control text-3xl flex-align-center"></div>
      </div>
    </div>
    <div
      v-if="
        store.paymentData.selectedBillingAddressOption === optionId &&
          !myaddress
      "
      class="form"
    >
      <address-form separatebilling="true" paymentpage="true"></address-form>
    </div>
  </label>
</template>

<script>
import AddressForm from "./AddressForm.vue";
export default {
  props: ["myaddress", "paymentplan", "paymentmethod"],
  data() {
    return {
      mainAddress: this.$store.state.userSelectedData.guestDetails.mainGuest
        .addresses.mainAddress,
    };
  },
  components: {
    "address-form": AddressForm,
  },
  computed: {
    store() {
      return this.$store.state.userSelectedData;
    },
    optionId() {
      return (
        this.paymentplan +
        "-" +
        this.paymentmethod +
        (this.myaddress ? "-myaddress" : "-notmyaddress")
      );
    },
    myAddressText() {
      return (
        this.mainAddress.address +
        ", " +
        this.mainAddress.city +
        ", " +
        this.mainAddress.state +
        " " +
        this.mainAddress.zipCode +
        ", " +
        this.mainAddress.country
      );
    },
  },
  methods: {},
};
</script>
