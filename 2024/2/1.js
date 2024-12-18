process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const reports = lines.map(line => line.split(' ').map(i => parseInt(i)));
    const reportStatus = new Array(reports.length);

    reports.forEach((report, index) => {
        const direction = (report[1] - report[0])/Math.abs(report[1] - report[0]);
        let i;
        for (i = 1; i < report.length; i++) {
            const magnitude = Math.abs(report[i] - report[i - 1]);
            const currDirec = (report[i] - report[i - 1])/Math.abs(report[i] - report[i - 1]);

            if (currDirec === direction && magnitude >= 1 && magnitude <= 3) {
                continue;
            } else {
                break;
            }
        }
        if (i === report.length) {
            reportStatus[index] = 1
        } else {
            reportStatus[index] = 0;
        }
        
    });

    console.log(reportStatus.filter(i => i === 1).length);
});
