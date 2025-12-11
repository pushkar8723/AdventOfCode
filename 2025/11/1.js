process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    // Create adjacency list from input
    const map = new Map();
    lines.forEach(line => {
        const [source, ...targets] = line.split(/[:\s]+/);
        map.set(source, targets);
    });
    
    // DFS with memoization to count paths
    let memorize;

    // DFS function to count paths from node to dest
    const dfs = (node, dest, visited) => {
        // if already computed, return stored value
        if (memorize.has(node)) {
            return memorize.get(node);
        }

        // if already visited, return 0 to avoid cycles
        if (visited.has(node)) {
            return 0;
        }

        // if reached destination, count as 1 path
        if (node === dest) {
            return 1;
        }

        // recursively explore neighbors
        // sum paths from all neighbors
        const neighbors = map.get(node) || [];
        const ans = neighbors.reduce((acc, neighbor) => acc + dfs(neighbor, dest, new Set([...visited, node])), 0);
        
        // store computed value
        memorize.set(node, ans);

        // return total paths from node to dest
        return ans;
    }

    // Part 1: Count paths from 'you' to 'out'
    memorize = new Map();
    console.log(dfs('you', 'out', new Set()));

    // Part 2: Count paths through two routes: svr->dac->fft->out and svr->fft->dac->out

    // Count path from svr to dac
    memorize = new Map();
    const svrToDac = dfs('svr', 'dac', new Set());

    // Count path from dac to fft
    memorize = new Map();
    const dacToFft = dfs('dac', 'fft', new Set());

    // Count path from fft to out
    memorize = new Map();
    const fftToOut = dfs('fft', 'out', new Set());

    // --- //

    // Count path from svr to fft
    memorize = new Map();
    const svrToFft = dfs('svr', 'fft', new Set());
    
    // Count path from fft to dac
    memorize = new Map();
    const fftToDac = dfs('fft', 'dac', new Set());

    // Count path from dac to out
    memorize = new Map();
    const dacToOut = dfs('dac', 'out', new Set());

    // Total paths is sum of both route combinations
    const totalPaths = (svrToDac * dacToFft * fftToOut) + (svrToFft * fftToDac * dacToOut);

    // Answer for part 2
    console.log(totalPaths);
});
