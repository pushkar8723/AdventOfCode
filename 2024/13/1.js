process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const testcases = chunk.toString().split('\n\n').filter(item => item);

    let ans1 = 0;
    let ans2 = 0;
    testcases.forEach(testcase => {
        const [buttonA, buttonB, prize] = testcase.split('\n');
        const [_, xA, yA] = buttonA.match(/Button A: X\+(\d+), Y\+(\d+)/);
        const [__, xB, yB] = buttonB.match(/Button B: X\+(\d+), Y\+(\d+)/);
        const [___, xP, yP] = prize.match(/Prize: X=(\d+), Y=(\d+)/);

        const [x1, y1, x2, y2, xt, yt] = [xA, yA, xB, yB, xP, yP].map(Number);

        const b1 = ((yt * x1) - (y1 * xt))/((x1 * y2) - (y1 * x2));
        const a1 = (xt - (b1 * x2))/x1;

        const b2 = (((yt + 10000000000000) * x1) - (y1 * (xt + 10000000000000)))/((x1 * y2) - (y1 * x2));
        const a2 = ((xt + 10000000000000) - (b2 * x2))/x1;

        if (Number.isInteger(a1) && Number.isInteger(b1)) {
            ans1 += 3 * a1 + b1;
        }

        if (Number.isInteger(a2) && Number.isInteger(b2)) {
            ans2 += 3 * a2 + b2;
        }
    });
    console.log(ans1);
    console.log(ans2);
});
