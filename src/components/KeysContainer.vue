<template>
  <div
    class="keys-container"
    :class="
      isfixed
        ? 'px-6 py-1 keys-fixed border-b'
        : 'p-3 sticky-scroll mt-4 section-border'
    "
  >
    <div
      v-for="(iconKey, index) in keys"
      :key="index"
      class="w-1/2 inline-block"
    >
      <div class="flex-align-center">
        <i class="material-icons text-base mr-1" :class="iconKey.color">{{
          iconKey.icon
        }}</i>
        <span class="text-xxs">{{ iconKey.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isfixed"],
  data() {
    return {
      keys: [
        {
          name: "Definite departure",
          icon: "verified_user",
          color: "text-success",
        },
        {
          name: "Loyalty discounts",
          icon: "favorite",
          color: "",
        },
        // {
        //   name: "Flights included",
        //   icon: "flight",
        //   color: "",
        // },
        // {
        //   name: "Flights unavailable",
        //   icon: "airplanemode_inactive",
        //   color: "",
        // },
      ],
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
