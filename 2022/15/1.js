process.stdin.resume();
process.stdin.setEncoding('utf8');

const CHECK_SPACE = 2000000;
const SPACE = 4000000;

class Sensor {
    x; y; bx; by; dist;

    constructor(x, y, dist, bx, by) {
        this.x = x;
        this.y = y;
        this.dist = dist;
        this.bx = bx;
        this.by = by;
    }
}

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here

    const sensors = [];

    lines.forEach(line => {
        const [x, y, bx, by] = line.match(/[-\d]+/g).map(i => parseInt(i));
        const dist = Math.abs(x - bx) + Math.abs(y - by);
        sensors.push(new Sensor(x, y, dist, bx, by));
    });

    // console.log(sensors);

    const check = (y) => {
        let ranges = [];
        let beaconsAt = new Set();
        sensors.forEach(sensor => {
            const sensorDist = Math.abs(sensor.y - y);
            if (sensorDist <= sensor.dist) {
                const range = sensor.dist - sensorDist;
                ranges.push([sensor.x - range, sensor.x + range]);
            }
            if (sensor.by === y) {
                beaconsAt.add(sensor.bx);
            }
        });
        ranges = ranges.sort((a, b) => {
            if (a[0] - b[0] != 0) {
                return a[0] - b[0];
            } else {
                return a[1] - b[1];
            }
        });
        
        let sum = 0;
        let prev = -Infinity;
        for (let range of ranges) {
            const [x, y] = range;
            if (prev < x) {
                sum += y - x + 1;
                prev = y;
            } else if (prev === x) {
                sum += y - x;
                prev = y;
            } else {
                if (prev < y) {
                    sum += y - prev;
                    prev = y;
                }
            }
        }
        console.log(sum - beaconsAt.size);
    }

    check(CHECK_SPACE);

    const check2 = (y) => {
        let ranges = [];
        sensors.forEach(sensor => {
            const sensorDist = Math.abs(sensor.y - y);
            if (sensorDist <= sensor.dist) {
                const range = sensor.dist - sensorDist;
                ranges.push([sensor.x - range, sensor.x + range]);
            }
        });
        ranges = ranges.sort((a, b) => {
            if (a[0] - b[0] != 0) {
                return a[0] - b[0];
            } else {
                return a[1] - b[1];
            }
        });
        
        let sum = 0;
        let prev = 0;
        for (let range of ranges) {
            const [x, y] = range;
            if (prev < x) {
                sum += y - x + 1;
                prev = y;
            } else if (prev === x) {
                sum += y - x;
                prev = y;
            } else {
                if (prev < y) {
                    sum += y - prev;
                    prev = y;
                }
            }

            if (prev > SPACE) {
                sum -= prev - SPACE;
                break;
            }
        }
        return sum;
    }

    const findY = () => {
        for (let i = 0; i <= SPACE; i++) {
            const sum = check2(i);
            if (sum < SPACE) {
                return i;
            }
        }
    }

    const y = findY();

    const findX = (y) => {
        let ranges = [];
        sensors.forEach(sensor => {
            const sensorDist = Math.abs(sensor.y - y);
            if (sensorDist <= sensor.dist) {
                const range = sensor.dist - sensorDist;
                ranges.push([sensor.x - range, sensor.x + range]);
            }
        });
        ranges = ranges.sort((a, b) => {
            if (a[0] - b[0] !== 0) {
                return a[0] - b[0];
            } else {
                return a[1] - b[1];
            }
        });
        // console.log(ranges);
        for (let i = 1; i < ranges.length; i++) {
            if (ranges[i][0] - ranges[i - 1][1] === 2) {
                return ranges[i - 1][1] + 1;
            }
        }
    }

    const x = findX(y);
    console.log(x*4000000 + y);
});
