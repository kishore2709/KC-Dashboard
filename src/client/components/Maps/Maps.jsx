import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';
import jsonFile from 'assets/topojson/world-50m.json';

const wrapperStyles = {
  width: '100%',
  maxWidth: 980,
  margin: '0 auto',
};

const include = [
  'ARG',
  'BOL',
  'BRA',
  'CHL',
  'COL',
  'ECU',
  'GUY',
  'PRY',
  'PER',
  'SUR',
  'URY',
  'VEN',
  'VNM',
];

const styles = theme => ({
  box: {
    border: '5px solid #BE6060',
    borderRadius: '10px',
  },
});

const markers = [
  { markerOffset: -35, name: 'Hà Nội', coordinates: [105.6525, 20.9755] },
  {
    markerOffset: -35,
    name: 'Hồ Chí Minh',
    coordinates: [106.69509, 10.76472],
  },
];

class SimpleMarkers extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div style={wrapperStyles} className={classes.box}>
        <ComposableMap
          projectionConfig={{ scale: 3000 }}
          width={580}
          height={800}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <ZoomableGroup center={[105, 15]} disablePanning>
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
                            fill: '#ECEFF1',
                            stroke: '#CA0C27',
                            strokeWidth: 2,
                            outline: 'none',
                          },
                          hover: {
                            fill: '#CFD8DC',
                            stroke: '#607D8B',
                            strokeWidth: 0.75,
                            outline: 'none',
                          },
                          pressed: {
                            fill: '#FF5722',
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
                    default: { fill: '#FF5722' },
                    hover: { fill: '#FFFFFF' },
                    pressed: { fill: '#FF5722' },
                  }}
                >
                  <circle
                    cx={0}
                    cy={0}
                    r={20}
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
                      fill: '#607D8B',
                      fontSize: 45,
                    }}
                  >
                    {marker.name}
                  </text>
                </Marker>
              ))}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    );
  }
}

export default withStyles(styles)(SimpleMarkers);
