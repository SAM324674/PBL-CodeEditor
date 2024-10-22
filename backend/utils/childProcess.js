// const {exec, spawn}=require('child_process');
// const { stdout } = require('process');
// const path = require('path');

// const Execute = (code, input) => {
//     return new Promise((resolve, reject) => {
//         const child = spawn('python3', ['-c', code]);
//         console.log(input);
//         // Check if input is a valid string


//         if (input === undefined) {
//             reject("Input must be a defined string");
//             return;
//         }

//         child.stdin.write(input);
//         child.stdin.end();

//         let output = '';
//         child.stdout.on('data', (data) => {
//             output += data.toString();
//         });

//         child.stderr.on('data', (data) => {
//             reject(`Error: ${data.toString()}`);
//         });

//         child.on('close', (code) => {
//             if (code !== 0) {
//                 reject(`Process exited with code: ${code}`);
//             } else {
//                 resolve(output);
//             }
//         });
//     });
// };

// module.exports={Execute};


const Execute = (code, input) => {
    return new Promise((resolve, reject) => {
        // Use simple code for testing
        const simpleCode = code;
        const child = spawn('python3', ['-c', simpleCode]);

        // Ensure input is a valid string and convert to string
        if (Array.isArray(input)) {
            input = input.join('\n');
        }

        console.log("Running code:", simpleCode);
        console.log("Input:", input);

        if (input) {
            child.stdin.write(input + '\n');
            child.stdin.end();
        } else {
            reject("Input must be defined");
        }

        let output = '';

        child.stdout.on('data', (data) => {
            console.log("data:", data.toString()); // Log the output data
            output += data.toString();
        });

        child.stderr.on('data', (data) => {
            console.error(`Error: ${data.toString()}`);
            reject(`Error: ${data.toString()}`);
        });

        child.on('close', (code) => {
            if (code !== 0) {
                reject(`Process exited with code: ${code}`);
            } else {
                resolve(output.trim());
            }
        });
    });
};
