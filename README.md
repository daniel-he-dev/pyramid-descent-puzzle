# Pyramid Descent Puzzle - Art of Problem Solving Application

## Usage

Please edit the `INPUT_URL` (external) and `OUTPUT_URL` (local) fields in solve.js to adjust the location of the input and output file.

This project is written with Javascript to be run with Node.js with one external library (axios). Axios was used to simplify the HTTP request to read in the external input file from AoPS's server.

To set up the project, please make sure npm (Node Package Manager) is installed and run the following command in the terminal to install dependencies.
`npm install`
To run, please make sure Node.js is installed and run the following code in the terminal.
`node solve.js`
The resulting output can be found at the filepath specified by `OUTPUT_URL`.

## Description

**Reading Input**

Axios, an open-source package that abstracts away the hassle of HTTP requests, is used to read the input text file directly from the AoPS link. A stream could have been used for a large file, but this was deemed unnecessary.

**Parsing Input**

Some simple string manipulation and type casting was applied to parse the input text into Javascript arrays of numbers. A helper Tree class was written and used for this solution. Each number was instantiated as a Tree and connected up as described in the prompt.

**Recursive Solution**

This solution implements a greedy depth-first search solution to find any working solution. Return statements are added to short-circuit the solution wherever possible to eliminate unneeded calculation.

The recursive solution first establishes a base case to check if a solution has been found under two conditions.

- 1. The remaining 'distance' to multiply to the target number is 1. This means we have arrived at a valid solution and can return an empty string (as opposed to undefined) to lift the solution up to the top level.
- 2. We are at the bottom level of the tree (solutions are only valid if every level is traversed).
- The solution is further optimized by returning immediately when the function detects a target below 1, as this indicates the current product is already above the target product. We have assumed all numbers in the input are non-zero integers.

The function then recurses through the left and right children with the updated target, looking for a solution.

**Execute and Write Solution**

The recursive solution is initiated with the root tree node. The solution is lifted up and written using an asynchronous Node writeFile method to the output filepath.
