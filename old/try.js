const err = (e) => {
  throw e;
};
const car = (i) => i[0];
const cdr = (i) => i[1];

const first = car;
const rest = (i) => i.slice(1, i.length);
const zero = async (i) => err("zero");
const item = async (i) => [first(i), rest(i)];
const char = (c) => async (i) => first(i) == c ? [c, rest(i)] : err(`error`);
const and = (p1, p2) =>
  (i) =>
    p1(i).then((i2) => {
      return p2(i2[1]).then((out) => [i2[0] + out[0], out[1]]);
    });
const or = (p1, p2) => (i) => p1(i).catch(() => p2(i));
const many = (p) =>
  (i) =>
    p(i).then((r) => {
      return [car(r) + p(cdr(r)), cdr(r)];
    });
const map = (f, p) => (i) => p(i).then((r) => [f(car(r)), cdr(r)]);
const a = char("a");
const b = char("b");
const c = char("c");
const ab = and(a, b);
const cc = and(c, c);
const abcc = and(ab, cc);
const abORcc = or(ab, cc);
const one = char("1");
const two = char("2");
const twelve = and(one, two);
const t = map(parseInt, twelve);
const m = many(a);

m("aab").then(console.log, console.error);
