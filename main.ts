import { and, any, anyChar, char, map, or, string, u } from "./lib.ts";

const intParse = (x: string) => parseInt(x);
const combineInts = (arr: any) => intParse(arr.join(""));

const one = map(char("1"), intParse);
const two = map(char("2"), intParse);
const onetwo = map(and(one, two), combineInts);
const twoone = map(and(two, one), combineInts);
const number = anyChar("0123456789");

const plus = char("+");
const minus = char("-");
const times = char("*");
const divide = char("/");
const op = or(divide, or(times, or(plus, minus)));

const expression = and(number, and(op, number));

const calculator = map(expression, (value: any) => {
  if (!value) {
    return;
  }

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
  wat(u("wat")),
  wat(u("sfdajwat")),
);
