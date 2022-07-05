type Stream = {
  src: string;
  idx: number;
};

type OutputValue = {
  stream: Stream;
  value: any;
};

type Result = OutputValue | undefined;

const charParse = (c: string) =>
  ({ src, idx }: Stream): Result =>
    c === src[idx]
      ? { stream: { src, idx: idx + 1 }, value: src[idx] }
      : undefined;

// combinators
const and = (p1: Function, p2: Function) => (input: Stream) => p2(p1(input));
const or = (p1: Function, p2: Function) =>
  (input: Stream) => p1(input) || p2(input);

// parser
const parse = (input: string, parser: Function) => {
  return parser({ src: input, idx: 0 });
};

// mapper
const mapParse = (parser: any, fn: any) =>
  (input: Stream) => {
    const out = parser(input);

    if (out) {
      out.value = fn(out.value);
      return out;
    }
  };

///////////////

const one = charParse("1");
const oneThatParsesIntoAnInt = mapParse(one, (x: any) => parseInt(x));
console.log(parse("1dsjafi", oneThatParsesIntoAnInt));
