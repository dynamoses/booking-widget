<template>
  <transition name="slide-fade">
    <div
      v-if="store.pagination.activePage === 'rooms'"
      :class="store.pagination.direction"
      class="rooms pb-24 mt-2"
    >
      <div class="border-b border-gray-400 pb-6">
        <trip-config :dates="true"></trip-config>
      </div>
      <div class="config-trip">
        <h1 class="text-left mt-6 mb-3 font-semibold header-main">
          Configure your trip
        </h1>
        <div class="guest-picker-container mb-5">
          <div class="guest-info justify-between flex-align-center mb-1">
            <div class="guest-info__title font-semibold text-base">Guests</div>
            <div class="guest-info__description text-xxs">
              Add a maximum or 8 people
            </div>
          </div>

          <add-guests-picker
            :guestpickeractive="guestPickerActive"
            @open-guest-picker="openGuestPicker()"
            @close-guest-picker="closeGuestPicker()"
          ></add-guests-picker>
        </div>
        <div class="rooms-container mb-5">
          <div class="rooms-info justify-between flex-align-center mb-1">
            <div class="rooms-info__title font-semibold text-base">
              Accommodation
            </div>
            <a href="#" class="link-text rooms-info__description text-xxs"
              >About room types</a
            >
          </div>
          <div class="rooms-list">
            <div class="room-list__item flex-col">
              <label
                v-for="option in roomOptions"
                :key="option.index"
                class="item-name-container justify-between flex-align-center section-border mb-2 inner-section cursor-pointer section-bg"
                :class="
                  option.option == selectedOption ? 'selected shadow-xl' : null
                "
                :for="option.option"
              >
                <div class="room-names">
                  <div
                    v-for="room in option.rooms"
                    :key="room.index"
                    class="room-names__item flex-align-center mb-1"
                  >
                    <div
                      class="room-icon section-border flex-align-center p-2 pr-5 mr-5"
                      :data-room-quantity="room.quantity"
                    >
                      <i class="material-icons bed-icon">single_bed</i>
                    </div>
                    <div class="text-sm room-name" v-text="room.name"></div>
                  </div>
                </div>
                <div class="flex-align-center">
                  <div
                    class="price-diff mr-3 text-red-700 font-semibold text-xs"
                  >
                    +${{ option.packagePrice }}
                  </div>
                  <input
                    type="radio"
                    :id="option.option"
                    :value="option.option"
                    v-model="selectedOption"
                  />
                  <div class="radio-control text-3xl"></div>
                </div>
              </label>
            </div>
          </div>
        </div>
        <h1 class="text-left mb-3 font-semibold header-main">Trip add-ons</h1>
        <div class="add-on-container mb-4">
          <div class="add-on-subtitle text-left text-sm mb-2">
            Spend a little more time exploring at your own pace with extra
            nights either side of your trip
          </div>
          <div
            class="add-on-item section-bg section-border mb-3 shadow-lg"
            v-for="item in addOnOptions.trips"
            :key="item.index"
          >
            <div class="inner-section">
              <div
                class="add-on-item__header flex-align-center justify-between mb-2"
              >
                <div
                  class="font-semibold text-base"
                  v-text="
                    item.addBefore ? 'Before your trip' : 'After your trip'
                  "
                ></div>
                <div class="flex-align-center text-sm text-gray-800">
                  <i class="material-icons text-base mr-1">room</i>
                  <div class="location text-xxs" v-text="item.location"></div>
                </div>
              </div>
              <div class="hotel-details text-left text-sm">
                <div v-text="item.hotelName"></div>
                <div class="hotel-details flex-align-center">
                  <div class="hotel-rating flex-align-center mr-2">
                    <i
                      v-for="star in item.rating"
                      :key="star.index"
                      class="material-icons star-rating text-sm"
                      >grade</i
                    >
                  </div>
                  <a href="#" class="link-text text-xs">More details</a>
                </div>
              </div>
            </div>
            <div
              v-if="nightsAdded"
              class="nights-picker-container inner-section border-t"
            >
              <div class="nights-picker flex-align-center justify-between mb-3">
                <div class="nights-picker__info text-left">
                  <div class="text-sm">How many nights?</div>
                  <div class="text-xxs text-gray-800">Maximum 3 nights</div>
                </div>
                <div class="nights-picker__buttons flex-align-center">
                  <i class="material-icons text-3xl cursor-pointer"
                    >remove_circle_outline</i
                  >
                  <div class="px-2 text-sm font-semibold">3</div>
                  <i class="material-icons text-3xl cursor-pointer"
                    >add_circle_outline</i
                  >
                </div>
              </div>
              <div class="dates-summary">
                <div class="text-tiny mb-4 flex-align-center justify-between">
                  <div
                    class="check-in-date border check-in-out flex-align-center rounded-sm p-1"
                  >
                    <span class="mr-1 label">Check-in:</span>
                    <span
                      v-if="!item.addBefore"
                      class="font-semibold text-xxs disabled"
                      >{{ startCheckOutDate }}</span
                    >
                    <datepicker
                      input-class="check-in-out-input"
                      wrapper-class="check-in-wrapper text-sm"
                      v-if="item.addBefore"
                      :format="datepickerFormat"
                      :monday-first="true"
                      v-model="startCheckInDate"
                      :full-month-name="false"
                    ></datepicker>
                  </div>
                  <div
                    class="check-out-date border check-in-out flex-align-center rounded-sm p-1"
                  >
                    <span class="mr-1 label">Check-out:</span>
                    <span
                      v-if="item.addBefore"
                      class="font-semibold text-xxs disabled"
                      >{{ endCheckInDate }}</span
                    >
                    <datepicker
                      input-class="check-in-out-input"
                      wrapper-class="check-out-wrapper"
                      v-if="!item.addBefore"
                      :monday-first="true"
                      :format="datepickerFormat"
                      v-model="endCheckOutDate"
                    ></datepicker>
                  </div>
                </div>
                <div class="room-summary text-left">
                  <div class="text-sm">Accommodation:</div>
                  <div class="text-xxs italic mb-2">
                    Pre-selected to best match your on-trip accommodation
                  </div>
                  <div class="trip-changer flex-align-center justify-between">
                    <div class="font-semibold text-sm">1x Triple</div>
                    <a href="#" class="room-changer text-xs link-text"
                      >Change</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              class="from-price-container inner-section flex-align-center justify-between border-t"
            >
              <div v-if="!nightsAdded" class="from-price text-xs">
                From ${{ item.fromPrice }}/night
              </div>
              <div v-if="nightsAdded" class="text-left">
                <div class="text-sm font-semibold">$1,278</div>
                <div class="text-xxs text-gray-800">3 nights, 1x triple</div>
              </div>
              <label
                for="add-nights"
                class="add-nights-button flex-align-center buttons buttons-small add-remove-container"
                :class="[nightsAdded ? 'buttons-success added' : 'buttons-add']"
              >
                <input type="checkbox" id="add-nights" v-model="nightsAdded" />
                <span
                  class="text-xxs mr-1 add-remove-text"
                  v-text="nightsAdded ? 'Added' : 'Add extra nights'"
                ></span>
                <i
                  class="material-icons"
                  v-text="nightsAdded ? 'check_circle' : 'add_circle'"
                  >add_circle</i
                >
              </label>
            </div>
          </div>
        </div>
        <h1 class="text-left mb-3 font-semibold header-main">Flights</h1>
        <div class="flights-container">
          <div class="mb-3">
            <div v-if="!flightsAdded">
              <div class="flight-subheading text-left text-xs mb-3">
                Our flights are specially selected to be the best available for
                your trip, meaning you get to and from your trip without any
                fuss.
              </div>
              <div
                class="add-flights-container flex-align-center justify-between px-4 py-3 section-border section-bg cursor-pointer"
              >
                <div class="text-left">
                  <div class="text-xs font-semibold">
                    Add flights to my trip
                  </div>
                </div>
                <div
                  class="added-flag flex-align-center buttons buttons-add buttons-small"
                  @click="loadNextPage('find-flights', 'forwards')"
                >
                  <span class="text-xxs mr-1">Add flights</span>
                  <i class="material-icons">add_circle</i>
                </div>
              </div>
            </div>
            <div
              v-if="flightsAdded"
              class="flight-routes-container section-bg section-border"
            >
              <div class="border-b">
                <flights
                  :journey="userData.flights.journeyDetails.journeys.outbound"
                ></flights>

                <flights
                  :journey="userData.flights.journeyDetails.journeys.return"
                ></flights>
              </div>
              <div
                class="flights-actions flex-align-center justify-between inner-section"
              >
                <div class="flights-details-button">
                  <button
                    class="buttons buttons-tertiary text-xs py-2 px-4"
                    @click="showFlightsModal()"
                  >
                    View Details
                  </button>
                </div>
                <div class="flight-remove text-red-primary underline">
                  <a class="text-xs" href="#" @click="removeFlights()"
                    >Remove</a
                  >
                </div>
              </div>
            </div>
          </div>

          <div
            class="info-container flex-align-center justify-between inner-section bg-blue-100 rounded"
          >
            <div class="info text-left">
              <div class="text-xs font-semibold">Changed your mind?</div>
              <div class="text-xs">Just try searching again</div>
            </div>
            <button
              class="buttons buttons-secondary py-2 px-4 text-xxs"
              @click="loadNextPage('find-flights', 'forwards')"
            >
              Search for flights
            </button>
          </div>
        </div>
        <div class="action-container pt-4">
          <div class="w-full flex justify-center">
            <button
              class="proceed-to-booking buttons buttons-primary flex-align-center justify-center py-3 w-3/4 shadow-lg my-4"
              @click="loadNextPage('protection', 'forwards')"
            >
              <span class="mr-1 text-sm">Proceed to booking</span>
              <i class="material-icons text-lg">arrow_forward</i>
            </button>
          </div>
          <div class="w-full flex justify-center my-3">
            <button
              @click="loadNextPage('send-quote', 'forwards')"
              class="send-quote-button w-1/2 text-sm shadow-lg py-3 px-4 buttons buttons-secondary"
            >
              Send my quote
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as searchConstants from "../js/searchConstants";
import axios from "axios";
import AddGuestsPicker from "../components/AddGuestsPicker.vue";
import Flights from "../components/Flights.vue";
import Datepicker from "vuejs-datepicker";
import TripConfig from "../components/TripConfig.vue";

