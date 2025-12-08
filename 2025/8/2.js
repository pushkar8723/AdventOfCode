process.stdin.resume();
process.stdin.setEncoding('utf8');

/**
 * Got union find implementation from:
 * https://www.geeksforgeeks.org/dsa/introduction-to-disjoint-set-data-structure-or-union-find-algorithm/
 */
class UnionFind {
    constructor(n) {
        this.Parent = Array.from({ length: n }, (_, i) => i);
        this.Size = Array(n).fill(1);
    }

    // Function to find the representative (or the root
    // node) for the set that includes i
    find(i) {
        
        let root = this.Parent[i];
    
        if (this.Parent[root] !== root) {
            return this.Parent[i] = this.find(root);
        }
        
        return root;
    }

    // Unites the set that includes i and the set that
    // includes j by size
    unionBySize(i, j) {
        // Find the representatives (or the root nodes) for
        // the set that includes i
        const irep = this.find(i);

        // And do the same for the set that includes j
        const jrep = this.find(j);

        // Elements are in the same set, no need to unite
        // anything.
        if (irep === jrep) return;

        // Get the size of i’s tree
        const isize = this.Size[irep];

        // Get the size of j’s tree
        const jsize = this.Size[jrep];

        // If i’s size is less than j’s size
        if (isize < jsize) {
            // Then move i under j
            this.Parent[irep] = jrep;

            // Increment j's size by i's size
            this.Size[jrep] += this.Size[irep];
        } else {
            // Then move j under i
            this.Parent[jrep] = irep;

            // Increment i's size by j's size
            this.Size[irep] += this.Size[jrep];
        }
    }
}


process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    // Parse input junction box coordinates
    const junctionBoxes = lines.map(line => line.split(',').map(Number));

    // Initialize distance matrix
    const distances = Array.from({ length: junctionBoxes.length }, () => Array(junctionBoxes.length).fill(0));
    // Array to hold all distances
    let distanceArray = [];
    // Map to store distances and their corresponding junction box pairs
    const distanceMap = new Map();

    // Calculate distances between all pairs of junction boxes
    for (let i = 0; i < junctionBoxes.length; i++) {
        for (let j = i + 1; j < junctionBoxes.length; j++) {
            const [x1, y1, z1] = junctionBoxes[i];
            const [x2, y2, z2] = junctionBoxes[j];
    
            const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
            distances[i][j] = distance;
            distances[j][i] = distance;
            distanceArray.push(distance);
            distanceMap.set(distance, [i, j]);
        }
    }

    // Sort distances in ascending order
    distanceArray = distanceArray.sort((a, b) => a - b);

    // Initialize Union-Find structure
    const uf = new UnionFind(junctionBoxes.length);

    // Last connection made
    let lastConnection;

    // Connect junction boxes using the smallest distances until all are connected
    for(let i = 0; i < distanceArray.length; i++) {
        const [x, y] = distanceMap.get(distanceArray[i]);
        uf.unionBySize(x, y);
        lastConnection = [x, y];

        let sets = new Set();
        for (let j = 0; j < junctionBoxes.length; j++) {
            sets.add(uf.find(j));
        }

        if (sets.size === 1) {
            console.log(`All junction boxes are connected with maximum distance: ${distanceArray[i]}`);
            break;
        }
    }

    // Output the product of the x-coordinates of the last connected junction boxes
    console.log(junctionBoxes[lastConnection[0]][0] * junctionBoxes[lastConnection[1]][0]);
});
