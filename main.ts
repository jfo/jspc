import { and, any, anyChar, char, many, map, or, string, unit } from "./lib.ts";

const intParse = (x: string) => parseInt(x);
const combineInts = (arr: any) => intParse(arr.join(""));

const digit = anyChar("0123456789");
const number = map(many(digit), intParse);

const plus = char("+");
const minus = char("-");
const times = char("*");
const divide = char("/");
const op = any(divide, times, plus, minus);

const expression = and(number, and(op, number));

const calculator = map(expression, (value: any) => {
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

const wat = string("wat");

console.log(
  calculator(unit("100*100"))?.value,
  calculator(unit("100+100"))?.value,
  // number(unit('438793427'))
);
