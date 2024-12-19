process.stdin.resume();
process.stdin.setEncoding('utf8');

const topologicalSort = (edges) => {
    const inDegree = new Map();
    const graph = new Map();

    edges.forEach(([from, to]) => {
        graph.set(from, graph.has(from) ? graph.get(from).concat(to) : [to]);
        if (!graph.has(to)) {
            graph.set(to, []);
        }
        inDegree.set(to, inDegree.has(to) ? inDegree.get(to) + 1 : 1);
        if (!inDegree.has(from)) {
            inDegree.set(from, 0);
        }
    });

    const queue = [];

    
    inDegree.forEach((degree, key) => {
        if (degree === 0) {
            queue.push(key);
        }
    });

    const result = [];
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);

        graph.get(node).forEach(neighbor => {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        });
    }

    return result;
}

process.stdin.on('data', function (chunk) {
    const [part1, part2] = chunk.toString().split('\n\n').filter(item => item);
    // Write your code here
    const edges = part1.split('\n').map(item => item.split('|').map(i => parseInt(i)));

    const graph = new Map();
    edges.forEach(([from, to]) => {
        graph.set(from, graph.has(from) ? graph.get(from).concat(to) : [to]);
    });

    const rules = part2.split('\n').filter(i => i).map(item => item.split(',').map(i => parseInt(i)));

    const valid = rules.map(rule => {
        let i;
        for (i = 0; i < rule.length - 1; i++) {
            if (!graph.get(rule[i])?.includes(rule[i + 1])) {
                break;
            }
        }
        return i === rule.length - 1;
    });

    let ans1 = 0;
    for (let i = 0; i < valid.length; i++) {
        if (valid[i]) {
            ans1 += rules[i][Math.floor(rules[i].length/2)];
        }
    }

    console.log(ans1);

    let ans2 = 0;
    for (let i = 0; i < valid.length; i++) {
        if (!valid[i]) {
            const rule = rules[i];
            const subEdges = edges.filter(([a, b]) => rule.includes(a) && rule.includes(b));
            const correctRule = topologicalSort(subEdges);

            ans2 += correctRule[Math.floor(correctRule.length/2)];
        }
    }
    console.log(ans2);
});
