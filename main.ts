type Stream = {
  src: string;
  idx: number;
};
type OutputValue = {
  stream: Stream;
  value: any;
};
type Result = OutputValue | undefined;

// function signatures
type Parser = (s: Stream) => Result;
type Combinator = (...parsers: Parser[]) => Parser;

// parser generators
const charParse = (c: string): Parser =>
  ({ src, idx }) =>
    c === src?.[idx]
      ? { stream: { src, idx: idx + 1 }, value: src[idx] }
      : undefined;

// combinators
const and: Combinator = (p1, p2) =>
  (input) => {
    const r = p1(input);
    if (r) {
      const r2 = p2(r.stream);
      if (r2) {
        return {
          stream: r2.stream,
          value: [r.value, r2.value],
        };
      }
    }
  };

const or: Combinator = (p1, p2) => (input) => p1(input) || p2(input);

// mapper
const mapParse = (parser: Parser, fn: Function) =>
  (input: Stream) => {
    const out = parser(input);

    if (out) {
      out.value = fn(out.value);
      return out;
    }
  };

///////////////

const u = (s: string): Stream => ({ src: s, idx: 0 });

const one = charParse("1");
const oneThatParsesIntoAnInt = mapParse(one, (x: string) => parseInt(x));
const two = charParse("2");
const twoThatParsesIntoAnInt = mapParse(two, (x: string) => parseInt(x));
const onetwo = and(oneThatParsesIntoAnInt, twoThatParsesIntoAnInt);

console.log(
  onetwo(u("12dsjafi")),
);

// const p = mapParse(onetwo, (x: number, y: number) => x + y);

// console.log(parse("21dsjafi", two));
// console.log(parse("12dsjafi", onetwo));
