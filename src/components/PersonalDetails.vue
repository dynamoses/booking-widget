<template>
  <div class="form mb-8">
    <h3 v-if="mainguest" class="font-semibold mt-6">Personal details</h3>
    <h3
      v-if="!mainguest"
      class="font-semibold mt-6"
      v-text="adult ? 'Adult ' + (index + 1) : 'Child ' + (index + 1)"
    ></h3>
    <div class="form-item">
      <label class="label required" :for="titleId">Title</label>
      <div class="form-input-container select half">
        <select v-model="selectedTitle" :id="titleId">
          <option disabled selected value="">Select</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Ms">Ms</option>
          <option value="Mr">Mr</option>
        </select>
      </div>
    </div>
    <div class="form-item">
      <label class="label required" :for="firstNameId">First name</label>
      <div class="form-input-container text">
        <input
          type="text"
          :id="firstNameId"
          placeholder="Enter first name here"
        />
      </div>
    </div>
    <div class="form-item">
      <label class="label" :for="middleNameId">Middle name(s)</label>
      <div class="form-input-container text">
        <input type="text" :id="middleNameId" placeholder="Optional" />
      </div>
    </div>
    <div class="form-item">
      <label class="label required" :for="lastNameId">Last name</label>
      <div class="form-input-container text">
        <input
          type="text"
          :id="lastNameId"
          placeholder="Enter last name here"
        />
      </div>
    </div>
    <div v-if="child" class="form-item">
      <label class="label required" :for="dateofbirthId">Date of birth</label>
      <div class="form-input-container date-text">
        <input type="text" :id="dateofbirthId" placeholder="MM / DD / YYYY" />
      </div>
      <div class="text-xxs mt-1 italic">
        Must be between 5-17 years old at time of travel
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: [
    "mainguest",
    "guest",
    "adult",
    "adults",
    "child",
    "children",
    "index",
  ],
  data() {
    return {
      selectedTitle: "",
    };
  },
  computed: {
    store() {
      return this.$store;
    },
    titleId() {
      if (this.adult || this.child) {
        return (this.adult ? "adult" : "child") + "-title-" + this.index;
      } else {
        return "main-title";
      }
    },
    firstNameId() {
      if (this.adult || this.child) {
        return (this.adult ? "adult" : "child") + "-firstname-" + this.index;
      } else {
        return "main-firstname";
      }
    },
    middleNameId() {
      if (this.adult || this.child) {
        return (this.adult ? "adult" : "child") + "-middlename-" + this.index;
      } else {
        return "main-middlename";
      }
    },
    lastNameId() {
      if (this.adult || this.child) {
        return (this.adult ? "adult" : "child") + "-lastname-" + this.index;
      } else {
        return "main-lastname";
      }
    },
    dateofbirthId() {
      return "child-dateofbirth" + this.index;
    },
  },
  methods: {},
};
</script>
