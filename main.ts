import {
  andThen,
  any,
  anyChar,
  char,
  many,
  map,
  or,
  string,
  unit,
} from "./lib.ts";

const intParse = (x: string) => parseInt(x);
const combineInts = (arr: any) => intParse(arr.join(""));

const digit = anyChar("0123456789");
const number = many(digit);

const plus = char("+");
const minus = char("-");
const times = char("*");
const divide = char("/");
const op = any(divide, times, plus, minus);

const expression = andThen(number, op, number);

const calculator = map(expression, (value: any) => {
  if (!value) {
    return;
  }
  console.log(value);

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
  andThen(plus, minus, times)(unit("+-*")),
);
