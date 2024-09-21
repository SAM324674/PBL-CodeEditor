import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { loadPyodide } from "pyodide";
import { questions } from "../components/questions"; // Import the questions
import { CiMenuBurger } from "react-icons/ci";
const Home = () => {
  const editorRef = useRef(null);
  const [editorInstance, setEditorInstance] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [pyodide, setPyodide] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  // Load Pyodide on component mount
  useEffect(() => {
    const initPyodide = async () => {
      const pyodideInstance = await loadPyodide();
      setPyodide(pyodideInstance);
    };
    initPyodide();
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        value: "# Write your function here...",
        language: "python",
        theme: "vs-dark",
      });
      setEditorInstance(editor);
      return () => editor.dispose();
    }
  }, []);


  //extract function name from user code

  const extractFunctionName = (code) => {
    const match = code.match(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/);
    return match ? match[1] : null; // Returns the function name or null if not found
  };
  
  const executePythonCode = async (code, testCases, functionName) => {
    const results = [];
    try {
      for (const testCase of testCases) {
        const args = testCase.input; // Take the entire input array
        const pyCode = `
${code}  # User-defined function

# Calling the user-defined function
result = ${functionName}(*${JSON.stringify(args)})
`;

        await pyodide.runPythonAsync(pyCode);
        const result = pyodide.globals.get('result');
  
        results.push({
          input: testCase.input,
          output: result,
          expected: testCase.expected,
          passed: JSON.stringify(result) === JSON.stringify(testCase.expected),
        });
      }
    } catch (error) {
      results.push({ error: error.message });
    }
    return results;
  };
  
  

  const handleSubmit = async () => {
    const code = editorInstance.getValue();
    const functionName = extractFunctionName(code); // Extract the dynamic function name
    if (!functionName) {
      setTestResult([{ error: "No valid function name found." }]);
      return;
    }
    const currentQuestion = questions[selectedQuestionIndex];
    const results = await executePythonCode(code, currentQuestion.testCases, functionName);
    setTestResult(results);
  };

  return (
    <div className="w-full h-screen flex flex-col p-7">
      {/* Toggle Button */}
      <button className="p-5"><CiMenuBurger /></button>
      {/* Question Selection */}
      <select className="w-1/2" onChange={(e) => setSelectedQuestionIndex(e.target.value)} value={selectedQuestionIndex}>
        {questions.map((q, index) => (
          <option key={index} value={index}>{`Question${index+1}`}</option>
        ))}
      </select>

      {/* Other Components (Code Editor, Submit Button, Test Results) */}
      <div className="w-full flex h-3/4">
        <div className="w-1/2 h-full p-8 bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">{questions[selectedQuestionIndex].question}</h1>
          <p className="text-lg font-semibold">Test Cases:</p>
          <ul className="list-disc list-inside text-sm">
            {questions[selectedQuestionIndex].testCases.map((test, idx) => (
              <li key={idx}>
                Input: <code>{JSON.stringify(test.input)}</code>, Expected Output: <code>{test.expected}</code>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/2 h-full p-8 flex flex-col">
          <div ref={editorRef} className="flex-grow w-full h-96 border-2 border-gray-300 rounded-md shadow-lg" />
          <button
            onClick={handleSubmit}
            className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-colors"
          >
            Submit Code
          </button>
        </div>
      </div>

      {/* Test Results */}
      {testResult && (
        <div className="mt-6 p-8">
          <h2 className="text-xl font-bold">Test Results:</h2>
          <ul className="list-inside list-decimal">
            {testResult.map((result, idx) =>
              result.error ? (
                <li key={idx} className="text-red-600">Error: {result.error}</li>
              ) : (
                <li key={idx}>
                  <span>Test Case {idx + 1} - </span>
                  Input: <code>{JSON.stringify(result.input)}</code>, Output: <code>{result.output}</code>, Expected: <code>{result.expected}</code>{" "}
                  {result.passed ? (
                    <span className="text-green-600">[Passed]</span>
                  ) : (
                    <span className="text-red-600">[Failed]</span>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
