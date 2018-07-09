# [D3 Sketch #2](https://codepen.io/hlfcoding/details/WbQJYV)

> Grouped bar chart with grid, legend, and transitions in < 150 lines.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="//assets.pengxwang.com/codepen-resources/common-helpers/main-v2.css">
<script src="//assets.pengxwang.com/codepen-resources/unsupported.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/d3/5.5.0/d3.min.js"></script>
<script src="//d3js.org/d3-selection-multi.v1.min.js"></script>
```

```html
<figure class="-card-skin -centered">
  <figcaption>Total Donated Per Quarter for <select name="dataset">
    <option value="2015" data-json='{
      "foo": {
        "name": "Foo Org",
        "totals": {"YTD": 1000000, "Q1": 200000, "Q2": 300000, "Q3": 400000, "Q4": 100000}
      },
      "bar": {
        "name": "Bar Org",
        "totals": {"YTD": 2000000, "Q1": 400000, "Q2": 600000, "Q3": 800000, "Q4": 200000}
      },
      "baz": {
        "name": "Baz Org",
        "totals": {"YTD": 500000, "Q1": 100000, "Q2": 150000, "Q3": 200000, "Q4": 50000}
      }
    }'>2015</option>
    <option value="2016" data-json='{
      "foo": {
        "name": "Foo Org",
        "totals": {"YTD": 800000, "Q1": 300000, "Q2": 400000, "Q3": 100000}
      },
      "bar": {
        "name": "Bar Org",
        "totals": {"YTD": 1800000, "Q1": 800000, "Q2": 400000, "Q3": 600000}
      },
      "buzz": {
        "name": "Buzz Org",
        "totals": {"YTD": 300000, "Q1": 150000, "Q2": 50000, "Q3": 100000}
      }
    }'>2016</option>
  </select></figcaption>
  <svg class="bar-chart"></svg>
</figure>
```

```css
body {
  background: var(--codepen-gray);
}

figure {
  opacity: 0;
  transition: opacity .2s;
}
figure.-card-skin {
  padding: 2rem;
}
figure.-centered {
  margin: 0;
  position: absolute;
}
figure.--ready {
  opacity: 1;
}

figcaption {
  text-align: center;
  text-transform: uppercase;
}

figcaption,
text {
  font: 10px sans-serif;
}

