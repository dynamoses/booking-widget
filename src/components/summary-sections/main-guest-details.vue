<template>
  <div class="main-details-section flex-col border w-4/5 section-bg">
    <div class="text-left inner-section">
      <div class="full-name mb-3">
        <div class="text-xxs text-gray-800">
          Full name
        </div>
        <div class="adults-count text-sm">
          Mr Anthony Joshua
        </div>
      </div>
      <div class="email mb-3">
        <div class="text-xxs text-gray-800">
          Email address
        </div>
        <div class="adults-count text-sm">
          ajoshua99@example.com
        </div>
      </div>
      <div class="phone-number mb-3">
        <div class="text-xxs text-gray-800">
          Phone number
        </div>
        <div class="adults-count text-sm">
          (+1) 202-555-0150
        </div>
      </div>
      <div class="address mb-3">
        <div class="text-xxs text-gray-800">
          Address
        </div>
        <div class="text-sm">
          <div>
            636 Greenwich st
          </div>
          <div>
            New York
          </div>
          <div>
            NY 10014
          </div>
          <div>
            USA
          </div>
        </div>
      </div>
      <div class="billing-address flex-align-center">
        <div class="success-check flex-align-center mr-1">
          <i class="material-icons text-xxs">check</i>
        </div>
        <div class="text-xxs">Is used as billing address</div>
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
      return this.$store.state;
    },
  },
  methods: {},
};
</script>
