// questions.js
export const questions = [
    {
      question: "Write a function that checks if a number is even or odd.",
      // functionName: "is_even_or_odd",
      testCases: [
        { input: [2], expected: "even" },
        { input: [3], expected: "odd" },
      ],
    },
    {
      question: "Write a function that returns the sum of two numbers.",
      // functionName: "sum",
      testCases: [
        { input: [2, 3], expected: 5 },
        { input: [10, -2], expected: 8 },
      ],
    },
    {
        question: "Write a function that sorts an array using Bubble Sort.",
        // functionName: "bubble_sort",
        testCases: [
          { input: [[5, 3, 8, 4, 2]], expected: [2, 3, 4, 5, 8] },
          { input: [[1, 4, 2, 3, 5]], expected: [1, 2, 3, 4, 5] },
          { input: [[10, 7, 8, 9, 1, 5]], expected: [1, 5, 7, 8, 9, 10] },
          { input: [[0, -1, 2, -3, 5]], expected: [-3, -1, 0, 2, 5] },
          { input: [[2, 1]], expected: [1, 2] },
        ],
    },

    {
      question: "Write a basic calculator function that performs addition, subtraction, multiplication, and division.",
      functionName: "calculator",
      testCases: [
        { input: [3, 5, "+"], expected: 8 },               // Addition test case
        { input: [10, 4, "-"], expected: 6 },              // Subtraction test case
        { input: [7, 8, "*"], expected: 56 },              // Multiplication test case
        { input: [16, 4, "/"], expected: 4 },              // Division test case
        { input: [5, 0, "/"], expected: "Division by zero is undefined" },  // Division by zero
        { input: [7, 3, "^"], expected: "Invalid operator" },  
        { input: [7, 3, "**"], expected: 343 },
         // Invalid operator
        { input: [ 9, 2,"/"], expected: 4.5 },
        { input: [45, 1,"/"], expected: 45 },
  
      ],
    },

    {
      question: "Write a Python function to count the number of vowels in a string.",
      testCases: [
        { input: ["hello"], expected: 2 },
        { input: ["OpenAI"], expected: 3 },
        { input: ["xyz"], expected: 0 },
        { input: ["aeiou"], expected: 5 },
      ],
    },
    {
      question: "Write a Python program to sort the characters of a string.",
      testCases: [
        { input: ["hello"], expected: "ehllo" },
        { input: ["OpenAI"], expected: "AIOenp" },
        { input: ["python"], expected: "hnopty" },
      ],
    },
    {
      question: "Write a Python function to remove duplicate characters from a string.",
      testCases: [
        { input: ["hello"], expected: "helo" },
        { input: ["OpenAI"], expected: "OpenAI" },
        { input: ["aabbcc"], expected: "abc" },
      ],
    },

    {
      question: "Write a Python function to list unique characters with their count in a string.",
      testCases: [
        { input: ["hello"], expected: {"h": 1, "e": 1, "l": 2, "o": 1} },
        { input: ["banana"], expected: {"b": 1, "a": 3, "n": 2} },
        { input: ["OpenAI"], expected: {"O": 1, "p": 1, "e": 1, "n": 1, "A": 1, "I": 1} },
      ],
    },
    {
      question: "Write a Python program to find unique words in a string.",
      testCases: [
        { input: ["hello world hello"], expected: ["hello", "world"] },
        { input: ["OpenAI is great and OpenAI is innovative"], expected: ["OpenAI", "is", "great", "and", "innovative"] },
        { input: ["python python python"], expected: ["python"] },
      ],
    },
    {
      question: "Write a Python program for basic inventory management (add, remove, and check stock levels).",
      testCases: [
        { input: [["add", "apple", 10], ["check", "apple"]], expected: 10 },
        { input: [["add", "banana", 5], ["remove", "banana", 2], ["check", "banana"]], expected: 3 },
        { input: [["add", "apple", 5], ["add", "banana", 7], ["remove", "apple", 3], ["check", "apple"]], expected: 2 },
      ],
    },
  
    // Add more questions as needed
  ];
  