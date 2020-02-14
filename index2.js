var margin = { left: 50, right: 10, top: 10, bottom: 100 };
var width = 800 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

d3.csv('sales.csv', function(data) {
	data.forEach(function(d) {
		d.numberOfPplHelped = +d.numberOfPplHelped;
	});
	// console.log(data);

	var svg = d3
		.select('body')
		// .select('#barChart')
		.append('svg')
		.attr('id', 'barChartD3')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom);
	// .attr('align', 'center');

	d3.select('#barChartD3').attr('align', 'center');

	// Group element to transform data viz into the center
	var g = svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

	//Creating x axis labels for the graph
	g
		.append('text')
		.attr('class', 'x axis-label')
		.attr('x', width / 2)
		.attr('y', height + 50)
		.attr('font-size', '20px')
		.attr('text-anchor', 'middle')
		.text('Group To Benefit');

	var x = d3
		.scaleBand()
		.domain(
			data.map(function(d) {
				return d.groupToBenefit;
			})
		)
		.range([ 0, width ])
		.paddingInner(0.4)
		.paddingOuter(0.2);

	var y = d3.scaleLog().base(5).domain([ Math.exp(0), Math.exp(75) ]).range([ height, 0 ]);

	// Creating x and y axis
	var xAxisCall = d3.axisBottom(x);
	g.append('g').attr('class', 'x-axis').attr('transform', 'translate(0, ' + height + ')').call(xAxisCall);

	// var yAxisCall = d3.axisLeft(y).ticks(5);
	// g.append('g').attr('class', 'y-axis').call(yAxisCall);

	//Number on the bar graph
	svg
		.selectAll('.text')
		.data(data)
		.enter()
		.append('text')
		.attr('class', 'label')
		.attr('x', function(d) {
			console.log(d.groupToBenefit);
			return x(d.groupToBenefit) + x.bandwidth() - 4;
		})
		.attr('y', function(d) {
			return y(d.numberOfPplHelped) - 6;
		})
		.attr('dy', '.5em')
		.text(function(d) {
			return d.numberOfPplHelped;
		});

	var rects = g
		.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('y', function(d) {
			console.log(data);
			return y(d.numberOfPplHelped);
		})
		.attr('x', function(d) {
			return x(d.groupToBenefit);
		})
		.attr('width', x.bandwidth)
		.attr('height', function(d) {
			return height - y(d.numberOfPplHelped);
		})
		.attr('fill', 'steelblue');
});
