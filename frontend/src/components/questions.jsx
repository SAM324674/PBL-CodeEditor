export const questions = [
  { 
    id: 1,
    question: "Write a function that checks if a number is even or odd.",
    testCases: [
      { input: "2\n", expected: "even\n" },
      { input: "3\n", expected: "odd\n" },
    ],
  },
  { 
    id: 2,
    question: "Write a function that returns the sum of two numbers.",
    testCases: [
      { input: "2\n3\n", expected: "5\n" },
      { input: "10\n-2\n", expected: "8\n" },
    ],
  },
  { 
    id: 3,
    question: "Write a function that sorts an array using Bubble Sort.",
    testCases: [
      { input: "5 3 8 4 2\n", expected: "2 3 4 5 8\n" },
      { input: "1 4 2 3 5\n", expected: "1 2 3 4 5\n" },
      { input: "10 7 8 9 1 5\n", expected: "1 5 7 8 9 10\n" },
      { input: "0 -1 2 -3 5\n", expected: "-3 -1 0 2 5\n" },
      { input: "2 1\n", expected: "1 2\n" },
    ],
  },
  { 
    id: 4,
    question: "Write a basic calculator function that performs addition, subtraction, multiplication, and division.",
    testCases: [
      { input: "3\n5\n+\n", expected: "8\n" },  // Addition
      { input: "10\n4\n-\n", expected: "6\n" },  // Subtraction
      { input: "7\n8\n*\n", expected: "56\n" },  // Multiplication
      { input: "16\n4\n/\n", expected: "4\n" },  // Division
      { input: "5\n0\n/\n", expected: "Division by zero is undefined\n" },  // Division by zero
      { input: "7\n3\n^\n", expected: "Invalid operator\n" },  // Invalid operator
      { input: "7\n3\n**\n", expected: "343\n" },  // Power operator
      { input: "9\n2\n/\n", expected: "4.5\n" },
      { input: "45\n1\n/\n", expected: "45\n" },
    ],
  },
  { 
    id: 5,
    question: "Write a Python function to count the number of vowels in a string.",
    testCases: [
      { input: "hello\n", expected: "2\n" },
      { input: "OpenAI\n", expected: "4\n" },
      { input: "xyz\n", expected: "0\n" },
      { input: "aeiou\n", expected: "5\n" },
    ],
  },
  { 
    id: 6,
    question: "Write a Python program to sort the characters of a string.",
    testCases: [
      { input: "hello\n", expected: "ehllo\n" },
      { input: "OpenAI\n", expected: "AIOenp\n" },
      { input: "python\n", expected: "hnopty\n" },
    ],
  },
  { 
    id: 7,
    question: "Write a Python function to remove duplicate characters from a string.",
    testCases: [
      { input: "hello\n", expected: "helo\n" },
      { input: "OpenAI\n", expected: "OpenAI\n" },
      { input: "aabbcc\n", expected: "abc\n" },
    ],
  },
  { 
    id: 8,
    question: "Write a Python function to list unique characters with their count in a string.",
    testCases: [
      { input: "hello\n", expected: "{'h': 1, 'e': 1, 'l': 2, 'o': 1}\n" },
      { input: "banana\n", expected: "{'b': 1, 'a': 3, 'n': 2}\n" },
      { input: "OpenAI\n", expected: "{'O': 1, 'p': 1, 'e': 1, 'n': 1, 'A': 1, 'I': 1}\n" },
    ],
  },
  { 
    id: 9,
    question: "Write a Python program to find unique words in a string.",
    testCases: [
      { input: "hello world hello\n", expected: "hello world\n" },
      { input: "OpenAI is great and OpenAI is innovative\n", expected: "OpenAI is great and innovative\n" },
      { input: "python python python\n", expected: "python\n" },
    ],
  },
  { 
    id: 10,
    question: "Write a Python program for basic inventory management (add, remove, and check stock levels).",
    testCases: [
      { input: "add apple 10\ncheck apple\n", expected: "10\n" },
      { input: "add banana 5\nremove banana 2\ncheck banana\n", expected: "3\n" },
      { input: "add apple 5\nadd banana 7\nremove apple 3\ncheck apple\n", expected: "2\n" },
    ],
  },
];
