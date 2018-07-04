# [D3 Sketch #2](https://codepen.io/hlfcoding/details/WbQJYV)

> Grouped bar chart with grid, legend, and transitions in < 100 lines.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="//assets.pengxwang.com/codepen-resources/common-helpers/main.css">
<script src="//assets.pengxwang.com/codepen-resources/unsupported.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/d3/5.5.0/d3.min.js"></script>
<script src="//d3js.org/d3-selection-multi.v1.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="//assets.pengxwang.com/codepen-resources/common-helpers/main.js"></script>
```

```html
<figure class="card-skin centered" style="display: none">
  <figcaption>
    Total Donated Per Quarter for
    <select name="dataset">
      <option value="2015" data-json='
        {
          "foo": {
            "name": "Foo Org",
            "totals": {
              "YTD": 1000000,
              "Q1": 200000,
              "Q2": 300000,
              "Q3": 400000,
              "Q4": 100000
            }
          },
          "bar": {
            "name": "Bar Org",
            "totals": {
              "YTD": 2000000,
              "Q1": 400000,
              "Q2": 600000,
              "Q3": 800000,
              "Q4": 200000
            }
          },
          "baz": {
            "name": "Baz Org",
            "totals": {
              "YTD": 500000,
              "Q1": 100000,
              "Q2": 150000,
              "Q3": 200000,
              "Q4": 50000
            }
          }
        }
      '>
        2015
      </option>
      <option value="2016" data-json='
        {
          "foo": {
            "name": "Foo Org",
            "totals": {
              "YTD": 800000,
              "Q1": 300000,
              "Q2": 400000,
              "Q3": 100000
            }
          },
          "bar": {
            "name": "Bar Org",
            "totals": {
              "YTD": 1800000,
              "Q1": 800000,
              "Q2": 400000,
              "Q3": 600000
            }
          },
          "buzz": {
            "name": "Buzz Org",
            "totals": {
              "YTD": 300000,
              "Q1": 150000,
              "Q2": 50000,
              "Q3": 100000
            }
          }
        }
      '>2016</option>
    </select>
  </figcaption>
  <svg class="bar-chart"></svg>
</figure>
```

```css
/*
  using .card-skin
  using .centered
  using --codepen-gray
*/

body {
  background: var(--codepen-gray);
}

figure {
  margin: 0;
  padding: 2rem;
  position: absolute;
}

figcaption {
  margin-left: -90px;
  text-align: center;
  text-transform: uppercase;
}

figcaption,
text {
  font: 10px sans-serif;
}

.grid line {
  stroke: #ddd;
}
.grid.x path {
  display: none;
}

.axis.x path,
.axis.x line {
  display: none;
}
```

```js
// helpers
// -------
const scaleBarOffset = (scale, i) => scalePadding.outer(scale) + scale.step() * i;
const scalePadding = {
  inner: scale => Math.round(scale.paddingInner() * scale.step()),
  outer: scale => Math.round(scale.paddingOuter() * scale.step())
};
const translate = (x, y) => (`translate(${x}, ${y})`);

// chart
// -----
const { schemeCategory10 } = d3;
const barColors = schemeCategory10;
const font = 10, height = 330, ticks = 5, width = 400;
const margin = {top: 20, right: 120, bottom: 20, left: 30, inner: 50};

let state = {
  didFirstRender: false,
};

function createDonations(data) {
  const { keys, max, values, zip } = d3;
  return {
    donors: values(data).map(datum => datum.name),
    max: max(values(data), datum => max(values(datum.totals))),
    periods: keys(data.foo.totals),
    totals: zip(...values(data).map(datum => values(datum.totals))),
  };
}

function createScales(donations) {
  const { scaleBand, scaleLinear } = d3;
  return {
    x: scaleLinear().domain([0, Math.round(1.1 * donations.max)]),
    y: scaleBand().domain(donations.periods),
    ySub: scaleBand().domain(donations.donors),
  };
}

function createSelections(donations) {
  const { scaleBand, scaleLinear, select } = d3;
  const wrap = select('.bar-chart');
  let chart = wrap.select('.chart-body');
  if (chart.empty()) {
    chart = wrap.append('g').attr('class', 'chart-body');
    chart.append('g').attr('class', 'x axis');
    chart.append('g').attr('class', 'x grid');
    chart.append('g').attr('class', 'y axis');
  }
  return {
    barGroup: chart.selectAll('.bar-group').data(donations.totals),
    chart,
    legend: chart.selectAll('.legend').data(donations.donors),
    wrap,
    xAxis: chart.select('.x.axis'),
    xGrid: chart.select('.x.grid'),
    yAxis: chart.select('.y.axis'),
  };
}

function createEnters(selections) {
  return {
    barGroup: selections.barGroup.enter().append('g').attr('class', 'bar-group'),
    legend: selections.legend.enter().append('g').attr('class', 'legend')
      .call((s) => s.append('rect') && s.append('text')),
  };
}

