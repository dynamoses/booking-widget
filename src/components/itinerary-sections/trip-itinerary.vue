<template>
  <div>
    <div class="py-3 px-4">
      <div class="text-sm font-semibold">{{ store.tripName }}</div>
      <div class="text-xxs">
        <div class="mb-4">
          {{ store.dates.daysWithoutExtraNights }} days,
          {{ store.dates.nightsWithoutExtraNights }} nights
        </div>
        <div>
          <strong>Starts: </strong>{{ store.tripStartCity }},
          {{ store.tripStartTime }}
        </div>
        <div>
          <strong>Ends: </strong>{{ store.tripEndCity }},
          {{ store.tripEndTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  components: {},
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
    formatDate(date) {
      return date.getDay() + " " + date.getDate() + " " + (date.getMonth() + 1);
    },
  },
};
</script>
