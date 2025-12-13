process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const parts = chunk.toString().split('\n\n').filter(item => item);
    const tests = parts.splice(-1, 1);
    const sizes = parts.map(part => part.match(/#/g).length);
    
    let ans = 0;

    tests[0].split('\n').filter(i => i).forEach((test) => {
        const [dimensions, presents] = test.split(': ');

        // console.log(dimensions, '::', presents);
        const [width, height] = dimensions.split('x').map(Number);
        const presentsCount = presents.split(' ').map(Number);

        const area = width * height
        const presentsSum = presentsCount.reduce((acc, count, index) => acc + count * sizes[index], 0);

        if (area >= presentsSum) {
            ans++;
            // console.log(area, presentsSum);
        }
    });

    console.log(ans);
});
