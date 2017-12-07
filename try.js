const
err   = e => { throw error },
car   = i => i[0],
cdr   = i => i[1],
first = car,
rest  = i => i.slice(1,i.length),
char = c => async i => first(i) == c ?  [c, rest(i)] : err(`error`),
bind = (p1, p2) => (i) => p1(i).then((i2) => {
    return p2(i2[1]).then((out) => [i2[0] + out[0], out[1]])
}),

a = char("a"),
b = char("b"),
c = char("c"),
ab = bind(a, b),
cc = bind(c, c),
abcc = bind(ab, cc);

abcc('abccdjfio')
.then(console.log, console.log)
