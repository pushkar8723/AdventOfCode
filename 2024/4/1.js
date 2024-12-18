process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);

    const map = lines.map(line => line.split(''));

    // Write your code here
    const directions = [
        [[0, 0], [0, 1], [0, 2], [0, 3]],
        [[0, 0], [1, 0], [2, 0], [3, 0]],
        [[0, 0], [1, 1], [2, 2], [3, 3]],
        [[0, 3], [1, 2], [2, 1], [3, 0]],
    ];

    const getPoint = (x, y) => {
        return map?.[x]?.[y] || '';
    };

    let count = 0;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            directions.forEach(d => {
                const str = [
                    getPoint(i + d[0][0], j + d[0][1]),
                    getPoint(i + d[1][0], j + d[1][1]),
                    getPoint(i + d[2][0], j + d[2][1]),
                    getPoint(i + d[3][0], j + d[3][1]),
                ].join('');
                if (str === 'XMAS' || str === 'SAMX') {
                    count++;
                }
            });
        }
    }

    console.log(count);

    let count1 = 0;
    const x = [
        [[0,0], [1,1], [2,2]],
        [[2,0], [1,1], [0,2]]
    ];

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            const str1 = [
                getPoint(i + x[0][0][0], j + x[0][0][1]),
                getPoint(i + x[0][1][0], j + x[0][1][1]),
                getPoint(i + x[0][2][0], j + x[0][2][1]),
            ].join('');
            const str2 = [
                getPoint(i + x[1][0][0], j + x[1][0][1]),
                getPoint(i + x[1][1][0], j + x[1][1][1]),
                getPoint(i + x[1][2][0], j + x[1][2][1]),
            ].join('');
            if ((str1 === 'MAS' || str1 === 'SAM') && (str2 === 'MAS' || str2 === 'SAM')) {
                count1++;
            }
        }
    }

    console.log(count1);
});
