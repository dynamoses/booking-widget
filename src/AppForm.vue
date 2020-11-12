<template>
  <div class="text-xl flex items-center justify-center">
    <div
      class=" w-full min-h-full self-center shadow-2xl rounded-md text-center items-center p-3 m-3"
    >
      <div class="init-form">
        <div class="manual-from">
          <div class="w-full p-2 border mb-3">
            <label>Region</label>
            <select
              name="region"
              class="form-control border p-2"
              v-model="selectedRegion"
            >
              <option>us</option>
              <option>uk</option>
              <option>ca</option>
              <option>eu</option>
              <option>au</option>
            </select>
          </div>
          <div class="w-full mb-3 border p-3">
            <label>Brand</label>
            <select
              name="brand"
              class="form-control border p-2"
              v-model="selectedBrand"
            >
              <option>luxurygold</option>
              <option>insightvacations</option>
              <option>trafalgar</option>
              <option>contiki</option>
              <option>costsaver</option>
              <option>brendanvacations</option>
              <option>grandeuropeantravel</option>
            </select>
          </div>
          <div class="w-full mb-3 border p-3">
            <label>Tour Id</label>
            <input
              type="text"
              name="tourId"
              v-model="selectedTourId"
              class="form-control border border-grey-700 mb-1 p-2 text-center"
            />
          </div>
          <div class="w-full mb-3 border p-3">
            <label>Option Id</label>
            <input
              type="text"
              name="optionId"
              v-model="selectedOptionId"
              class="form-control border border-grey-700 mb-1 p-2 text-center"
            />
          </div>
          <div class="w-full mb-3">
            <button
              type="button"
              id="btnInitWidget"
              @click="applyTourParams()"
              class="bg-green-500 hover:bg-green-700 px-2 py-1 border border-blue-700 rounded"
            >
              Reload
            </button>
          </div>
        </div>

        <div class="example-btns">
          <div class="mb-1 border">
            <div>us/luxurygold/203/851</div>
            <button
              type="button"
              id="btnExample1"
              data-region="us"
              data-brand="luxurygold"
              data-tourid="203"
              data-optionid="851"
              @click="applyExampleTourParams($event)"
              class="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 border border-blue-700 rounded text-sm mb-1"
            >
              Example 1
            </button>
          </div>
          <div class="mb-1 border">
            <div>us/insightvacations/16/34</div>
            <button
              type="button"
              id="btnExample2"
              data-region="us"
              data-brand="insightvacations"
              data-tourid="16"
              data-optionid="34"
              @click="applyExampleTourParams($event)"
              class="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 border border-blue-700 rounded text-sm mb-1"
            >
              Example 2
            </button>
          </div>
          <div class="border">
            <div>us/luxurygold/220/779</div>
            <button
              type="button"
              id="btnExample3"
              data-region="us"
              data-brand="luxurygold"
              data-tourid="220"
              data-optionid="779"
              @click="applyExampleTourParams($event)"
              class="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 border border-blue-700 rounded text-sm"
            >
              Example 3
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as searchConstants from "./js/searchConstants";
import axios from "axios";
export default {
  data() {
    return {
      selectedRegion: "",
      selectedBrand: "",
      selectedTourId: "",
      selectedOptionId: "",
    };
  },
  methods: {
    applyTourParams() {
      this.$store.dispatch("updateIsLoading", true);
      axios
        .get(
          searchConstants.tripApi +
            this.selectedRegion +
            "/" +
            this.selectedBrand +
            "/" +
            this.selectedTourId +
            "/" +
            this.selectedOptionId
        )
        .then((data) => {
          this.$store.dispatch("loadDatesRates", data);
          this.$store.dispatch("updateIsLoading", false);
        });
    },
    applyExampleTourParams(e) {
      this.selectedRegion = e.target.dataset.region;
      this.selectedBrand = e.target.dataset.brand;
      this.selectedTourId = e.target.dataset.tourid;
      this.selectedOptionId = e.target.dataset.optionid;
      this.applyTourParams();
    },
  },
};
</script>
