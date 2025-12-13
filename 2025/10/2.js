const { init } = require("z3-solver");

async function solve(B, C) {
  const { Context } = await init();
  const ctx = new Context("main");

  const m = B.length;        // number of A variables
  const n = C.length;        // number of equations

  // Create integer variables A0, A1, ...
  const A = Array.from({ length: m }, (_, i) =>
    ctx.Int.const(`a${i}`)
  );

  const opt = new ctx.Optimize();

  // Constraint: A[i] >= 0
  for (let i = 0; i < m; i++) {
    opt.add(A[i].ge(0));
  }

  // Constraint: A * B = C
  for (let j = 0; j < n; j++) {
    let expr = ctx.Int.val(0);
    for (let i = 0; i < m; i++) {
      if (B[i][j] !== 0) {
        expr = expr.add(A[i].mul(B[i][j]));
      }
    }
    opt.add(expr.eq(ctx.Int.val(C[j])));
  }

  // Objective: minimize sum(A)
  const sumA = A.reduce(
    (acc, a) => acc.add(a),
    ctx.Int.val(0)
  );

  opt.minimize(sumA);

  // Solve
  const result = await opt.check();
  if (result !== "sat") {
    return null;
  }

  const model = opt.model();

  return A.map(a => Number(model.get(a).toString()));
}

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', async function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    let part2 = 0;

    for (const [index, line] of lines.entries()) {
        console.log('Processing line:', index + 1);
        const tokens = line.split(' ');
        const lights = tokens[0].replace(/\[|\]/g, '');
        const joultage = tokens[tokens.length - 1].replace(/\{|\}/g, '').split(',').map(Number);
        const buttonGroups = tokens.slice(1, tokens.length - 1).map(item => item.replace(/\(|\)/g, '').split(',').map(Number));

        const B = buttonGroups.map(btns => {
            const returnArray = Array.from({ length: lights.length }).fill(0);
            btns.forEach(b => { returnArray[b] = 1; });
            return returnArray;
        });

        // console.log('B:', B);
        // console.log('C:', joultage);

        const solved = await solve(B, joultage);

        // console.log('A:', solved);

        const sum = solved.reduce((a, b) => a + b, 0);

        console.log('Sum of coefficients:', sum);
        part2 += sum;
    }
    
    console.log('Part 2:', part2);
});