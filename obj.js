function Result(v, i) {
  return { v, i };
}
class Parser {
  constructor(p) {
    if (p instanceof Parser) {
      this.innerFn = p.innerFn;
    } else {
      this.innerFn = (i) => new Result("", i);
    }
  }

  run(i) {
    return this.innerFn(i);
  }

  value(v) {
    this.innerFn(i);
  }
}
const is = (p) => new Parser(p);

console.log(
  is().run("dfji"),
);
