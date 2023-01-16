console.log('hello world');

const cars = [
    {brand : 'Volvo', model : 'ABC'},
    {brand : 'Toyota', model : 'CH-R'},
    {brand : 'Tesla', model : 'Model S'}
];

const models = cars.map( x => x.model)
const modelsClassic = cars.map(function(x) {
    return x.model;
})
console.log(models)
console.log(modelsClassic)

const person = "Mike";
const age = 28;

function myTag(strings, personExp, ageExp) {
  const str0 = strings[0]; // "That "
  const str1 = strings[1]; // " is a "
  const str2 = strings[2]; // "."

  const ageStr = ageExp > 99 ? "centenarian" : "youngster";

  // We can even return a string built using a template literal
  return `${str0}${personExp}${str1}${ageStr}${str2}`;
}

const output = myTag`That ${person} is a ${age}.`;

console.log(output);
// That Mike is a youngster.

const rectangle = { width: 5, height: 8 };

const {width: w} = rectangle

console.log(w)

let me = 'happy', you = 'sad';

const [Alex, Sam] = [me, you]
console.log(Alex,Sam)