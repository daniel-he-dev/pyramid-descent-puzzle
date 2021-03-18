const axios = require('axios');
const { writeFile } = require('fs/promises');
const INPUT_URL = 'https://artofproblemsolving.com/assets/careers/pyramid_sample_input.txt';
const OUTPUT_URL = 'pyramid_output.txt';

//Read File
axios.get(INPUT_URL).then((res) => {
  solve(res.data);
});

//Solve
const solve = (content) => {
  //Parse Input
  const lines = content.split('\r\n');
  const target = Number(lines.shift().split(' ')[1]); //Extract Target product
  if (lines[lines.length - 1] === '') lines.pop(); //Sample Input file had an empty trailing line to remove
  const trees = lines.map((line) => line.split(',').map((num) => new Tree(Number(num)))); //Tree instantiation
  for (let i = 0; i < trees.length - 1; i++) {
    //Connect subtrees
    trees[i].forEach((node, idx) => {
      node.left = trees[i + 1][idx];
      node.right = trees[i + 1][idx + 1];
    });
  }

  //Recursive Inner Function
  const find = (tree, target) => {
    let newTarget = target / tree.val;
    if (!tree.left) {
      //Check base case
      if (newTarget === 1) {
        return '';
      }
      return;
    }
    if (newTarget < 1) return; //Short-circuit optimization

    let left = find(tree.left, newTarget); //Recursive calls
    if (left !== undefined) return 'L' + left;
    let right = find(tree.right, newTarget);
    if (right !== undefined) return 'R' + right;
  };

  //Execute and write solution
  writeFile(OUTPUT_URL, find(trees[0][0], target));
};

//Helper Tree Class
class Tree {
  constructor(val = null) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
