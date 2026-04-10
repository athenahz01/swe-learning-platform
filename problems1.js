const PROBLEMS_1 = [
  // ===== WEEK 1: Programming Foundations (7 problems) =====
  {
    id: "p17",
    title: "FizzBuzz",
    difficulty: "easy",
    topic: "Arrays",
    week: 1,
    description: `Given an integer <code>n</code>, return a string array <code>answer</code> (1-indexed) where:

- <code>answer[i] == "FizzBuzz"</code> if <code>i</code> is divisible by 3 and 5
- <code>answer[i] == "Fizz"</code> if <code>i</code> is divisible by 3
- <code>answer[i] == "Buzz"</code> if <code>i</code> is divisible by 5
- <code>answer[i] == i</code> (as a string) if none of the above apply

<strong>Example 1:</strong>
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]

<strong>Example 2:</strong>
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]`,
    starterJS: `function fizzBuzz(n) {\n  // Your code here\n\n}`,
    starterPY: `def fizz_buzz(n):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [3], expected: ["1","2","Fizz"] },
      { input: [5], expected: ["1","2","Fizz","4","Buzz"] },
      { input: [15], expected: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"] },
    ],
    solution: `// O(n) solution
function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(String(i));
  }
  return result;
}`,
    walkthrough: `<strong>Step 1: Understand the rules</strong>
We check each number from 1 to n. The trick is checking divisibility by 15 FIRST (both 3 and 5), because if you check 3 first, you'd print "Fizz" and miss the "FizzBuzz" case.

<strong>Step 2: Build the loop</strong>
For each i from 1 to n:
  1. If i % 15 === 0 (divisible by both) -> "FizzBuzz"
  2. Else if i % 3 === 0 -> "Fizz"
  3. Else if i % 5 === 0 -> "Buzz"
  4. Else -> convert i to string

<strong>Step 3: Why order matters</strong>
15 is checked first because it's a subset of both the 3 and 5 cases. This is like SQL WHERE clause ordering — more specific conditions first.

<strong>Complexity:</strong> O(n) time, O(n) space for the output array.`,
    hint: "Check divisibility by 15 first, then 3, then 5. Order matters!"
  },
  {
    id: "p18",
    title: "Reverse Integer",
    difficulty: "easy",
    topic: "Strings",
    week: 1,
    description: `Given a signed 32-bit integer <code>x</code>, return <code>x</code> with its digits reversed. If reversing <code>x</code> causes the value to go outside the signed 32-bit integer range <code>[-2^31, 2^31 - 1]</code>, return <code>0</code>.

<strong>Example 1:</strong>
Input: x = 123
Output: 321

<strong>Example 2:</strong>
Input: x = -456
Output: -654`,
    starterJS: `function reverseInteger(x) {\n  // Your code here\n\n}`,
    starterPY: `def reverse_integer(x):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [123], expected: 321 },
      { input: [-456], expected: -654 },
      { input: [120], expected: 21 },
      { input: [0], expected: 0 },
    ],
    solution: `// O(log n) solution — process digit by digit
function reverseInteger(x) {
  const sign = x < 0 ? -1 : 1;
  let num = Math.abs(x);
  let reversed = 0;
  while (num > 0) {
    reversed = reversed * 10 + (num % 10);
    num = Math.floor(num / 10);
  }
  reversed *= sign;
  // Check 32-bit overflow
  if (reversed > 2147483647 || reversed < -2147483648) return 0;
  return reversed;
}`,
    walkthrough: `<strong>Step 1: Handle the sign</strong>
Store the sign separately and work with the absolute value. This avoids messy negative modulo behavior.

<strong>Step 2: Extract digits from right to left</strong>
Use modulo 10 to get the last digit, then integer-divide by 10 to remove it:
  123 % 10 = 3, then 123 / 10 = 12
  12 % 10 = 2, then 12 / 10 = 1
  1 % 10 = 1, then 1 / 10 = 0 (done)

<strong>Step 3: Build reversed number</strong>
Multiply running result by 10 and add the new digit: 0 -> 3 -> 32 -> 321

<strong>Step 4: Overflow check</strong>
32-bit signed integers range from -2,147,483,648 to 2,147,483,647. If the result exceeds this, return 0.

<strong>Complexity:</strong> O(log n) time (number of digits), O(1) space.`,
    hint: "Use modulo 10 to extract the last digit, and integer division by 10 to remove it. Build the reversed number by multiplying by 10 each time."
  },
  {
    id: "p19",
    title: "Count Vowels",
    difficulty: "easy",
    topic: "Strings",
    week: 1,
    description: `Given a string <code>s</code>, return the number of vowels (a, e, i, o, u) in the string. Count both uppercase and lowercase vowels.

<strong>Example 1:</strong>
Input: s = "hello world"
Output: 3

<strong>Example 2:</strong>
Input: s = "AEIOU"
Output: 5`,
    starterJS: `function countVowels(s) {\n  // Your code here\n\n}`,
    starterPY: `def count_vowels(s):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: ["hello world"], expected: 3 },
      { input: ["AEIOU"], expected: 5 },
      { input: ["bcdfg"], expected: 0 },
      { input: ["Programming"], expected: 3 },
    ],
    solution: `// O(n) solution using a Set for O(1) lookup
function countVowels(s) {
  const vowels = new Set(['a','e','i','o','u']);
  let count = 0;
  for (const char of s.toLowerCase()) {
    if (vowels.has(char)) count++;
  }
  return count;
}`,
    walkthrough: `<strong>Step 1: Choose your lookup structure</strong>
We need to check each character against 5 vowels. Using a Set gives O(1) lookup per character, vs. scanning a string/array which is O(5) but still constant.

<strong>Step 2: Normalize case</strong>
Convert to lowercase once so we only need to check lowercase vowels. This is simpler than checking both cases.

<strong>Step 3: Walk and count</strong>
Iterate through each character. If it's in the vowel set, increment the counter.

<strong>SQL analogy:</strong> This is like SELECT COUNT(*) FROM characters WHERE char IN ('a','e','i','o','u'). The Set acts like the IN clause — an efficient membership test.

<strong>Complexity:</strong> O(n) time, O(1) space (the vowel set is fixed size).`,
    hint: "Use a Set of vowels for fast lookup. Convert each character to lowercase before checking."
  },
  {
    id: "p20",
    title: "Array Chunking",
    difficulty: "medium",
    topic: "Arrays",
    week: 1,
    description: `Given an array and a chunk size <code>n</code>, divide the array into subarrays where each subarray has length <code>n</code>. The last chunk may be shorter if there aren't enough elements.

<strong>Example 1:</strong>
Input: arr = [1, 2, 3, 4, 5], n = 2
Output: [[1, 2], [3, 4], [5]]

<strong>Example 2:</strong>
Input: arr = [1, 2, 3, 4, 5, 6, 7, 8], n = 3
Output: [[1, 2, 3], [4, 5, 6], [7, 8]]`,
    starterJS: `function chunkArray(arr, n) {\n  // Your code here\n\n}`,
    starterPY: `def chunk_array(arr, n):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[1, 2, 3, 4, 5], 2], expected: [[1, 2], [3, 4], [5]] },
      { input: [[1, 2, 3, 4, 5, 6, 7, 8], 3], expected: [[1, 2, 3], [4, 5, 6], [7, 8]] },
      { input: [[1, 2, 3], 1], expected: [[1], [2], [3]] },
      { input: [[1, 2, 3], 5], expected: [[1, 2, 3]] },
    ],
    solution: `// O(n) solution using slice
function chunkArray(arr, n) {
  const result = [];
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n));
  }
  return result;
}`,
    walkthrough: `<strong>Step 1: Understand the pattern</strong>
