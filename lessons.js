const LESSONS = {
  "w1t1": {
    takeaways: [
      "Compiled languages translate all code before running; interpreted languages translate line-by-line",
      "RAM is your program's workspace (fast, temporary); storage is permanent but slower",
      "The stack holds function calls and local variables; the heap holds objects and arrays",
      "A runtime (Node.js, browser, CPython) is the software that actually executes your code",
      "Variables on the stack disappear when their function returns; heap data persists until garbage collected"
    ],
    sections: [
      {
        title: "What Actually Happens When You Run Code?",
        content: `<p>You've been vibe-coding — writing code, hitting run, and things work (mostly). But what actually happens between you pressing "Run" and seeing output? Understanding this makes you a <strong>10x better debugger</strong>.</p>
<p>Think of it like cooking. You (the programmer) write a recipe (source code). But the kitchen (CPU) doesn't understand English recipes — it only understands precise physical actions. Something has to <strong>translate</strong> your recipe into those actions.</p>
<h3>The Two Translation Approaches</h3>
<ul>
<li><strong>Compiled languages</strong> (C, Go, Rust): The entire recipe is translated into machine code BEFORE cooking starts. Like getting a fully translated recipe card in the kitchen's language.</li>
<li><strong>Interpreted languages</strong> (Python, JavaScript): A translator stands next to the chef and translates line-by-line as you cook. More flexible, but slightly slower.</li>
</ul>
<p>JavaScript and Python — the languages you'll use most — are interpreted (with some JIT compilation magic to speed things up).</p>`,
        diagram: `  Your Code (human-readable)
       │
       ▼
  ┌─────────────┐     ┌─────────────┐
  │  Compiler   │ OR  │ Interpreter │
  │ (all at once)│     │ (line by line)│
  └──────┬──────┘     └──────┬──────┘
         │                    │
         ▼                    ▼
  Machine Code           Executes directly
  (binary: 010110...)   via runtime engine`,
        quiz: {
          question: "Python is a compiled or interpreted language?",
          options: ["Compiled — it translates everything before running", "Interpreted — it translates and runs line by line", "Neither — it runs directly on the CPU"],
          answer: 1
        }
      },
      {
        title: "CPU, RAM, and Storage — The Three Amigos",
        content: `<p>Every computer has three main components that your code interacts with. Think of them like a restaurant:</p>
<ul>
<li><strong>Storage (Hard Drive/SSD)</strong> = The pantry. Lots of space, but slow to access. Your files, programs, and databases live here. <em>Think: SQL tables stored on disk.</em></li>
<li><strong>RAM (Memory)</strong> = The counter space. Fast access, limited space. When you run a program, it gets loaded FROM storage INTO RAM. Variables, arrays, and objects live here while your program runs.</li>
<li><strong>CPU (Processor)</strong> = The chef. Does the actual work (math, comparisons, logic) incredibly fast, but can only work with what's on the counter (in RAM).</li>
</ul>
<p>When you write <code>let x = 42</code>, you're reserving a spot on the counter (RAM) and putting the value 42 there. When you write <code>x + 10</code>, the chef (CPU) grabs 42 from the counter and adds 10.</p>
<h3>Why This Matters</h3>
<p>When people say a program is "memory-intensive," they mean it uses a lot of counter space (RAM). When they say it's "CPU-intensive," they mean the chef is working overtime. Understanding this helps you write efficient code — and explain performance issues in interviews.</p>`,
        pitfall: "A common misconception: 'more RAM = faster computer.' RAM is about CAPACITY (how many things fit on the counter), not SPEED. The CPU speed determines how fast work gets done."
      },
      {
        title: "Stack Memory vs Heap Memory",
        content: `<p>RAM is divided into two zones for your program. Understanding this prevents a whole class of bugs.</p>
<h3>The Stack — Fast, Organized, Limited</h3>
<p>Think of the stack like a stack of plates. You can only add (push) or remove (pop) from the top. It's used for:</p>
<ul>
<li>Function calls and their local variables</li>
<li>Primitive values (numbers, booleans, small strings)</li>
<li>Keeping track of "where to return" after a function finishes</li>
</ul>
<p>Each function call creates a new "frame" on the stack. When the function returns, its frame is popped off. This is why local variables disappear after a function ends.</p>
<h3>The Heap — Flexible, Unstructured, Slower</h3>
<p>The heap is like a big warehouse. Objects, arrays, and complex data structures live here because they can be any size. You access heap data through <strong>references</strong> (basically an address/pointer to where the data lives).</p>`,
        code: `// Stack: each function call creates a stack frame
function multiply(a, b) {
  // 'a' and 'b' live on the stack
  let result = a * b;  // 'result' lives on the stack too
  return result;
  // When this function returns, a, b, and result are gone
}

// Heap: objects and arrays are stored here
let user = { name: "Athena", age: 20 };
// 'user' (the reference) is on the stack
// { name: "Athena", age: 20 } (the actual object) is on the heap`,
        language: "javascript",
        diagram: `  STACK (organized)          HEAP (flexible)
  ┌──────────────┐          ┌──────────────────┐
  │ multiply()   │          │                  │
  │  a = 3       │          │  { name: "Athena"│
  │  b = 7       │          │    age: 20 }     │
  │  result = 21 │          │                  │
  ├──────────────┤          │  [1, 2, 3, 4]    │
  │ main()       │          │                  │
  │  user = 0xA1─┼─────────▶│                  │
  └──────────────┘          └──────────────────┘`
      },
      {
        title: "What's a Runtime? (Node.js, Python, Browser)",
        content: `<p>You can't just double-click a .js file and have it run. You need a <strong>runtime environment</strong> — the software that knows how to execute your code.</p>
<h3>For JavaScript:</h3>
<ul>
<li><strong>Browser</strong> (Chrome, Firefox): Has a JS engine (V8 in Chrome) built in. This is why JS can make webpages interactive.</li>
<li><strong>Node.js</strong>: Takes that same V8 engine and puts it on your computer (outside the browser). This is why JS can also be used for backend servers.</li>
</ul>
<h3>For Python:</h3>
<ul>
<li><strong>CPython</strong>: The default Python interpreter. When you type <code>python script.py</code>, this is what runs.</li>
</ul>
<h3>Why This Matters for You</h3>
<p>When you "vibe code" and hit run in VS Code or Replit, the runtime is handling everything behind the scenes. Knowing which runtime you're using helps you understand what APIs are available (browser JS has <code>document</code> and <code>window</code>; Node.js has <code>fs</code> and <code>http</code> — they're different!).</p>`,
        quiz: {
          question: "Can you use 'document.getElementById()' in Node.js?",
          options: ["Yes — JavaScript is JavaScript everywhere", "No — 'document' only exists in the browser runtime", "Only if you install a special package"],
          answer: 1
        }
      }
    ]
  },

  "w1t2": {
    takeaways: [
      "Primitives (numbers, strings, booleans) are copied by value; objects and arrays are copied by reference",
      "Two variables can point to the same object -- changing one changes both",
      "Use spread syntax [...arr] or {...obj} to make a true copy",
      "Always use === (strict equality) in JavaScript; == does sneaky type coercion",
      "Falsy values: false, 0, empty string, null, undefined, NaN -- everything else is truthy"
    ],
    sections: [
      {
        title: "Beyond 'let x = 5' — What Variables Really Are",
        content: `<p>In SQL, you define column types: <code>INT</code>, <code>VARCHAR</code>, <code>BOOLEAN</code>. JavaScript and Python have types too — they're just handled differently.</p>
<h3>Primitive Types — The Simple Ones</h3>
<p>These are stored directly in memory (on the stack). They're <strong>immutable</strong> — you can't change them in place, only replace them.</p>
<ul>
<li><strong>Number</strong>: <code>42</code>, <code>3.14</code>, <code>-7</code> (JS has one number type; Python has int and float)</li>
<li><strong>String</strong>: <code>"hello"</code>, <code>'world'</code> (text data — like VARCHAR in SQL)</li>
<li><strong>Boolean</strong>: <code>true</code> or <code>false</code> (like a BIT column)</li>
<li><strong>null</strong>: intentionally empty (like NULL in SQL!)</li>
<li><strong>undefined</strong>: declared but never assigned (JS only — SQL doesn't have this)</li>
</ul>`,
        code: `// Primitives are stored by VALUE
let a = 10;
let b = a;     // b gets a COPY of 10
b = 20;        // changing b doesn't affect a
console.log(a); // 10 — unchanged!

// SQL analogy:
// This is like: INSERT INTO table2 SELECT value FROM table1
// table2 gets a copy, not a link`,
        language: "javascript"
      },
      {
        title: "Reference Types — Objects, Arrays, Functions",
        content: `<p>These are stored on the heap, and variables hold a <strong>reference</strong> (address) to them. This is the #1 source of bugs for beginners.</p>`,
        code: `// Reference types are stored by REFERENCE
let arr1 = [1, 2, 3];
let arr2 = arr1;        // arr2 points to the SAME array!
arr2.push(4);
console.log(arr1);      // [1, 2, 3, 4] — arr1 changed too!

// This is like having two shortcuts to the same file.
// Edit through either shortcut, and the file changes.

// To make a real copy:
let arr3 = [...arr1];   // spread operator = true copy
let arr4 = arr1.slice(); // also creates a copy`,
        language: "javascript",
        pitfall: "The #1 beginner mistake: thinking <code>let arr2 = arr1</code> creates a copy. It doesn't — both variables point to the same array. Use spread <code>[...arr]</code> or <code>slice()</code> to copy.",
        quiz: {
          question: "What does this print?<br><code>let a = {x: 1}; let b = a; b.x = 99; console.log(a.x);</code>",
          options: ["1 — b is a separate copy", "99 — a and b point to the same object", "undefined — objects can't be assigned like this"],
          answer: 1
        }
      },
      {
        title: "Type Coercion — JavaScript's Weirdest Feature",
        content: `<p>JavaScript tries to be "helpful" by automatically converting types. This leads to infamous quirks you MUST know for interviews.</p>
<h3>The == vs === Rule</h3>
<p><strong>Always use <code>===</code></strong> (strict equality). The <code>==</code> operator does type coercion, which creates bizarre results:</p>`,
        code: `// == does type coercion (AVOID)
"5" == 5       // true (string "5" is coerced to number 5)
0 == false     // true (0 is "falsy")
"" == false    // true (empty string is "falsy")
null == undefined // true (special case)

// === does NO coercion (USE THIS)
"5" === 5      // false (different types)
0 === false    // false
"" === false   // false

// The "truthy/falsy" values in JS:
// Falsy: false, 0, "", null, undefined, NaN
// Truthy: everything else (including "0", [], {})

// This trips up EVERYONE:
if ([]) console.log("truthy!");  // prints! Empty array is truthy
if ("0") console.log("truthy!"); // prints! Non-empty string is truthy`,
        language: "javascript",
        pitfall: "In SQL, NULL = NULL returns NULL (not true). In JS, null === null returns true. But null === undefined returns false. These differences will bite you if you come from SQL thinking."
      },
      {
        title: "Immutability — Why It Matters",
        content: `<p>A value is <strong>immutable</strong> if it can't be changed after creation. Primitives are immutable; objects and arrays are mutable.</p>
<p>This concept becomes critical when you learn React (state management) and functional programming.</p>`,
        code: `// Strings are IMMUTABLE
let name = "hello";
name[0] = "H";         // does nothing! (no error, just ignored)
console.log(name);      // "hello" — unchanged
name = "Hello";         // this works — you're replacing, not modifying

// Arrays are MUTABLE
let nums = [1, 2, 3];
nums[0] = 99;           // this works — arrays can be modified
console.log(nums);      // [99, 2, 3]

// To treat arrays immutably (important in React later):
const newNums = [...nums, 4];  // create new array instead of mutating
// nums is unchanged, newNums is [99, 2, 3, 4]`,
        language: "javascript",
        quiz: {
          question: "Which creates a truly independent copy of an object?",
          options: ["let copy = original", "let copy = {...original}", "let copy = original.toString()", "let copy = original === original"],
          answer: 1
        }
      }
    ]
  },

  "w1t3": {
    takeaways: [
      "if/else is the programming version of SQL's WHERE clause -- it controls which code runs",
      "Use for...of for arrays and for...in for object keys -- never mix them up",
      "The ?? operator only checks for null/undefined; || treats 0 and empty string as falsy too",
      "Early returns reduce nesting and make functions easier to read",
      "Short-circuit evaluation lets you safely access properties on potentially null objects"
    ],
    sections: [
      {
        title: "Conditionals — Making Decisions in Code",
        content: `<p>In SQL, you filter with <code>WHERE</code>. In programming, you control flow with <code>if/else</code>. Same concept: "if this condition is true, do this thing."</p>`,
        code: `// Basic if/else
let age = 20;
if (age >= 21) {
  console.log("Can drink");
} else if (age >= 18) {
  console.log("Can vote");  // ← this runs
} else {
  console.log("Too young");
}

// Ternary operator — one-line if/else
let status = age >= 18 ? "adult" : "minor";
// SQL equivalent: CASE WHEN age >= 18 THEN 'adult' ELSE 'minor' END

// Switch — when comparing one value against many options
let day = "Monday";
switch (day) {
  case "Monday":
  case "Tuesday":
    console.log("Weekday");  // falls through!
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;
  default:
    console.log("Midweek");
}`,
        language: "javascript"
      },
      {
        title: "Loops — Repeating Actions",
        content: `<p>SQL processes entire sets at once (<code>SELECT * FROM users</code>). In regular programming, you often need to process items <strong>one at a time</strong> using loops.</p>`,
        code: `// for loop — when you know how many times
for (let i = 0; i < 5; i++) {
  console.log(i);  // 0, 1, 2, 3, 4
}

// for...of — iterate over arrays (most common)
let fruits = ["apple", "banana", "cherry"];
for (let fruit of fruits) {
  console.log(fruit);  // apple, banana, cherry
}

// while — when you don't know how many times
let num = 1;
while (num < 100) {
  num *= 2;  // doubles: 1, 2, 4, 8, 16, 32, 64, 128
}

// forEach — functional style (no break/continue)
fruits.forEach((fruit, index) => {
  console.log(\`\${index}: \${fruit}\`);
});

// for...in — iterate over OBJECT KEYS (not arrays!)
let person = { name: "Athena", age: 20 };
for (let key in person) {
  console.log(\`\${key}: \${person[key]}\`);
}`,
        language: "javascript",
        pitfall: "Don't use <code>for...in</code> on arrays — it iterates over keys (indices as strings), not values, and can include prototype properties. Use <code>for...of</code> for arrays."
      },
      {
        title: "Short-Circuit Evaluation & Early Returns",
        content: `<p>These are patterns that make your code cleaner and faster. Professional developers use them constantly.</p>`,
        code: `// Short-circuit with && (AND)
// If left side is falsy, right side never executes
let user = null;
user && console.log(user.name);  // safe! doesn't crash

// Short-circuit with || (OR)
// Returns first truthy value
let name = inputName || "Anonymous";
// If inputName is "", null, or undefined → use "Anonymous"

// Nullish coalescing ?? (better than ||)
let count = 0;
let result1 = count || 10;   // 10 (0 is falsy!)
let result2 = count ?? 10;   // 0 (?? only checks null/undefined)

// Early returns — exit a function ASAP
function processUser(user) {
  // Instead of wrapping everything in if (user) { ... }
  if (!user) return null;        // ← early return
  if (!user.active) return null; // ← early return

  // Now we know user exists and is active
  // Main logic goes here with no nesting
  return user.name;
}`,
        language: "javascript",
        quiz: {
          question: "What does <code>0 || 'default'</code> return?",
          options: ["0", "'default'", "false", "null"],
          answer: 1
        }
      }
    ]
  },

  "w1t4": {
    takeaways: [
      "Arrow functions are the modern default; use them unless you need 'this' binding",
      "Pure functions always return the same output for the same input and have no side effects",
      "A closure is a function that remembers variables from the scope where it was created",
      "map, filter, and reduce are higher-order functions -- they take functions as arguments",
      "Closures let you create private variables that no outside code can touch directly"
    ],
    sections: [
      {
        title: "Functions Are the Most Important Abstraction",
        content: `<p>If variables are nouns, functions are <strong>verbs</strong>. They're reusable blocks of code that do something. In SQL, you have functions like <code>COUNT()</code>, <code>SUM()</code>, <code>UPPER()</code> — now you'll learn to build your own.</p>`,
        code: `// Three ways to define functions in JavaScript:

// 1. Function Declaration — hoisted (can be used before defined)
function greet(name) {
  return \`Hello, \${name}!\`;
}

// 2. Function Expression — NOT hoisted
const greet2 = function(name) {
  return \`Hello, \${name}!\`;
};

// 3. Arrow Function — concise, modern (use this most)
const greet3 = (name) => \`Hello, \${name}!\`;

// Default parameters
const greet4 = (name = "World") => \`Hello, \${name}!\`;
greet4();         // "Hello, World!"
greet4("Athena"); // "Hello, Athena!"

// Rest parameters — collect remaining args into an array
const sum = (...numbers) => {
  return numbers.reduce((total, n) => total + n, 0);
};
sum(1, 2, 3, 4);  // 10`,
        language: "javascript"
      },
      {
        title: "Pure Functions — The Gold Standard",
        content: `<p>A <strong>pure function</strong> has two properties: (1) same inputs always give same outputs, (2) no side effects (doesn't change anything outside itself). These are easier to test, debug, and understand.</p>`,
        code: `// PURE — same input, same output, no side effects
function add(a, b) {
  return a + b;
}
// add(2, 3) ALWAYS returns 5. Every time. Guaranteed.

// IMPURE — depends on external state
let tax = 0.08;
function calculateTotal(price) {
  return price * (1 + tax);  // depends on external 'tax' variable
}
// If someone changes 'tax', this function's output changes too!

// IMPURE — has side effects
let count = 0;
function increment() {
  count++;  // modifies something outside the function
  return count;
}
// This returns different values each time you call it!

// SQL analogy: a pure function is like a VIEW with no
// dependencies on session variables — always returns the
// same result for the same input data.`,
        language: "javascript",
        pitfall: "Array methods like <code>.push()</code>, <code>.sort()</code>, and <code>.splice()</code> MUTATE the original array (impure). Methods like <code>.map()</code>, <code>.filter()</code>, <code>.concat()</code> return new arrays (pure). Know the difference!"
      },
      {
        title: "Closures — Functions That Remember",
        content: `<p>A <strong>closure</strong> is when a function "remembers" variables from the scope where it was created, even after that scope is gone. This is one of the most asked interview topics.</p>`,
        code: `// A closure in action
function createCounter() {
  let count = 0;  // this variable is "enclosed"

  return function() {
    count++;       // the inner function can still access count
    return count;  // even after createCounter() has finished!
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
// 'count' is private — no one can access it directly!

// Practical use: creating private variables
function createBankAccount(initialBalance) {
  let balance = initialBalance;  // private!

  return {
    deposit: (amount) => { balance += amount; return balance; },
    withdraw: (amount) => { balance -= amount; return balance; },
    getBalance: () => balance,
  };
}

const account = createBankAccount(100);
account.deposit(50);     // 150
account.withdraw(20);    // 130
account.getBalance();    // 130
// account.balance → undefined (it's private!)`,
        language: "javascript",
        quiz: {
          question: "What does 'closure' mean?",
          options: [
            "A function that closes the program",
            "A function that remembers variables from its creation scope",
            "A function that can't be called again",
            "A function inside a class"
          ],
          answer: 1
        }
      },
      {
        title: "Higher-Order Functions — Functions That Use Functions",
        content: `<p>A <strong>higher-order function</strong> either takes a function as an argument OR returns a function. You've already used these — <code>map</code>, <code>filter</code>, and <code>reduce</code> are all higher-order functions.</p>`,
        code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// .map() — transform each element (like SELECT with expression)
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// .filter() — keep elements that pass a test (like WHERE)
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6, 8, 10]

// .reduce() — combine all elements into one value (like SUM, COUNT)
const total = numbers.reduce((sum, n) => sum + n, 0);
// 55

// Chain them! (like chaining SQL clauses)
const result = numbers
  .filter(n => n % 2 === 0)    // WHERE n % 2 = 0
  .map(n => n * 3)              // SELECT n * 3
  .reduce((sum, n) => sum + n, 0); // SUM()
// (2+4+6+8+10) * 3 = 90

// .find() — return first match (like LIMIT 1)
const firstBig = numbers.find(n => n > 7);  // 8

// .some() / .every() — boolean checks (like EXISTS / ALL)
numbers.some(n => n > 5);  // true (at least one > 5)
numbers.every(n => n > 5); // false (not all > 5)`,
        language: "javascript"
      }
    ]
  },

  "w1t5": {
    takeaways: [
      "Strings are immutable -- every string method returns a new string, never modifies the original",
      ".sort() without a comparator sorts by string value, so always pass (a, b) => a - b for numbers",
      "Use split() to turn strings into arrays and join() to turn arrays back into strings",
      "new Set(array) instantly removes duplicates -- like SELECT DISTINCT",
      "Build a frequency map (object or Map) to count occurrences -- a universal interview pattern"
    ],
    sections: [
      {
        title: "String Methods You'll Use Every Day",
        content: `<p>Strings are immutable in JS — every method returns a NEW string. Think of strings like <code>VARCHAR</code> columns — you transform them with functions but the original doesn't change.</p>`,
        code: `let str = "Hello, World!";

// Searching
str.includes("World");    // true (like SQL LIKE '%World%')
str.indexOf("World");     // 7 (position, or -1 if not found)
str.startsWith("Hello");  // true
str.endsWith("!");        // true

// Extracting
str.slice(0, 5);         // "Hello" (start, end)
str.slice(7);            // "World!" (from position 7 to end)
str.substring(0, 5);     // "Hello" (same as slice for positive indices)

// Transforming
str.toLowerCase();       // "hello, world!"
str.toUpperCase();       // "HELLO, WORLD!"
str.trim();              // removes whitespace from both ends
str.replace("World", "JS"); // "Hello, JS!"
str.replaceAll("l", "L");   // "HeLLo, WorLd!"

// Splitting and joining
"a,b,c".split(",");     // ["a", "b", "c"]  (string → array)
["a","b","c"].join("-"); // "a-b-c"          (array → string)
// SQL analogy: STRING_SPLIT and STRING_AGG

// Template literals (the backtick strings)
let name = "Athena";
let greeting = \`Hello, \${name}! You are \${20} years old.\`;`,
        language: "javascript"
      },
      {
        title: "Array Methods — Your Swiss Army Knife",
        content: `<p>Arrays are the most common data structure. Master these methods and you can solve most easy-level problems.</p>`,
        code: `let arr = [3, 1, 4, 1, 5, 9];

// Adding/removing
arr.push(2);         // add to END → [3,1,4,1,5,9,2]
arr.pop();           // remove from END → returns 2
arr.unshift(0);      // add to START → [0,3,1,4,1,5,9]
arr.shift();         // remove from START → returns 0

// splice — the multi-tool (MUTATES the array)
arr.splice(2, 1);    // at index 2, remove 1 element
arr.splice(1, 0, 99); // at index 1, remove 0, insert 99

// Non-mutating methods (return new arrays)
let sorted = [...arr].sort((a, b) => a - b); // sort ascending
let reversed = [...arr].reverse();

// Finding things
arr.includes(5);         // true
arr.indexOf(4);          // index of first 4
arr.findIndex(n => n > 4); // index of first element > 4

// Checking
arr.length;              // how many elements
Array.isArray(arr);      // true (typeof arr is "object"!)

// Destructuring — unpack arrays into variables
let [first, second, ...rest] = [10, 20, 30, 40, 50];
// first = 10, second = 20, rest = [30, 40, 50]`,
        language: "javascript",
        pitfall: "<code>.sort()</code> without a comparator sorts by STRING value! <code>[10, 9, 2].sort()</code> gives <code>[10, 2, 9]</code> because '10' < '2' alphabetically. Always use <code>.sort((a, b) => a - b)</code> for numbers."
      },
      {
        title: "Common String/Array Interview Patterns",
        content: `<p>Let's solve some classic problems to build your pattern recognition.</p>`,
        code: `// Pattern 1: Reverse a string (without built-in reverse)
function reverseString(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

// Pattern 2: Check if palindrome
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

// Pattern 3: Remove duplicates from array
function removeDups(arr) {
  return [...new Set(arr)];  // Set only keeps unique values
}
// SQL analogy: SELECT DISTINCT

// Pattern 4: Count character frequency
function charCount(str) {
  const freq = {};
  for (let char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}
// charCount("hello") → { h: 1, e: 1, l: 2, o: 1 }
// SQL analogy: SELECT char, COUNT(*) GROUP BY char`,
        language: "javascript",
        quiz: {
          question: "What's the time complexity of checking if an array contains a value using .includes()?",
          options: ["O(1) — constant time", "O(n) — must check each element", "O(log n) — binary search", "O(n²) — quadratic"],
          answer: 1
        }
      }
    ]
  },

  "w2t1": {
    takeaways: [
      "Array access by index is O(1) because elements sit in contiguous memory slots",
      "Inserting at the start of an array is O(n) -- every element must shift over",
      "Dynamic arrays double in capacity when full, making average push still O(1) amortized",
      "The rare O(n) resize cost is spread across many O(1) pushes -- that is amortized analysis"
    ],
    sections: [
      {
        title: "Arrays in Memory — Why They're Fast (and Slow)",
        content: `<p>You've been using arrays casually. Now let's understand <strong>why</strong> certain operations are fast or slow. This is what separates vibe-coders from engineers.</p>
<h3>Contiguous Memory</h3>
<p>An array stores elements in <strong>adjacent memory slots</strong>. Think of it like reserved seats in a row at a theater — seats 10, 11, 12, 13, 14. Because they're next to each other, you can instantly jump to any seat by its number.</p>
<ul>
<li><strong>Access by index</strong> — O(1): arr[3] means "go to start + 3 slots." Instant. Like <code>WHERE id = 3</code> on a primary key.</li>
<li><strong>Insert at end</strong> — O(1) amortized: usually instant (just extend). Occasionally needs to relocate everything (like a table needing more space).</li>
<li><strong>Insert at beginning/middle</strong> — O(n): everything after must shift over! Like inserting a row in the middle of a sorted table.</li>
<li><strong>Search by value</strong> — O(n): must check each element. Like <code>WHERE name = 'X'</code> without an index.</li>
</ul>`,
        diagram: `  Memory addresses:   100  104  108  112  116
  Array contents:    [ 10 | 20 | 30 | 40 | 50 ]
                       [0]  [1]  [2]  [3]  [4]

  arr[3] = go to address 100 + (3 × 4 bytes) = 112 → 40
  Instant! O(1)

  Insert 25 at index 2:
  [ 10 | 20 | 25 | 30 | 40 | 50 ]  ← 30, 40, 50 all shifted right
  Three elements moved! O(n)`,
        quiz: {
          question: "You have an array of 1 million elements. How long does arr[500000] take compared to arr[0]?",
          options: ["500,000x longer — it's in the middle", "Exactly the same — O(1) random access", "About 20x longer — like binary search", "Depends on the values stored"],
          answer: 1
        }
      },
      {
        title: "Dynamic Arrays — How Arrays Grow",
        content: `<p>In JavaScript and Python, arrays automatically resize. But HOW? Understanding this teaches you <strong>amortized analysis</strong> — a key interview concept.</p>
<p>When an array fills up, it creates a new array <strong>2x the size</strong> and copies everything over. This copy is O(n), but it happens so rarely that the average cost per insertion is still O(1).</p>`,
        code: `// Let's build a simplified dynamic array to understand it
class DynamicArray {
  constructor() {
    this.data = new Array(2);  // start with capacity 2
    this.length = 0;
    this.capacity = 2;
  }

  push(value) {
    // If full, double the size
    if (this.length === this.capacity) {
      this.resize(this.capacity * 2);  // O(n) — but rare!
    }
    this.data[this.length] = value;
    this.length++;
  }

  get(index) {
    if (index < 0 || index >= this.length) throw new Error("Out of bounds");
    return this.data[index];  // O(1) — always fast
  }

  resize(newCapacity) {
    const newData = new Array(newCapacity);
    for (let i = 0; i < this.length; i++) {
      newData[i] = this.data[i];  // copy everything
    }
    this.data = newData;
    this.capacity = newCapacity;
  }
}`,
        language: "javascript",
        diagram: `  Push 1: [1, _]        capacity=2, length=1
  Push 2: [1, 2]        capacity=2, length=2  (full!)
  Push 3: resize! → [1, 2, 3, _]  capacity=4, length=3
  Push 4: [1, 2, 3, 4]  capacity=4, length=4  (full!)
  Push 5: resize! → [1, 2, 3, 4, 5, _, _, _]  capacity=8

  Most pushes: O(1). Occasional resize: O(n).
  Averaged out: O(1) amortized per push.`
      }
    ]
  },

  "w2t2": {
    takeaways: [
      "A linked list node holds a value and a pointer to the next node -- no contiguous memory needed",
      "Inserting or deleting at the head of a linked list is O(1) -- no shifting required",
      "Accessing the nth element is O(n) because you must walk the chain from the head",
      "Reversing a linked list in-place is the most common linked list interview question",
      "The fast/slow pointer technique detects cycles and finds the middle in one pass"
    ],
    sections: [
      {
        title: "What Is a Linked List?",
        content: `<p>Unlike arrays (contiguous seats in a theater), a linked list is like a <strong>scavenger hunt</strong>. Each clue (node) tells you the next location. The data isn't stored together — each piece just knows where the next piece is.</p>
<h3>Why Do We Need This?</h3>
<p>Arrays are great, but inserting/deleting at the beginning is O(n) because everything shifts. Linked lists make insertion/deletion O(1) at the head — no shifting needed.</p>`,
        code: `// A linked list node — just two things: a value and a pointer
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;  // pointer to the next node
  }
}

// Building a linked list manually
let head = new Node(10);
head.next = new Node(20);
head.next.next = new Node(30);

// Traversal — follow the chain
let current = head;
while (current !== null) {
  console.log(current.value);  // 10, 20, 30
  current = current.next;
}`,
        language: "javascript",
        diagram: `  Array:        [10] [20] [30]    (all together in memory)

  Linked List:  [10|→] ──→ [20|→] ──→ [30|null]
                 head

  Each "box" is a Node with:
  - a value (10, 20, 30)
  - a pointer to the next node (or null if it's the last)`
      },
      {
        title: "Linked List Operations",
        content: `<p>Let's build a linked list class with common operations. Notice how insertion at the head is O(1) — no shifting!</p>`,
        code: `class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Insert at the beginning — O(1)!
  prepend(value) {
    const node = new Node(value);
    node.next = this.head;  // new node points to old head
    this.head = node;       // new node becomes the head
    this.size++;
  }

  // Insert at the end — O(n) (must walk to the end)
  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;  // walk to the last node
      }
      current.next = node;
    }
    this.size++;
  }

  // Delete by value — O(n) search + O(1) removal
  delete(value) {
    if (!this.head) return;
    if (this.head.value === value) {
      this.head = this.head.next;  // skip the head
      this.size--;
      return;
    }
    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }
    if (current.next) {
      current.next = current.next.next;  // skip the target node
      this.size--;
    }
  }
}`,
        language: "javascript"
      },
      {
        title: "Classic Linked List Interview Problems",
        content: `<p>These three problems appear in almost every interview. They teach you the <strong>fast/slow pointer</strong> technique.</p>`,
        code: `// 1. REVERSE a linked list — THE most common LL question
function reverse(head) {
  let prev = null;
  let current = head;
  while (current) {
    let next = current.next;  // save next
    current.next = prev;      // reverse the pointer
    prev = current;           // move prev forward
    current = next;           // move current forward
  }
  return prev;  // prev is the new head
}
// Before: 1 → 2 → 3 → null
// After:  null ← 1 ← 2 ← 3  (return 3)

// 2. DETECT CYCLE — fast/slow pointer (Floyd's algorithm)
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;         // moves 1 step
    fast = fast.next.next;    // moves 2 steps
    if (slow === fast) return true;  // they met = cycle!
  }
  return false;  // fast reached null = no cycle
}

// 3. FIND MIDDLE — fast/slow pointer again!
function findMiddle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;  // when fast reaches end, slow is at middle
}`,
        language: "javascript",
        diagram: `  Reverse step-by-step:

  prev=null  curr=1 → 2 → 3 → null
  prev=1     curr=2 → 3 → null       (1 now points to null)
  prev=2     curr=3 → null            (2 now points to 1)
  prev=3     curr=null                 (3 now points to 2)

  Result: 3 → 2 → 1 → null`,
        quiz: {
          question: "In the fast/slow pointer technique for cycle detection, why does the fast pointer move 2 steps?",
          options: [
            "It's arbitrary — any speed difference works",
            "If there's a cycle, fast will eventually lap slow and they'll meet",
            "Fast needs to reach the end first to check for null",
            "It makes the algorithm O(log n)"
          ],
          answer: 1
        }
      }
    ]
  },

  "w2t3": {
    takeaways: [
      "A stack is Last-In-First-Out (LIFO) -- push and pop from the top only, both O(1)",
      "The call stack tracks function calls; every return pops a frame off the stack",
      "Whenever you see matching or nesting (parentheses, HTML tags), think stack",
      "In JavaScript, just use a plain array with push() and pop() as your stack"
    ],
    sections: [
      {
        title: "Stacks — Last In, First Out",
        content: `<p>A stack is like a stack of plates: you can only add (push) or remove (pop) from the <strong>top</strong>. The last plate you put on is the first one you take off — <strong>LIFO</strong>.</p>
<h3>Where Stacks Show Up</h3>
<ul>
<li><strong>The Call Stack</strong>: When function A calls function B, B goes on top. When B returns, it's popped off and we return to A.</li>
<li><strong>Undo/Redo</strong>: Each action is pushed. Undo = pop the last action.</li>
<li><strong>Browser history</strong>: Back button = pop the last page.</li>
<li><strong>Parentheses matching</strong>: Classic interview problem!</li>
</ul>`,
        code: `// A stack is just an array used in a specific way
class Stack {
  constructor() {
    this.items = [];
  }
  push(val) { this.items.push(val); }      // O(1)
  pop() { return this.items.pop(); }        // O(1)
  peek() { return this.items[this.items.length - 1]; } // O(1)
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}

// In practice, just use an array as a stack:
const stack = [];
stack.push(1);  // [1]
stack.push(2);  // [1, 2]
stack.push(3);  // [1, 2, 3]
stack.pop();    // returns 3, stack is [1, 2]
stack.pop();    // returns 2, stack is [1]`,
        language: "javascript",
        diagram: `  push(A)  push(B)  push(C)  pop()   pop()

  ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐
  │   │   │   │   │ C │   │   │   │   │
  │   │   │ B │   │ B │   │ B │   │   │
  │ A │   │ A │   │ A │   │ A │   │ A │
  └───┘   └───┘   └───┘   └───┘   └───┘
                           → C      → B`
      },
      {
        title: "Solving Problems with Stacks",
        content: `<p>The classic stack problem is <strong>Valid Parentheses</strong>. But stacks are also used for evaluating expressions, tracking min/max, and monotonic stack patterns.</p>`,
        code: `// Classic: Valid Parentheses — already in your practice problems!
// Here's another great one:

// Min Stack — support getMin() in O(1) time
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];  // tracks the minimum at each level
  }

  push(val) {
    this.stack.push(val);
    // Push new minimum (or repeat current min)
    const currentMin = this.minStack.length === 0
      ? val
      : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(currentMin);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];  // O(1)!
  }
}

// Example: push 5, 3, 7, 2
// stack:    [5, 3, 7, 2]
// minStack: [5, 3, 3, 2]  ← tracks min at each point
// getMin() → 2
// pop() → removes 2, minStack becomes [5, 3, 3], getMin() → 3`,
        language: "javascript"
      }
    ]
  },

  "w2t4": {
    takeaways: [
      "A queue is First-In-First-Out (FIFO) -- add to the back, remove from the front",
      "Queues power Breadth-First Search (BFS), which explores level by level",
      "Use a stack for undo (most recent first); use a queue for task processing (oldest first)",
      "Array shift() is O(n) -- for performance-critical queues, use a linked list instead"
    ],
    sections: [
      {
        title: "Queues — First In, First Out",
        content: `<p>A queue is like a line at a coffee shop: first person in line gets served first — <strong>FIFO</strong>. In programming, queues are used for BFS (graph traversal), task scheduling, and message processing.</p>`,
        code: `// Simple queue using an array
// (Note: shift() is O(n) for arrays — for production use a linked list)
class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(val) { this.items.push(val); }       // add to back
  dequeue() { return this.items.shift(); }      // remove from front
  peek() { return this.items[0]; }
  isEmpty() { return this.items.length === 0; }
}

const q = new Queue();
q.enqueue("A");  // [A]
q.enqueue("B");  // [A, B]
q.enqueue("C");  // [A, B, C]
q.dequeue();     // returns "A", queue is [B, C]
q.dequeue();     // returns "B", queue is [C]`,
        language: "javascript",
        diagram: `  enqueue adds to BACK, dequeue removes from FRONT

  enqueue(A): [A]
  enqueue(B): [A, B]
  enqueue(C): [A, B, C]
  dequeue():  [B, C]     → returns A
  dequeue():  [C]         → returns B

  FRONT ← ← ← ← ← BACK
  (out)              (in)`
      },
      {
        title: "Queues in Action — BFS Preview",
        content: `<p>The most important use of queues is <strong>Breadth-First Search</strong> — exploring level by level. You'll learn BFS fully in Week 4, but here's a preview showing why queues matter.</p>`,
        code: `// Process tasks in order (like a printer queue)
function processJobs(jobs) {
  const queue = [...jobs];
  while (queue.length > 0) {
    const job = queue.shift();      // take next job
    console.log(\`Processing: \${job}\`);
    // If job creates sub-jobs, they go to the BACK of the line
  }
}

// BFS on a tree (level-order traversal)
// We'll cover this fully in Week 4, but the key idea:
// Queue ensures we visit all nodes at depth 1 before depth 2,
// all at depth 2 before depth 3, etc.

// Deque (Double-Ended Queue) — can add/remove from both ends
// JavaScript doesn't have a built-in deque, but you can
// simulate with an array (unshift/push and shift/pop)
// Used for: sliding window maximum, palindrome checking`,
        language: "javascript",
        quiz: {
          question: "Which data structure would you use to implement an 'undo' feature?",
          options: ["Queue — undo the first action first", "Stack — undo the most recent action first", "Array — access any action by index", "Linked List — efficient insertion"],
          answer: 1
        }
      }
    ]
  },

  "w2t5": {
    takeaways: [
      "Hash tables give O(1) average lookup, insert, and delete -- the most versatile data structure",
      "A hash function converts a key into an array index; collisions are handled by chaining",
      "Use Map for key-value pairs and Set for unique membership checks",
      "When a problem says 'find', 'count', or 'group', a hash map is almost always the answer",
      "Two Sum is solved in O(n) with a hash map by looking up each element's complement"
    ],
    sections: [
      {
        title: "Hash Tables — The Most Important Data Structure",
        content: `<p>If you only master ONE data structure, make it hash tables. They give you <strong>O(1) average lookup, insert, and delete</strong>. In SQL, you know this as an <strong>INDEX</strong> — hash tables are the in-memory equivalent.</p>
<h3>How They Work</h3>
<p>A hash table uses a <strong>hash function</strong> to convert a key into an array index. Instead of searching through all items, you compute exactly where to look.</p>`,
        code: `// JavaScript has two hash table types:
// 1. Objects {} — keys must be strings
// 2. Map — keys can be anything (preferred)

// Using an Object
const ages = {};
ages["Athena"] = 20;    // hash("Athena") → index 7 → store 20
ages["Bob"] = 25;       // hash("Bob") → index 3 → store 25
console.log(ages["Athena"]); // O(1) lookup → 20

// Using a Map (better)
const map = new Map();
map.set("Athena", 20);
map.set("Bob", 25);
map.get("Athena");      // 20
map.has("Bob");          // true
map.delete("Bob");
map.size;                // 1

// Set — like a hash table with only keys (no values)
// Perfect for "have I seen this before?" checks
const seen = new Set();
seen.add(5);
seen.add(3);
seen.add(5);  // duplicate — ignored!
seen.has(5);  // true — O(1)
seen.size;    // 2`,
        language: "javascript",
        diagram: `  Hash Function converts key → index:

  hash("Athena") → 7
  hash("Bob")    → 3
  hash("Charlie")→ 7  ← COLLISION! Same index!

  Array:  [_, _, _, Bob:25, _, _, _, Athena:20, _, _]
           0  1  2    3    4  5  6      7      8  9

  Collision resolution (chaining):
  Index 7: Athena:20 → Charlie:30  (linked list at that slot)`
      },
      {
        title: "Solving Problems with Hash Maps",
        content: `<p>Hash maps are the answer to most "find/count/group" problems. Here's the pattern recognition:</p>
<ul>
<li>"Find if X exists" → Set or Map has()</li>
<li>"Count frequency of X" → Map with count values</li>
<li>"Find pairs that sum to X" → Map lookup for complement</li>
<li>"Group items by property" → Map with array values</li>
</ul>`,
        code: `// Pattern 1: Frequency Counter
function mostFrequent(arr) {
  const freq = new Map();
  for (const item of arr) {
    freq.set(item, (freq.get(item) || 0) + 1);
  }
  // SQL equivalent: SELECT item, COUNT(*) GROUP BY item

  let maxItem, maxCount = 0;
  for (const [item, count] of freq) {
    if (count > maxCount) {
      maxItem = item;
      maxCount = count;
    }
  }
  return maxItem;
}

// Pattern 2: Two Sum (uses hash map for O(1) complement lookup)
function twoSum(nums, target) {
  const seen = new Map();  // value → index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
}

// Pattern 3: Check for duplicates (one line!)
function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}
// SQL: SELECT COUNT(*) != COUNT(DISTINCT col) FROM table`,
        language: "javascript",
        quiz: {
          question: "What's the average time complexity of looking up a key in a hash map?",
          options: ["O(n) — must check all entries", "O(log n) — binary search", "O(1) — hash function goes directly to the slot", "O(n²) — checking all pairs"],
          answer: 2
        }
      }
    ]
  },

  "w3t1": {
    takeaways: [
      "Big O describes how performance scales with input size, not exact speed",
      "O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) -- memorize this ranking",
      "Nested loops over the same data usually mean O(n^2); a hash map can often reduce it to O(n)",
      "Space complexity measures extra memory used beyond the input itself",
      "When adding complexities, only the largest term matters: O(n) + O(n log n) = O(n log n)"
    ],
    sections: [
      {
        title: "Big O — The Language of Efficiency",
        content: `<p>Big O notation describes <strong>how your code's performance scales</strong> as input grows. It's the most important concept for interviews — you'll be asked about it in EVERY technical screen.</p>
<p>Think of it this way: if your SQL query runs fine on 100 rows but crashes on 1 million, that's a Big O problem. Big O tells you WHICH approach will still work at scale.</p>
<h3>The Common Complexities (memorize these)</h3>
<ul>
<li><strong>O(1)</strong> — Constant: doesn't matter if input is 10 or 10 million. Array access, hash map lookup.</li>
<li><strong>O(log n)</strong> — Logarithmic: halves the problem each step. Binary search. Very fast.</li>
<li><strong>O(n)</strong> — Linear: touch each element once. Single loop. Most operations.</li>
<li><strong>O(n log n)</strong> — Linearithmic: efficient sorting (merge sort, quick sort). The "speed limit" for comparison-based sorting.</li>
<li><strong>O(n²)</strong> — Quadratic: nested loops. Brute force solutions. Gets slow fast.</li>
<li><strong>O(2ⁿ)</strong> — Exponential: doubles with each new element. Recursive brute force. Unusable for large inputs.</li>
</ul>`,
        diagram: `  n=10     n=100    n=1000    n=1,000,000
  O(1)      1        1         1           1
  O(log n)  3        7        10          20
  O(n)     10      100     1,000   1,000,000
  O(n log n) 30     700    10,000  20,000,000
  O(n²)   100   10,000 1,000,000  1,000,000,000,000
  O(2ⁿ)  1024   WAY TOO BIG — universe heat death

  Notice: O(n²) already struggles at n=1,000,000
  This is why interviewers want you to optimize!`
      },
      {
        title: "How to Analyze Code Complexity",
        content: `<p>Here's the systematic approach. Practice this until it's automatic.</p>`,
        code: `// O(1) — constant
function getFirst(arr) {
  return arr[0];  // one operation, regardless of array size
}

// O(n) — linear (single loop)
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {  // n iterations
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// O(n²) — quadratic (nested loops over same data)
function hasDuplicatePairs(arr) {
  for (let i = 0; i < arr.length; i++) {        // n
    for (let j = i + 1; j < arr.length; j++) {  // n
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

// O(n log n) — sorting
function sortedUnique(arr) {
  arr.sort((a, b) => a - b);  // O(n log n) — dominates
  return [...new Set(arr)];    // O(n) — doesn't change overall
}
// Rule: when adding complexities, keep the LARGEST term
// O(n log n) + O(n) = O(n log n)

// O(log n) — halving each step
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;  // eliminate half
    else right = mid - 1;                    // eliminate half
  }
  return -1;
}`,
        language: "javascript",
        pitfall: "Common mistake: thinking nested loops are always O(n²). If the inner loop runs a FIXED number of times (not dependent on n), it's still O(n). Example: <code>for each row: check 4 neighbors</code> is O(n), not O(4n)."
      },
      {
        title: "Space Complexity",
        content: `<p>Time complexity measures speed. Space complexity measures <strong>how much extra memory</strong> your solution uses (beyond the input).</p>`,
        code: `// O(1) space — uses a fixed number of variables
function findMax(arr) {
  let max = arr[0];  // just one extra variable
  for (let num of arr) {
    if (num > max) max = num;
  }
  return max;
}

// O(n) space — creates a new data structure proportional to input
function removeDuplicates(arr) {
  const seen = new Set();  // could grow up to n elements
  const result = [];       // could grow up to n elements
  for (let num of arr) {
    if (!seen.has(num)) {
      seen.add(num);
      result.push(num);
    }
  }
  return result;
}

// Trade-off: Two Sum
// O(n²) time, O(1) space — brute force (two nested loops)
// O(n) time, O(n) space — hash map (faster but uses more memory)
// Usually: optimize for TIME and accept the space cost.`,
        language: "javascript",
        quiz: {
          question: "You have an O(n²) solution. Your interviewer asks you to optimize. What complexity should you aim for?",
          options: ["O(n) — usually achievable with a hash map", "O(1) — the best possible", "O(n³) — just need something different", "O(n log n) — the best that's possible for any problem"],
          answer: 0
        }
      }
    ]
  },

  "w3t2": {
    takeaways: [
      "Binary search eliminates half the data each step, giving O(log n) -- about 20 steps for a million items",
      "Binary search only works on sorted data -- always confirm the input is sorted first",
      "The 'find first occurrence' variation keeps searching left even after finding a match",
      "Database indexes use a similar principle (B-trees) to avoid scanning every row"
    ],
    sections: [
      {
        title: "Binary Search — The Power of Halving",
        content: `<p>Binary search is beautifully simple: if data is sorted, you can eliminate HALF the remaining elements each step. Instead of checking 1 million items one by one (O(n)), you find the answer in ~20 steps (O(log n)).</p>
<p><strong>SQL analogy:</strong> When you have an INDEX on a column, the database uses something very similar to binary search (B-tree lookup) instead of scanning every row.</p>`,
        code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // Find the middle (avoid overflow with this formula)
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;           // Found it!
    } else if (arr[mid] < target) {
      left = mid + 1;       // Target is in right half
    } else {
      right = mid - 1;      // Target is in left half
    }
  }

  return -1;  // Not found
}

