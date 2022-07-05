const unit = function (value, input) {
  return { value, input };
};
const bind = (p, f) =>
  (i) =>
    unit(
      p(input).value + f(p(input).input).value,
      f(p(input).input).input,
    );

const result = (v) => (i) => unit(v, i);
const zero = () => (i) => unit();
const item = (c) =>
  (i) => {
    if (i != "" && i != undefined && i[0] == c) {
      return unit(c, i.slice(1, i.length));
    } else {
      return unit();
    }
  };

const input = "why yes hello";

const w = item("w");
const h = item("h");
const y = item("y");
const wh = bind(w, h);
const why = bind(wh, y);

console.log(
  why(input),
);