We need to take every n elements as a group. The key insight is stepping through the array by n instead of by 1.

<strong>Step 2: Use slice</strong>
<code>arr.slice(start, end)</code> gives us a subarray from start up to (but not including) end. If end exceeds the array length, it just returns what's available — perfect for the last chunk.

<strong>Step 3: Walk with step size n</strong>
Loop from 0 to arr.length, incrementing by n each time:
  i=0: slice(0, 2) -> [1, 2]
  i=2: slice(2, 4) -> [3, 4]
  i=4: slice(4, 6) -> [5] (only one element left)

<strong>SQL analogy:</strong> This is like pagination! SELECT * FROM data LIMIT n OFFSET i — you're fetching n records at a time starting from different offsets.

<strong>Complexity:</strong> O(n) time, O(n) space for the result.`,
    hint: "Use a for loop with step size n, and Array.slice(i, i + n) to extract each chunk."
  },
  {
    id: "p21",
    title: "Flatten Nested Array",
    difficulty: "medium",
    topic: "Arrays",
    week: 1,
    description: `Given a nested array, flatten it by one level. Only flatten one level deep — if there are deeper nested arrays, leave them as-is.

<strong>Example 1:</strong>
Input: arr = [[1, 2], [3, 4], [5]]
Output: [1, 2, 3, 4, 5]

<strong>Example 2:</strong>
Input: arr = [[1, [2, 3]], [4], 5]
Output: [1, [2, 3], 4, 5]`,
    starterJS: `function flattenOneLevel(arr) {\n  // Your code here\n\n}`,
    starterPY: `def flatten_one_level(arr):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[[1, 2], [3, 4], [5]]], expected: [1, 2, 3, 4, 5] },
      { input: [[[1, [2, 3]], [4], 5]], expected: [1, [2, 3], 4, 5] },
      { input: [[[1], [2], [3]]], expected: [1, 2, 3] },
      { input: [[1, 2, 3]], expected: [1, 2, 3] },
    ],
    solution: `// O(n) solution using concat spread
function flattenOneLevel(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...item);
    } else {
      result.push(item);
    }
  }
  return result;
}`,
    walkthrough: `<strong>Step 1: Identify the task</strong>
We only flatten ONE level. If an element is an array, we spread its contents into our result. If it's not an array, we just push it directly.

<strong>Step 2: Check each element</strong>
Use Array.isArray() to determine if an item is an array:
  - Array -> spread its elements into result
  - Non-array -> push it directly

<strong>Step 3: Why only one level?</strong>
[1, [2, 3]] is an array, so we spread it: push(1), push([2,3]). But [2,3] inside is NOT re-checked — we only iterate the top level.

<strong>Alternative:</strong> You could also use <code>[].concat(...arr)</code> for a one-liner, but understanding the manual approach teaches you the pattern for deeper flattening.

<strong>Complexity:</strong> O(n) time where n is total elements at the first level, O(n) space for result.`,
    hint: "Loop through each element. If it's an array (use Array.isArray), spread its contents into the result. Otherwise push it directly."
  },
  {
    id: "p22",
    title: "Call Counter (Grouping Calls)",
    difficulty: "medium",
    topic: "Arrays",
    week: 1,
    description: `Given an array of timestamps (integers representing milliseconds) when a function was called, and a window size <code>w</code> in milliseconds, group the calls into windows. Return an array of counts representing how many calls fell into each window.

Windows start at the minimum timestamp and each window covers <code>w</code> milliseconds. A call at exactly the window boundary belongs to the new window.

<strong>Example 1:</strong>
Input: timestamps = [100, 200, 300, 1100, 1200, 2500], w = 1000
Output: [3, 2, 1]
Explanation: Window [100,1100): 100,200,300 = 3 calls. Window [1100,2100): 1100,1200 = 2 calls. Window [2100,3100): 2500 = 1 call.

