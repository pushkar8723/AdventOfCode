process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    // Get all points
    const points = lines.map(line => line.split(',').map(Number));
    
    // Part 1: Find the maximum area of rectangle formed by any two points
    // Initialize maxArea with 0
    let maxArea = 0;
    // Check all pairs of points
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            // Calculate area of rectangle formed by points[i] and points[j]
            const area = (Math.abs(points[i][0] - points[j][0]) + 1) * (Math.abs(points[i][1] - points[j][1]) + 1);

            // Update maxArea if current area is larger
            if (area > maxArea) {
                maxArea = area;
            }
        }
    }

    // Output the maximum area found
    console.log(maxArea);

    // Part 2: Find the maximum area of rectangle fully inside the shape formed by the points
    // Compress coordinates to minimize space
    // This reduces space from 10^12 to 248 x 248 = 61504
    // So now we can brute force the inside check.

    // Get unique sorted x and y coordinates
    const xs = Array.from(new Set(points.map(p => p[0]))).sort((a, b) => a - b);
    const ys = Array.from(new Set(points.map(p => p[1]))).sort((a, b) => a - b);

    // Map original coordinates to compressed indices
    const xMap = new Map();
    xs.forEach((x, index) => {
        xMap.set(x, index);
    });
    const yMap = new Map();
    ys.forEach((y, index) => {
        yMap.set(y, index);
    });

    // Initialize compressed map with '.'
    const compressedMap = new Array(xs.length).fill('.').map(() => new Array(ys.length).fill('.'));
    // Close the shape by adding the first point at the end
    points.push(points[0]);

    // Mark the borders of the shape with '#'
    for (let i = 1; i < points.length; i++) {
        // Get the two endpoints of the line segment
        const [x1, y1] = points[i - 1];
        const [x2, y2] = points[i];
        
        // If vertical line
        if (x1 === x2) {
            // Mark all points between y1 and y2
            for (let y = yMap.get(Math.min(y1, y2)); y <= yMap.get(Math.max(y1, y2)); y++) {
                compressedMap[xMap.get(x1)][y] = '#';
            }
        } else {
            // Horizontal line
            // Mark all points between x1 and x2
            for (let x = xMap.get(Math.min(x1, x2)); x <= xMap.get(Math.max(x1, x2)); x++) {
                compressedMap[x][yMap.get(y1)] = '#';
            }
        }
    }

    /**
     * Flood fill to mark outside area.
     * @param {number} x 
     * @param {number} y 
     * @returns 
     */
    const fill = (x, y) => {
        // If the point is on border or already filled, return
        if (compressedMap[x][y] !== '.') return;

        // BFS to fill all connected '.' with 'x'
        // Possible directions to move: right, left, down, up
        const directions = [[1,0], [-1,0], [0,1], [0,-1]];

        // Queue for BFS
        const q = [];
        // Visited set to avoid revisiting points
        const visited = new Set();

        // Start from (x, y)
        q.push([x, y]);
        visited.add(`${x},${y}`);

        while (q.length) {
            const [x, y] = q.shift();
            // Mark the point as outside
            compressedMap[x][y] = 'x';

            // Explore all 4 directions
            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;
                // If the new point is valid and not visited, add to queue
                if (compressedMap[nx]?.[ny] === '.' && !visited.has(`${nx},${ny}`)) {
                    q.push([nx, ny]);
                    visited.add(`${nx},${ny}`);
                }
            }
        }
    };

    // mark points outside the shape with 'x'.
    fill(0, 0);
    fill(0, compressedMap[0].length - 1);
    fill(compressedMap.length - 1, 0);
    fill(compressedMap.length - 1, compressedMap[0].length - 1);

    // console.log(compressedMap.map(row => row.join('')).join('\n'));

    /**
     * Move along the border of the rectangle and check if any point is 'x'.
     * i.e., outside the shape.
     * @param {number} x1
     * @param {number} y1 
     * @param {number} x2 
     * @param {number} y2 
     * @returns 
     */
    const checkInside = (x1, y1, x2, y2) => {
        // traverse the border in vertical and horizontal directions
        // if any point is 'x', return false
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            if (compressedMap[x][y1] === 'x' || compressedMap[x][y2] === 'x') {
                return false;
            }
        }
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            if (compressedMap[x1][y] === 'x' || compressedMap[x2][y] === 'x') {
                return false;
            }
        }

        // All border points are inside the shape, return true.
        return true;
    };

    // Initialize maxArea2 with 0
    let maxArea2 = 0;

    // Check all pairs of points again for the second part
    for (let i = 0; i < points.length -1; i++) {
        for (let j = 1; j < points.length -1; j++) {
            const [x1, y1] = points[i];
            const [x2, y2] = points[j];

            // Get compressed coordinates
            const cx1 = xMap.get(x1);
            const cy1 = yMap.get(y1);
            const cx2 = xMap.get(x2);
            const cy2 = yMap.get(y2);
            
            // Check if the rectangle formed by these two points is fully inside the shape
            if (checkInside(cx1, cy1, cx2, cy2)) {
                //calculate area
                const area = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);

                // Update maxArea2 if current area is larger
                if (area > maxArea2) {
                    maxArea2 = area;
                }
            }
        }
    }

    // Output the maximum area found for the second part
    console.log(maxArea2);
});
