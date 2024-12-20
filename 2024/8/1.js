process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const map = lines.map(i => i.split(''));
    const antenas = new Set();
    const positions = new Map();
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (/[a-zA-Z0-9]/.test(map[i][j])) {
                antenas.add(map[i][j]);
                if (positions.has(map[i][j])) {
                    positions.get(map[i][j]).push([i, j]);
                } else {
                    positions.set(map[i][j], [[i, j]]);
                }
            } 
        }
    }
    
    const antinodes1 = new Set();
    [...antenas].forEach(antena => {
        const pos = positions.get(antena);
        for (let i = 0; i < pos.length; i++) {
            for (let j = i + 1; j < pos.length; j++) {
                const dx = pos[i][0] - pos[j][0];
                const dy = pos[i][1] - pos[j][1];
                const [x1, y1] = [pos[i][0] +  dx, pos[i][1] + dy];
                const [x2, y2] = [pos[j][0] - dx, pos[j][1] - dy];

                if (x1 >=0 && x1 < map.length && y1 >=0 && y1 < map[0].length) {
                    antinodes1.add([x1, y1].join(':'));
                }
                if (x2 >= 0 && x2 < map.length && y2 >= 0 && y2 < map[0].length) {
                    antinodes1.add([x2, y2].join(':'));
                }
            }
        }
    });

    console.log(antinodes1.size);

    const antinodes2 = new Set();
    [...antenas].forEach(antena => {
        const pos = positions.get(antena);
        for (let i = 0; i < pos.length; i++) {
            for (let j = i + 1; j < pos.length; j++) {
                const dx = pos[i][0] - pos[j][0];
                const dy = pos[i][1] - pos[j][1];

                let [x1, y1] = [pos[i][0], pos[i][1]];
                do {
                    antinodes2.add([x1, y1].join(':'));
                    [x1, y1] = [x1 +  dx, y1 + dy];
                } while (x1 >=0 && x1 < map.length && y1 >=0 && y1 < map[0].length);

                let [x2, y2] = [pos[j][0], pos[j][1]];
                do {
                    antinodes2.add([x2, y2].join(':'));
                    [x2, y2] = [x2 - dx, y2 - dy];
                } while (x2 >= 0 && x2 < map.length && y2 >= 0 && y2 < map[0].length);
            }
        }
    });

    console.log(antinodes2.size);
});
