import Vue from 'vue';
import {Message} from 'element-ui';

Vue.prototype.error = error;
Vue.prototype.success = success;
Vue.prototype.warning = warning;

/**
 * 消息队列。用于过滤重复的message
 *
 * @type {Array}
 */
const messageQueue = [];

/**
 * 成功消息
 *
 * @param msg
 */
function success(msg) {
  message('success', msg);
}

/**
 * 警告消息
 *
 * @param msg
 */
function warning(msg) {
  message('warning', msg);
}

/**
 * 错误消息
 *
 * @param msg
 */
function error(msg) {
  message('error', msg);
}

/**
 * 消息
 *
 * @param type
 * @param msg
 */
function message(type, msg) {
  // 消息去重
  if (messageQueue.includes(msg)) {
    return;
  }
  // 消息放入队列
  messageQueue.push(msg);
  Message({
    showClose: true,
    message: msg,
    type: type,
    onClose: function () {
      // 从队列移除消息
      messageQueue.splice(messageQueue.indexOf(msg), 1);
    }
  });
}
