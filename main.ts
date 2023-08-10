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

const intParse = (x: string) => parseInt(x);

const digit = anyChar("0123456789");
const number = map(many(digit), intParse);

const plus = char("+");
const minus = char("-");
const times = char("*");
const divide = char("/");
const op = any(divide, times, plus, minus);
function lazyAnd(first: () => Parser, second: () => Parser): Parser {
  return function (input) {
    return and(first(), second())(input);
  };
}
const expression = or(lazyAnd(() => number, () => and(op, calculate)), number);
// const expression = or(andThen(expression, op, number), number);
// const expression = andThen(number, op, number);

const calculate = map(expression, (value: any) => {
  if (!value) {
    return;
  }

  if (typeof value === "number") {
    return value;
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

const parenOne = or(
  and(char("("), lazyAnd(() => parenOne, () => char(")"))),
  char("1"),
);
console.log(
  // parenOne(unit("(((1)))")),
  // expression(unit("1+1")),
  calculate(unit("2*3+1")),
);
// error: TS2448 [ERROR]: Block-scoped variable 'expression' used before its declaration.
// expression = map(expression, (value: any) => {
// ~~~~~~~~~~
//

// const e = andThen(number, plus, number);
// console.log(e(unit("1+1")))
// const parseA = char("A");
// const parseB = char("B");
// const parseAandB = and(parseA, parseB);
// const parseBandA = and(parseB, parseA);
// const parseABBA = and(parseAandB, parseBandA);

// console.log(
//   parseABBA(unit("ABBAthis is valid input")),
// );
// // const parseABBA(unit("ABBAthis is not"));
