<template>
  <div class="addons-section flex-col border w-4/5 section-bg">
    <div class="inner-section">
      <div v-for="(extraNights, index) in store.addedNights" :key="index" :class="index < store.addedNights.length - 1 ? 'mb-3 pb-3 border-b' : null">
      <div class="text-left text-xxs">
        Extra nights <span class="font-semibold" v-text="extraNights.before ? 'before' : 'after'">
          </span> your trip
      </div>
      <div class="flex-align-center py-1">
        <span class="adults-count text-sm font-semibold"
          >{{ extraNights.nights }} nights,&nbsp;
        </span>
        <div class="text-left flex-align-center">
        <span v-for="(room, index) in extraNights.rooms" :key="index"
          class="text-sm font-semibold"
          >{{ room.quantity }}x {{room.roomType}}<span v-if="index < (extraNights.rooms.length - 1) && extraNights.rooms.length > 1">,&nbsp;</span>
        </span>
        </div>
      </div>
      <div class="text-left text-xxs">
        <div class="py-1">{{extraNights.hotelName}}</div>
        <div class="flex-align-center text-sm text-gray-800">
          <i class="material-icons text-sm mr-1">room</i>
          <div class="location text-xxs">{{extraNights.location}}</div>
        </div>
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
