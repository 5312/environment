/** 常用工具方法 license by http://eleadmin.com */

/**
 * 倒计时
 * @param endTime 结束时间
 * @param serverTime 服务端当前时间
 * @param callback 回调
 * @returns {number} 定时器实例
 */
export function countdown(endTime, serverTime, callback) {
  let type = typeof serverTime === "function",
    end = new Date(endTime).getTime(),
    now = new Date(
      !serverTime || type ? new Date().getTime() : serverTime
    ).getTime(),
    count = end - now,
    time = [
      Math.floor(count / (1000 * 60 * 60 * 24)), // 天
      Math.floor(count / (1000 * 60 * 60)) % 24, // 时
      Math.floor(count / (1000 * 60)) % 60, // 分
      Math.floor(count / 1000) % 60, // 秒
    ];
  if (type) {
    callback = serverTime;
  }
  let timer = setTimeout(() => {
    this.countdown(endTime, now + 1000, callback);
  }, 1000);
  callback && callback(count > 0 ? time : [0, 0, 0, 0], serverTime, timer);
  if (count <= 0) {
    clearTimeout(timer);
  }
  return timer;
}

/**
 * 时间语义化
 * @param time 时间
 * @param onlyDate 超过30天是否仅返回日期
 * @returns {string}
 */
export function timeAgo(time, onlyDate) {
  if (!time) {
    return "";
  }
  if (typeof time === "string") {
    time = time.replace(/-/g, "/");
  }
  let arr = [[], []],
    stamp = new Date().getTime() - new Date(time).getTime();
  // 30天以上返回具体日期
  if (stamp > 1000 * 60 * 60 * 24 * 31) {
    stamp = new Date(time);
    arr[0][0] = this.digit(stamp.getFullYear(), 4);
    arr[0][1] = this.digit(stamp.getMonth() + 1);
    arr[0][2] = this.digit(stamp.getDate());
    // 是否输出时间
    if (!onlyDate) {
      arr[1][0] = this.digit(stamp.getHours());
      arr[1][1] = this.digit(stamp.getMinutes());
      arr[1][2] = this.digit(stamp.getSeconds());
    }
    return arr[0].join("-") + " " + arr[1].join(":");
  }
  if (stamp >= 1000 * 60 * 60 * 24) {
    return ((stamp / 1000 / 60 / 60 / 24) | 0) + "天前";
  } else if (stamp >= 1000 * 60 * 60) {
    return ((stamp / 1000 / 60 / 60) | 0) + "小时前";
  } else if (stamp >= 1000 * 60 * 3) {
    return ((stamp / 1000 / 60) | 0) + "分钟前";
  } else if (stamp < 0) {
    return "未来";
  } else {
    return "刚刚";
  }
}

/**
 * 数字前置补零
 * @param num 数字
 * @param length 位数
 * @returns {string}
 */
export function digit(num, length) {
  let str = "";
  num = String(num);
  length = length || 2;
  for (let i = num.length; i < length; i++) {
    str += "0";
  }
  return num < Math.pow(10, length) ? str + (num | 0) : num;
}

/**
 * 时间格式化
 * @param time 时间
 * @param format 格式
 * @returns {string}
 */
export function toDateString(time, format) {
  if (!time) {
    return "";
  }
  if (typeof time === "string") {
    time = time.replace(/-/g, "/");
  } else if (typeof time === "number" && String(time).length === 10) {
    time = time * 1000; // 10位时间戳处理
  }
  const date = new Date(time),
    ymd = [
      digit(date.getFullYear(), 4),
      digit(date.getMonth() + 1),
      digit(date.getDate()),
    ],
    hms = [
      digit(date.getHours()),
      digit(date.getMinutes()),
      digit(date.getSeconds()),
    ];
  return (format || "yyyy-MM-dd HH:mm:ss")
    .replace(/yyyy/g, ymd[0])
    .replace(/MM/g, ymd[1])
    .replace(/dd/g, ymd[2])
    .replace(/HH/g, hms[0])
    .replace(/mm/g, hms[1])
    .replace(/ss/g, hms[2]);
}

/**
 * html转义
 * @param html
 * @returns {string}
 */
