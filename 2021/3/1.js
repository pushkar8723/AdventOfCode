process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    let gamma = ``;
    let epsilon = ``;
    for (let i = 0; i < lines[0].length; i++) {
        let c0 = 0;
        let c1 = 0;
        lines.forEach(line => {
            if (line[i] === '0') {
                c0++;
            } else {
                c1++;
            }
        });
        if (c0 > c1) {
            gamma = `${gamma}0`;
            epsilon = `${epsilon}1`;
        } else {
            gamma = `${gamma}1`;
            epsilon = `${epsilon}0`;
        }
    }
    console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));

    const mostCommon = (arr, position) => {
        let c0 = 0;
        let c1 = 0;
        arr.forEach(item => {
            if (item[position] === '0') {
                c0++;
            } else {
                c1++;
            }
        });
        if (c0 > c1) {
            return '0';
        } else {
            return '1';
        }
    }

    const leastCommon = (arr, position) => {
        let c0 = 0;
        let c1 = 0;
        arr.forEach(item => {
            if (item[position] === '0') {
                c0++;
            } else {
                c1++;
            }
        });
        if (c1 < c0) {
            return '1';
        } else {
            return '0';
        }
    }

    const filter = (arr, position, req) => {
        return arr.filter(item => item[position] === req);
    }

    const getO2Ratting = (arr) => {
        let position = 0;
        while (arr.length > 1) {
            const keep = mostCommon(arr, position);
            arr = filter(arr, position, keep);
            position++;
        }
        return arr[0];
    }

    const getCO2Ratting = (arr) => {
        let position = 0;
        while (arr.length > 1) {
            const keep = leastCommon(arr, position);
            arr = filter(arr, position, keep);
            position++;
        }
        return arr[0];
    }

    const O2 = getO2Ratting([...lines]);
    const CO2 = getCO2Ratting([...lines]);
    console.log(parseInt(O2, 2) * parseInt(CO2, 2));
});
