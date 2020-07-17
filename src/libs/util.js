import Vue from 'vue';

let util = {};

/**
 * 设置浏览器标题
 *
 * @param title
 */
util.title = function (title) {
  title = title ? title + ' · FileBrowser' : 'FileBrowser';
  window.document.title = title;
};

/**
 * 时间戳格式化
 *
 * @param timestamp
 * @param format
 */
util.formatTimestamp = function (timestamp, format) {
  if (!timestamp) {
    return '';
  }
  let date = new Date(timestamp * 1);
  let o = {
    'M+': date.getMonth() + 1,                 //月份
    'd+': date.getDate(),                    //日
    'H+': date.getHours(),                   //小时
    'm+': date.getMinutes(),                 //分
    's+': date.getSeconds(),                 //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds()             //毫秒
  };

  if (!format) {
    format = 'yyyy-MM-dd HH:mm:ss';
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return format;
};

const isServer = Vue.prototype.$isServer;
/* istanbul ignore next */
util.on = (function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

util.off = (function () {
  if (!isServer && document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();

// scrollTop animation
util.scrollTop = function (el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil(difference / duration * 50);

  function scroll(start, end, step) {
    if (start === end) return;

    let d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }

  scroll(from, to, step);
};

/**
 * 格式化大小，如：2 Byte
 *
 * @param size byte
 * @returns {string}
 */
util.formatSize = function (size) {
  if (size === null || size === undefined) {
    return '-';
  }
  size = size * 1;
  if (size / 1024 >= 1048576) {
    return (size / 1024 / 1048576).toFixed(2) + 'GB';
  } else if (size / 1024 > 1024) {
    return (size / 1024 / 1024).toFixed(2) + 'MB';
  } else if (size > 1024) {
    return (size / 1024).toFixed(2) + 'KB';
  } else {
    return size + 'B';
  }
};

/**
 * 计算相对时间，如：2 minutes ago.
 *
 * 1天86400000毫秒
 *
 * @param timestamp
 * @returns {string}
 */
util.relativeTime = function (timestamp) {
  if (!timestamp) {
    return '';
  }
  let offset = new Date().getTime() - timestamp * 1;
  let day = 86400000;

  let num;
  if (offset > 365 * day) {
    num = Math.floor(offset / (365 * day));
    return num + (num > 1 ? ' 年前' : ' 年前');
  } else if (offset > 30 * day) {
    num = Math.floor(offset / (30 * day));
    return num + (num > 1 ? ' 月前' : ' 月前');
  } else if (offset > day) {
    num = Math.floor(offset / day);
    return num + (num > 1 ? ' 天前' : ' 天前');
  } else if (offset > 604800000) {
    num = Math.floor(offset / 604800000);
  } else if (offset > 3600000) {
    num = Math.floor(offset / 3600000);
    return num + (num > 1 ? ' 小时前' : ' 小时前');
  } else if (offset > 60000) {
    num = Math.floor(offset / 60000);
    return num + (num > 1 ? ' 分钟前' : ' 分钟前');
  }

  return '刚刚';
};

export default util;

Vue.prototype.util = util;