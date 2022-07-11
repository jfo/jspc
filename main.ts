import {
  and,
  andThen,
  any,
  anyChar,
  char,
  many,
  map,
  or,
  string,
  unit,
  Parser,
  lazyand,
} from "./lib.ts";

const intParse = (x: string) => parseInt(x);

const digit = anyChar("0123456789");
const number = map(many(digit), intParse);

const plus = char("+");
const minus = char("-");
const times = char("*");
const divide = char("/");
const op = any(divide, times, plus, minus);
// expression = map(expression, (value: any) => {
//   if (!value) {
//     return;
//   }
//   const [x, operation, y] = value;

//   switch (operation) {
//     case "+": {
//       return x + y;
//     }
//     case "-": {
//       return x - y;
//     }
//     case "*": {
//       return x * y;
//     }
//     case "/": {
//       return x / y;
//     }
//   }
// });


function lazyAnd(first: () => Parser, second: () => Parser): Parser {
  return function (input) {
    return and(first(), second())(input);
  };
}
const expression = or(lazyAnd(() => number, () => and(op, expression)), number);

const parenOne = or(and(char("("), lazyAnd(() => parenOne, () => char(")"))), char("1"));

console.log(
  parenOne(unit("(((1)))")),
  expression(unit("1+1+1")),
);
// error: TS2448 [ERROR]: Block-scoped variable 'expression' used before its declaration.
// expression = map(expression, (value: any) => {
// ~~~~~~~~~~