export function escape(html) {
  return String(html || "")
    .replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/'/g, "&#39;")
    .replace(/"/g, "&quot;");
}

/**
 * pid形式数据转children形式
 * @param data 需要转换的数组
 * @param idKey id字段名
 * @param pidKey pid字段名
 * @param childKey 生成的children字段名
 * @param pid 顶级的pid
 * @param addPIds 是否添加所有父级id的字段
 * @param parentsKey 所有父级id的字段名称，默认parentIds
 * @param parentIds 所有父级id
 * @returns {[]}
 */
export function toTreeData(
  data,
  idKey,
  pidKey,
  childKey,
  pid,
  addPIds,
  parentsKey,
  parentIds
) {
  if (typeof data === "object" && !Array.isArray(data)) {
    idKey = data.idKey;
    pidKey = data.pidKey;
    childKey = data.childKey;
    pid = data.pid;
    addPIds = data.addPIds;
    parentsKey = data.parentsKey;
    parentIds = data.parentIds;
    data = data.data;
  }
  if (!idKey) {
    idKey = "id";
  }
  if (!pidKey) {
    pidKey = "pid";
  }
  if (!childKey) {
    childKey = "children";
  }
  if (typeof pid === "undefined") {
    pid = [];
    data.forEach((d) => {
      let flag = true;
      for (let i = 0; i < data.length; i++) {
        if (d[pidKey] == data[i][idKey]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        pid.push(d[pidKey]);
      }
    });
  }
  let result = [];
  data.forEach((d) => {
    if (d[idKey] == d[pidKey]) {
      console.error("data error: ", d);
      return;
    }
    if (Array.isArray(pid) ? pid.indexOf(d[pidKey]) !== -1 : d[pidKey] == pid) {
      let children = toTreeData({
        data: data,
        idKey: idKey,
        pidKey: pidKey,
        childKey: childKey,
        pid: d[idKey],
        addPIds: addPIds,
        parentsKey: parentsKey,
        parentIds: (parentIds || []).concat([d[idKey]]),
      });
      if (children.length > 0) {
        d[childKey] = children;
      }
      if (addPIds) {
        d[parentsKey || "parentIds"] = parentIds || [];
      }
      result.push(d);
    }
  });
  return result;
}

/**
 * 遍历children形式数据
 * @param data 需要遍历的数组
 * @param callback 回调
 * @param childKey children字段名
 */
export function eachTreeData(data, callback, childKey = "children") {
  if (!data || !data.length) {
    return;
  }
  data.forEach((d) => {
    if (callback(d) !== false && d[childKey]) {
      eachTreeData(d[childKey], callback, childKey);
    }
  });
}

/**
 * 处理树形数据
 * @param data 需要处理的数据
 * @param formatter 处理器
 * @param childKey children字段名
 * @returns {[]} 处理后的数据
 */
export function formatTreeData(data, formatter, childKey = "children") {
  let result = [];
  if (data && data.length) {
    data.forEach((d) => {
      let item = formatter(d);
      if (item !== false) {
        if (item[childKey]) {
          item[childKey] = formatTreeData(item[childKey], formatter, childKey);
        }
        result.push(item);
      }
    });
  }
  return result;
}

/**
 * 让浏览器全屏切换
 * @param el dom
 * @param fullscreen 是否全屏
 * @returns {boolean} 全屏状态
 */
export function toggleFullscreen(el, fullscreen) {
  if (!el) {
    el = document.documentElement;
  }
  if (typeof fullscreen === "undefined" || fullscreen === null) {
    fullscreen = !isFullscreen();
  }
  if (fullscreen) {
    const rfs =
      el.requestFullScreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullScreen;
    if (rfs) {
      rfs.call(el);
    } else {
      throw new Error("您的浏览器不支持全屏模式");
    }
  } else {
    const cfs =
      document.exitFullScreen ||
      document.webkitCancelFullScreen ||
      document.mozCancelFullScreen ||
      document.msExitFullscreen;
    if (cfs) {
      cfs.call(document);
    }
  }
  return fullscreen;
}

/**
 * 获取当前是否是全屏状态
 * @returns {boolean}
 */
export function isFullscreen() {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
}

/**
 * 获取屏幕宽度
 * @returns {number}
 */
export function screenWidth() {
  return document.documentElement.clientWidth || document.body.clientWidth;
}

/**
 * 获取屏幕高度
 * @returns {number}
 */
export function screenHeight() {
  return document.documentElement.clientHeight || document.body.clientHeight;
}

/**
 * 获取html的纯文本
 * @param html
 * @returns {string}
 */
export function htmlToText(html) {
  return html.replace(/<[^>]+>/g, "");
}

/**
 * 获取设备信息
 * @param key 自定义的agent
 * @returns
 */
export function device(key) {
  const agent = navigator.userAgent.toLowerCase(),
    result = { os: null, ie: false };

  // 获取版本号
  function getVersion(label) {
    const exp = new RegExp(label + "/([^\\s\\_\\-]+)");
    return (agent.match(exp) || [])[1] || false;
  }

  // 获取操作系统
  if (/windows/.test(agent)) {
    result.os = "windows";
  } else if (/linux/.test(agent)) {
    result.os = "linux";
  } else if (/iphone|ipod|ipad|ios/.test(agent)) {
    result.os = "ios";
  } else if (/mac/.test(agent)) {
    result.os = "mac";
  } else if (/android/.test(agent)) {
    result.os = "android";
  }

  // 获取ie版本
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    result.ie = (agent.match(/msie\s(\d+)/) || [])[1] || "11";
  }

  // 获取微信版本
  result.weixin = getVersion("micromessenger");

  // 获取自定义的agent
  if (key && !result[key]) {
    result[key] = getVersion(key);
  }

  // 是否移动设备
  result.android = /android/.test(agent);
  result.ios = result.os === "ios";
  result.mobile = result.android || result.ios;
  return result;
}

/**
 * 生成随机字符串
 * @param length 长度
 * @param radix 基数
 * @returns {string}
 */
export function uuid(length = 32, radix) {
  const num = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += num.charAt(Math.floor(Math.random() * (radix || num.length)));
  }
  return result;
}

