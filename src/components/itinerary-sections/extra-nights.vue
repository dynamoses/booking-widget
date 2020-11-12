<template>
  <div>
    <div class="py-3 px-4">
      <div class="text-sm font-semibold flex-align-center">
        <div>
          {{ nights.nights }}
          <span v-text="nights.nights > 1 ? 'nights' : 'night'"></span>,&nbsp;
        </div>
        <span v-for="(room, index) in nights.rooms" :key="index">
          {{ room.quantity }}x {{ room.roomType
          }}<span v-if="index < nights.rooms.length - 1">,&nbsp;</span>
        </span>
      </div>
      <div class="text-xxs">
        <div class="mb-4">
          <div>{{ nights.hotelName }}</div>
          <div class="italic text-gray-700">{{ nights.location }}</div>
        </div>
        <div class="flex-align-center justify-between">
          <div><strong>Check in: </strong>{{ nights.checkInDate }}</div>
          <div><strong>Check out: </strong>{{ nights.checkOutDate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["nights"],
  components: {},
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
