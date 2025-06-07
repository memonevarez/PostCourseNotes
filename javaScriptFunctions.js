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

/*
Enter the matrix
Write a function that takes a number and returns a matrix of nested arrays equal to the number passed. Each element in each subarray should be set to a value of null.
generateMatrix(1) // returns [[null]]
generateMatrix(2) // returns [[null, null], [null, null]]
generateMatrix(3) // returns [[null, null, null], [null, null, null], [null, null, null]]
  */

function generateMatrix(number) {
  return Array.from({ length: number }, () => Array(number).fill(null));
}

/*
Numbers ending with zeros are boring.
They might be fun in your world, but not here.
Get rid of them. Only the ending ones.

1450   -> 145
960000 -> 96
1050   -> 105
-1050  -> -105
0      -> 0
Note: Zero should be left as it is.
*/

function zeroRecursive(numArray) {
  console.log(numArray);
  if (numArray.at(-1) !== "0") return Number(numArray.join(""));
  numArray.pop();
  return zeroRecursive(numArray);
}

function noBoringZeros(n) {
  return zeroRecursive(n.toString().split(""));
}

/*
❌ Cons:
Recursion is unnecessary here and can be expensive with large input.
String/array conversion adds overhead.
Mutates the input array (pop()), which can lead to bugs in other contexts.
Less idiomatic for a simple task like trimming trailing zeroes.
*/

function noBoringZeros(n) {
  if (n === 0) return 0;
  while (Number.isInteger(n / 10)) {
    n = n / 10;
  }
  return n;
}
/*
✅ Pros:
Efficient: Uses a simple loop (O(log₁₀ n)) — no array/string conversions.
Clear: Expresses the logic in a minimal way.
Avoids recursion: No risk of call stack overflow with large numbers.
Handles 0 edge case explicitly.
*/

/*
🏁 Final Verdict
Function	Performance	Clarity	Risk of Error	Best Use Case
Recursive (zeroRecursive)	❌ Slower (due to string/array + recursion)	❌ Verbose	❌ Stack overflow risk	❌ Avoid
Iterative (while)	✅ Fast	✅ Clear	✅ Safe	✅ Use this
*/

/*
Find the wrong way fruit
This function takes an array of fruit (orchard) in the format:
['apple', 'apple', 'apple', 'apple', 'elppa', 'apple']
The fruit will all be the 'right way round' apart from 1 fruit!

Your function should return its index position. So in this example, the function should return 4.
Note: The fruit will not always be apple, but it will always be an orchard of the same kind of fruit.

findWrongWayFruit(['apple', 'apple', 'elppa']) // returns 2
findWrongWayFruit(['apple', 'elppa', 'apple']) // returns 1
findWrongWayFruit(['banana', 'ananab', 'banana', 'banana']) // returns 1
findWrongWayFruit(['apple', 'elppa']) // returns 0 as we can't tell which one is the right way round
*/

function findWrongWayFruit(orchard) {
  const fruitCount = orchard.reduce((counterObj, currFruit) => {
    counterObj[currFruit] = (counterObj[currFruit] || 0) + 1;
    return counterObj;
  }, {});
  const oddFruit = Object.entries(fruitCount).find(
    ([key, value]) => value === 1
  );
  return orchard.indexOf(oddFruit[0]);

  //✅ Achieves exactly the same result as:
  //const oddFruit = Object.keys(fruitCounts).find(fruit => fruitCounts[fruit] === 1);
  //return orchard.findIndex(fruit => fruit === oddFruit);

  /*
🔍 Difference?
Your version uses Object.entries() to get [key, value] pairs directly, so you can avoid extra lookups.
The other version uses Object.keys() and then looks up fruitCounts[fruit] inside the callback.

✅ Benefits of your version:
Slightly cleaner if you already want both key and value at once.
Avoids repeating the lookup (fruitCounts[fruit]).
  */

  for (const fruit in fruitCount) {
    if (fruitCount[fruit] === 1) {
      return orchard.indexOf(fruit);
    }
  }

  for (const [key, value] in Object.entries(fruitCount)) {
    if (value > 1) return orchard.indexOf(key);
  }
}

/*
🆚 Which is better?
Aspect	 Version (for...in)	Alternative Version (find)
Readability	Okay	✅ Slightly cleaner
Conciseness	❌ Slightly more verbose	✅ More direct
Performance	Equal (O(n))	Equal (O(n))
Maintainability	❌ Manual loop	✅ Declarative with find
  */
