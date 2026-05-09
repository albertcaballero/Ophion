# Ophion
A customizable algorithm-based password generator.
It is intended as a react native Android app.

It takes a string as an input and processes it through the chosen algorithm. Showing the result in the output box. 

## Adding algorithms
1. Create a new file in ```algorithms/``` with the extension ```.algo.ts``` just like the example. (the extension is for the gitignore exclusion, not really mandatory).
2. Modify index.ts to add the import and add it do the array.

# Security note
Aside from ignoring the algorithm files in the git. I haven't taken into account many potential risks.
I assume the app is being executed in a safe environment (e.g one's personal phone) and I don't 