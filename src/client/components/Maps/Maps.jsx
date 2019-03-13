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
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Status from 'components/CityStatus/Status.jsx';
import { colors } from 'assets/colors/colors.jsx';

const { active: activeColor, warn: warnColor } = colors;

const wrapperStyles = {
  width: '100%',
  maxWidth: 980,
  margin: '0 auto',
};

const include = ['VNM'];

const styles = theme => ({
  box: {
    position: 'relative',
    border: '0',
    borderRadius: '6px',
    margin: 'auto',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
  },
  status: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

class SimpleMarkers extends Component {
  constructor(props) {
    super(props);
    this.colors = [warnColor, activeColor];
  }

  componentDidMount() {
    // setInterval(() => {
    //   this.setState(state => ({
    //     index: 1 - state.index,
    //   }));
    // }, 1000);
  }

  render() {
    const { classes, data } = this.props;
    // console.log(dashboard);
    const markers = data;
    // console.log('in render..');
    // console.log(markers);
    // console.log(dispatch);
    return (
      <Paper style={wrapperStyles} className={classes.box}>
        <Grid container>
          <Grid item md={4} xs={12}>
            <Status />
          </Grid>
          {markers.map((val, key) => (
            <ReactTooltip
              key={key}
              place="right"
              type="info"
              effect="float"
              id={val.id.toString()}
            >
              <Typography style={{ color: '#FFF' }} gutterBottom>
                Địa chỉ IP: {val.ip}
              </Typography>
              <Typography style={{ color: '#FFF' }} gutterBottom>
                Trạng thái: {val.status ? 'An toàn' : 'Nguy hiểm'}
              </Typography>
            </ReactTooltip>
          ))}
          <Grid item xs={12}>
            <ComposableMap
              projectionConfig={{ scale: 2250 }}
              width={550}
              height={530}
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <ZoomableGroup center={[109, 16]} disablePanning>
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
                        default: {
                          fill: marker.status ? activeColor : warnColor,
                        },
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
                          stroke: '#2D7FDE',
                          strokeWidth: 1,
                          opacity: 0.9,
                        }}
                      />
                      <text
                        textAnchor="middle"
                        y={marker.markerOffset}
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fill: '#201B55',
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
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default connect(state => ({ app: state, data: state.dashboard.data }))(
  withStyles(styles)(SimpleMarkers)
);
