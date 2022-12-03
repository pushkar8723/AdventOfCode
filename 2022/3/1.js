process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    
    let sum = 0;
    lines.forEach(line => {
        const mid = Math.floor(line.length/2);
        const part1 = line.substring(0, mid).split('');
        const part2 = line.substring(mid).split('');
        const common = part1.find(char => part2.includes(char));
        sum += common >= 'a' && common <= 'z' ? common.charCodeAt(0) - 96 : common.charCodeAt(0) - 38;
    });
    console.log(sum);

    sum = 0;
    for (i = 0; i < lines.length; i += 3) {
        const line1 = lines[i].split('');
        const line2 = lines[i+1].split('');
        const line3 = lines[i+2].split('');
        const common = line1.find(char => line2.includes(char) && line3.includes(char));
        sum += common >= 'a' && common <= 'z' ? common.charCodeAt(0) - 96 : common.charCodeAt(0) - 38;
    }
    console.log(sum);
});
