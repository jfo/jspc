import { and, any, anyChar, char, map, or, string, unit, oneOrMore, zeroOrMore } from "./lib.ts";


const intParse = (x: string) => parseInt(x);
const combineInts = (arr: any) => intParse(arr.join(""));

const digit = anyChar("0123456789");
const number = map(oneOrMore(digit), intParse);

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
  console.log(value)

  const x = value[0];
  const y = value[1][1];
  const operation = value[1][0];

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
  // calculator(unit('12123*123'))
  zeroOrMore(digit,unit('12213890'))
);
