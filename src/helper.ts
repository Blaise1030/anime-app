function nFormatter(num: number, digits: number | undefined) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

export function chunks<T>(arr: T[]): Array<Array<T>> {
  var pairs = [];
  for (var i = 0; i < arr.length; i += 4) {
    if (arr[i + 1] !== undefined && arr[i + 2] && arr[i + 3]) {
      pairs.push([arr[i], arr[i + 1], arr[i + 2], arr[i + 3]]);
    } else {
      pairs.push([arr[i]]);
    }
  }
  return pairs;
}

export default nFormatter;

export const debounce = (fn: Function, delay: number) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export function getSeason(month: number) {
  if (3 <= month && month <= 5) return "spring";
  if (6 <= month && month <= 8) return "summer";
  if (9 <= month && month <= 11) return "fall";
  return "winter";
}
