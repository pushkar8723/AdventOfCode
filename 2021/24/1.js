process.stdin.resume();
process.stdin.setEncoding('utf8');

class Machine {
    register = {
        w: 0,
        x: 0,
        y: 0,
        z: 0
    };

    getRegister() {
        return { ...this.register };
    }
    
    setRegister(reg) {
        this.register = { ...reg };
    }

    add(a, b) {
        const x = this.register[a];
        const y = /[wxyz]/.test(b) ? this.register[b] : parseInt(b);
        // console.log(a, b, x, y); 
        this.register[a] = x + y;
    }

    mul(a, b) {
        const x = this.register[a];
        const y = /[wxyz]/.test(b) ? this.register[b] : parseInt(b);
        // console.log(a, b, x, y);
        this.register[a] = x * y;
    }

    div(a, b) {
        const x = this.register[a];
        const y = /[wxyz]/.test(b) ? this.register[b] : parseInt(b);
        // console.log(a, b, x, y);
        this.register[a] = Math.floor(x / y);
    }

    mod(a, b) {
        const x = this.register[a];
        const y = /[wxyz]/.test(b) ? this.register[b] : parseInt(b);
        // console.log(a, b, x, y);
        this.register[a] = x % y;
    }

    eql(a, b) {
        const x = this.register[a];
        const y = /[wxyz]/.test(b) ? this.register[b] : parseInt(b);
        // console.log(a, b, x, y);
        this.register[a] = x === y ? 1 : 0;
    }

    inpt(a, v) {
        this.register[a] = v;
    }
}

const ans = 0;

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const inp = [9, 6, 2, 9, 9, 8, 9, 6, 4, 4, 9, 9, 9, 7];

    const m = new Machine();
    lines.forEach(line => {
        const [ins, a, b] = line.split(' ');
        // console.log(ins, a, b);
        if (ins === 'add') {
            m.add(a, b);
        } else if (ins === 'mul') {
            m.mul(a, b);
        } else if (ins === 'div') {
            m.div(a, b);
        } else if (ins === 'mod') {
            m.mod(a, b);
        } else if (ins === 'eql') {
            m.eql(a, b);
        } else {
            console.log(m.register.z);
            m.inpt(a, inp.shift());
        }
    });
    console.log(m.register.z);
});
