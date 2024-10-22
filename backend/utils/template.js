function run_function(user_function_code, test_cases) {
    // Your implementation here
    const code = `
        import json
        import sys

        def user_function(*args):
            ${user_function_code}

        if __name__ == '__main__':
            input_data = sys.stdin.read()
            test_cases = json.loads(input_data)  # Expecting a list of test cases
            results = [user_function(*case['input']) for case in test_cases]
            print(json.dumps(results))  # Print the output in JSON format

    `;
    return code;
}

module.exports = { run_function };
