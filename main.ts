import { and, char, map, u } from "./lib.ts";

const one = char("1");
const oneThatParsesIntoAnInt = map(one, (x: string) => parseInt(x));
const two = char("2");
const twoThatParsesIntoAnInt = map(two, (x: string) => parseInt(x));
const onetwo = and(oneThatParsesIntoAnInt, twoThatParsesIntoAnInt);

console.log(
  onetwo(u("12dsjafi")),
);

// const p = mapParse(onetwo, (x: number, y: number) => x + y);

// console.log(parse("21dsjafi", two));
// console.log(parse("12dsjafi", onetwo));
