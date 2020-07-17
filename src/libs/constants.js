import Vue from 'vue';

let constants = {};

/**
 * 成功
 *
 * @type {string}
 */
constants.SUCCESS = '0000';

/**
 * 未知异常
 *
 * @type {string}
 */
constants.FAILURE = '9999';

export default constants;

Vue.prototype.constants = constants;