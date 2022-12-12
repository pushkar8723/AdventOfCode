process.stdin.resume();
process.stdin.setEncoding('utf8');

class Cuboid {
    /**
     * Cooridates of the Cuboids
     */
    x1; x2; y1; y2; z1; z2;

    /**
     * Creates Cuboid with x1,x2; y1,y2 and z1,z2 coordinates 
     * 
     * @param {number} x1 
     * @param {number} x2 
     * @param {number} y1 
     * @param {number} y2 
     * @param {number} z1 
     * @param {number} z2 
     */
    constructor(x1, x2, y1, y2, z1, z2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.z1 = z1;
        this.z2 = z2;
    }

    /**
     * Checks if current cuboid intersects the given cuboid
     * 
     * @param {Cuboid} cuboid
     * @returns {boolean}
     */
    intersects(cuboid) {
        return (
            ((this.x1 <= cuboid.x1 && cuboid.x1 <= this.x2) || (cuboid.x1 <= this.x1 && this.x1 <= cuboid.x2)) &&
            ((this.y1 <= cuboid.y1 && cuboid.y1 <= this.y2) || (cuboid.y1 <= this.y1 && this.y1 <= cuboid.y2)) &&
            ((this.z1 <= cuboid.z1 && cuboid.z1 <= this.z2) || (cuboid.z1 <= this.z1 && this.z1 <= cuboid.z2))
        );
    }
    
    /**
     * Checks if current cuboid contains the given cuboid
     * @param {Cuboid} cuboid
     * @returns {boolean} 
     */
    contains(cuboid)  {
        return (
            (this.x1 <= cuboid.x1 && cuboid.x2 <= this.x2) &&
            (this.y1 <= cuboid.y1 && cuboid.y2 <= this.y2) &&
            (this.z1 <= cuboid.z1 && cuboid.z2 <= this.z2)
        );
    }

    /**
     * Generates smaller cuboids using the cooridates of
     * current cubiod and the given cuboids such each smaller
     * cuboid will be completely inside or outside all of the
     * larger cuboid.
     * 
     * @param {Cuboid[]} cuboids
     * @returns {Cuboid[]}
     */
    generateCuboids(cuboids) {
        let xcords = [];
        let ycords = [];
        let zcords = [];
        for (const cuboid of cuboids) {
            xcords.push(cuboid.x1, cuboid.x2);
            ycords.push(cuboid.y1, cuboid.y2);
            zcords.push(cuboid.z1, cuboid.z2);
        }
        xcords = xcords.sort((a, b) => a - b);
        ycords = ycords.sort((a, b) => a - b);
        zcords = zcords.sort((a, b) => a - b);

        const ret = [];
        for (let i = 1; i < xcords.length; i++) {
            for (let j = 1; j < ycords.length; j++) {
                for (let k = 1; k < zcords.length; k++) {
                    ret.push(new Cuboid(xcords[i - 1], xcords[i], ycords[j - 1], ycords[j], zcords[k - 1], zcords[k]));
                }
            }
        }
        return;
    }
}

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const regex = /(on|off) x=([-\d]+)..([-\d]+),y=([-\d]+)..([-\d]+),z=([-\d]+)..([-\d]+)/;
    let onCuboids = [];
    lines.forEach(line => {
        const [op, x1, x2, y1, y2, z1, z2] = regex.exec(line).slice(1).map((i, idx) => idx > 0 ? parseInt(i) : i);
        console.log(op, x1, x2, y1, y2, z1, z2);
    });
    
});
