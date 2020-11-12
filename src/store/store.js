import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    datesRates: {
      data: {
        datesRates: [],
        subTitle: "",
        title: "",
        currencySymbol: ""
      },
    },
    minDate: '',
    maxDate: '',
    chosenPackagePrice: 0,
    months: [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ],
    days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    currency: '',
    region: 'us',
    userSelectedData: {
      tripName: 'European Magic',
      tripOnlyTotal: 4669,
      tripOnlyTotalWithoutSavings: 6808,
      tripOnlyTotalWithSavings: 6208,
      outboundFlightDate: 'Fri 02 Oct',
      extraNightsBeforeStartDate: 'Fri 02 Oct',
      tripStartDate: 'Sun 04 Oct',
      extraNightsAfterStartDate: 'Mon 18 Oct',
      returnFlightDate: 'Thu 21 Oct',
      tripStartCity: 'Rome',
      tripStartCountry: 'Italy',
      tripStartTime: '09:00am',
      tripEndCity: 'Florence',
      tripEndCountry: 'Italy',
      tripEndTime: '11:00am',
      dates: {
        daysWithoutExtraNights: 10,
        nightsWithoutExtraNights: 9,
        totalNightsWithExtraNights: 14,
        tripStartDate: {
          short: '02 Oct',
          long: 'Fri 02 Oct'
        },
        tripEndDate: {
          short: '21 Oct',
          long: 'Thu 21 Oct'
        },
        tripIsDefinite: true,
      },
      guests: {
        adults: 0,
        children: 0,
      },
      accommodation: [
        {
          roomType: "Double",
          quantity: 1,
        },
        {
          roomType: "Twin",
          quantity: 1,
        },
      ],
      addedNights: {
        before: {
          added: true,
          nights: 2,
          totalPrice: 650,
          hotelName: "Grand Hotel Cavour Florence",
          location: "Florence, Italy",
          locationCity: "Florence",
          locationCountry: "Italy",
          checkInDate: 'Fri 02 Oct',
          checkOutDate: 'Sun 04 Oct',
          rooms: [
            {
              roomType: "Double",
              quantity: 1,
            },
            {
              roomType: "Twin",
              quantity: 1,
            },
          ]
        },
        after: {
          added: true,
          nights: 3,
          totalPrice: 1278,
          hotelName: "Intercontinental Rome",
          location: "Rome, Italy",
          locationCity: "Rome",
          locationCountry: "Italy",
          checkInDate: 'Mon 18 Oct',
          checkOutDate: 'Thu 21 Oct',
          rooms: [
            {
              roomType: "Double",
              quantity: 1,
            },
            {
              roomType: "Twin",
              quantity: 1,
            },
          ]
        },
    },
      flights: {
        hasInternationalFlights: false,
        flightsAdded: false,
        journeyDetails: {
          cabinClass: "Economy",
          journeys: {
            
        },
        },
      },
      guestDetails: {
        mainGuest: {
          firstName: "Anthony",
          middleNames: "David",
          lastName: "Joshua",
          email: "ajoshua99@example.com",
          phoneNumber: "(+1) 202-555-0150",
          isPreviousTraveller: false,
          previousTripName: '',
          previousTripDate: '',
          addresses: {
            mainAddress: {
              address: "636 Greenwich St",
              city: "New York",
              state: "NY",
              zipCode: "10014",
              country: "USA",
            },
            mainSameAsBilling: true,
            billingAddress: {
              address: "",
              city: "",
              state: "",
              zipCode: "",
              country: "",
            },
          },
        },
        otherGuests: {
          adults: [
            {
              title: "Mrs",
              firstName: "Julie",
              middleNames: "Anne Maria",
              lastName: "Joshua",
              isPreviousTraveller: false,
              previousTripName: '',
              previousTripDate: ''
            },
          ],
          children: [
            {
              title: "Miss",
              firstName: "Sarah",
              middleNames: "Jane",
              lastName: "Joshua",
              dateOfBirth: "08/24/2012",
              isPreviousTraveller: false,
              previousTripName: '',
              previousTripDate: ''
            },
          ],
        },
      },
      discountsAndPromos: {
        tripDeals: [
          {
            name: "Summer sale",
            amount: 300,
            code: 'EBD',
            note: 'Book trip before 10/02/2021',
          },
          {
            name: "Early payment",
            amount: 300,
            earlyPayment: true,
            code: 'EPD',
            note: 'Pay for trip before 21/04/2021',
            bookByDate: "21/04/2021",
          },
        ],
        guestPreviousTrips: [],
        promoCode: "",
        totalSavings: 600,
      },
      insuranceAdded: true,
      insurancePrice: 526,
      paymentData: {
        paymentPlans: [
          {
            name: "Deposit",
            id: 'deposit',
            priceBefore: 365,
            priceNow: 99,
            chosenPayment: false,
            mainNote: "Pay just $99 to secure your place today! ",
            subNote: "The remaining balance is due by 25 Aug, 2021",
            benefits: [
              'No booking fees',
              'Pay balance up to 45 days before departure',
              'Change your travel dates FREE of charge'
            ]
          },
          {
            name: "Full amount",
            id: 'fullamount',
            priceBefore: 4669,
            priceNow: 4234,
            discountPercentage: 10,
            chosenPayment: false,
            mainNote: "",
            subNote: "Save 10% when you pay the full amount",
            benefits: [
              'No booking fees',
              'Pay balance up to 45 days before departure',
              'Change your travel dates FREE of charge'
            ]
          },
          {
            name: "Monthly",
            id: 'monthly',
            priceBefore: 0,
            priceNow: 465,
            discountPercentage: 10,
            mainNote: "Pay for your trip through financing* from Uplift",
            subNote: "*Subject to approval",
            chosenPayment: false,
            benefits: [
              'No booking fees',
              'Pay balance up to 45 days before departure',
              'Change your travel dates FREE of charge'
            ]
          },
        ],
        selectedPaymentPlan: '',
        selectedPaymentMethod: '',
        selectedBillingAddressOption: '',
        paymentMethods: [
          {
            name: 'card',
            providers: [
            {
              name: "visa",
              logoUrl: "https://km.visamiddleeast.com/dam/VCOM/blogs/visa-blue-gradient-800x450.jpg",
            },
            {
              name: "mastercard",
              logoUrl: "https://cdn.vox-cdn.com/thumbor/FtAV-Waa1rTPheAkxv3o4i0MVf0=/0x0:1000x1000/1200x800/filters:focal(421x430:581x590)/cdn.vox-cdn.com/uploads/chorus_image/image/62800797/Mastercard_logo.0.jpg",
            },
            {
              name: "amex",
              logoUrl: "https://im-media.voltron.voanews.com/Drupal/01live-166/styles/892x501/s3/ap-images/2020/04/_16.jpg?itok=155RdGXD",
            },
            {
              name: "discover",
              logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2d-TIRpmW-_hc2pSOOb7t0oBWtvAgJyVE4g&usqp=CAU",
            },
            ]
          },
          {
            name: 'paypal'
          },
        ],
      },
    },
    selectedWidgetData: {
      selectedRegion: "",
      selectedBrand: "",
      selectedTourId: "",
      selectedOptionId: "",
    },
    isLoading: false,
    pagination: {
      activePage: "departures",
      direction: "forwards",
    },
    breakdownIsOpen: false,
    flightModalOpen: false,
    flightModalTrip: [],
    datePickerIsOpen: false,
    datePickerSelectedYear: 0,
    datePickerChangedWithClick: false,
    selectStartDateNext: true,
    showConfigSummary: true,
    basementPrice: 0,
    ceilingPrice: 0,
    unconfirmedDates: {
      start: '',
      end: ''
    },
    filters: {
      datesSelected: {
        start: '',
        end: ''
      },
      guestsSelected: {
        adults: 0,
        children: 0
      },
      filtersModalIsOpen: false,
      filtersAppliedCount: 0,
      filtersApplied: {
        minPrice: '',
        maxPrice: '',
        lastMinute: false,
        earlyPayment: false,
        frequentTraveller: false,
        definiteDepartures: false,
      },
      hideSoldOut: true,
    }
  },
  getters: {
    filteredTrips(state) {
      let datesRates = state.datesRates.data.datesRates;
      let filteredDatesRates = [];
        datesRates.forEach((month) => {
            let monthData = {};
            let monthItems = [];
            monthData.name = month.name;
            month.datesRates.forEach((dateRate) => {
              if ((!state.filters.filtersApplied.minPrice || parseInt(dateRate.adultDiscountedPrice) >= state.filters.filtersApplied.minPrice) &&
                  (!state.filters.filtersApplied.maxPrice || parseInt(dateRate.adultDiscountedPrice) <= state.filters.filtersApplied.maxPrice) &&
                  (!state.filters.filtersApplied.lastMinute || (state.filters.filtersApplied.lastMinute && dateRate.discountType === "lastMinute")) &&
                  (!state.filters.filtersApplied.earlyPayment || (state.filters.filtersApplied.earlyPayment && dateRate.discountType === "earlyPayment")) &&
                  (!state.filters.filtersApplied.frequentTraveller || (state.filters.filtersApplied.frequentTraveller && dateRate.discountType === "pastPassenger")) &&
                  (!state.filters.filtersApplied.definiteDepartures || (state.filters.filtersApplied.definiteDepartures == dateRate.isDefinite)) &&
                  (!state.filters.hideSoldOut || (state.filters.hideSoldOut == dateRate.isAvailable)) &&
                  (!state.filters.datesSelected.start && !state.filters.datesSelected.end || (new Date(dateRate.fromDateValue) >= new Date(state.filters.datesSelected.start) && new Date(dateRate.fromDateValue) <= new Date(state.filters.datesSelected.end))) 
                  ) {
                monthItems.push(dateRate);
              }
              monthData.datesRates = monthItems;
            })
            filteredDatesRates.push(monthData)          
        });
      return filteredDatesRates;
    },
    tripPrices(state) {
      let datesRates = state.datesRates.data.datesRates;
      let prices = [];
      datesRates.forEach((month) => {
        month.datesRates.forEach((dateRate) => {
          prices.push(parseInt(dateRate.adultDiscountedPrice))
        })
      });
      return prices;
    },
    monthsInRange(state) {
      let startDate = state.minDate;
      let endDate = state.maxDate;
      let months = [];
      const theDate = new Date(startDate);
      while (theDate < endDate) {
        months = [...months, new Date(theDate)];
        theDate.setMonth(theDate.getMonth() + 1);
      }
      return months;
    },
    yearsInRange(state, getters) {
      let years = [];
      getters.monthsInRange.forEach((month) => {
        years.push(month.getFullYear())
      })
      return [...new Set(years)];
    },
  },
  mutations: {
    applyFilters: (state, {filters, filtersAppliedCount}) => {
      state.filters.filtersApplied = filters;
      state.filters.filtersModalIsOpen = false;
      state.filters.filtersAppliedCount = filtersAppliedCount;
    },
    updateSelectedDates: (state) => {
      state.filters.datesSelected.start = state.unconfirmedDates.start;
      state.filters.datesSelected.end = state.unconfirmedDates.end;
    },    
    resetSelectedDates: (state) => {
      state.filters.datesSelected = {};
    },      
    loadDatesRates: (state, {data, minDate, maxDate}) => {
      state.datesRates = data;
      state.currency = data.data.currencySymbol;
      state.minDate = minDate;
      state.maxDate = maxDate;
    },
    updateSelectedfromDate: (state, payload) => {
      state.userSelectedData.fromDate = payload;
    },
    updateSelectedtoDate: (state, payload) => {
      state.userSelectedData.toDate = payload;
    },
    updateIsLoading: (state, payload) => {
      state.isLoading = payload;
    },
    newPage: (state, { page, direction }) => {
      state.pagination.activePage = page;
      state.pagination.direction = direction;
      const widget = document.querySelector(".widget-container");
      widget.scrollTo(0, 0);
      setTimeout(() => {
        state.pagination.direction = "";
      }, 300);
    },
    toggleBreakdown: (state) => {
      state.breakdownIsOpen = !state.breakdownIsOpen;
    },
    openFlightModal: (state) => {
      state.flightModalOpen = true;
    },
    updateAndOpenFlightModal: (state, payload) => {
      state.flightModalOpen = true;
      state.flightModalTrip = payload;
    },
    closeFlightModal: (state) => {
      state.flightModalOpen = false;
    },
    addedFlights: (state, payload) => {
      state.userSelectedData.flights.flightsAdded = true;
      state.userSelectedData.flights.hasInternationalFlights = payload.hasInternationalFlights;
      state.userSelectedData.flights.journeyDetails.journeys = payload;
    },
    removeFlights: (state) => {
      state.userSelectedData.flights.flightsAdded = false;
      state.userSelectedData.flights.journeyDetails.journeys = {};
    },
    applyPromoCode: (state, payload) => {
      state.userSelectedData.discountsAndPromos.promoCode = payload;
    },
    openFiltersModal: (state) => {
      state.filters.filtersModalIsOpen = true;
    },
    closeFiltersModal: (state) => {
      state.filters.filtersModalIsOpen = false;
    },
    updateGuests: (state, { adults, children }) => {
      state.filters.guestsSelected.adults = adults;
      state.filters.guestsSelected.children = children;
    },
    updateHideSoldOut: (state, payload) => {
      state.filters.hideSoldOut = payload;
    },
    updateSelectedDatePickerYear: (state, {year, clicked}) => {
      state.datePickerSelectedYear = year;
      state.datePickerChangedWithClick = clicked;
    },
    openCloseDatePicker: (state, payload) => {
      let confirmedStart = state.filters.datesSelected.start;
      let confirmedEnd = state.filters.datesSelected.end;
      state.datePickerIsOpen = payload;
      if (!payload) {
        state.selectStartDateNext = true;
        state.unconfirmedDates.start = confirmedStart;
        state.unconfirmedDates.end = confirmedEnd;
        const widget = document.querySelector(".widget-container");
        widget.scrollTo(0, 0);
      }
    },
    updateUnconfirmedDates: (state, payload) => {
      if (!state.unconfirmedDates.start) {
        state.unconfirmedDates.start = payload;
        state.selectStartDateNext = false;
      }
       else if (payload < state.unconfirmedDates.start) {
        state.unconfirmedDates.start = payload;
        state.selectStartDateNext = false;
      } else if (payload < state.unconfirmedDates.start) {
        if (state.selectStartDateNext) {
          state.unconfirmedDates.start = payload;
          state.selectStartDateNext = false;
        } else {
          state.unconfirmedDates.end = payload;
          state.selectStartDateNext = true;
        }
      } else if (payload > state.unconfirmedDates.start && payload < state.unconfirmedDates.end) {
        if (state.selectStartDateNext) {
          state.unconfirmedDates.start = payload;
          state.selectStartDateNext = false;
        } else {
          state.unconfirmedDates.end = payload;
          state.selectStartDateNext = true;
        }
      } else if (payload > state.unconfirmedDates.end) {
        state.unconfirmedDates.end = payload;
        state.selectStartDateNext = true;
      }
    },
    clearUnconfirmedSelectedDates: (state, payload) => {
      state.unconfirmedDates = payload;
    }

  },
  actions: {
    applyFilters: (context, {filters, filtersAppliedCount}) => {
      context.commit("applyFilters", {filters, filtersAppliedCount});
    },
    updateSelectedDates: (context) => {
      context.commit("updateSelectedDates");
    }, 
    resetSelectedDates: (context) => {
      context.commit("resetSelectedDates");
    }, 
    loadDatesRates: (context, {data, minDate, maxDate}) => {
      context.commit("loadDatesRates", {data, minDate, maxDate});
    },
    updateSelectedfromDate: (context, payload) => {
      context.commit("updateSelectedfromDate", payload);
    },
    updateSelectedtoDate: (context, payload) => {
      context.commit("updateSelectedtoDate", payload);
    },
    updateIsLoading: (context, payload) => {
      context.commit("updateIsLoading", payload);
    },
    newPage: (context, { page, direction }) => {
      context.commit("newPage", { page, direction });
    },
    toggleBreakdown: (context) => {
      context.commit("toggleBreakdown");
    },
    openFlightModal: (context, payload) => {
      context.commit("openFlightModal", payload);
    },
    updateAndOpenFlightModal: (context, payload) => {
      context.commit("updateAndOpenFlightModal", payload);
    },
    closeFlightModal: (context) => {
      context.commit("closeFlightModal");
    },
    addedFlights: (context, payload) => {
      context.commit("addedFlights", payload);
    },
    removeFlights: (context, payload) => {
      context.commit("removeFlights", payload);
    },
    applyPromoCode: (context, payload) => {
      context.commit("applyPromoCode", payload);
    },
    openFiltersModal: (context) => {
      context.commit("openFiltersModal");
    },
    closeFiltersModal: (context) => {
      context.commit("closeFiltersModal");
    },
    updateGuests: (context, { adults, children }) => {
      context.commit("updateGuests", { adults, children });
    },   
    updateHideSoldOut: (context, payload) => {
      context.commit("updateHideSoldOut", payload);
    },
    openCloseDatePicker: (context, payload) => {
      context.commit("openCloseDatePicker", payload);
    },
    updateSelectedDatePickerYear: (context, {year, clicked}) => {
      context.commit("updateSelectedDatePickerYear", {year, clicked});
    },
    updateUnconfirmedDates: (context, payload) => {
      context.commit("updateUnconfirmedDates", payload);
    },
    clearUnconfirmedSelectedDates: (context, payload) => {
      context.commit("clearUnconfirmedSelectedDates", payload);
    },
  },
  modules: {},
});
