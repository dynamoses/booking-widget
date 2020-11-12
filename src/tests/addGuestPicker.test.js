import { shallowMount, createLocalVue } from '@vue/test-utils'
import AddGuestsPicker from '../components/AddGuestsPicker.vue'
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

const wrapper = shallowMount(AddGuestsPicker, {
    localVue,
    store,
    propsData: {
        guestpickeractive: true
    }
});

describe('AddGuestsPicker.vue', () => {
    test('add/minus adult picker button to fire updateSelectedAdults method on click', () => {
        wrapper.vm.updateSelectedAdults = jest.fn();
        wrapper.find('.add-adult').trigger('click');
        expect(wrapper.vm.updateSelectedAdults).toHaveBeenCalled();
        wrapper.find('.minus-adult').trigger('click');
        expect(wrapper.vm.updateSelectedAdults).toHaveBeenCalled();
    })
    test('add/minus child picker button to fire updateSelectedChildren method on click', () => {
        wrapper.vm.updateSelectedChildren = jest.fn();
        wrapper.find('.add-child').trigger('click');
        expect(wrapper.vm.updateSelectedChildren).toHaveBeenCalled();
        wrapper.find('.minus-child').trigger('click');
        expect(wrapper.vm.updateSelectedChildren).toHaveBeenCalled();
    })
    test('close picker button to fire close-guest-picker method on click', () => {
        wrapper.vm.closeGuestPicker = jest.fn();
        wrapper.find('.guest-picker-close').trigger('click');
        expect(wrapper.vm.closeGuestPicker).toHaveBeenCalled();
    })
})