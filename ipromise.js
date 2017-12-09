const first = (i) => i ? i[0] : zero()
const rest = (i) => i ? i.slice(1,i.length) : zero()

function Result(v,i) { return {v, i} }

// Parsers: functions that return a Result<match, remaining_input> or an error
const zero   = async (i) => { throw "zero" };
const item   = async (i) => new Result(first(i), rest(i));
const result = (v) => async i => new Result(v, i);

// Parser generators: functions that return parsers
const char = c => async (i) => first(i) == c ? new Result(c, rest(i)) : zero();
const predicate = pred => async (i) => pred(first(i)) ? new Result(first(i), rest(i)) : zero();

// Parser combinators: functions that take parsers and return parsers
const and = (p1, p2) => (i) => p1(i).then(r => p2(r.i).then(r2 => new Result(r.v + r2.v, r2.i)));
const or  = (p1, p2) => (i) => p1(i).catch(() => p2(i));
const seqOf  = (...ps) => (i) => ps.reduce(and)(i)
const anyOf  = (...ps) => (i) => ps.reduce(or)(i)
const many  = p => i =>  and(p, many(p))(i).catch(() => p(i));

const number = predicate()
const a = char('a');
const b = char('b');
const d = char('d');
const c = char('c');
const dd = and(d,d);
const dddd = and(dd,dd);
const abcd = anyOf(a,b,c,d);
const abcdThenA = and(anyOf(a,b,c,d), a);
const ds = many(d);
const λ = char("λ")

λ("λdλ")
.then(
  console.log,
  console.error
)