// Example: find 7 in [1, 3, 5, 7, 9, 11, 13]
// Step 1: mid=3 (value 7) — FOUND! Just 1 step.

// Example: find 11 in [1, 3, 5, 7, 9, 11, 13]
// Step 1: mid=3 (value 7) — 11 > 7, search right: [9, 11, 13]
// Step 2: mid=5 (value 11) — FOUND! 2 steps for 7 elements.`,
        language: "javascript",
        pitfall: "Binary search ONLY works on sorted data. If the array isn't sorted, you must sort it first (O(n log n)) or use a different approach. Always ask: 'Is the input sorted?' in interviews."
      },
      {
        title: "Binary Search Variations",
        content: `<p>The basic template is just the start. These variations appear constantly in interviews.</p>`,
        code: `// Variation 1: Find FIRST occurrence (leftmost)
function findFirst(arr, target) {
  let left = 0, right = arr.length - 1, result = -1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      result = mid;       // found one, but keep searching LEFT
      right = mid - 1;    // for an earlier occurrence
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}
// [1, 2, 2, 2, 3] target=2 → returns index 1 (first 2)

// Variation 2: Find insert position (where would target go?)
function searchInsert(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return left;  // left is where target should be inserted
}
// [1, 3, 5, 7] target=4 → returns 2 (between 3 and 5)`,
        language: "javascript",
        quiz: {
          question: "How many steps does binary search need for an array of 1,000,000 elements?",
          options: ["1,000,000 steps", "About 1,000 steps", "About 20 steps (log2 of 1,000,000)", "Always exactly 1 step"],
          answer: 2
        }
      }
    ]
  },

  "w3t3": {
    takeaways: [
      "O(n log n) is the fastest possible comparison-based sort -- you cannot beat it",
      "Merge sort splits, recursively sorts halves, then merges -- classic divide and conquer",
      "Bubble sort and insertion sort are O(n^2) -- know them conceptually but never use them at scale",
      "Insertion sort is actually fast on nearly-sorted data, which is why hybrid sorts use it"
    ],
    sections: [
      {
        title: "Sorting — Why You Need to Understand It",
        content: `<p>You'll rarely implement sorting from scratch in production (use the built-in <code>.sort()</code>). But understanding HOW sorting works teaches you divide-and-conquer, helps you analyze complexity, and is a common interview topic.</p>
<h3>The Simple Sorts — O(n²)</h3>
<p>These are easy to understand but slow for large inputs. Know them conceptually but don't use them.</p>`,
        code: `// Bubble Sort — swap adjacent elements repeatedly
// Like bubbles rising: largest values "bubble" to the end
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];  // swap
      }
    }
  }
  return arr;
}

// Insertion Sort — like sorting cards in your hand
// Pick each card and insert it in the right position
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];  // shift larger elements right
      j--;
    }
    arr[j + 1] = current;   // insert in correct position
  }
  return arr;
}
// Fun fact: insertion sort is actually FAST for nearly-sorted data!`,
        language: "javascript"
      },
      {
        title: "Merge Sort — Divide and Conquer",
        content: `<p>Merge sort is the first "real" sorting algorithm: O(n log n). It uses the <strong>divide and conquer</strong> strategy:</p>
<ol>
<li><strong>Divide</strong>: Split the array in half</li>
<li><strong>Conquer</strong>: Recursively sort each half</li>
<li><strong>Combine</strong>: Merge the two sorted halves</li>
</ol>`,
        code: `function mergeSort(arr) {
  // Base case: arrays of length 0 or 1 are already sorted
  if (arr.length <= 1) return arr;

  // Divide
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));    // sort left half
  const right = mergeSort(arr.slice(mid));       // sort right half

  // Merge the two sorted halves
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // Add remaining elements
  return [...result, ...left.slice(i), ...right.slice(j)];
}

// Time: O(n log n) — log n levels of splitting, n work per level
// Space: O(n) — creates new arrays at each step
// Stable: yes (equal elements keep their original order)`,
        language: "javascript",
        diagram: `  mergeSort([38, 27, 43, 3, 9, 82, 10])

  Split:  [38, 27, 43]        [3, 9, 82, 10]
  Split:  [38] [27, 43]       [3, 9] [82, 10]
  Split:  [38] [27] [43]      [3] [9] [82] [10]

  Merge:  [38] [27, 43]       [3, 9] [10, 82]
  Merge:  [27, 38, 43]        [3, 9, 10, 82]
  Merge:  [3, 9, 10, 27, 38, 43, 82]  ✓`
      }
    ]
  },

  "w3t4": {
    takeaways: [
      "Every recursive function needs a base case (when to stop) and a recursive case (smaller subproblem)",
      "Forgetting the base case causes infinite recursion and a stack overflow error",
      "Backtracking is recursion plus undo -- make a choice, explore, then reverse the choice",
      "Naive recursive Fibonacci is O(2^n) -- later you will fix it with dynamic programming"
    ],
    sections: [
      {
        title: "Recursion — Functions That Call Themselves",
        content: `<p>Recursion is when a function calls itself to solve a smaller version of the same problem. Think of it like Russian nesting dolls — each doll contains a smaller version of itself.</p>
<p><strong>SQL analogy:</strong> CTEs (WITH RECURSIVE) use the same concept — a query that references itself to build up results.</p>
<h3>The Two Essential Parts</h3>
<ul>
<li><strong>Base case</strong>: When to STOP recursing. Without this, you get infinite recursion (stack overflow).</li>
<li><strong>Recursive case</strong>: The function calls itself with a SMALLER input, getting closer to the base case.</li>
</ul>`,
        code: `// Classic: Factorial (n! = n × (n-1) × ... × 1)
function factorial(n) {
  if (n <= 1) return 1;        // base case
  return n * factorial(n - 1); // recursive case
}
// factorial(4) = 4 * factorial(3)
//              = 4 * 3 * factorial(2)
//              = 4 * 3 * 2 * factorial(1)
//              = 4 * 3 * 2 * 1 = 24

// Classic: Fibonacci
function fib(n) {
  if (n <= 1) return n;            // base cases: fib(0)=0, fib(1)=1
  return fib(n - 1) + fib(n - 2); // recursive case
}
// WARNING: This is O(2^n)! Very slow. We'll optimize with DP in Week 8.`,
        language: "javascript",
        pitfall: "Every recursive call adds a frame to the call stack. Too many recursive calls = Stack Overflow error. Always make sure your base case is reachable and your input gets SMALLER each call."
      },
      {
        title: "Backtracking — Explore, Choose, Undo",
        content: `<p>Backtracking is recursion with a twist: you make a choice, explore, and if it doesn't work, you <strong>undo the choice</strong> and try something else. It's like navigating a maze — if you hit a dead end, go back and try a different path.</p>`,
        code: `// Generate all permutations of [1, 2, 3]
function permutations(nums) {
  const result = [];

  function backtrack(current, remaining) {
    // Base case: used all numbers
    if (remaining.length === 0) {
      result.push([...current]);
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      // CHOOSE: pick remaining[i]
      current.push(remaining[i]);
      const newRemaining = [...remaining.slice(0, i), ...remaining.slice(i + 1)];

      // EXPLORE: recurse with remaining numbers
      backtrack(current, newRemaining);

      // UNDO: remove the choice (backtrack!)
      current.pop();
    }
  }

  backtrack([], nums);
  return result;
}
// permutations([1,2,3]) → [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`,
        language: "javascript",
        quiz: {
          question: "What happens if you forget the base case in recursion?",
          options: [
            "The function returns undefined",
            "The function runs forever until the call stack overflows",
            "JavaScript automatically stops after 1000 calls",
            "Nothing — base cases are optional"
          ],
          answer: 1
        }
      }
    ]
  },

  "w3t5": {
    takeaways: [
      "Two pointers on sorted data can replace O(n^2) brute force with a single O(n) pass",
      "Converging pointers start at both ends; same-direction pointers start together with one moving faster",
      "Sliding window tracks a moving subarray and updates incrementally instead of recalculating from scratch",
      "Use sliding window for contiguous subarray/substring problems; use two pointers for pair-finding on sorted data",
      "These techniques come up constantly in interviews -- recognize the pattern by problem shape"
    ],
    sections: [
      {
        title: "Two Pointers — The O(n²) Killer",
        content: `<p>Two pointers is a technique where you use two indices to traverse an array, often from both ends or at different speeds. It frequently turns O(n²) brute force solutions into O(n).</p>
<h3>Three Common Patterns:</h3>
<ul>
<li><strong>Converging</strong>: Start from both ends, move inward (e.g., Two Sum on sorted array)</li>
<li><strong>Same direction</strong>: Both start from left, one is faster (e.g., remove duplicates)</li>
<li><strong>Fast/slow</strong>: Different speeds (e.g., linked list cycle detection)</li>
</ul>`,
        code: `// Pattern 1: Converging — Two Sum on sorted array
function twoSumSorted(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;    // need bigger sum
    else right--;                // need smaller sum
  }
  return [-1, -1];
}
// O(n) instead of O(n²)!

// Pattern 2: Same direction — Remove duplicates in-place
function removeDuplicates(arr) {
  if (arr.length === 0) return 0;
  let slow = 0;  // points to last unique element
  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;
      arr[slow] = arr[fast];
    }
  }
  return slow + 1;  // length of unique portion
}
// [1,1,2,2,3] → slow walks to: [1,2,3,_,_], returns 3`,
        language: "javascript"
      },
      {
        title: "Sliding Window — Track a Moving Range",
        content: `<p>Sliding window maintains a "window" (subarray) that slides across the array. Instead of recalculating everything for each position (O(n²)), you update the window incrementally (O(n)).</p>`,
        code: `// Fixed-size window: maximum sum of k consecutive elements
function maxSumWindow(arr, k) {
  // Calculate first window
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  let maxSum = windowSum;

  // Slide the window: add one from right, remove one from left
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i];        // add new element
    windowSum -= arr[i - k];    // remove old element
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}

// Variable-size window: longest substring without repeating chars
function longestUnique(s) {
  const seen = new Set();
  let left = 0, maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    // Shrink window until no duplicate
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
        language: "javascript",
        diagram: `  Fixed window (k=3) on [1, 3, 2, 6, -1, 4, 1, 8, 2]:

  [1, 3, 2] 6, -1, 4, 1, 8, 2  → sum = 6
  1, [3, 2, 6] -1, 4, 1, 8, 2  → sum = 11  (add 6, remove 1)
  1, 3, [2, 6, -1] 4, 1, 8, 2  → sum = 7   (add -1, remove 3)
  ...and so on. Each slide is O(1), total O(n).`,
        quiz: {
          question: "When should you use sliding window vs two pointers?",
          options: [
            "They're the same thing",
            "Sliding window for contiguous subarrays/substrings; two pointers for pair-finding on sorted data",
            "Two pointers is always faster",
            "Sliding window only works on strings"
          ],
          answer: 1
        }
      }
    ]
  },

  "w4t1": {
    takeaways: [
      "A binary tree node has a value, a left child, and a right child -- at most two children",
      "Inorder traversal (left, root, right) gives sorted order on a binary search tree",
      "Preorder is root-first (good for copying); postorder is root-last (good for deleting)",
      "Level-order traversal uses a queue to visit nodes breadth-first, level by level",
      "Most tree problems are solved with recursion: solve for the current node, trust the recursive calls"
    ],
    sections: [
      {
        title: "Binary Trees — Your First Hierarchical Structure",
        content: `<p>Everything so far has been linear (arrays, linked lists, stacks, queues). Trees are <strong>hierarchical</strong> — like a family tree, file system, or the HTML DOM.</p>
<p>A binary tree is a tree where each node has <strong>at most 2 children</strong> (left and right).</p>`,
        code: `// A tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;   // left child
    this.right = null;  // right child
  }
}

// Build a tree manually
//        1
//       / \\
//      2   3
//     / \\
//    4   5
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);`,
        language: "javascript",
        diagram: `  Key terminology:

          1          ← root (top node, depth 0)
         / \\
        2   3        ← depth 1
       / \\
      4   5          ← leaves (no children), depth 2

  - Root: the top node (1)
  - Leaf: node with no children (3, 4, 5)
  - Height: longest path from root to leaf (2)
  - Parent of 4: node 2
  - Children of 2: nodes 4 and 5
  - Subtree: any node + all its descendants`
      },
      {
        title: "Tree Traversals — The Four Ways to Visit Every Node",
        content: `<p>Unlike arrays (just go left to right), trees can be visited in different orders. Each order has different uses.</p>`,
        code: `// 1. INORDER: Left → Root → Right
