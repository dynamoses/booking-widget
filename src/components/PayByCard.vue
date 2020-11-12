<template>
  <div class="paybycard-form form">
    <div class="form-item">
      <label class="label required">Card number</label>
      <div class="form-input-container text">
        <input type="text" placeholder="1234 5678 8998 1234" />
      </div>
    </div>
    <div class="form-item">
      <label class="label required">Name on card</label>
      <div class="form-input-container text">
        <input type="text" placeholder="e.g. Joe Bloggs" />
      </div>
    </div>
    <div class="form-item flex-align-center">
      <div>
        <label class="label required">Expiry date</label>
        <div class="form-input-container text w-4/5">
          <input type="text" placeholder="MM / YY" />
        </div>
      </div>
      <div>
        <label class="label required">CVV</label>
        <div class="form-input-container text w-2/4">
          <input type="text" placeholder="123" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {};
  },
  computed: {
    store() {
      return this.$store.state.userSelectedData;
    },
  },
  methods: {},
};
</script>
