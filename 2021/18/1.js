process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here

    const trees = [];
    let exploded = false;

    const getSubString = (str) => {
        let ctr = 0;
        let i = 0;
        do {
            if (str[i] === '[') {
                ctr++;
            } else if (str[i] === ']') {
                ctr--;
            }
            i++;
        } while (ctr > 0);
        return str.substring(0, i);
    }
    
    const parseLeftAndRight = (str) => {
        let leftStr;
        let left;
        if (str[0] === '[') {
            leftStr = getSubString(str);
            left = createTree(leftStr);
        } else {
            leftStr = str.substring(0, 1);
            left = parseInt(str[0]);
        }

        let rightStr = str.substring(leftStr.length + 1, str.length);
        let right;
        if (rightStr[0] === '[') {
            right = createTree(rightStr);
        } else {
            right = parseInt(rightStr[0]);
        }
        
        return [left, right];
    }

    /**
     * Creates tree from string
     * @param {string} str 
     */
    const createTree = (str) => {
        const [left, right] = parseLeftAndRight(str.substring(1, str.length - 1));

        return { left, right };
    }

    const printTree = (tree) => {
        let left;
        let right;
        
        if (typeof tree.left === 'object') {
            left = printTree(tree.left);
        } else {
            left = tree.left.toString();
        }

        if (typeof tree.right === 'object') {
            right = printTree(tree.right);
        } else {
            right = tree.right.toString();
        }
        return `[${left},${right}]`;
    }

    const addToLeaf = (root, leafNumber, number) => {
        let leafCount = 0;
        // console.log(leafNumber, number);

        const traverse = (tree) => {
            if (typeof tree.left === 'number') {
                leafCount++;
                if (leafCount === leafNumber) {
                    tree.left += number;
                }
            } else {
                traverse(tree.left);
            }

            if (typeof tree.right === 'number') {
                leafCount++;
                if (leafCount === leafNumber) {
                    tree.right += number;
                }
            } else {
                traverse(tree.right);
            }
        }

        traverse(root);
    }

    const explodeTree = (root) => {
        let leafCount = 0;

        const explode = (tree, level = 1) => {
            if (typeof tree === 'number') {
                leafCount++;
                // console.log(tree, leafCount);
                return;
            }

            if (exploded) {
                return;
            }
    
            if (level === 4) {
                if (typeof tree.left === 'object') {
                    const { left, right } = tree.left;
                    addToLeaf(root, leafCount, left);
                    addToLeaf(root, leafCount+3, right);
                    tree.left = 0;
                    exploded = true;
                    return;
                } else {
                    explode(tree.left, level + 1);
                }
                if (typeof tree.right === 'object') {
                    const { left, right } = tree.right;
                    
                    addToLeaf(root, leafCount, left);
                    addToLeaf(root, leafCount+3, right);
                    tree.right = 0;
                    exploded = true;
                    return;
                } else {
                    explode(tree.right, level + 1);
                }
            } else {
                explode(tree.left, level + 1);
                explode(tree.right, level + 1);
            }

        }

        explode(root);
    }

    const splitTree = (root) => {
        let hasSplit = false;

        const split = (tree) => {
            if (hasSplit) {
                return true;
            }
            if (typeof tree.left === 'number') {
                if (tree.left > 9) {
                    tree.left = {
                        left: Math.floor(tree.left/2),
                        right: Math.ceil(tree.left/2)
                    }
                    hasSplit = true;
                    return hasSplit;
                }
            } else {
                hasSplit = hasSplit || split(tree.left);
                if (hasSplit) {
                    return hasSplit;
                }
            }
    
            if (typeof tree.right === 'number') {
                if (tree.right > 9) {
                    tree.right = {
                        left: Math.floor(tree.right/2),
                        right: Math.ceil(tree.right/2)
                    }
                    hasSplit = true;
                    return hasSplit;
                }
            } else {
                hasSplit = hasSplit || split(tree.right);
            }

            return hasSplit;
        }

        split(root);
        return hasSplit;
    }

    const reduce = (tree) => {
        let again = false;
        do {
            exploded = false;
            explodeTree(tree);
            // if (exploded) {
            //     console.log(printTree(tree));
            // }
            if (exploded) {
                again = true;
                continue;
            }
            again = splitTree(tree);
            // if (again) {
            //     console.log(printTree(tree));
            // }
        } while(again);
        return tree;
    }

    const addTrees = (a, b) => {
        return reduce({
            left: JSON.parse(JSON.stringify(a)),
            right: JSON.parse(JSON.stringify(b))
        });
    }

    const getMagnitude = (tree) => {
        if (typeof tree === 'number') {
            return tree;
        }
        
        const left = getMagnitude(tree.left);;
        const right = getMagnitude(tree.right);

        return (3 * left + 2 * right);
    }

    lines.forEach((line) => {
        trees.push(createTree(line));
    });

    const finalTree = trees.reduce((prev, curr) => {
        if (prev === null) {
            return curr;
        } else {
            return addTrees(prev, curr);
        }
    }, null);

    console.log(getMagnitude(finalTree));

    let maxMagnitude = 0;
    for (let i = 0; i < trees.length; i++) {
        for (let j = i+1; j < trees.length; j++) {
            const mag = getMagnitude(addTrees(trees[i], trees[j]));
            if (mag > maxMagnitude) {
                maxMagnitude = mag;
            }
            const mag1 = getMagnitude(addTrees(trees[j], trees[i]));
            if (mag1 > maxMagnitude) {
                maxMagnitude = mag1;
            }
        }
    }

    console.log(maxMagnitude);
});