//    On a BST, this gives SORTED order!
function inorder(node) {
  if (!node) return;
  inorder(node.left);          // visit left subtree
  console.log(node.value);     // visit current node
  inorder(node.right);         // visit right subtree
}
// For our tree: 4, 2, 5, 1, 3

// 2. PREORDER: Root → Left → Right
//    Used to COPY or SERIALIZE a tree
function preorder(node) {
  if (!node) return;
  console.log(node.value);     // visit current FIRST
  preorder(node.left);
  preorder(node.right);
}
// For our tree: 1, 2, 4, 5, 3

// 3. POSTORDER: Left → Right → Root
//    Used to DELETE a tree (children before parent)
function postorder(node) {
  if (!node) return;
  postorder(node.left);
  postorder(node.right);
  console.log(node.value);     // visit current LAST
}
// For our tree: 4, 5, 2, 3, 1

// 4. LEVEL ORDER (BFS): Visit level by level using a QUEUE
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}
// For our tree: [1, 2, 3, 4, 5]`,
        language: "javascript"
      },
      {
        title: "Common Tree Interview Problems",
        content: `<p>Tree problems almost always use recursion. The pattern: solve for the current node assuming the recursive calls on children give correct results.</p>`,
        code: `// Max Depth of a tree
function maxDepth(node) {
  if (!node) return 0;
  return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
}
// "My depth = 1 + the deeper of my children's depths"

// Invert a tree (mirror image) — famous Google interview question
function invertTree(node) {
  if (!node) return null;
  // Swap left and right children
  [node.left, node.right] = [node.right, node.left];
  invertTree(node.left);
  invertTree(node.right);
  return node;
}

// Check if two trees are identical
function isSameTree(p, q) {
  if (!p && !q) return true;              // both null
  if (!p || !q) return false;             // one null
  return p.value === q.value              // same value
    && isSameTree(p.left, q.left)         // same left subtree
    && isSameTree(p.right, q.right);      // same right subtree
}`,
        language: "javascript",
        quiz: {
          question: "Which traversal visits nodes in sorted order on a Binary Search Tree?",
          options: ["Preorder (Root, Left, Right)", "Inorder (Left, Root, Right)", "Postorder (Left, Right, Root)", "Level order (BFS)"],
          answer: 1
        }
      }
    ]
  }
};