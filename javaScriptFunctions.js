/*
Translating keys
Northcoders is expanding to France!

Unfortunately for us, our team on the ground in Paris doesn't speak the best English and has been providing us with student data partly in French.

Write a function that will take an object representing a student's data, a key that needs changing, and its English translation. The function should return a new object with the relevant key name changed to its English translation.

const student = {
    prénom: 'Carla',
    surname: 'Bruni',
    job: 'Artist'
}
const keyToChange = 'prénom'
const translation = 'firstName'

translateKey(student, keyToChange, translation) /* should return the following:

{
    firstName: 'Carla',
    surname: 'Bruni,
    job: 'Artist'
} 
*/

function translateKeyObjectSpread(student, keyToChange, translation) {
  const newStudent = { ...student, [translation]: student[keyToChange] };
  delete newStudent[keyToChange];
  return newStudent;
}

function translateKeyForLoop(student, keyToChange, translation) {
  const englishStudent = {};
  for (const key in student) {
    if (key === keyToChange) {
      englishStudent[translation] = student[key];
    } else {
      englishStudent[key] = student[key];
    }
  }
  return englishStudent;
}

1; //for...in loop
const student = { name: "Alice", age: 22 };
for (const key in student) {
  console.log(key); // "name", then "age"
  console.log(student[key]); // "Alice", then 22
}
/*
  What it does:
  Iterates over the keys (property names) of an object (student).
  In each iteration, key is a string representing one property of the object.
  Used to access object properties.
  */

//2. for...of loop
const people = [{ name: "Tom" }, { name: "Sarah" }];
for (const person of people) {
  console.log(person.name); // "Tom", then "Sarah"
}
/* 
  What it does:
  Iterates over the values of an iterable (like an array, string, etc.).
  In each iteration, person is the actual element (object) from the array people.
  Used to loop through arrays or other iterable objects.
  */

//Big Note
const person = { name: "Jane" };
for (const key of person) {
} //  TypeError: person is not iterable
/*Objects are not iterable, so you cannot use for...of on them directly
   unless you first get their keys/values using Object.keys() or Object.entries().
   */

//3 ways of writing a function:
/*
  Tally the People in Manchester
  Write a function that takes an array of people objects in the format:
  
  [
      { 
          name: 'Emmeline', 
          lives: { 
              country: 'UK', 
              city: 'Manchester' 
          }, 
          age: 32 
      }
  ]
  The function should return the number of people who live in the city of Manchester.
  */
//With Ternary
function tallyPeopleInManchester(people) {
  return people.reduce((acc, curr) => {
    return curr.lives.city === "Manchester" ? acc + 1 : acc;
  }, 0);
  /*
   👍 Pros:
  Concise and functional.
  Efficient: loops once, counts as it goes.
  
  👎 Cons:
  Slightly harder to read for beginners due to ternary expression.
  Not as clear as Option 2 in terms of intent.
   */
}

//Reduce with If
function tallyPeopleInManchester(people) {
  return people.reduce((total, person) => {
    if (person.lives.city === "Manchester") {
      total++;
    }
    return total;
  }, 0);
}

/*
  👍 Pros:
  Clear and easy to understand.
  Slightly more readable than the ternary version (especially for those unfamiliar with reduce).
  
  👎 Cons:
  Still a bit verbose compared to filter + length.
  */

//Filter + length
function tallyPeopleInManchester(people) {
  const manchesterians = people.filter(
    (person) => person.lives.city === "Manchester"
  );
  return manchesterians.length;
}

/**
  👍 Pros:
  Very readable and expressive — intent is immediately clear.
  Declarative: "Filter to Manchesterians, then count them."
  
  👎 Cons:
  Less efficient: creates a new array just to count items.
  For large arrays, this uses more memory than necessary.
   *
   */

/*
  Get the pug owners!
  Write a function takes an array of dog objects and returns an array of the names of all the pug owners.
  
  getPugOwners([
        {name: 'Beatrice', breed: 'Lurcher', owner: 'Tom'},
        {name: 'Max', breed: 'Pug', owner: 'Izzi'},
        {name: 'Poppy', breed: 'Pug', owner: 'Anat'}
      ]) // returns ['Izzi', 'Anat']
  
  getPugOwners([
        {name: 'Beatrice', breed: 'Lurcher', owner: 'Tom'},
      ]) // returns []
  
  getPugOwners([]) // returns []
  */
function getPugOwners(dogs) {
  console.log(dogs);
  return dogs
    .map((item) => {
      if (item.breed === "Pug") return item.owner;
    })
    .filter((item) => item !== undefined);
}
/**
 *  filtering after transforming — but it's still considered less clear than doing the filtering first, then mapping. */

function getPugOwners(dogs) {
  const pugArray = dogs.filter((dog) => dog.breed === "Pug");
  return pugArray.map((dog) => dog.owner);
}

/*
   What it does:
  Filters out non-Pugs.
  Then maps to get their owners.
  
  ✅ Pros:
  Readable and expressive — clear intent.
  Performs two passes, but small and understandable.
  Idiomatic for most use cases.
  👍 Recommended for clarity and maintainability.
  */

function getPugOwners(dogs) {
  return dogs.reduce((pugOwners, currentDog) => {
    if (currentDog.breed === "Pug") {
      pugOwners.push(currentDog.owner);
    }
    return pugOwners;
  }, []);
}

/*
  🔍 What it does:
  Loops once, collecting owners of Pugs into an array.
  
  ✅ Pros:
  Most efficient — single pass.
  No intermediate arrays.
  
  👎 Cons:
  Slightly more verbose.
  Slightly less readable than filter + map to those unfamiliar with reduce.
  */

/*
  | Option          | Clarity | Performance      | Idiomatic | Recommendation             |
  | --------------- | ------- | ---------------- | --------- | -------------------------- |
  | 1: map + filter | ❌ Low   | ❌ Less efficient | ❌ No      | Not recommended            |
  | 2: filter + map | ✅ High  | ✅ Acceptable     | ✅ Yes     | ✅ **Best for readability** |
  | 3: reduce       | Medium  | ✅ Most efficient | ✅ Yes     | ✅ Best for **performance** |
  
  */
