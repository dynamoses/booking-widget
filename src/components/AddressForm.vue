<template>
  <div class="address-container">
    <h3
      class="font-semibold"
      :class="{ 'text-sm mt-2': paymentpage }"
      v-text="separatebilling ? 'Your Billing Address' : 'Your address'"
    ></h3>
    <div class="form-item">
      <label class="label required" for="country">Country</label>
      <div class="form-input-container select">
        <select id="country" v-model="selectedCountry">
          <option disabled selected value="">Select country</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Costa Rica">Costa Rica</option>
          <option value="Norway">Norway</option>
        </select>
      </div>
    </div>
    <div class="form-item">
      <label class="label required" for="address">Address</label>
      <div class="form-input-container text">
        <input
          type="text"
          id="address"
          placeholder="e.g. Apt 23, 123 Somewhere"
          v-model="address"
        />
      </div>
    </div>
    <div class="form-item">
      <label class="label required" for="city">City</label>
      <div class="form-input-container text">
        <input
          type="text"
          id="city"
          placeholder="e.g. Los Angeles"
          v-model="city"
        />
      </div>
    </div>
    <div class="form-item">
      <label class="label required" for="state">State</label>
      <div class="form-input-container select">
        <select id="state" v-model="selectedState">
          <option disabled selected value="">Select state</option>
          <option value="California">California</option>
          <option value="Florida">Florida</option>
          <option value="New York">New York</option>
          <option value="Texas">Texas</option>
        </select>
      </div>
    </div>
    <div class="form-item">
      <label class="label required" for="zip">Zip code</label>
      <div class="form-input-container text half">
        <input
          type="text"
          id="zip"
          placeholder="e.g. 90210"
          v-model="zipCode"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["separatebilling", "paymentpage"],
  data() {
    return {
      selectedState: "",
      selectedCountry: "",
      address: "",
      city: "",
      zipCode: "",
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
