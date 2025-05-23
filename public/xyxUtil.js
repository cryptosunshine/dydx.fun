function getCookie(c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      var c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}
function setCookie(c_name, value, expiredays, nightZero) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  if (nightZero) {
    exdate.setHours(23);
    exdate.setMinutes(59);
  }
  document.cookie =
    c_name +
    "=" +
    escape(value) +
    ";path=/;domain=" +
    location.host +
    (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
}
function commitScore(score) {
  window.top.postMessage({ action: "cs", score: score }, "*");
}
function requestShare() {
  window.top.postMessage({ action: "share" }, "*");
}
function requestMore() {
  window.top.postMessage({ action: "more" }, "*");
}
function requestSubscribe() {
  window.top.postMessage({ action: "subscribe" }, "*");
}
function requestRank() {
  window.top.postMessage({ action: "rank" }, "*");
}
function clearCache(force) {
  var date = new Date(),
    wx = date.getDay(),
    mx = date.getMonth(),
    dx = date.getDate(),
    daysInMonth = new Date(date.getFullYear(), mx + 1, 0).getDate();
  if (+getCookie("clearWeeklyCache") !== 1 || force) {
    localStorage.clear();
    window.localforage && localforage.clear();
    setCookie("clearWeeklyCache", 1, 7 - wx, true);
  }
  if (+getCookie("clearMonthlyCache") !== 1 || force) {
    localStorage.clear();
    window.localforage && localforage.clear();
    setCookie("clearMonthlyCache", 1, daysInMonth - dx, true);
  }
}
window.onload = function () {
  clearCache();
};
window.addEventListener("message", function (msg) {
 
});
var strategyController = {
  clearCache: function () {
    clearCache(true);
    console.log("强制清理缓存");
  },
};
