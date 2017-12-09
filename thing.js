const err = (i) => { throw i }
const first = (i) => i ? i[0] : err()
const rest = (i) => i ? i.slice(1,i.length) : err()

function Result(v,i) { return {v, i} }

const ex = {
  andThen: async function(f) {
    return this.then((e) => new Result(
      e.v,
      f(e.i)
    ));
  },
}
Promise.prototype = Object.assign(Promise.prototype, ex);


const d = async (i) => first(i) == 'd' ? new Result(first(i), rest(i)) : err() ;
const dd = async (i) => {
  return d(i).andThen(d);
}


dd("dddd").then(
  console.log,
  (x) => console.error("err:", x)
)
