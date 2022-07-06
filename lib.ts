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
export const char = (c: string): Parser =>
  ({ src, idx }) =>
    c === src?.[idx]
      ? { stream: { src, idx: idx + 1 }, value: src[idx] }
      : undefined;

// combinators
export const and: Combinator = (p1, p2) =>
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

export const or: Combinator = (p1, p2) => (input) => p1(input) || p2(input);

// mapper
export const map = (parser: Parser, fn: Function) =>
  (input: Stream) => {
    const out = parser(input);

    if (out) {
      out.value = fn(out.value);
      return out;
    }
  };

export const u = (s: string): Stream => ({ src: s, idx: 0 });