<strong>Example 2:</strong>
Input: timestamps = [0, 500, 1000, 1500], w = 1000
Output: [2, 2]`,
    starterJS: `function countCalls(timestamps, w) {\n  // Your code here\n\n}`,
    starterPY: `def count_calls(timestamps, w):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[100, 200, 300, 1100, 1200, 2500], 1000], expected: [3, 2, 1] },
      { input: [[0, 500, 1000, 1500], 1000], expected: [2, 2] },
      { input: [[5, 10, 15], 100], expected: [3] },
    ],
    solution: `// O(n) solution
function countCalls(timestamps, w) {
  if (timestamps.length === 0) return [];
  const start = timestamps[0];
  const result = [];
  let count = 0;
  let windowEnd = start + w;
  for (const t of timestamps) {
    while (t >= windowEnd) {
      result.push(count);
      count = 0;
      windowEnd += w;
    }
    count++;
  }
  result.push(count);
  return result;
}`,
    walkthrough: `<strong>Step 1: Understand the windows</strong>
Starting from the first timestamp, divide the timeline into windows of size w. Count how many timestamps fall into each window.

<strong>Step 2: Single-pass approach</strong>
Since timestamps are sorted, we can process them in order. Maintain a window boundary — when a timestamp exceeds the current window, finalize the count and move to the next window.

<strong>Step 3: Handle empty windows</strong>
If a timestamp jumps past multiple windows, the while loop pushes 0-count windows as needed before landing in the correct window.

<strong>SQL analogy:</strong> This is like GROUP BY with a time bucket: SELECT FLOOR((ts - min_ts) / w) AS bucket, COUNT(*) FROM events GROUP BY bucket. We're bucketing events by time windows.

<strong>Complexity:</strong> O(n) time, O(n/w) space for the output.`,
    hint: "Keep a running window boundary. When a timestamp exceeds the boundary, push the current count and advance the boundary."
  },
  {
    id: "p23",
    title: "Capitalize First Letter",
    difficulty: "easy",
    topic: "Strings",
    week: 1,
    description: `Given a string, capitalize the first letter of each word. A word is defined as a sequence of non-space characters.

<strong>Example 1:</strong>
Input: s = "hello world"
Output: "Hello World"

<strong>Example 2:</strong>
Input: s = "the quick brown fox"
Output: "The Quick Brown Fox"`,
    starterJS: `function capitalizeWords(s) {\n  // Your code here\n\n}`,
    starterPY: `def capitalize_words(s):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: ["hello world"], expected: "Hello World" },
      { input: ["the quick brown fox"], expected: "The Quick Brown Fox" },
      { input: ["a"], expected: "A" },
      { input: ["already Capitalized"], expected: "Already Capitalized" },
    ],
    solution: `// O(n) solution
function capitalizeWords(s) {
  return s.split(' ').map(word => {
    if (word.length === 0) return word;
    return word[0].toUpperCase() + word.slice(1);
  }).join(' ');
}`,
    walkthrough: `<strong>Step 1: Break into words</strong>
Split the string on spaces to get an array of words.

<strong>Step 2: Transform each word</strong>
For each word, take the first character and uppercase it, then concatenate the rest of the word unchanged.

<strong>Step 3: Rejoin</strong>
Join the words back together with spaces.

<strong>Key insight:</strong> <code>word[0].toUpperCase() + word.slice(1)</code> is a common pattern. It leaves already-capitalized words unchanged since toUpperCase() on an uppercase letter is a no-op.

<strong>SQL analogy:</strong> This is like applying INITCAP() in SQL (available in PostgreSQL/Oracle) — it capitalizes the first letter of each word in a string.

<strong>Complexity:</strong> O(n) time, O(n) space for the new string.`,
    hint: "Split on spaces, uppercase the first character of each word, then join back."
  },

  // ===== WEEK 2: Data Structures (7 problems) =====
  {
    id: "p24",
    title: "Remove Duplicates from Sorted Array",
    difficulty: "easy",
    topic: "Arrays",
    week: 2,
    description: `Given a sorted array <code>nums</code>, remove the duplicates <strong>in-place</strong> such that each element appears only once. Return the new length.

Do not allocate extra space — modify the input array in-place with O(1) extra memory. The elements beyond the new length don't matter.

<strong>Example 1:</strong>
Input: nums = [1, 1, 2]
Output: 2 (nums becomes [1, 2, ...])

<strong>Example 2:</strong>
Input: nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
Output: 5 (nums becomes [0, 1, 2, 3, 4, ...])`,
    starterJS: `function removeDuplicates(nums) {\n  // Your code here\n\n}`,
    starterPY: `def remove_duplicates(nums):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[1, 1, 2]], expected: 2 },
      { input: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expected: 5 },
      { input: [[1, 2, 3]], expected: 3 },
      { input: [[1]], expected: 1 },
    ],
    solution: `// O(n) two-pointer solution
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let slow = 0;
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  return slow + 1;
}`,
    walkthrough: `<strong>Step 1: The two-pointer technique</strong>
Use a "slow" pointer that marks the position of the last unique element, and a "fast" pointer that scans ahead.

<strong>Step 2: Walk through it</strong>
[0, 0, 1, 1, 2]: slow=0, fast scans forward.
  fast=1: nums[1]=0 == nums[0]=0, skip
  fast=2: nums[2]=1 != nums[0]=0, slow=1, nums[1]=1
  fast=3: nums[3]=1 == nums[1]=1, skip
  fast=4: nums[4]=2 != nums[1]=1, slow=2, nums[2]=2
Result: [0, 1, 2, ...], length = slow+1 = 3

<strong>Step 3: Why this works</strong>
Since the array is sorted, duplicates are adjacent. The slow pointer only advances when we find a NEW value, effectively compacting unique values to the front.

<strong>SQL analogy:</strong> This is like SELECT DISTINCT on a sorted column — we skip over repeated values and keep only the first occurrence.

<strong>Complexity:</strong> O(n) time, O(1) space — true in-place.`,
    hint: "Use two pointers — a slow one for the write position and a fast one to scan. Since the array is sorted, duplicates are always adjacent."
  },
  {
    id: "p25",
    title: "Stack with Max",
    difficulty: "easy",
    topic: "Stacks",
    week: 2,
    description: `Design a stack that supports push, pop, top, and retrieving the maximum element in constant time.

Implement the <code>MaxStack</code> class:
- <code>push(val)</code> — pushes the element onto the stack
- <code>pop()</code> — removes and returns the element on top of the stack
- <code>top()</code> — returns the top element without removing it
- <code>getMax()</code> — retrieves the maximum element in the stack

For this problem, implement a function that takes an array of operations and returns an array of results for top, pop, and getMax operations.

<strong>Example 1:</strong>
Input: ops = [["push",5],["push",1],["push",7],["getMax"],["pop"],["getMax"],["top"]]
Output: [null,null,null,7,7,5,1]

<strong>Example 2:</strong>
Input: ops = [["push",3],["push",3],["getMax"],["pop"],["getMax"]]
Output: [null,null,3,3,3]`,
    starterJS: `function maxStackOps(ops) {\n  // Your code here\n  // Process each operation and return array of results\n  // push returns null, pop returns the popped value\n  // top returns top value, getMax returns max value\n\n}`,
    starterPY: `def max_stack_ops(ops):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[["push",5],["push",1],["push",7],["getMax"],["pop"],["getMax"],["top"]]], expected: [null,null,null,7,7,5,1] },
      { input: [[["push",3],["push",3],["getMax"],["pop"],["getMax"]]], expected: [null,null,3,3,3] },
      { input: [[["push",10],["push",20],["top"],["getMax"],["pop"],["getMax"]]], expected: [null,null,20,20,20,10] },
    ],
    solution: `// O(1) per operation using auxiliary max stack
function maxStackOps(ops) {
  const stack = [];
  const maxStack = []; // tracks max at each level
  const results = [];
  for (const op of ops) {
    const cmd = op[0];
    if (cmd === "push") {
      const val = op[1];
      stack.push(val);
      const currentMax = maxStack.length === 0 ? val : Math.max(val, maxStack[maxStack.length - 1]);
      maxStack.push(currentMax);
      results.push(null);
    } else if (cmd === "pop") {
      results.push(stack.pop());
      maxStack.pop();
    } else if (cmd === "top") {
      results.push(stack[stack.length - 1]);
    } else if (cmd === "getMax") {
      results.push(maxStack[maxStack.length - 1]);
    }
  }
  return results;
}`,
    walkthrough: `<strong>Step 1: The key insight</strong>
Maintain a parallel "max stack" where each entry stores the max value at that depth. When we push 5 then 1, the max stack is [5, 5]. When we push 7, it becomes [5, 5, 7].

<strong>Step 2: Push operation</strong>
When pushing a value, compare it with the current max (top of maxStack). Push the larger one onto maxStack.

<strong>Step 3: Pop operation</strong>
Pop from both stacks. The max stack automatically adjusts — the new top reflects the max of the remaining elements.

<strong>Step 4: Why this works</strong>
At every depth level, maxStack tells us the maximum of all elements from bottom to that level. It's like maintaining a running MAX() as you scan.

<strong>SQL analogy:</strong> Think of maxStack as a window function: MAX(val) OVER (ORDER BY insert_order ROWS UNBOUNDED PRECEDING). Each level stores the cumulative max.

<strong>Complexity:</strong> O(1) for every operation. O(n) extra space for the max stack.`,
    hint: "Maintain a second stack that tracks the running maximum. Each entry in the max stack stores the max of all elements at or below that position."
  },
  {
    id: "p26",
    title: "Min Stack",
    difficulty: "medium",
    topic: "Stacks",
    week: 2,
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement via an array of operations:
- <code>push(val)</code> — pushes the element (returns null)
- <code>pop()</code> — removes and returns the top element
- <code>top()</code> — returns the top element
- <code>getMin()</code> — retrieves the minimum element

<strong>Example 1:</strong>
Input: ops = [["push",-2],["push",0],["push",-3],["getMin"],["pop"],["top"],["getMin"]]
Output: [null,null,null,-3,-3,0,-2]

<strong>Example 2:</strong>
Input: ops = [["push",1],["push",2],["top"],["getMin"],["pop"],["getMin"]]
Output: [null,null,2,1,2,1]`,
    starterJS: `function minStackOps(ops) {\n  // Your code here\n\n}`,
    starterPY: `def min_stack_ops(ops):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[["push",-2],["push",0],["push",-3],["getMin"],["pop"],["top"],["getMin"]]], expected: [null,null,null,-3,-3,0,-2] },
      { input: [[["push",1],["push",2],["top"],["getMin"],["pop"],["getMin"]]], expected: [null,null,2,1,2,1] },
      { input: [[["push",5],["push",3],["push",7],["getMin"],["pop"],["pop"],["getMin"]]], expected: [null,null,null,3,7,3,5] },
    ],
    solution: `// O(1) per operation using auxiliary min stack
function minStackOps(ops) {
  const stack = [];
  const minStack = [];
  const results = [];
  for (const op of ops) {
    const cmd = op[0];
    if (cmd === "push") {
      const val = op[1];
      stack.push(val);
      const currentMin = minStack.length === 0 ? val : Math.min(val, minStack[minStack.length - 1]);
      minStack.push(currentMin);
      results.push(null);
    } else if (cmd === "pop") {
      results.push(stack.pop());
      minStack.pop();
    } else if (cmd === "top") {
      results.push(stack[stack.length - 1]);
    } else if (cmd === "getMin") {
      results.push(minStack[minStack.length - 1]);
    }
  }
  return results;
}`,
    walkthrough: `<strong>Step 1: Same pattern as Max Stack</strong>
This is the classic LeetCode "Min Stack" problem (#155). The trick is identical to Max Stack but tracking the minimum instead.

<strong>Step 2: The auxiliary stack approach</strong>
Maintain a parallel minStack. On each push, store the minimum of the new value and the previous minimum. On pop, pop both stacks.

<strong>Step 3: Trace through Example 1</strong>
push(-2): stack=[-2], minStack=[-2]
push(0):  stack=[-2,0], minStack=[-2,-2]
push(-3): stack=[-2,0,-3], minStack=[-2,-2,-3]
getMin(): return minStack top = -3
pop():    return -3, stack=[-2,0], minStack=[-2,-2]
top():    return 0
getMin(): return minStack top = -2

<strong>Complexity:</strong> O(1) for each operation. O(n) space for the auxiliary stack.`,
    hint: "Maintain a second stack tracking the running minimum. When you push, store min(new_value, current_min)."
  },
  {
    id: "p27",
    title: "Reverse Linked List",
    difficulty: "easy",
    topic: "Linked Lists",
    week: 2,
    description: `Given the head of a singly linked list represented as an array, return the reversed list as an array.

For example, the list 1 -> 2 -> 3 -> 4 -> 5 is represented as [1, 2, 3, 4, 5].

<strong>Example 1:</strong>
Input: head = [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]

<strong>Example 2:</strong>
Input: head = [1, 2]
Output: [2, 1]`,
    starterJS: `function reverseList(arr) {\n  // Implement iterative linked list reversal\n  // Treat the array as a linked list\n\n}`,
    starterPY: `def reverse_list(arr):\n    # Implement iterative linked list reversal\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
      { input: [[1, 2]], expected: [2, 1] },
      { input: [[1]], expected: [1] },
      { input: [[10, 20, 30]], expected: [30, 20, 10] },
    ],
    solution: `// O(n) iterative reversal simulating linked list pointers
function reverseList(arr) {
  // Simulate linked list reversal with three pointers
  let prev = null;
  let current = 0; // index acting as pointer
  const next = arr.map((_, i) => i + 1 < arr.length ? i + 1 : null);
  const vals = [...arr];

  let prevIdx = null;
  let currIdx = 0;
  while (currIdx !== null) {
    const nextIdx = next[currIdx];
    next[currIdx] = prevIdx;
    prevIdx = currIdx;
    currIdx = nextIdx;
  }

  // Traverse from new head (prevIdx) and collect values
  const result = [];
  let node = prevIdx;
  while (node !== null) {
    result.push(vals[node]);
    node = next[node];
  }
  return result;
}`,
    walkthrough: `<strong>Step 1: The three-pointer technique</strong>
Linked list reversal uses three pointers: prev, current, and next.
At each step: save next, point current backward to prev, advance prev and current.

<strong>Step 2: Trace through [1, 2, 3]</strong>
prev=null, curr=1
  next=2, 1.next=null, prev=1, curr=2
prev=1, curr=2
  next=3, 2.next=1, prev=2, curr=3
prev=2, curr=3
  next=null, 3.next=2, prev=3, curr=null
New head = prev = 3. List: 3 -> 2 -> 1

<strong>Step 3: Why iterative over recursive?</strong>
Iterative uses O(1) extra space. Recursive uses O(n) call stack space. For interviews, know both but iterative is preferred.

<strong>Key pattern:</strong> This "reverse the pointers" technique appears in many linked list problems. Master it!

<strong>Complexity:</strong> O(n) time, O(1) space (in a real linked list — our array simulation uses O(n)).`,
    hint: "Use three pointers: prev, current, next. At each node, save next, reverse the link to prev, then advance."
  },
  {
    id: "p28",
    title: "Detect Cycle in Linked List",
    difficulty: "medium",
    topic: "Linked Lists",
    week: 2,
    description: `Given an array where each element points to the next index (simulating a linked list), determine if there is a cycle. The value at each index is the next index to visit. A value of <code>-1</code> means the end of the list.

<strong>Example 1:</strong>
Input: nodes = [1, 2, 0]
Output: true
Explanation: 0 -> 1 -> 2 -> 0 (cycle!)

<strong>Example 2:</strong>
Input: nodes = [1, 2, -1]
Output: false
Explanation: 0 -> 1 -> 2 -> end (no cycle)`,
    starterJS: `function hasCycle(nodes) {\n  // Your code here\n\n}`,
    starterPY: `def has_cycle(nodes):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[1, 2, 0]], expected: true },
      { input: [[1, 2, -1]], expected: false },
      { input: [[1, 2, 3, 1]], expected: true },
      { input: [[-1]], expected: false },
      { input: [[1, -1]], expected: false },
    ],
    solution: `// O(n) Floyd's tortoise and hare algorithm
function hasCycle(nodes) {
  if (nodes.length === 0) return false;
  let slow = 0;
  let fast = 0;
  while (true) {
    // Move slow one step
    slow = nodes[slow];
    if (slow === -1) return false;
    // Move fast two steps
    fast = nodes[fast];
    if (fast === -1) return false;
    fast = nodes[fast];
    if (fast === -1) return false;
    // If they meet, there's a cycle
    if (slow === fast) return true;
  }
}`,
    walkthrough: `<strong>Step 1: Floyd's Cycle Detection (Tortoise and Hare)</strong>
Use two pointers: slow moves 1 step at a time, fast moves 2 steps. If there's a cycle, they MUST eventually meet. If there's no cycle, fast reaches the end.

<strong>Step 2: Why does this work?</strong>
Think of runners on a circular track. The faster runner laps the slower one. Once both are in the cycle, fast approaches slow by 1 step each iteration — they must collide.

<strong>Step 3: Trace through [1, 2, 0]</strong>
slow=0, fast=0
  slow -> nodes[0]=1, fast -> nodes[0]=1 -> nodes[1]=2
  slow=1, fast=2
  slow -> nodes[1]=2, fast -> nodes[2]=0 -> nodes[0]=1
  slow=2, fast=1
  slow -> nodes[2]=0, fast -> nodes[1]=2 -> nodes[2]=0
  slow=0, fast=0 -> MATCH! Cycle detected.

<strong>Key insight:</strong> This is O(1) space — no hash set needed. A classic constant-space trick.

<strong>Complexity:</strong> O(n) time, O(1) space.`,
    hint: "Use Floyd's algorithm: a slow pointer (1 step) and a fast pointer (2 steps). If they ever meet, there's a cycle."
  },
  {
    id: "p29",
    title: "First Unique Character",
    difficulty: "medium",
    topic: "Hash Maps",
    week: 2,
    description: `Given a string <code>s</code>, find the first non-repeating character and return its index. If it doesn't exist, return <code>-1</code>.

<strong>Example 1:</strong>
Input: s = "leetcode"
Output: 0
Explanation: 'l' only appears once and is the first such character.

<strong>Example 2:</strong>
Input: s = "aabb"
Output: -1
Explanation: Every character repeats.`,
    starterJS: `function firstUniqChar(s) {\n  // Your code here\n\n}`,
    starterPY: `def first_uniq_char(s):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: ["leetcode"], expected: 0 },
      { input: ["loveleetcode"], expected: 2 },
      { input: ["aabb"], expected: -1 },
      { input: ["z"], expected: 0 },
    ],
    solution: `// O(n) solution with hash map
function firstUniqChar(s) {
  const freq = {};
  // First pass: count frequencies
  for (const char of s) {
    freq[char] = (freq[char] || 0) + 1;
  }
  // Second pass: find first with count 1
  for (let i = 0; i < s.length; i++) {
    if (freq[s[i]] === 1) return i;
  }
  return -1;
}`,
    walkthrough: `<strong>Step 1: Two-pass strategy</strong>
Pass 1: Count the frequency of each character using a hash map.
Pass 2: Walk through the string again and return the first character with a count of 1.

<strong>Step 2: Why two passes?</strong>
We can't determine if a character is unique until we've seen the entire string. The first pass gathers all the data, and the second pass uses it.

<strong>Step 3: Trace "loveleetcode"</strong>
Frequencies: {l:1, o:2, v:1, e:4, t:1, c:1, d:1}
Scan: l(count=1) -- but wait, let me recount.
l:1, o:2, v:1, e:4, l... actually: l appears at index 0 and 10, so l:2.
Re-count: {l:2, o:2, v:1, e:4, t:1, c:1, d:1}
First char with count 1: v at index 2. Correct!

<strong>SQL analogy:</strong> This is like: SELECT char, MIN(position) FROM chars GROUP BY char HAVING COUNT(*) = 1 ORDER BY MIN(position) LIMIT 1.

<strong>Complexity:</strong> O(n) time, O(1) space (at most 26 lowercase letters).`,
    hint: "First pass: build a frequency map. Second pass: find the first character with frequency 1."
  },
  {
    id: "p30",
    title: "Queue Using Two Stacks",
    difficulty: "easy",
    topic: "Stacks",
    week: 2,
    description: `Implement a queue (FIFO) using only two stacks. Support these operations via an array of commands:
- <code>enqueue(val)</code> — add element to the back (returns null)
- <code>dequeue()</code> — remove and return the front element
- <code>peek()</code> — return the front element without removing

<strong>Example 1:</strong>
Input: ops = [["enqueue",1],["enqueue",2],["peek"],["dequeue"],["dequeue"]]
Output: [null,null,1,1,2]

<strong>Example 2:</strong>
Input: ops = [["enqueue",10],["enqueue",20],["dequeue"],["enqueue",30],["dequeue"],["dequeue"]]
Output: [null,null,10,null,20,30]`,
    starterJS: `function queueOps(ops) {\n  // Your code here\n  // Use two arrays as stacks (push/pop only)\n\n}`,
    starterPY: `def queue_ops(ops):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[["enqueue",1],["enqueue",2],["peek"],["dequeue"],["dequeue"]]], expected: [null,null,1,1,2] },
      { input: [[["enqueue",10],["enqueue",20],["dequeue"],["enqueue",30],["dequeue"],["dequeue"]]], expected: [null,null,10,null,20,30] },
      { input: [[["enqueue",5],["dequeue"],["enqueue",3],["peek"]]], expected: [null,5,null,3] },
    ],
    solution: `// Amortized O(1) per operation
function queueOps(ops) {
  const inStack = [];   // for enqueue
  const outStack = [];  // for dequeue/peek
  const results = [];

  function transfer() {
    if (outStack.length === 0) {
      while (inStack.length > 0) {
        outStack.push(inStack.pop());
      }
    }
  }

  for (const op of ops) {
    const cmd = op[0];
    if (cmd === "enqueue") {
      inStack.push(op[1]);
      results.push(null);
    } else if (cmd === "dequeue") {
      transfer();
      results.push(outStack.pop());
    } else if (cmd === "peek") {
      transfer();
      results.push(outStack[outStack.length - 1]);
    }
  }
  return results;
}`,
    walkthrough: `<strong>Step 1: The insight</strong>
A stack reverses order (LIFO). If you pour items from one stack into another, the order reverses again — giving you FIFO! Two reverses = original order.

<strong>Step 2: Two-stack design</strong>
- inStack: receives all enqueue operations
- outStack: serves all dequeue/peek operations
- When outStack is empty and we need to dequeue, pour all of inStack into outStack

<strong>Step 3: Trace through Example 2</strong>
enqueue(10): inStack=[10]
enqueue(20): inStack=[10,20]
dequeue(): outStack empty -> transfer -> outStack=[20,10]. Pop -> 10
enqueue(30): inStack=[30]
dequeue(): outStack=[20]. Pop -> 20
dequeue(): outStack empty -> transfer -> outStack=[30]. Pop -> 30

<strong>Step 4: Amortized O(1)</strong>
Each element is pushed and popped from each stack exactly once. So across n operations, total work is O(n), making each operation O(1) amortized.

<strong>Complexity:</strong> Amortized O(1) per operation, O(n) space total.`,
    hint: "Use an 'in' stack for pushes and an 'out' stack for pops. When the out stack is empty, transfer all elements from in to out."
  },

  // ===== WEEK 3: Algorithms (6 problems) =====
  {
    id: "p31",
    title: "Search Insert Position",
    difficulty: "easy",
    topic: "Arrays",
    week: 3,
    description: `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be inserted to keep the array sorted.

You must write an algorithm with <code>O(log n)</code> runtime complexity.

<strong>Example 1:</strong>
Input: nums = [1, 3, 5, 6], target = 5
Output: 2

<strong>Example 2:</strong>
Input: nums = [1, 3, 5, 6], target = 2
Output: 1
Explanation: 2 would be inserted at index 1 (between 1 and 3).`,
    starterJS: `function searchInsert(nums, target) {\n  // Your code here\n\n}`,
    starterPY: `def search_insert(nums, target):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[1, 3, 5, 6], 5], expected: 2 },
      { input: [[1, 3, 5, 6], 2], expected: 1 },
      { input: [[1, 3, 5, 6], 7], expected: 4 },
      { input: [[1, 3, 5, 6], 0], expected: 0 },
    ],
    solution: `// O(log n) binary search
function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return left;
}`,
    walkthrough: `<strong>Step 1: This is binary search with a twist</strong>
Standard binary search finds the target. Here, if the target isn't found, we need the insertion point — which is exactly where 'left' ends up.

<strong>Step 2: Why does 'left' give the insertion point?</strong>
When the loop ends (left > right), left points to the first element greater than target. That's exactly where target should be inserted.

<strong>Step 3: Trace [1,3,5,6], target=2</strong>
left=0, right=3, mid=1: nums[1]=3 > 2 -> right=0
left=0, right=0, mid=0: nums[0]=1 < 2 -> left=1
left=1, right=0: loop ends. Return left=1. Correct!

<strong>Step 4: This is the "lower bound" pattern</strong>
In C++, this is std::lower_bound. In Python, bisect_left. Knowing this pattern unlocks many binary search variations.

<strong>SQL analogy:</strong> It's like finding the rank: SELECT COUNT(*) FROM nums WHERE val < target. The count tells you the insertion position.

<strong>Complexity:</strong> O(log n) time, O(1) space.`,
    hint: "Use standard binary search. When the target isn't found, the left pointer naturally ends up at the correct insertion position."
  },
  {
    id: "p32",
    title: "Find Peak Element",
    difficulty: "medium",
    topic: "Arrays",
    week: 3,
    description: `A peak element is an element that is strictly greater than its neighbors. Given an integer array <code>nums</code>, find a peak element and return its index.

The array may contain multiple peaks — return the index of ANY peak. You may assume <code>nums[-1] = nums[n] = -Infinity</code> (elements outside the array are negative infinity).

You must write an algorithm with <code>O(log n)</code> time.

<strong>Example 1:</strong>
Input: nums = [1, 2, 3, 1]
Output: 2
Explanation: 3 is a peak (greater than neighbors 2 and 1).

<strong>Example 2:</strong>
Input: nums = [1, 2, 1, 3, 5, 6, 4]
Output: 5 (or 1, both are valid)`,
    starterJS: `function findPeakElement(nums) {\n  // Your code here\n\n}`,
    starterPY: `def find_peak_element(nums):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[1, 2, 3, 1]], expected: 2 },
      { input: [[1]], expected: 0 },
      { input: [[2, 1]], expected: 0 },
      { input: [[1, 2]], expected: 1 },
    ],
    solution: `// O(log n) binary search on the slope
function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) {
      // Descending slope — peak is at mid or to the left
      right = mid;
    } else {
      // Ascending slope — peak is to the right
      left = mid + 1;
    }
  }
  return left;
}`,
    walkthrough: `<strong>Step 1: Binary search on slopes</strong>
The key insight: we're not searching for a value, we're searching for a DIRECTION CHANGE. If nums[mid] < nums[mid+1], the peak must be to the right (ascending). If nums[mid] > nums[mid+1], the peak is at mid or to the left (descending).

<strong>Step 2: Why does this guarantee a peak?</strong>
Since nums[-1] and nums[n] are -infinity, there MUST be at least one peak. If we always move toward the higher neighbor, we'll find one.

<strong>Step 3: Trace [1, 2, 1, 3, 5, 6, 4]</strong>
left=0, right=6, mid=3: nums[3]=3 < nums[4]=5 -> left=4
left=4, right=6, mid=5: nums[5]=6 > nums[6]=4 -> right=5
left=4, right=5, mid=4: nums[4]=5 < nums[5]=6 -> left=5
left=5, right=5: return 5. Peak is 6 at index 5.

<strong>Pattern recognition:</strong> This is a variation of binary search where instead of comparing to a target, we compare adjacent elements to determine which half contains the answer.

<strong>Complexity:</strong> O(log n) time, O(1) space.`,
    hint: "Use binary search: compare nums[mid] with nums[mid+1]. Move toward the larger neighbor — a peak must exist in that direction."
  },
  {
    id: "p33",
    title: "Merge Sort",
    difficulty: "medium",
    topic: "Arrays",
    week: 3,
    description: `Implement merge sort. Given an array of integers, return a new sorted array using the merge sort algorithm.

Merge sort works by:
1. Dividing the array in half
2. Recursively sorting each half
3. Merging the two sorted halves

<strong>Example 1:</strong>
Input: arr = [38, 27, 43, 3, 9, 82, 10]
Output: [3, 9, 10, 27, 38, 43, 82]

<strong>Example 2:</strong>
Input: arr = [5, 2, 8, 1]
Output: [1, 2, 5, 8]`,
    starterJS: `function mergeSort(arr) {\n  // Your code here\n\n}`,
    starterPY: `def merge_sort(arr):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[38, 27, 43, 3, 9, 82, 10]], expected: [3, 9, 10, 27, 38, 43, 82] },
      { input: [[5, 2, 8, 1]], expected: [1, 2, 5, 8] },
      { input: [[1]], expected: [1] },
      { input: [[3, 1, 2]], expected: [1, 2, 3] },
    ],
    solution: `// O(n log n) merge sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

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
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);
  return result;
}`,
    walkthrough: `<strong>Step 1: Divide and Conquer</strong>
Split the array in half recursively until each piece has 1 element (which is sorted by definition).

<strong>Step 2: The merge operation</strong>
Given two sorted arrays, merge them by comparing front elements:
  left=[3,27,38], right=[9,10,43,82]
  Compare 3 vs 9 -> take 3
  Compare 27 vs 9 -> take 9
  Compare 27 vs 10 -> take 10
  Compare 27 vs 43 -> take 27
  Compare 38 vs 43 -> take 38
  Take remaining: 43, 82
  Result: [3,9,10,27,38,43,82]

<strong>Step 3: Why O(n log n)?</strong>
We split log(n) times (halving). At each level, we do O(n) work merging. Total: O(n log n).

<strong>Step 4: Stability</strong>
Merge sort is STABLE — equal elements maintain their original order. This is why it's used in many standard library sort implementations.

<strong>SQL analogy:</strong> Think of merge sort like a UNION ALL of two pre-sorted result sets with ORDER BY. The merge step is like combining two sorted cursors.

<strong>Complexity:</strong> O(n log n) time, O(n) space for the temporary arrays.`,
    hint: "Split the array in half, recursively sort each half, then merge the two sorted halves using two pointers."
  },
  {
    id: "p34",
    title: "Fibonacci with Memoization",
    difficulty: "easy",
    topic: "Arrays",
    week: 3,
    description: `Compute the n-th Fibonacci number using memoization to avoid redundant calculations.

The Fibonacci sequence: F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1.

<strong>Example 1:</strong>
Input: n = 6
Output: 8
Explanation: 0, 1, 1, 2, 3, 5, 8 — the 6th Fibonacci number is 8.

<strong>Example 2:</strong>
Input: n = 10
Output: 55`,
    starterJS: `function fibonacci(n) {\n  // Your code here\n  // Use memoization!\n\n}`,
    starterPY: `def fibonacci(n):\n    # Your code here\n    # Use memoization!\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [0], expected: 0 },
      { input: [1], expected: 1 },
      { input: [6], expected: 8 },
      { input: [10], expected: 55 },
      { input: [20], expected: 6765 },
    ],
    solution: `// O(n) with memoization (top-down DP)
function fibonacci(n) {
  const memo = {};
  function fib(k) {
    if (k <= 0) return 0;
    if (k === 1) return 1;
    if (memo[k] !== undefined) return memo[k];
    memo[k] = fib(k - 1) + fib(k - 2);
    return memo[k];
  }
  return fib(n);
}`,
    walkthrough: `<strong>Step 1: The naive problem</strong>
Plain recursion: fib(n) = fib(n-1) + fib(n-2). This is O(2^n) because fib(5) calls fib(3) twice, fib(2) three times, etc. Massive redundancy!

<strong>Step 2: Memoization fixes this</strong>
Store each result in a cache (memo object). Before computing fib(k), check if we already have it. This way, each value is computed exactly once.

<strong>Step 3: Trace fib(5)</strong>
fib(5) -> fib(4) + fib(3)
  fib(4) -> fib(3) + fib(2)
    fib(3) -> fib(2) + fib(1)
      fib(2) -> fib(1) + fib(0) = 1+0 = 1 [stored]
    fib(3) = 1 + 1 = 2 [stored]
  fib(4) = fib(3)[cached=2] + fib(2)[cached=1] = 3 [stored]
fib(5) = fib(4)[cached=3] + fib(3)[cached=2] = 5

<strong>Step 4: This IS Dynamic Programming</strong>
Memoization = "top-down DP". You could also do bottom-up: build an array from fib[0] to fib[n]. Same result, different direction.

<strong>Complexity:</strong> O(n) time, O(n) space for the memo cache.`,
    hint: "Use a cache object. Before computing fib(k), check if it's already stored. This turns O(2^n) into O(n)."
  },
  {
    id: "p35",
    title: "Product of Array Except Self",
    difficulty: "medium",
    topic: "Arrays",
    week: 3,
    description: `Given an integer array <code>nums</code>, return an array <code>answer</code> such that <code>answer[i]</code> is the product of all elements in <code>nums</code> except <code>nums[i]</code>.

You must solve it in O(n) time and <strong>without using division</strong>.

<strong>Example 1:</strong>
Input: nums = [1, 2, 3, 4]
Output: [24, 12, 8, 6]

<strong>Example 2:</strong>
Input: nums = [-1, 1, 0, -3, 3]
Output: [0, 0, 9, 0, 0]`,
    starterJS: `function productExceptSelf(nums) {\n  // Your code here\n\n}`,
    starterPY: `def product_except_self(nums):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
      { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
      { input: [[2, 3]], expected: [3, 2] },
    ],
    solution: `// O(n) using prefix and suffix products
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  // Build prefix products: result[i] = product of all elements before i
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  // Multiply by suffix products: product of all elements after i
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  return result;
}`,
    walkthrough: `<strong>Step 1: The no-division constraint</strong>
You can't just compute total product and divide. We need another approach.

<strong>Step 2: Prefix and suffix products</strong>
For each index i, the answer is: (product of everything LEFT of i) * (product of everything RIGHT of i).

<strong>Step 3: Trace [1, 2, 3, 4]</strong>
Prefix pass (left to right):
  result = [1, 1, 2, 6] (each position stores product of all elements before it)

Suffix pass (right to left), multiply in:
  suffix starts at 1
  i=3: result[3] = 6 * 1 = 6, suffix = 1*4 = 4
  i=2: result[2] = 2 * 4 = 8, suffix = 4*3 = 12
  i=1: result[1] = 1 * 12 = 12, suffix = 12*2 = 24
  i=0: result[0] = 1 * 24 = 24, suffix = 24*1 = 24

Result: [24, 12, 8, 6]. Correct!

<strong>Key pattern:</strong> "Prefix/suffix" is a powerful technique. Whenever you need to combine information from both sides of each element, think prefix + suffix.

<strong>Complexity:</strong> O(n) time, O(1) extra space (output array doesn't count).`,
    hint: "For each position, you need the product of everything to its left times everything to its right. Build these with two passes."
  },
  {
    id: "p36",
    title: "Subarray Sum Equals K",
    difficulty: "medium",
    topic: "Hash Maps",
    week: 3,
    description: `Given an array of integers <code>nums</code> and an integer <code>k</code>, return the total number of subarrays whose sum equals <code>k</code>.

A subarray is a contiguous non-empty sequence of elements within the array.

<strong>Example 1:</strong>
Input: nums = [1, 1, 1], k = 2
Output: 2
Explanation: [1,1] starting at index 0 and [1,1] starting at index 1.

<strong>Example 2:</strong>
Input: nums = [1, 2, 3], k = 3
Output: 2
Explanation: [1,2] and [3].`,
    starterJS: `function subarraySum(nums, k) {\n  // Your code here\n\n}`,
    starterPY: `def subarray_sum(nums, k):\n    # Your code here\n    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[1, 1, 1], 2], expected: 2 },
      { input: [[1, 2, 3], 3], expected: 2 },
      { input: [[1], 0], expected: 0 },
      { input: [[1, -1, 0], 0], expected: 3 },
    ],
    solution: `// O(n) using prefix sum + hash map
function subarraySum(nums, k) {
  const prefixCount = { 0: 1 }; // prefix sum -> count of times seen
  let sum = 0;
  let count = 0;
  for (const num of nums) {
    sum += num;
    // If (sum - k) was a previous prefix sum, then the subarray
    // between that point and here sums to k
    if (prefixCount[sum - k] !== undefined) {
      count += prefixCount[sum - k];
    }
    prefixCount[sum] = (prefixCount[sum] || 0) + 1;
  }
  return count;
}`,
    walkthrough: `<strong>Step 1: Prefix sum insight</strong>
If the prefix sum at index j is S[j] and at index i is S[i], then the subarray sum from i+1 to j is S[j] - S[i]. We want S[j] - S[i] = k, meaning S[i] = S[j] - k.

<strong>Step 2: Use a hash map</strong>
As we compute the running sum, we check: "Have we seen a prefix sum of (current_sum - k) before?" If yes, the number of times we saw it is the number of valid subarrays ending here.

<strong>Step 3: Trace [1, 2, 3], k=3</strong>
prefixCount = {0: 1}, sum=0, count=0

num=1: sum=1, check 1-3=-2 -> not in map. Store {0:1, 1:1}
num=2: sum=3, check 3-3=0 -> in map (count 1)! count=1. Store {0:1, 1:1, 3:1}
num=3: sum=6, check 6-3=3 -> in map (count 1)! count=2. Store {0:1, 1:1, 3:1, 6:1}

Return 2. The subarrays are [1,2] and [3].

<strong>Step 4: Why {0: 1} initially?</strong>
A prefix sum of 0 means "from the start." If the sum of the first k elements equals k, we need to find sum-k=0 in the map.

<strong>SQL analogy:</strong> This is like a self-join on prefix sums: SELECT COUNT(*) FROM prefix_sums a JOIN prefix_sums b WHERE b.sum - a.sum = k AND b.idx > a.idx.

<strong>Complexity:</strong> O(n) time, O(n) space for the hash map.`,
    hint: "Use prefix sums with a hash map. The sum of subarray [i..j] = prefix[j] - prefix[i-1]. Track how many times each prefix sum has occurred."
  },
];