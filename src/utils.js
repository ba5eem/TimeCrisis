
import * as d3 from 'd3';


// Example display: September 4 1986 8:30 PM
export const humanizeDate = (date) => {
  const monthNames = [
      'Jan.',
      'Feb.',
      'March',
      'Apr.',
      'May',
      'June',
      'Jul.',
      'Aug.',
      'Sept.',
      'Oct.',
      'Nov.',
      'Dec.',
  ];

  return `
      ${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}
      ${date.getHours()}:${date.getMinutes()}
  `;
};


export const tooltip = d3
    .select('body')
    .append('div')
    .classed('tooltip', true)
    .style('opacity', 0)
    .style('pointer-events', 'auto');



export const updateCommitsInformation = chart => {

  const numberCommitsContainer = document.getElementById('numberCommits');
  const zoomStart = document.getElementById('zoomStart');
  const zoomEnd = document.getElementById('zoomEnd');
  
  const filteredData = chart.filteredData().reduce((total, repo) => total.concat(repo.data), []);

  numberCommitsContainer.textContent = filteredData.length;
  zoomStart.textContent = humanizeDate(chart.scale().domain()[0]);
  zoomEnd.textContent = humanizeDate(chart.scale().domain()[1]);
};


export const toolTipHtml = (commit) => `
    <div class="commit">
    <div class="content">
        <h3 class="message">${commit.message}</h3>
        <p>
            <a href="https://www.github.com/ba5eem" class="author">baseemLink</a>
            on <span class="date">${humanizeDate(
                new Date(commit.date)
            )}</span> -
            <a class="sha" href="${
                commit.sha
            }">${commit.sha.substr(0, 10)}</a>
        </p>
    </div>
`


export const repositoriesData = (array) => array.map(repository => ({
    name: repository.name,
    data: repository.commits,
}));

export const onMouseOverTootip = (commit) => {
    tooltip
        .transition()
        .duration(200)
        .style('opacity', 1)
        .style('pointer-events', 'auto');

    tooltip
        .html(toolTipHtml(commit))
        .style('left', `${d3.event.pageX - 30}px`)
        .style('top', `${d3.event.pageY + 20}px`);
};

export const onMouseOutTooltip = () => {
  tooltip
      .transition()
      .duration(1000)
      .style('opacity', 0)
      .style('pointer-events', 'none');
}

export const getDate = d => {
  return new Date(d.date);
}
