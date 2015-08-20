var c3 = require('c3');
var io = require('socket.io-client');



var charts = [0, 1, 2].map(function(i) {
  return c3.generate({
    bindto: '#chart' + i,
    data: {
      columns: [
        ['Plant ' + i],
      ]
    },
    axis: {
      y: {
        label: { 
          text: 'Moisture',
          position: 'outer-middle'
        }
      },
      x: {
        // type: 'timeseries',
        show: false,
      }
    }
  });
});

var timeSeries = [[], [], []];
var N = 5;
var socket = io();
socket.on('data', function(data) {
  console.log('>', data);

  [0, 1, 2].forEach(function(i) {
    var series = timeSeries[i];
    if (series.length >= N) {
      series = series.slice(series.length - N + 1);
    }
    series.push(data[i]);
    timeSeries[i] = series;

    charts[i].load({
      columns: [
        ['Plant ' + i].concat(series),
      ]
    });

  });

});