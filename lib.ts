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
type Generator = (s: any) => Parser;
type Combinator = (...parsers: Parser[]) => Parser;

export const unit = (s: string): Stream => ({ src: s, idx: 0 });

// parser generators
// -----------------
export const char: Generator = (c) =>
  ({ src, idx }) =>
    c === src?.[idx]
      ? { stream: { src, idx: idx + 1 }, value: src[idx] }
      : undefined;

export const string = (c: string): Parser =>
  ({ src, idx }) =>
    c === src?.slice(idx, c.length + idx)
      ? {
        stream: { src, idx: idx + c.length },
        value: src.slice(idx, c.length + idx),
      }
      : undefined;

export const anyChar = (str: string): Parser =>
  (s) => any(...str.split("").map(char))(s);

// combinators
// -----------
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
export const any: Combinator = (...ps) => ps.reduce((p1, p2) => or(p1, p2));
export const oneOrMore: Combinator = (p) =>
  ({ src, idx }) => {
    const head = p({ src, idx });
    const tail = p({ src, idx: idx + 1 });

    console.log("head", head);
    console.log("tail", tail);

    if (!tail) {
      return {
        stream: {
          src,
          idx,
        },
        value: head?.value,
      };
    }

    return and(p, oneOrMore(p))({ src, idx });
  };
export const many: Combinator = (p) => (input) => zeroOrMore(p, input);

// mapper
// ------
export const map = (parser: Parser, fn: Function) =>
  (input: Stream) => {
    const out = parser(input);

    if (out) {
      out.value = fn(out.value);
      return out;
    }
  };

export const zeroOrMore = (p: Parser, input: Stream): Result => {
  const firstResult = p(input);

  if (!firstResult) {
    return {
      stream: input,
      value: "",
    };
  }

  let subsequent = zeroOrMore(p, { src: input.src, idx: input.idx + 1 });
  const value = firstResult.value + subsequent?.value;

  return {
    stream: {
      src: input.src,
      idx: input.idx + value.length,
    },
    value,
  };
};
