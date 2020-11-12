import Vue from 'vue';
import AppForm from './AppForm.vue';
import store from './store/store';

Vue.config.productionTip = false;

function appForm() {
    new Vue({
        el: '#app-form',
        data () {
            return {
                
            }
        },
        store,
        components: {
            'app-form': AppForm
        }
    });
};

module.exports = appForm;