const first = (i) => i ? i[0] : zero()
const rest = (i) => i ? i.slice(1,i.length) : ''

function Result(v,i) { return {v, i} }

// Parser generators: functions that return parsers
const 
is = pred => async (i) => pred(first(i)) ? new Result(first(i), rest(i)) : zero(),
char   = c => is(i => c == i),

// Parser combinators: functions that take parsers and return parsers
and   = (p1, p2) => i => p1(i).then(r => p2(r.i).then(r2 => new Result(r.v + r2.v, r2.i))),
or    = (p1, p2) => i => p1(i).catch(() => p2(i)),
seqOf = ( ...ps) => i => ps.reduce(and)(i),
anyOf = ( ...ps) => i => ps.reduce(or)(i),
oneOrMore  =      p   => i => and(p, oneOrMore(p))(i).catch(() => p(i)),
anyNumberOf = p => i => or(oneOrMore(p), result(""))(i),

before   = (p1, p2) => i => p1(i).then(r => p2(r.i).then(r2 => new Result(r.v, r2.i))),
after    = (p1, p2) => i => p1(i).then(r => p2(r.i).then(r2 => r2)),
between = (p1,p2,p3) => before(after(p1,p2), p3)

// Parsers: functions that return a Result<match, remaining_input> or an error
zero   = async (i) => { throw "zero" },
item   = async (i) => new Result(first(i), rest(i)),

result = (v) => async i => new Result(v, i),
digit  = is(c => c >= "0" && c <= "9"),
lower  = is(c => c >= "a" && c <= "z"),
upper  = is(c => c >= "A" && c <= "Z"),
character = anyOf(digit, lower, upper),
characters = oneOrMore(character),

space     = is(c => c == ' '),
spaces    = oneOrMore(space),

letter = or(upper, lower),
word   = and(or(upper, lower), anyNumberOf(characters)),
word_then_space   = and(word, spaces),
punctuation  = is(c => c == '.' || c == '!'),

end = is(c => c == undefined)

d = char("d");
a = char("a");
da = between(d, a, d)
quote = char('"');
quoted_string = between(quote, anyNumberOf(or(characters, spaces)), quote);

quoted_string('"dadjdufioj  odi"   ')

.then(
  console.log,
  console.error
)
