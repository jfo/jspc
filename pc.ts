type Stream = {
  src: string;
  idx: number;
};

type Result = Stream | undefined;

const charParse = (c: string) =>
  ({ src, idx }: Stream): Result =>
    c === src[idx] ? { src, idx: idx + 1 } : undefined;

const a = charParse("a");
const b = charParse("b");

// combinators
const and = (p1: Function, p2: Function) => (input: Stream) => p2(p1(input));
const or = (p1: Function, p2: Function) =>
  (input: Stream) => p1(input) || p2(input);

// parser
const parse = (input: string, parser: Function) =>
  parser({ src: input, idx: 0 });

const input = "abcde";
