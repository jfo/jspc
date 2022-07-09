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
} from "./lib.ts";

const intParse = (x: string) => parseInt(x);

const digit = anyChar("0123456789");
const number = map(many(digit), intParse);

const plus = char("+");
const minus = char("-");
const times = char("*");
const divide = char("/");
const op = any(divide, times, plus, minus);
expression = map(expression, (value: any) => {
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


const expression = or(andThen(expression, op, number), number);


console.log(
  expression(unit("1+190")),
);
// error: TS2448 [ERROR]: Block-scoped variable 'expression' used before its declaration.
// expression = map(expression, (value: any) => {
// ~~~~~~~~~~