export default {
  components: {
    "add-guests-picker": AddGuestsPicker,
    flights: Flights,
    datepicker: Datepicker,
    "trip-config": TripConfig,
  },
  data() {
    return {
      guestPickerActive: false,
      selectedOption: "",
      startCheckInDate: new Date(),
      endCheckOutDate: new Date(),
      datepickerFormat: "D dd MMM",
      startCheckOutDate: "Thu 21 Oct",
      endCheckInDate: "Thu 21 Oct",
      roomOptions: [
        {
          option: 1,
          rooms: [
            {
              name: "Triple",
              quantity: 3,
            },
          ],
          packagePrice: 1500,
        },
        {
          option: 2,
          rooms: [
            {
              name: "Twin",
              quantity: 6,
            },
            {
              name: "Single",
              quantity: 2,
            },
          ],
          packagePrice: 2000,
        },
        {
          option: 3,
          rooms: [
            {
              name: "Single",
              quantity: 9,
            },
          ],
          packagePrice: 1000,
        },
      ],
      addOnOptions: {
        moreDetailsDescription:
          "Spend a little more time exploring at your own pace with extra nights either side of your trip",
        trips: [
          {
            location: "Rome, Italy",
            hotelName: "Grand Hotel Tiberio",
            rating: 3,
            fromPrice: 287,
            addBefore: true,
            maxNights: 3,
          },
          {
            location: "Florence, Italy",
            hotelName: "Grand Hotel Cavour Florence",
            rating: 3,
            fromPrice: 349,
            addBefore: false,
            maxNights: 4,
          },
        ],
      },
      nightsAdded: false,
      nightsAddedCount: 1,
    };
  },
  computed: {
    store() {
      return this.$store.state;
    },
    userData() {
      return this.$store.state.userSelectedData;
    },
    flightsAdded() {
      return this.userData.flights.flightsAdded;
    },
  },
  methods: {
    loadNextPage(page, direction) {
      this.$store.dispatch("newPage", { page, direction });
    },
    openGuestPicker() {
      this.guestPickerActive = true;
    },
    closeGuestPicker() {
      this.guestPickerActive = false;
    },
    showFlightsModal() {
      this.$store.dispatch("openFlightModal");
    },
    removeFlights() {
      this.$store.dispatch("removeFlights");
    },
    addClassToDatePickerParent() {
      const datePickerInputs = document.querySelectorAll(".check-in-out-input");
      for (let i = 0; i < datePickerInputs.length; i++) {
        datePickerInputs[i].parentElement.classList.add(
          "check-in-out-input-container"
        );
      }
    },
  },
  mounted() {
    this.addClassToDatePickerParent();
  },
};
</script>