function createMerges(selections, enters) {
  const { format } = d3;
  const barGroup = selections.barGroup.merge(enters.barGroup);
  selections.bar = barGroup.selectAll('.bar').data(d => d);
  enters.bar = selections.bar.enter().append('g').attr('class', 'bar')
      .call((s) => s.append('rect') && s.append('text'));
  const bar = selections.bar.merge(enters.bar);
  const legend = selections.legend.merge(enters.legend);
  legend.select('text').text(d => d);
  Object.assign(selections, {
    barRect: bar.select('rect').style('fill', (d, i) => barColors[i]),
    barText: bar.select('text').text(format('$.2s')),
    legendSwatch: legend.select('rect').style('fill', (d, i) => barColors[i]),
    legendText: legend.select('text'),
  });
  return { bar, barGroup, legend };
}

function createExits(selections) {
  return {
    bar: selections.bar.exit().remove(),
    barGroup: selections.barGroup.exit().remove(),
    legend: selections.legend.exit().remove(),
  };
}

function configureAxes(scales, selections) {
  const { axisBottom, axisLeft, axisTop } = d3;
  selections.xAxis.call(axisBottom().scale(scales.x).ticks(ticks, '$s'));
  selections.xGrid.call(axisTop().scale(scales.x).ticks(ticks).tickSize(-height).tickFormat(''));
  selections.yAxis.call(axisLeft().scale(scales.y).tickSize(0));
}

function configureLayout(scales, selections, enters, merges) {
  scales.x.range([0, width]);
  scales.y.rangeRound([0, height]).paddingInner(0.2).paddingOuter(0.2);
  scales.ySub.rangeRound([0, scales.y.bandwidth()]).paddingInner(0.25);
  const legendLine = scales.ySub.bandwidth(), legendMargin = scalePadding.inner(scales.ySub);
  const legendOffset = {x: width + margin.inner, y: scalePadding.outer(scales.y)};
  const legendTextX = legendOffset.x + legendLine + legendMargin;
  const barTextOffset = {x: 0.4 * scales.ySub.bandwidth(), y: -0.6 * (scales.ySub.bandwidth() - font)};
  selections.wrap.attrs({
    width: width + margin.left + margin.right,
    height: height + margin.top + margin.bottom,
  });
  selections.chart.attr('transform', translate(margin.left, margin.top));
  selections.xAxis.attr('transform', translate(0, height));
  enters.barGroup.attr('height', scales.y.bandwidth);
  merges.bar.attr('transform', (d, i) => translate(1, scaleBarOffset(scales.ySub, i)));
  merges.barGroup.attr('transform', (d, i) => translate(0, scaleBarOffset(scales.y, i)));
  merges.legend.attr('transform', (d, i) => translate(0, legendOffset.y + scaleBarOffset(scales.ySub, i)));
  selections.barText.attrs({dx: barTextOffset.x, dy: barTextOffset.y, x: scales.x, y: scales.ySub.bandwidth});
  selections.barRect.attrs({width: scales.x, height: scales.ySub.bandwidth});
  selections.legendSwatch.attrs({x: legendOffset.x, width: legendLine, height: legendLine});
  selections.legendText.attrs({dy: barTextOffset.y, x: legendTextX, y: scales.ySub.bandwidth});
}

function configureTransition(selections, enters, merges, exits) {
  const { easeQuadInOut, transition } = d3;
  const t = transition().ease(easeQuadInOut).duration(!state.didFirstRender ? 0 : 400);
  selections.xAxis = selections.xAxis.transition(t);
  selections.xGrid = selections.xGrid.transition(t);
  selections.yAxis = selections.yAxis.transition(t);
  enters.barGroup.style('opacity', 0).transition(t).style('opacity', 1);
  merges.bar = merges.bar.transition(t);
  merges.barGroup = merges.barGroup.transition(t);
  merges.legend = merges.legend.transition(t);
  selections.barText = selections.barText.transition(t);
  selections.barRect = selections.barRect.transition(t);
  selections.legendSwatch = selections.legendSwatch.transition(t);
  selections.legendText = selections.legendText.transition(t);
  exits.barGroup.transition(t).style('opacity', 0);
}

const withData = (data) => {
  const donations = createDonations(data);
  const scales = createScales(donations);
  const selections = createSelections(donations);
  const enters = createEnters(selections);
  const merges = createMerges(selections, enters);
  const exits = createExits(selections);

  configureTransition(selections, enters, merges, exits);
  configureLayout(scales, selections, enters, merges);
  configureAxes(scales, selections);

  if (!state.didFirstRender) {
    state.didFirstRender = true;
  }
};

// run
// ---
let $select = $('[name=dataset]');
const data = ($option) => (JSON.parse($option.data('json')));
$select.on('change', () => withData(data($select.find('option:selected'))));
withData(data($select.find('option:first')));
$select.closest('figure').delay(500).fadeIn('fast');
```
