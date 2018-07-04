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
const {
  keys, max, values, zip,
  scaleBand, scaleLinear,
  select, axisBottom, axisLeft, axisTop,
  format, schemeCategory10,
} = d3;

// helpers
// -------
const axis = (name, type='axis') => (
  a[name + type.charAt(0).toUpperCase() + type.slice(1)] ?
  chart.select(`.${name}.${type}`) :
  chart.append('g').attr('class', `${name} ${type}`)
);
const scaleBarOffset = (scale, i) => scalePadding.outer(scale) + scale.step() * i;
const scalePadding = {
  inner: scale => Math.round(scale.paddingInner() * scale.step()),
  outer: scale => Math.round(scale.paddingOuter() * scale.step())
};
const translate = (x, y) => (`translate(${x}, ${y})`);

// chart
// -----
const barColors = schemeCategory10;
const font = 10, height = 330, ticks = 5, width = 400;
const margin = {top: 20, right: 120, bottom: 20, left: 30, inner: 50};

let wrap = select('.bar-chart').attrs({
  width: width + margin.left + margin.right,
  height: height + margin.top + margin.bottom
});
let chart = wrap.append('g').attr('class', 'chart-body');
let en = {}, m = {}, a = {};

const withData = (donations) => {
  const donationMax = max(values(donations), d => max(values(d.totals)));
  const donationPeriods = keys(donations.foo.totals);
  const donationTotals = zip(...values(donations).map(d => values(d.totals)));
  const donorNames = values(donations).map(d => d.name);

  const x = scaleLinear().domain([0, Math.round(1.1 * donationMax)]).range([0, width]);
  const y = scaleBand().domain(donationPeriods).rangeRound([0, height]).paddingInner(0.2).paddingOuter(0.2);
  const ySub = scaleBand().domain(donorNames).rangeRound([0, y.bandwidth()]).paddingInner(0.25);

  const legendLine = ySub.bandwidth(), legendMargin = scalePadding.inner(ySub);
  const legendOffset = {x: width + margin.inner, y: scalePadding.outer(y)};
  const legendTextX = legendOffset.x + legendLine + legendMargin;
  const barTextOffset = {x: 0.4 * ySub.bandwidth(), y: -0.6 * (ySub.bandwidth() - font)};

  const t = d3.transition().ease(d3.easeQuadInOut).duration(!en.barGroup ? 0 : 400);
  a.xAxis = axis('x').transition(t).call(axisBottom().scale(x).ticks(ticks, '$s'));
  a.xGrid = axis('x', 'grid').transition(t).call(axisTop().scale(x).ticks(ticks).tickSize(-height).tickFormat(''));
  a.yAxis = axis('y').transition(t).call(axisLeft().scale(y).tickSize(0));

  let barGroup = chart.selectAll('.bar-group').data(donationTotals);
  en.barGroup = barGroup.enter().append('g').attr('class', 'bar-group');
  en.barGroup.style('opacity', 0).transition(t).style('opacity', 1);
  m.barGroup = en.barGroup.merge(barGroup);
  barGroup.exit().transition(t).style('opacity', 0).remove();

  let legend = chart.selectAll('.legend').data(ySub.domain());
  en.legend = legend.enter().append('g').attr('class', 'legend')
    .call((s) => s.append('rect') && s.append('text'));
  m.legend = en.legend.merge(legend);
  let [legendSwatch, legendText] = [m.legend.select('rect'), m.legend.select('text').text(d => d)];
  legend.exit().remove();

  let bar = m.barGroup.selectAll('.bar').data(d => d);
  en.bar = bar.enter().append('g').attr('class', 'bar')
    .call((s) => s.append('rect') && s.append('text'));
  m.bar = en.bar.merge(bar);
  let [barRect, barText] = [m.bar.select('rect'), m.bar.select('text')];
  bar.exit().remove();

  // position
  chart.attr('transform', translate(margin.left, margin.top));
  a.xAxis.attr('transform', translate(0, height));
  m.barGroup.transition(t).attr('transform', (d, i) => translate(0, scaleBarOffset(y, i)));
  m.bar.transition(t).attr('transform', (d, i) => translate(1, scaleBarOffset(ySub, i)));
  m.legend.transition(t).attr('transform', (d, i) => translate(0, legendOffset.y + scaleBarOffset(ySub, i)));
  barText.transition(t).attrs({dx: barTextOffset.x, dy: barTextOffset.y, x, y: ySub.bandwidth});
  legendSwatch.attr('x', legendOffset.x);
  legendText.transition(t).attrs({dy: barTextOffset.y, x: legendTextX, y: ySub.bandwidth});

  // size
  en.barGroup.attr('height', y.bandwidth);
  barRect.transition(t).attrs({width: x, height: ySub.bandwidth});
  legendSwatch.transition(t).attrs({width: legendLine, height: legendLine});

  // style
  barRect.style('fill', (d, i) => barColors[i]);
  barText.text(format('$.2s'));
  legendSwatch.style('fill', (d, i) => barColors[i]);
};

// run
// ---
let $select = $('[name=dataset]');
const data = ($option) => (JSON.parse($option.data('json')));
$select.on('change', () => withData(data($select.find('option:selected'))));
withData(data($select.find('option:first')));
$select.closest('figure').delay(500).fadeIn('fast');
```
