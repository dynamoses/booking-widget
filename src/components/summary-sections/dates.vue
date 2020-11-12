<template>
  <div class="dates-section flex-col border w-4/5 p-3 section-bg">
    <div class="dates-section__title text-left text-xxs">
      Selected departure
    </div>
    <div class="dates-section__dates flex-align-center">
      <span class="date-from text-sm font-semibold" v-text="startDate"></span>
      <i class="material-icons px-1">arrow_right_alt</i>
      <span class="date-to text-sm font-semibold" v-text="endDate"></span>
      <span class="definite-departure-flag flex-align-center text-sm ml-2">
        <span class="text-xs">Definite</span>
      </span>
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
    userData() {
      return this.$store.state.userSelectedData;
    },
    startDate() {
      return this.userData.dates.tripStartDate.short;
    },
    endDate() {
      return this.userData.dates.tripEndDate.short;
    },
  },
  methods: {},
};
</script>
