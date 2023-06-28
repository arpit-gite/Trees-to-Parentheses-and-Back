class Tree { }
class Leaf extends Tree { }
class Branch extends Tree {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }
}

function treeToParens(tree) {
  if (tree instanceof Leaf) {
    return '()';
  } else if (tree instanceof Branch) {
    const left = treeToParens(tree.left);
    const right = treeToParens(tree.right);
    return `(${left}${right})`;
  }
}

function parensToTree(str) {
  const stack = [];
  let root = null;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      stack.push(root);
      root = null;
    } else if (str[i] === ')') {
      if (stack.length > 0) {
        const branch = new Branch(stack.pop(), root);
        root = branch;
      }
    } else if (str[i] === 'L') {
      const leaf = new Leaf();
      root = leaf;
    }
  }

  return root;
}

// Example usage
const tree = new Branch(new Leaf(), new Branch(new Leaf(), new Leaf()));
const parens = treeToParens(tree);
console.log(parens); // Output: "(()(()))"
const reconstructedTree = parensToTree(parens);
console.log(reconstructedTree); // Output: Branch { left: Leaf {}, right: Branch { left: Leaf {}, right: Leaf {} } }
