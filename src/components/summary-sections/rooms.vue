<template>
  <div class="rooms-section flex-col border w-4/5 section-bg">
    <div class="border-b inner-section">
      <div class="text-left text-xxs">Guests</div>
      <div class="flex-align-center">
        <span class="adults-count text-sm font-semibold"
          >{{ store.userSelectedData.guests.adults }} adults
        </span>
        <span
          v-if="store.userSelectedData.guests.children"
          class="child-count text-sm font-semibold"
          >,&nbsp;{{ store.userSelectedData.guests.children }} children</span
        >
      </div>
    </div>
    <div class="inner-section">
      <div class="text-left text-xxs">Trip accommodation</div>
      <div
        v-for="room in store.userSelectedData.accommodation"
        :key="room.index"
        class="flex-align-center"
      >
        <span class="adults-count text-sm font-semibold"
          >{{ room.quantity }}x {{ room.roomType }}</span
        >
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
