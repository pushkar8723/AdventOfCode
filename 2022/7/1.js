process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here

    const fs = {
        root: {},
        get: (path, curr = fs.root) => {
            if (path === '') {
                return curr;
            }
            const parts = path.split('/');
            const next = parts.shift();
            return fs.get(parts.join('/'), curr[next]);
        },
        set: (path, filename, data, curr = fs.root) => {
            if (path === '') {
                curr[filename] = data;
                return;
            }
            const parts = path.split('/');
            const next = parts.shift();
            if (!curr[next]) {
                curr[next] = {};
            }
            fs.set(parts.join('/'), filename, data, curr[next]);
        }
    };
    let path = '';

    // construct tree from input
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('$ cd')) {
            const part = line.match(/\$ cd (.+)/)[1];
            // console.log(part);
            if (part === '/') {
                path = '';
            } else if (part === '..') {
                const dir = path.split('/');
                dir.pop();
                path = dir.join('/');
            } else {
                path = `${path}${path?'/':''}${part}`;
            }
        } else if (line.startsWith('$ ls')) {
            continue;
        } else {
            const [data, name] = line.split(' ');
            if (data === 'dir') {
                fs.set(path, name, {});
            } else {
                fs.set(path, name, parseInt(data));
            }
        }
    }

    let part1 = 0;
    // stores sizes of each director
    let sizes = [];

    // One DFS to find both answers
    const dfs = (root, name = '/') => {
        // Its a file, return its size.
        if (typeof root !== 'object') {
            return root;
        }

        // Add size of each child to find current directory size.
        const children = Object.keys(root);
        const size = children.reduce((prev, child) => {
            return prev + dfs(root[child], child);
        }, 0);

        // If size is less than 100000, add it to part1 answer.
        if (size < 100000) {
            part1 += size;
        }

        // store size in sizes array.
        sizes.push(size);

        // Return current dir size.
        return size;
    }
    
    const used = dfs(fs.root);
    const unused = 70000000 - used;
    const need = 30000000 - unused;
    
    /**** Part 1 ****/
    console.log(part1);
    
    /**** Part 2 ****/
    // sort the sizes array.
    sizes = sizes.sort((a, b) => a - b);
    // find the first dir with size just greater than the needed size.
    console.log(sizes.find(size => size >= need));
});
