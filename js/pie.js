// pie.js



function updateLegend(legendElement, values, colors, labels = ['נטו','מס הכנסה','מס בריאות','ביטוח לאומי','פנסיה חובה','קרן השתלמות']) {
  legendElement.innerHTML = '';
  const total = values.reduce((a, b) => a + b, 0);

  values.forEach((value, i) => {
    const percentage = ((value / total) * 100).toFixed(0);
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.marginBottom = '4px';

    const colorBox = document.createElement('span');
    colorBox.style.display = 'inline-block';
    colorBox.style.width = '12px';
    colorBox.style.height = '12px';
    colorBox.style.borderRadius = '50%';
    colorBox.style.backgroundColor = colors[i];
    colorBox.style.marginRight = '8px';

    div.appendChild(colorBox);
    div.appendChild(document.createTextNode(`${labels[i]} - ${percentage}%`));

    legendElement.appendChild(div);
  });
}



function drawPieChartAnimated(ctx, values, colors, legend) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const total = values.reduce((sum, v) => sum + v, 0);
  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10;

  // עדכון לג'נד עם אחוזים
  legend.innerHTML = '';
  const labels = ['נטו','מס הכנסה','מס בריאות','ביטוח לאומי','פנסיה חובה','קרן השתלמות'];
  for (let i = 0; i < values.length; i++) {
    const percentage = ((values[i] / total) * 100).toFixed(0);
    const div = document.createElement('div');
    div.innerHTML = `<span class="color-box" style="background:${colors[i]}"></span>${labels[i]} - ${percentage}%`;
    legend.appendChild(div);
  }

  const sliceAngles = values.map(v => (v / total) * 2 * Math.PI);
  let currentIndex = 0;
  let startAngle = 0;
  let currentProgress = 0;

  function animateSlice() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let tempStart = 0;
    for (let i = 0; i < currentIndex; i++) {
      // ציור פרוסות שכבר הושלמו
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, tempStart, tempStart + sliceAngles[i]);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();

      // אחוזים מעל כל פרוסה
      const angle = tempStart + sliceAngles[i]/2;
      const x = centerX + Math.cos(angle) * radius * 0.6;
      const y = centerY + Math.sin(angle) * radius * 0.6;
      ctx.fillStyle = '#000';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const percent = ((values[i]/total)*100).toFixed(0) + '%';
      ctx.fillText(percent, x, y);

      tempStart += sliceAngles[i];
    }

    // ציור פרוסה נוכחית עם התקדמות
    if (currentIndex < values.length) {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngles[currentIndex] * currentProgress);
      ctx.closePath();
      ctx.fillStyle = colors[currentIndex];
      ctx.fill();

      // אחוז זמני מעל הפרוסה הנוכחית
      const angle = startAngle + sliceAngles[currentIndex]*currentProgress/2;
      const x = centerX + Math.cos(angle) * radius * 0.6;
      const y = centerY + Math.sin(angle) * radius * 0.6;
      ctx.fillStyle = '#000';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const percent = ((values[currentIndex]/total)*100*currentProgress).toFixed(0) + '%';
      ctx.fillText(percent, x, y);

      currentProgress += 0.03; // מהירות האנימציה
      if (currentProgress < 1) {
        requestAnimationFrame(animateSlice);
      } else {
        // מעבר לפרוסה הבאה
        startAngle += sliceAngles[currentIndex];
        currentIndex++;
        currentProgress = 0;
        if (currentIndex < values.length) requestAnimationFrame(animateSlice);
      }
    }
  }

  animateSlice();
}


