var drawCustomShape = function (ctx, fillStyle, topLeftX, topLeftY, width, height) {
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.moveTo(topLeftX, topLeftY);
  ctx.lineTo(topLeftX + width - 20, topLeftY);
  ctx.lineTo(topLeftX + width, topLeftY + 20);
  ctx.lineTo(topLeftX + width, topLeftY + height - 10);
  ctx.arcTo(topLeftX + width, topLeftY + height, topLeftX + width - 10, topLeftY + height, Math.SQRT2 * 10);
  ctx.lineTo(topLeftX + 10, topLeftY + height);
  ctx.arcTo(topLeftX, topLeftY + height, topLeftX, topLeftY + height - 10, Math.SQRT2 * 10);
  ctx.closePath();
  ctx.fill();
}

var drawCloud = function (ctx) {
  var topLeftX = 100;
  var topLeftY = 10;
  var width = 420;
  var height = 270;

  drawCustomShape(ctx, 'rgba(0, 0, 0, 0.7)', topLeftX + 10, topLeftY + 10, width, height);
  drawCustomShape(ctx, '#ffffff', topLeftX, topLeftY, width, height);
}

var drawTitle = function (ctx, title) {
  var lineStartX = 130;
  var lineStartY = 50;
  var lineHeight = 20;
  var lines = title.split('\n');

  ctx.fillStyle = '#000000';
  ctx.font = '16px "PT Mono"';

  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], lineStartX, lineStartY + i * lineHeight);
  }
}

var drawBar = function (ctx, name, time, bottomLeftX, bottomLeftY, barStep, barWidth, barColor, lineHeight) {
  ctx.fillStyle = '#000000';
  ctx.fillText(name, bottomLeftX, bottomLeftY);

  var barHeight = time * barStep;
  ctx.fillStyle = barColor;
  ctx.fillRect(bottomLeftX, bottomLeftY - lineHeight - barHeight, barWidth, barHeight);

  ctx.fillStyle = '#000000';
  ctx.fillText(Math.round(time), bottomLeftX, bottomLeftY - barHeight - lineHeight * 1.5);
}

window.renderStatistics = function (ctx, names, times) {
  var histogramHeight = 150;
  var histogramBottomY = 250;
  var lineHeight = 20;
  var barWidth = 50;
  var barGap = 40;
  var firstBarX = 130;
  var maxTime = 0;

  drawCloud(ctx);
  drawTitle(ctx, 'Ура вы победили!\nСписок результатов:');

  for(var i = 0; i < times.length; i++) {
    maxTime = maxTime > times[i] ? maxTime : times[i];
  }

  var barStep = (histogramHeight - 2 * lineHeight) / maxTime;
  var barColor;
  for (var j = 0; j < times.length; j++) {
    barColor = names[j] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + (0.2 + 0.8 * Math.random()) + ')';
    drawBar(ctx, names[j], times[j], firstBarX + j * (barWidth + barGap), histogramBottomY, barStep, barWidth, barColor, lineHeight);
  }
}
