import {
  and,
  andThen,
  any,
  anyChar,
  char,
  lazyand,
  many,
  map,
  or,
  Parser,
  string,
  unit,
} from "./lib.ts";

const s = unit;

const digit = map(anyChar("0123456789"), (n: string) => parseInt(n));
const plus = char("+");
const minus = char("-");
const times = char("*");
const divide = char("/");
const op = any(divide, times, plus, minus);
const expression = andThen(digit, op, digit);

const calculate = map(expression, (value: any) => {
  if (!value) {
    return;
  }
  const [x, operation, y] = value;

  switch (operation) {
    case "+": {
      return x + y;
    }
    case "-": {
      return x - y;
    }
    case "*": {
      return x * y;
    }
    case "/": {
      return x / y;
    }
  }
});

console.log(
  calculate(s("1*7")),
  calculate(s("1/4")),
  calculate(s("5-2")),
);
