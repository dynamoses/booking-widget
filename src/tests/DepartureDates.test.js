import { shallowMount, createLocalVue } from '@vue/test-utils'
import DepartureDates from '../pages/DepartureDates.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    datesRates: {
      data: {
        datesRates: {}
      }
    },
    months: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday,'],
    userSelectedData: {
      fromDate: '',
      toDate: '',
      adults: 0,
      children: 0
    },
    selectedWidgetData: {
      selectedRegion: "",
      selectedBrand: "",
      selectedTourId: "",
      selectedOptionId: ""
    },
    isLoading: false
  }

})

const wrapper = shallowMount(DepartureDates, {
  localVue,
  store
});

describe('DepartureDates.vue', () => {
  test('container to exist', () => {    
    expect(wrapper.find('.departure-dates-container').exists()).toBe(true);
  })
  test('guest picker button to exist', () => {
    expect(wrapper.find('.people-count-picker__button').exists()).toBe(true);
  })
  test('guest picker button to fire openGuestPicker method on click', () => {
    wrapper.vm.openGuestPicker = jest.fn();
    wrapper.find('.people-count-picker__button').trigger('click');
    expect(wrapper.vm.openGuestPicker).toHaveBeenCalled();
  })
})