.grid line {
  opacity: .1;
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
const height = 330;

let chart = d3.select('.bar-chart').append('g').attr('class', 'chart-body');
chart.append('g').attr('class', 'x axis');
chart.append('g').attr('class', 'x grid');
chart.append('g').attr('class', 'y axis');

const createModel = data => ({
  max: d3.max(d3.values(data), datum => d3.max(d3.values(datum.totals))),
  names: d3.values(data).map(datum => datum.name),
  periods: d3.keys(data.foo.totals),
  totals: d3.zip(...d3.values(data).map(datum => d3.values(datum.totals))),
});

const createScales = model => ({
  x: d3.scaleLinear().domain([0, Math.round(1.1 * model.max)]),
  y: d3.scaleBand().domain(model.periods),
  ySub: d3.scaleBand().domain(model.names),
});

const createSelections = model => ({
  barGroup: chart.selectAll('.bar-group').data(model.totals),
  chart,
  legend: chart.selectAll('.legend').data(model.names),
  wrap: d3.select('.bar-chart'),
  xAxis: chart.select('.x.axis'),
  xGrid: chart.select('.x.grid'),
  yAxis: chart.select('.y.axis'),
});

const createEnters = selections => ({
  barGroup: selections.barGroup.enter().append('g').attr('class', 'bar-group'),
  legend: selections.legend.enter().append('g').attr('class', 'legend')
    .call(selection => selection.append('rect') && selection.append('text')),
});

function createMergesAndExtend(selections, enters) {
  const barColors = d3.schemeCategory10;
  const barGroup = selections.barGroup.merge(enters.barGroup);
  selections.bar = barGroup.selectAll('.bar').data(datum => datum);
  enters.bar = selections.bar.enter().append('g').attr('class', 'bar')
    .call(selection => selection.append('rect') && selection.append('text'));
  const bar = selections.bar.merge(enters.bar);
  const legend = selections.legend.merge(enters.legend);
  legend.select('text').text(datum => datum);
  Object.assign(selections, {
    barRect: bar.select('rect').style('fill', (_, index) => barColors[index]),
    barText: bar.select('text').text(d3.format('$.2s')),
    legendSwatch: legend.select('rect').style('fill', (_, index) => barColors[index]),
    legendText: legend.select('text'),
  });
  return { bar, barGroup, legend };
}

const createExits = selections => ({
  bar: selections.bar.exit().remove(),
  barGroup: selections.barGroup.exit().remove(),
  legend: selections.legend.exit().remove(),
});

function createAxes(scales, selections) {
  const ticks = 5;
  selections.xAxis.call(d3.axisBottom().scale(scales.x).ticks(ticks, '$s'));
  selections.xGrid.call(d3.axisTop().scale(scales.x).ticks(ticks).tickSize(-height).tickFormat(''));
  selections.yAxis.call(d3.axisLeft().scale(scales.y).tickSize(0));
}

function configureLayout(scales, selections, enters, merges) {
  const font = 10, width = 400;
  scales.x.range([0, width]);
  scales.y.rangeRound([0, height]).paddingInner(0.2).paddingOuter(0.2);
  scales.ySub.rangeRound([0, scales.y.bandwidth()]).paddingInner(0.25);
  const margin = {top: 20, right: 120, bottom: 20, left: 30, inner: 50};
  selections.wrap.attrs({
    width: width + margin.left + margin.right,
    height: height + margin.top + margin.bottom,
  });
  const translate = (x, y) => (`translate(${x}, ${y})`);
  selections.chart.attr('transform', translate(margin.left, margin.top));
  selections.xAxis.attr('transform', translate(0, height));
  enters.barGroup.attr('height', scales.y.bandwidth);
  const barMargin = {
    inner: scale => Math.round(scale.paddingInner() * scale.step()),
    outer: scale => Math.round(scale.paddingOuter() * scale.step()),
  };
  const barOffset = (scale, i) => barMargin.outer(scale) + scale.step() * i;
  merges.bar.attr('transform', (_, index) => translate(1, barOffset(scales.ySub, index)));
  merges.barGroup.attr('transform', (_, index) => translate(0, barOffset(scales.y, index)));
  const groupHeight = scales.ySub.bandwidth;
  const barTextOffset = {x: 0.4 * groupHeight(), y: -0.6 * (groupHeight() - font)};
  const legendLine = groupHeight(), legendMargin = barMargin.inner(scales.ySub);
  const legendOffset = {x: width + margin.inner, y: barMargin.outer(scales.y)};
  merges.legend.attr('transform', (_, index) => translate(0, legendOffset.y + barOffset(scales.ySub, index)));
  selections.barRect.attrs({width: scales.x, height: groupHeight});
  selections.barText.attrs({dx: barTextOffset.x, dy: barTextOffset.y, x: scales.x, y: groupHeight});
  selections.legendSwatch.attrs({x: legendOffset.x, width: legendLine, height: legendLine});
  selections.legendText.attrs({dy: barTextOffset.y, x: legendOffset.x + legendLine + legendMargin, y: groupHeight});
}

function mutateWithTransition({ selections, enters, merges, exits, initial }) {
  const base = d3.transition().ease(d3.easeQuadInOut).duration(initial ? 0 : 400);
  selections.xAxis = selections.xAxis.transition(base);
  selections.xGrid = selections.xGrid.transition(base);
  selections.yAxis = selections.yAxis.transition(base);
  enters.barGroup.style('opacity', 0).transition(base).style('opacity', 1);
  merges.bar = merges.bar.transition(base);
  merges.barGroup = merges.barGroup.transition(base);
  merges.legend = merges.legend.transition(base);
  selections.barRect = selections.barRect.transition(base);
  selections.barText = selections.barText.transition(base);
  selections.legendSwatch = selections.legendSwatch.transition(base);
  selections.legendText = selections.legendText.transition(base);
  exits.barGroup.transition(base).style('opacity', 0);
}

function render(data, initial = false) {
  // Ordered:
  const model = createModel(data);
  const scales = createScales(model);
  const selections = createSelections(model);
  const enters = createEnters(selections);
  const merges = createMergesAndExtend(selections, enters);
  const exits = createExits(selections);
  // Ordered:
  mutateWithTransition({ selections, enters, merges, exits, initial });
  configureLayout(scales, selections, enters, merges);
  createAxes(scales, selections);
}

let select = document.querySelector('[name=dataset]');
const data = option => JSON.parse(option.getAttribute('data-json'));
select.addEventListener('change', () => render(data(select.querySelector('option:checked'))));
render(data(select.firstElementChild), true);
setTimeout(() => document.querySelector('figure').classList.add('--ready'), 500);
```
