process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    
    let listA = [];
    let listB = [];
    lines.forEach(line => {
        const [a, b] = line.split('   ').map(i => parseInt(i));
        listA.push(a);
        listB.push(b);
    });

    listA = listA.sort((a, b) => a - b);
    listB = listB.sort((a, b) => a - b);

    let diffSum = 0;
    const count = new Map();
    for (let i = 0; i < listA.length; i++) {
        diffSum += Math.abs(listB[i] - listA[i]);
        if (count.has(listB[i])) {
            count.set(listB[i], count.get(listB[i]) + 1);
        } else {
            count.set(listB[i], 1);
        }
    }
    console.log(diffSum);

    let productSum = 0;
    for (let i = 0; i < listA.length; i++) {
        if (count.has(listA[i])) {
            productSum += listA[i] * count.get(listA[i]);
        }
    }

    console.log(productSum);
});
