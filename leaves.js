/* Falling maple-leaf particle layer over the hero artwork. Original code. */
(function () {
  const COLORS = ['#c33b25', '#d9542f', '#e06a35', '#e8a33d', '#b63320'];
  const LOBES = [[-90, 1], [-52, .52], [-38, .78], [-16, .38], [0, .62], [16, .38], [38, .78], [52, .52], [90, .55]];
  function leafShape(c, x, y, s, rot, squash, color) {
    c.save(); c.translate(x, y); c.rotate(rot); c.scale(1, squash);
    c.fillStyle = color; c.beginPath(); c.moveTo(0, s * 0.25);
    for (const [deg, r] of LOBES) {
      const a = deg * Math.PI / 180;
      c.lineTo(Math.cos(a) * s * r, Math.sin(a) * s * r);
    }
    c.lineTo(0, s * 0.25); c.closePath(); c.fill();
    c.strokeStyle = color; c.lineWidth = Math.max(.8, s * 0.13); c.lineCap = 'round';
    c.beginPath(); c.moveTo(0, s * 0.2); c.lineTo(0, s * 0.8); c.stroke();
    c.restore();
  }
  window.initHeroLeaves = function (canvas) {
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W, H, DPR, leaves = [], running = true;
    const rnd = (a, b) => a + Math.random() * (b - a);
    function size() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    function spawn(anywhere) {
      return {
        x: rnd(W * 0.35, W * 1.05), y: anywhere ? rnd(-20, H * 0.7) : rnd(-50, -12),
        s: rnd(5, 11), rot: rnd(0, Math.PI * 2), vr: rnd(-.025, .025),
        vy: rnd(16, 34), sway: rnd(22, 55), phase: rnd(0, Math.PI * 2),
        fl: rnd(1.5, 3), // flutter speed
        c: COLORS[(Math.random() * COLORS.length) | 0]
      };
    }
    function frame(t) {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < leaves.length; i++) {
        const lf = leaves[i];
        lf.y += lf.vy / 60; lf.rot += lf.vr;
        lf.x += Math.sin(t * 1.3 + lf.phase) * lf.sway / 60 - 0.3;
        const squash = 0.35 + 0.65 * Math.abs(Math.sin(t * lf.fl + lf.phase)); // flutter
        if (lf.y > H + 16 || lf.x < W * 0.28) leaves[i] = spawn(false);
        else leafShape(ctx, lf.x, lf.y, lf.s, lf.rot, squash, lf.c);
      }
    }
    size();
    window.addEventListener('resize', size);
    const n = W < 600 ? 9 : 16;
    for (let i = 0; i < n; i++) leaves.push(spawn(true));
    if (reduced) { frame(1.2); return; }
    const loop = now => { if (running) { frame(now / 1000); requestAnimationFrame(loop); } };
    const io = new IntersectionObserver(e => {
      const vis = e[0].isIntersecting;
      if (vis && !running) { running = true; requestAnimationFrame(loop); } else if (!vis) running = false;
    });
    io.observe(canvas);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) running = false;
      else if (!running) { running = true; requestAnimationFrame(loop); }
    });
    requestAnimationFrame(loop);
  };
})();
