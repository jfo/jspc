import { and, char, map, or, u } from "./lib.ts";

const intParse = (x: string) => parseInt(x);
const combineInts = (arr: any) => intParse(arr.join(""));

const one = map(char("1"), intParse);
const two = map(char("2"), intParse);
const onetwo = map(and(one, two), combineInts);
const twoone = map(and(two, one), combineInts);

const number = or(onetwo, twoone);
const op = char("+");

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
  }
});

console.log(
  calculator(u("12+21")),
);
