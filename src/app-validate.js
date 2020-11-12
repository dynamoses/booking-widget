import Vue from 'vue';
import { ValidationProvider } from 'vee-validate';
import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

Vue.component('ValidationProvider', ValidationProvider);

extend('email', email);

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('minmax', {
    validate: (value, {min, max}) => {
        return parseInt(value.replaceAll(',', '')) < parseInt(min) && value > parseInt(max);
    },
    params: ['min', 'max'],
    message: "Must be between {min} and {max}"
});