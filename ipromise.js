const first = (i) => i ? i[0] : fail()
const rest = (i) => i ? i.slice(1,i.length) : ''

function Result(v,i) { return {v, i} }
const unit = (v, i) => new Result(v, i);

const
// Parsers: functions that take an input and return a Result<match, remaining_input> or an error
item   = async (i) => new Result(first(i), rest(i)),
fail   = async (i) => { throw "fail" },

// Parser generators: functions that take anything and return parsers
is                 = pred     => i => pred(first(i)) ? item(i) : fail(),
result             = v        => i => new Result(v, i),
anyOfTheseChars    = c        => i => anyOf(...c.split('').map(char))(i),
betweenTheseValues = (c1, c2) => is(i => first(i) >= c1 && first(i) <= c2),

char               = c        => is(i => c == i),

// Parser combinators: functions that take parsers and return parsers
and         = (p1, p2)   => i => p1(i).then(r => p2(r.i).then(r2 => unit(r.v + r2.v, r2.i))),
seqOf       = ( ...ps)   => ps.reduce(and),

or          = (p1, p2)   => i => p1(i).catch(() => p2(i)),
anyOf       = ( ...ps)   => ps.reduce(or),

oneOrMore   = p          => i => and(p, oneOrMore(p))(i).catch(() => p(i)),
anyNumberOf = p          => or(oneOrMore(p), result("")),

after       = (p1, p2)   => i => p1(i).then(r => p2(r.i).then(r2 => r2)),
before      = (p1, p2)   => i => p1(i).then(r => p2(r.i).then(r2 => unit(r.v, r2.i))),
between     = (p1,p2,p3) => before(after(p1,p2), p3),

map = (f, p) => (i) => p(i).then((r => unit(f(r.v), r.i)));

// Let's make a parser lib
digit       = betweenTheseValues("0", "9"),
digits      = oneOrMore(digit),

upper       = betweenTheseValues("A", "Z"),
uppers      = oneOrMore(upper),

lower       = betweenTheseValues("a", "z"),
lowers      = oneOrMore(lower),

punctuation = anyOfTheseChars(".!?"),
space       = char(' '),
spaces      = oneOrMore(space),

ascii_character   = anyOf(digit, lower, upper),
ascii_characters  = oneOrMore(ascii_character),

letter = or(upper, lower),
word   = and(letter, anyNumberOf(ascii_characters));

number = map(parseInt, digits);
numbers = oneOrMore(number);

numbers('18839.0dfi  jdifo')
.then(
  console.log,
  console.error
)
