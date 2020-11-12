<template>
  <div class="main-details-section flex-col border w-4/5 section-bg">
    <div class="text-left inner-section">
      <div class="">
        <div
          class="text-xxs text-gray-800"
          v-text="adult ? 'Adult' : 'Child'"
        ></div>
        <div class="text-sm flex-align-center">
          <div>
            {{ guest.title }} {{ guest.firstName }} {{ guest.middleNames }}
            {{ guest.lastName }}
          </div>
        </div>
      </div>
      <div v-if="child" class="mt-2">
        <div class="text-xxs text-gray-800">Date of birth</div>
        <div class="text-sm">
          {{ guest.dateOfBirth }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["guestindex", "adult", "child"],
  data() {
    return {};
  },
  computed: {
    store() {
      return this.$store.state.userSelectedData;
    },
    guest() {
      if (this.adult) {
        return this.store.guestDetails.otherGuests.adults[this.guestindex];
      } else {
        return this.store.guestDetails.otherGuests.children[this.guestindex];
      }
    },
  },
  methods: {},
};
</script>
