<template>
  <div class="form my-6">
    <div class="mb-12">
      <h3 class="font-semibold">Contact details</h3>
      <div class="form-item">
        <label class="label required" for="email">Email address</label>
        <div class="form-input-container text">
          <input
            type="text"
            id="email"
            placeholder="Enter email address here"
            v-model="email"
          />
        </div>
      </div>
      <div class="form-item">
        <label class="label required" for="phone">Phone number</label>
        <div class="form-input-container text">
          <input
            type="number"
            id="phone"
            placeholder="Enter phone number here"
            v-model="telephone"
          />
        </div>
      </div>
    </div>
    <address-form></address-form>
    <div class="billing-address-confirm my-6">
      <label
        for="agree-terms"
        class="input-container cursor-pointer flex-align-center"
        ><input
          type="checkbox"
          id="agree-terms"
          name="agree-terms"
          v-model="billingSameAddress"
        /><span class="checkmark"></span
        ><span class="text-xs">Use this as my billing address</span></label
      >
    </div>
    <address-form
      v-if="!billingSameAddress"
      separatebilling="true"
    ></address-form>
  </div>
</template>

<script>
import AddressForm from "./AddressForm.vue";
export default {
  components: {
    "address-form": AddressForm,
  },
  props: [],
  data() {
    return {
      email: "",
      telephone: "",
      mainAddress: {
        selectedState: "",
        selectedCountry: "",
        address: "",
        city: "",
        zipCode: "",
      },
      billingSameAddress: true,
      billingAddress: {
        selectedState: "",
        selectedCountry: "",
        address: "",
        city: "",
        zipCode: "",
      },
    };
  },
  computed: {
    store() {
      return this.$store.state;
    },
  },
  methods: {},
};
</script>
