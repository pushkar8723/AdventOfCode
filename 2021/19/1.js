process.stdin.resume();
process.stdin.setEncoding('utf8');

class Point {
    /** @type {number} */
    x;
    /** @type {number} */
    y;
    /** @type {number} */
    z;

    /**
     * Creates a point with x, y and z coordinate.
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Swaps the x, y, z coordinate with the new coordinates
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    swap(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Rotates the point one of the 48 possible direction
     * @param {number} direction : ;
     */
    rotate(direction) {
        const d1 = Math.floor(direction / 8);
        const d2 = Math.floor(direction % 8);

        switch(d1) {
            default:
            case 0:
                this.swap(this.x, this.y, this.z);
                break;

            case 1:
                this.swap(this.x, this.z, this.y);
                break;

            case 2:
                this.swap(this.y, this.x, this.z);
                break;

            case 3:
                this.swap(this.y, this.z, this.x);
                break;

            case 4:
                this.swap(this.z, this.x, this.y);
                break;

            case 5:
                this.swap(this.z, this.y, this.x);
                break;
        }

        switch(d2) {
            default:
            case 0:
                this.swap(this.x * 1, this.y * 1, this.z * 1);
                break;
            case 1:
                this.swap(this.x * 1, this.y * 1, this.z * -1);
                break;
            case 2:
                this.swap(this.x * 1, this.y * -1, this.z * 1);
                break;
            case 3:
                this.swap(this.x * 1, this.y * -1, this.z * -1);
                break;
            case 4:
                this.swap(this.x * -1, this.y * 1, this.z * 1);
                break;
            case 5:
                this.swap(this.x * -1, this.y * 1, this.z * -1);
                break;
            case 6:
                this.swap(this.x * -1, this.y * -1, this.z * 1);
                break;
            case 7:
                this.swap(this.x * -1, this.y * -1, this.z * -1);
                break;
        }
    }

    /**
     * Translates the points by x, y, z
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    translate(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
    }
    
    /**
     * Returns true if x, y, z coordinates match in the given point.
     * @param {Point} point 
     */
    match(point) {
        return (this.x === point.x && this.y === point.y && this.z === point.z);
    }
}

class Scanner {
    /**
     * ID of the Scanners
     * @type {number}
     */
    id;
    /**
     * Location of the scanner
     * @type {Point}
     */
    origin = new Point(0, 0, 0);
    /**
     * Location of the beacons
     * @type {Point[]}
     */
    beacons = [];

    /**
     * Creates scanner with given number
     * 
     * @param {number} id 
     */
    constructor(id) {
        this.id = id;
    }

    /**
     * Adds beacon at point to the Scanner
     * 
     * @param {Point} point
     */
    addBeacon(point) {
        this.beacons.push(point);
    }

    /**
     * Returns new scanner with all the new direction.
     * @param {number} direction
     * @returns {Scanner}
     */
    getRotatedScanner(direction) {
        const newScanner = new Scanner(this.id);
        this.beacons.forEach(beacon => {
            const { x, y, z } = beacon;
            const newBeacon = new Point(x, y, z);
            newBeacon.rotate(direction);
            newScanner.addBeacon(newBeacon);
        });
        return newScanner;
    }

    /**
     * Translates Scanner and its beacon by the given x, y, z value.
     * @param {number} dx 
     * @param {number} dy 
     * @param {number} dz 
     */
    translate(dx, dy, dz) {
        const newScanner = new Scanner(this.id);
        newScanner.origin.translate(dx, dy, dz);
        this.beacons.forEach(beacon => {
            const { x, y, z } = beacon;
            const newBeacon = new Point(x, y, z);
            newBeacon.translate(dx, dy, dz);
            newScanner.addBeacon(newBeacon);
        });
        return newScanner;
    }

    /**
     * Returns true if 12 or more beacons match in the given scanner
     * @param {Scanner} scanner
     */
    match(scanner) {
        let matched = 0;
        for (let i in this.beacons) {
            for(let j in scanner.beacons) {
                if (this.beacons[i].match(scanner.beacons[j])) {
                    matched++;
                    if (matched === 12) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    
    /**
     * List of original Scanners;
     * @type {Scanner[]}
     */
    const scanners = [];
    let currentScanner;

    lines.forEach((line) => {
        if (line.startsWith('---')) {
            currentScanner = new Scanner(parseInt(line.match(/\d+/g)[0]));
            scanners.push(currentScanner);
        } else {
            const [x, y, z] = line.split(',').map(item => parseInt(item));
            currentScanner.addBeacon(new Point(x, y, z));
        }
    });

    const goodScanners = [scanners[0]];
    const badScanners = scanners.slice(1);

    const tryMatch = (scannerA, scannerB) => {
        for (let k = 0; k < 48; k++) {
            for (let l = 0; l < scannerB.beacons.length; l++) {
                for (let m = 0; m < scannerA.beacons.length; m++) {
                    const rotatedScanner = scannerB.getRotatedScanner(k);
                    const dx = scannerA.beacons[m].x - rotatedScanner.beacons[l].x;
                    const dy = scannerA.beacons[m].y - rotatedScanner.beacons[l].y;
                    const dz = scannerA.beacons[m].z - rotatedScanner.beacons[l].z;
                    const translatedScanner = rotatedScanner.translate(dx, dy, dz);
                    if (scannerA.match(translatedScanner)) {
                        console.log('Scanner', scannerA.id, 'matched with Scanner', scannerB.id, 'rotated in direction', k, 'and translated by', dx, dy, dz);
                        return translatedScanner;
                    }
                }
            }
        }
        return null;
    }

    let i = 0;

    while(badScanners.length > 0) {
        const scannerA = goodScanners[i];
        for (let j = 0; j < badScanners.length; j++) {
            const scannerB = badScanners[j];
            const result = tryMatch(scannerA, scannerB);
            if (result) {
                goodScanners.push(result);
                badScanners.splice(j, 1);
                j--;
            }
        }
        console.log(badScanners.length, 'scanners left');
        i++;
    }

    const beaconsSet = new Set();
    goodScanners.forEach(scanner => {
        scanner.beacons.forEach(beacon => {
            const { x, y, z } = beacon;
            const str = `${x},${y},${z}`;
            if (!beaconsSet.has(str)) {
                beaconsSet.add(str);
            }
        });
    });

    console.log(beaconsSet.size);

    let maxDist = 0;
    for (let i = 0; i < goodScanners.length; i++) {
        for (let j = i+1; j < goodScanners.length; j++) {
            const dist = Math.abs(goodScanners[i].origin.x - goodScanners[j].origin.x) + Math.abs(goodScanners[i].origin.y - goodScanners[j].origin.y) + Math.abs(goodScanners[i].origin.z - goodScanners[j].origin.z);
            if (dist > maxDist) {
                maxDist = dist;
            }
        }
    }
    console.log(maxDist);
});
