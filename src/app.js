import Vue from 'vue';
import BookingWidget from './BookingWidget.vue';
import store from './store/store';
import './app-validate.js'

Vue.config.productionTip = false;

function bookingWidget() {
    new Vue({
        el: '#app',
        data () {
            return {
                
            }
        },
        store,
        components: {
            'booking-widget': BookingWidget
        }
    });
};

module.exports = bookingWidget;