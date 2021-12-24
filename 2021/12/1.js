process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const map = new Map();
    
    const setPath = (a, b) => {
        if (!map.has(a)) {
            map.set(a, []);
        }
        map.set(a, [...map.get(a), b]);
    }

    lines.forEach(line => {
        const [a, b] = line.split('-');
        setPath(a, b);
        setPath(b, a);
    });

    let count = 0;

    const dfs = (root, path) => {
        if (root === 'end') {
            // console.log(path);
            count++;
        }
        const children = map.get(root);
        children.forEach(child => {
            if (child.match(/^[A-Z]+$/) || !path.includes(child)) {
                dfs(child, [...path, child]);
            }
        });
    }

    dfs('start', ['start']);
    console.log(count);

    const paths = new Set();

    const countVisited = (node, path) => {
        let count = 0;
        path.forEach(stop => {
            if (node === stop) {
                count++;
            }
        });
        return count;
    }

    const dfs2 = (root, path, allowed) => {
        if (root === 'end') {
            paths.add(path.join(','));
        }
        const children = map.get(root);
        children.forEach(child => {
            if ((child === allowed && countVisited(child, path) < 2) || child.match(/^[A-Z]+$/) || !path.includes(child)) {
                dfs2(child, [...path, child], allowed);
                if (allowed === 'none' && child !== 'start' && child !== 'end' && child.match(/^[a-z]+$/)) {
                    dfs2(child, [...path, child], child);
                }
            }
        });
    }

    dfs2('start', ['start'], 'none');
    console.log(paths.size);

});
