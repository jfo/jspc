const err = (e) => {
    throw e;
  },
  car = (i) => i[0],
  cdr = (i) => i[1],
  first = car,
  rest = (i) => i.slice(1, i.length),
  zero = async (i) => err("zero"),
  item = async (i) => [first(i), rest(i)],
  char = (c) => async (i) => first(i) == c ? [c, rest(i)] : err(`error`),
  and = (p1, p2) =>
    (i) =>
      p1(i).then((i2) => {
        return p2(i2[1]).then((out) => [i2[0] + out[0], out[1]]);
      }),
  or = (p1, p2) => (i) => p1(i).catch(() => p2(i)),
  many = (p) =>
    (i) =>
      p(i).then((r) => {
        return [car(r) + p(cdr(r)), cdr(r)];
      }),
  map = (f, p) => (i) => p(i).then((r) => [f(car(r)), cdr(r)]),
  a = char("a"),
  b = char("b"),
  c = char("c"),
  ab = and(a, b),
  cc = and(c, c),
  abcc = and(ab, cc),
  abORcc = or(ab, cc),
  one = char("1"),
  two = char("2"),
  twelve = and(one, two),
  t = map(parseInt, twelve),
  m = many(a);

m("aab").then(console.log, console.error);
