import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';
import jsonFile from 'assets/topojson/world-50m.json';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';

const wrapperStyles = {
  width: '100%',
  maxWidth: 980,
  margin: '0 auto',
};

const include = ['VNM'];

const styles = theme => ({
  box: {
    border: '2px solid #BD13E2',
    borderRadius: '10px',
  },
});

const markers = [
  {
    id: 1,
    markerOffset: -35,
    name: 'Hà Nội',
    coordinates: [105.6525, 20.9755],
  },
  {
    id: 2,
    markerOffset: -35,
    name: 'Hồ Chí Minh',
    coordinates: [106.69509, 10.76472],
  },
];

class SimpleMarkers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    this.colors = ['#90E53A', '#E21336'];
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(state => ({
        index: 1 - state.index,
      }));
    }, 1000);
  }

  render() {
    const { classes } = this.props;
    console.log('in render..');
    // console.log(dispatch);
    return (
      <Paper style={wrapperStyles} className={classes.box}>
        <ReactTooltip place="right" type="info" effect="float" id="1">
          <Typography style={{ color: '#FFF' }} gutterBottom>
            Địa chỉ IP: 10.23.33.2
          </Typography>
          <Typography style={{ color: '#FFF' }} gutterBottom>
            Trạng thái: An toàn
          </Typography>
        </ReactTooltip>
        <ReactTooltip place="right" type="info" effect="float" id="2">
          <Typography style={{ color: '#FFF' }} gutterBottom>
            Địa chỉ IP: 12.23.33.2
          </Typography>
          <Typography style={{ color: '#FFF' }} gutterBottom>
            Trạng thái: An toàn
          </Typography>
        </ReactTooltip>
        <ComposableMap
          projectionConfig={{ scale: 2800 }}
          width={600}
          height={600}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <ZoomableGroup center={[108, 16]} disablePanning>
            <Geographies geography={jsonFile}>
              {(geographies, projection) =>
                geographies.map(
                  (geography, i) =>
                    include.indexOf(geography.id) !== -1 && (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: '#E8B14E',
                            stroke: '#CA0C27',
                            strokeWidth: 2,
                            outline: 'none',
                          },
                          hover: {
                            fill: '#E8B14E',
                            stroke: '#607D8B',
                            strokeWidth: 0.75,
                            outline: 'none',
                          },
                          pressed: {
                            fill: '#CFD8DC',
                            stroke: '#607D8B',
                            strokeWidth: 0.75,
                            outline: 'none',
                          },
                        }}
                      />
                    )
                )
              }
            </Geographies>
            <Markers>
              {markers.map((marker, i) => (
                <Marker
                  key={i}
                  marker={marker}
                  style={{
                    default: { fill: this.colors[this.state.index] },
                    // hover: { fill: '#FFFFFF' },
                    // pressed: { fill: '#FF5722' },
                  }}
                  // onMouseMove={this.handleMove.bind(this)}
                  // onMouseLeave={this.handleLeave.bind(this)}
                >
                  <circle
                    data-tip
                    data-for={marker.id}
                    cx={0}
                    cy={0}
                    r={15}
                    style={{
                      stroke: '#FF5722',
                      strokeWidth: 3,
                      opacity: 0.9,
                    }}
                  />
                  <text
                    textAnchor="middle"
                    y={marker.markerOffset}
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fill: '#FF0422',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    {marker.name}
                  </text>
                </Marker>
              ))}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </Paper>
    );
  }
}

export default connect(state => ({ app: state }))(withStyles(styles)(SimpleMarkers));
