import React, { Component } from 'react';
import * as d3 from 'd3';
import eventDrops from 'event-drops';
import { updateCommitsInformation, repositoriesData, onMouseOverTootip, onMouseOutTooltip, getDate } from './utils';
import './style.css';
import './demo.css';
import { repositories } from './data.js';

const eventDropsDIV = '#eventdrops-demo';
const logo = require('./logo.png');

let margin = {
      top: 20,
      right: 10,
      bottom: 20,
      left: 10
  }
let axisHeight = 30;
let timeLabelHeight = 30;
let lineHeight = 80;
let lineNameWidth = 0;



class App extends Component {
  constructor(props){
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    const chart = eventDrops({
      d3,
        zoom: {
            onZoomEnd: () => updateCommitsInformation(chart),
        },
        drop: {
            date: d => getDate(d),
            onMouseOver: commit => onMouseOverTootip(commit),
            onMouseOut: () => onMouseOutTooltip()
          },
      });
    // let x = Object.keys(d3).sort().map(e => {
    //   console.log(e);
    // })
    
    d3.select(eventDropsDIV)
      .data([repositoriesData(repositories)])
      .call(chart)
    updateCommitsInformation(chart);


    let svg = d3.select("svg")
    // let width = svg.attr("width");
    // let axis = d3.axisBottom().tickSizeOuter(200)

    // console.log(axis);
    // let scaleOriginal = d3.scaleTime()
    // .domain([new Date("Jan 25 2019 16:1 +0000"), new Date("May 25 2019 16:1 +0000")])
    // .range([0, width - margin.left - margin.right - lineNameWidth]);
    // console.log(scaleOriginal);
    // axis.scale(scaleOriginal);
    // let g = svg.append("g")
    // let gAxis = g.append("g")
    //   .attr("class", "axis")
    //   .attr("transform", "translate(" + [lineNameWidth, axisHeight] + ")");

    // gAxis.call(axis.scale(scaleOriginal));
}








  render() {

    return (
      <div>
        <div style={styles.header}>
          <img src={logo} alt="logo" style={styles.logo} />
        </div>
        <div id="eventdrops-demo" style={{width: "90%"}}>
        </div>
        <p className="infos">
            <span id="numberCommits"></span> project days <span className="light">found between</span> 
            <br />

            <span id="zoomStart"></span>
            <span className="light"> and </span>
            <span id="zoomEnd"></span>

        </p>

        <footer>
            <p>
                K.I.A.N: Kinetic Information Assurance Network developed for the ARL
            </p>
        </footer>


      </div>
    );
  }
}


const styles = {
  header:{
    display: 'flex',

  },
  logo: {
    width: 200,
    height: 100
  }
}

export default App;
