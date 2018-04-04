module.exports = function debounce(fn, delay) {
  var timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    var args = arguments
    var that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args) // To understand this line: https://stackoverflow.com/questions/25060026/is-this-fn-applythis-arguments-redundant?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    }, delay)
  }
}