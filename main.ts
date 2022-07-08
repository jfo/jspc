import { andThen, any, anyChar, char, many, map, unit } from "./lib.ts";

const intParse = (x: string) => parseInt(x);

const digit = anyChar("0123456789");
const number = map(many(digit), intParse);

const plus = char("+");
const minus = char("-");
const operation = any(plus, minus);

const expression = andThen(number, operation, number);

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
  }
});

const p = console.log;
p("\n");
// ===========================================

const a = char("A");
p(a(unit("A")));
// p(a(unit("B")))

// p(digit(unit("1")))
// p(digit(unit("A")))
// p(number(unit("123")))
// p(number(unit("abc")))

// p(plus(unit("+")))
// p(operation(unit("+")))
// p(operation(unit("-")))

// p(expression(unit("1+abc")))
// p(expression(unit("1+")))
// p(expression(unit("1+2")))

// p(calculate(unit("1+2")))

p("\n");
