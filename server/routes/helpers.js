exports.numFormatter = num =>
  num > 999999
    ? (num / 1000000).toFixed(1) + 'M'
    : num > 9999
    ? (num / 1000).toFixed(1) + 'K'
    : num > 999
    ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : num;