/**
 * 生成m到n的随机数
 * @param m 最小值, 包含
 * @param n 最大值, 不包含
 * @returns {number}
 */
export function random(m, n) {
  return Math.floor(Math.random() * (m - n) + n);
}

/**
 * 百度地图坐标转高德地图坐标
 * @param point 坐标
 * @returns {{lng: number, lat: number}}
 */
export function bd09ToGcj02(point) {
  const x_pi = (3.14159265358979324 * 3000.0) / 180.0;
  const x = point.lng - 0.0065,
    y = point.lat - 0.006;
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  return {
    lng: z * Math.cos(theta),
    lat: z * Math.sin(theta),
  };
}

/**
 * 高德地图坐标转百度地图坐标
 * @param point 坐标
 * @returns {{lng: number, lat: number}}
 */
export function gcj02ToBd09(point) {
  const x_pi = (3.14159265358979324 * 3000.0) / 180.0;
  const x = point.lng,
    y = point.lat;
  const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  return {
    lng: z * Math.cos(theta) + 0.0065,
    lat: z * Math.sin(theta) + 0.006,
  };
}

/**
 * 深度克隆
 * @param obj
 * @return
 */
export function deepClone(obj) {
  let result;
  const type = typeOf(obj);
  if (type === "Object") {
    result = {};
  } else if (type === "Array") {
    result = [];
  } else {
    return obj;
  }
  Object.keys(obj).forEach((key) => {
    const copy = obj[key],
      cType = this.typeOf(copy);
    if (cType === "Object" || cType === "Array") {
      result[key] = deepClone(copy);
    } else {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * 获取变量类型
 * @param obj
 * @returns {string}
 */
export function typeOf(obj) {
  if (obj === null) {
    return "Null";
  }
  if (typeof obj === "undefined") {
    return "Undefined";
  }
  return Object.prototype.toString.call(obj).slice(8, -1);
}

/**
 * 播放音频
 * @param url 音频地址
 */
export function play(url) {
  return new Audio(url).play();
}

/**
 * 导出excel
 * @param XLSX XLSX对象
 * @param sheet 数组或sheet对象
 * @param sheetname 文件名称
 * @param type 文件格式
 */
export function exportSheet(XLSX, sheet, sheetname = "sheet1", type = "xlsx") {
  if (Array.isArray(sheet)) {
    sheet = XLSX.utils.aoa_to_sheet(sheet);
  }
  let workbook = {
    SheetNames: [sheetname],
    Sheets: {},
  };
  workbook.Sheets[sheetname] = sheet;
  XLSX.writeFile(workbook, sheetname + "." + type);
}

/**
 * 数字千分位
 * @param num
 * @returns {string}
 */
export function formatNumber(num) {
  return String(num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
}

/**
 * 判断是否是外链
 * @param url
 * @returns {boolean}
 */
export function isUrl(url) {
  return !!(
    url &&
    (url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("//"))
  );
}
