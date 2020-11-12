import { shallowMount } from '@vue/test-utils'
import BookingWidget from '../BookingWidget.vue'

const wrapper = shallowMount(BookingWidget)

describe('BookingWidget.vue', () => {
  test('component to render', () => {    
    expect(wrapper.find('.widget-container').exists()).toBe(true);
  })
})