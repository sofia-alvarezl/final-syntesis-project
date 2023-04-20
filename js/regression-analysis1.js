function linearRegression(values_x, values_y) {
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var count = 0;
  var x = 0;
  var y = 0;
  var values_length = values_x.length;
  if (values_length !== values_y.length) {
    throw new Error(
      "The parameters values_x and values_y need to have same size!"
    );
  }
  if (values_length === 0) {
    return [[], []];
  }
  for (var v = 0; v < values_length; v++) {
    x = values_x[v];
    y = values_y[v];
    sum_x += x;
    sum_y += y;
    sum_xx += x * x;
    sum_xy += x * y;
    count++;
  }
  var m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
  var b = sum_y / count - (m * sum_x) / count;
  var result_values_x = [];
  var result_values_y = [];
  for (var v = 0; v < values_length; v++) {
    x = values_x[v];
    y = x * m + b;
    result_values_x.push(x);
    result_values_y.push(y);
  }
  return [m, b, result_values_y];
}

//For kWh vs Month
const months = ["December", "January", "February", "March", "April"];
const kwhs = [107, 100, 110, 120, 98];
var l = linearRegression(months, kwhs);

//For Residents vs kWh
const residents = [8, 4, 3, 4, 4, 4, 3, 5, 6, 3];
const kWhs = [728, 128, 134, 220, 160, 230, 115, 206, 93, 93];
var r = linearRegression(residents, kWhs);

const trace11 = {
  x: months,
  y: kwhs,
  mode: "markers",
  marker: {
    color: "red",
    size: 8
  },
  name: "True consume"
};

const trace21 = {
  x: months,
  y: l[2],
  mode: "scatter",
  marker: {
    color: "gray",
    size: 8
  },
  line: {
    dash: "dashdot",
    color: "gray",
    width: 1
  },
  name: "Linear Regression"
};

const trace12 = {
  x: residents,
  y: kWhs,
  mode: "markers",
  marker: {
    color: "red",
    size: 8
  },
  name: "True consume"
};

const trace22 = {
  x: residents,
  y: r[2],
  mode: "scatter",
  marker: {
    color: "gray",
    size: 8
  },
  line: {
    dash: "dashdot",
    color: "gray",
    width: 1
  },
  name: "Linear Regression"
};

const layout1 = {
  xaxis: { title: "Month", autorange: true },
  yaxis: { title: "kWh", autorange: true }
};
const layout2 = {
  xaxis: { title: "Residents", autorange: true },
  yaxis: { title: "kWh", autorange: true }
};

var data1 = [trace21, trace11];
var data2 = [trace22, trace12];

Plotly.newPlot("analysis1Plot1", data1, layout1);
Plotly.newPlot("analysis1Plot2", data2, layout2);

var m1 = parseFloat(l[0]).toFixed(2);
var b1 = parseFloat(l[1]).toFixed(2);
var m2 = parseFloat(r[0]).toFixed(2);
var b2 = parseFloat(r[1]).toFixed(2);

document.getElementById(
  "analysis1Eqn1"
).innerHTML = `The regression equation is given by $y=${m1}x+${b1}.$`;
document.getElementById(
  "analysis1Eqn2"
).innerHTML = `The regression equation is given by $y=${m2}x+${b2}.$`;
