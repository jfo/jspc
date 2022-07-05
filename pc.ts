type Stream = {
  src: string;
  idx: number;
  output: Array<any>;
};

// type Err = {
//   stream: Stream;
//   msg: string
// };

type Result = Stream | undefined;

const charParse = (c: string) =>
  ({ src, idx, output }: Stream): Result =>
    c === src[idx] ? { src, idx: idx + 1, output } : undefined;

const one = charParse("1");
const a = charParse("a");
const b = charParse("b");

// combinators
const and = (p1: Function, p2: Function) => (input: Stream) => p2(p1(input));
const or = (p1: Function, p2: Function) =>
  (input: Stream) => p1(input) || p2(input);

// parser
const parse = (input: string, parser: Function) => {
  return parser({ src: input, idx: 0, output: [] });
}

const ab = and(a, b);

// const input = "ab";
// const input = "abde";
// const input = "acde";
const input = "ab1";

const mapParse = (parser: any, fn: any) => (input: Stream) => {
  const out = parser(input)

  if (out) {
    out.output.push(fn(input.src[input.idx]));
    return out;
  }
}

const oneThatParsesIntoAnInt = mapParse(one, (x: any) => parseInt(x))

console.log(
  parse('1', oneThatParsesIntoAnInt)
)


// { src: "1", idx: 1, output: [1] }


// function that you feed "input" into (string) and you get either a nice error or a _language construct mapped from the input_

// const x = '(a (b c) 1)     '
// const y = ['a', ['b', 'c'], 1]

