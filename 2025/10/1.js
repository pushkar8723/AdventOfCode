process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    let part1 = 0;

    lines.forEach(line => {
        const tokens = line.split(' ');
        const lights = tokens[0].replace(/\[|\]/g, '');
        const joultage = tokens[tokens.length - 1];
        const buttons = tokens.slice(1, tokens.length - 1).map(item => item.replace(/\(|\)/g, '').split(',').map(Number));

        // Minimum number of presses to reach the target state
        let map = new Map();

        const dfs = (init, presses) => {
            buttons.forEach(group => {
                let newState = init.split('');
                group.forEach(item => {
                    newState[item] = newState[item] === '.' ? '#' : '.';
                });
                newState = newState.join('');

                if (!map.has(newState) || map.get(newState) > presses + 1) {
                    map.set(newState, presses + 1);
                    dfs(newState, presses + 1);
                }
            });
        };

        const initialState = Array.from({ length: lights.length }, () => '.').join('');
        map.set(initialState, 0);
        dfs(initialState, 0);

        part1 += map.get(lights);
        console.log(map);
    });

    console.log('Part 1:', part1);
});
