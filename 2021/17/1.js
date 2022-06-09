process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const [x1, x2, y1, y2] = lines[0].match(/[-\d]+/g).map(i => parseInt(i));
    
    // Since the vertical and horizontal movement of probe is independent.
    // We can figure out min and max velocity in horizontal and vertical
    // direction and simulate the tragectory to get the answers.

    // Part 1
    // To calculate the max height, we need veritical velocity to be min(y) -1.
    // Then do a AP sum to figure out the max height.
    const n = Math.abs(y1) - 1;
    const maxY = n*(n+1)/2;
    console.log(maxY);

    // Part 2

    /**
     * Simulates the trajectory of the probe.
     * 
     * @param {number} x horizontal velocity 
     * @param {number} y vertical velocity
     * @returns {boolean} return true if the probe can reach the target
     */
    function simulate(x, y) {
        const curr = [0,0];
        const v = [x, y];
        while (curr[0] <= x2 && curr[1] >= y1) {
            if (curr[0] >= x1 && curr[0] <= x2 && curr[1] <= y2 && curr[1] >= y1) {
                return true;
            }
            curr[0] += v[0];
            curr[1] += v[1];
            v[0] -=  v[0] > 0 ? 1 : 0;
            v[1] -= 1;
        }

        return false;
    }

    // Max horizontal velocity can be x2 as the probe will reach the border of the
    // target area in 1 unit of time.
    const maxX = x2;

    // Min horizontal velocity will be the velocity at which when the horizontal
    // velocity reduces to 0, the probe has already crossed the start of target area.
    // We can calculate the AP sum of natural numbers, starting from 1 and the first
    // number for which AP sum crosses min x, that is the minimum horizontal velocity.
    let minX  = 0;
    for (let i = 1; i < maxX; i++) {
        const reach = i*(i+1)/2;
        if (reach >= x1) {
            minX = i;
            break;
        } 
    }

    // We now know the min and max horizontal velocity. We also know the max vertical velocity.
    // Min vertical velocity would be min y as that is the border of the target area and the
    // probe will reach it in one unit of time.

    // Hence we can now simulate the trajectory of the probe and check if can land in the target
    // area to figure out all the velocity.
    let count = 0;

    for (let i = minX; i <= maxX; i++) {
        for (let j = y1; j <= Math.abs(y1) - 1; j++) {
            if (simulate(i, j)) {
                count++;
                // console.log(i, j);
            }
        }
    }

    console.log(count);

});
