import { and, charParse, mapParse, u } from "./lib.ts";

const one = charParse("1");
const oneThatParsesIntoAnInt = mapParse(one, (x: string) => parseInt(x));
const two = charParse("2");
const twoThatParsesIntoAnInt = mapParse(two, (x: string) => parseInt(x));
const onetwo = and(oneThatParsesIntoAnInt, twoThatParsesIntoAnInt);

console.log(
  onetwo(u("12dsjafi")),
);

// const p = mapParse(onetwo, (x: number, y: number) => x + y);

// console.log(parse("21dsjafi", two));
// console.log(parse("12dsjafi", onetwo));
