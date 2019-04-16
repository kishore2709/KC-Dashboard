import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { history } from "_helpers";
import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
import Select from "react-select";
// import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import { dashboardActions } from "_actions";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "black" : "blue",
    padding: 20
  }),
  // container: (base, state) => ({
  //   ...base,
  //   opacity: state.isDisabled ? ".5" : "1",
  //   backgroundColor: "transparent",
  //   zIndex: 999,
  // }),
  input: () => ({
    width: 200
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  }
};
class HeaderLinks extends React.Component {
  state = {
    open: false,
    value: {
      value: "Đang tải..",
      label: "Đang tải..",
      color: "#00B8D9",
      isFixed: true
    }
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleChange = e => {
    // this.setState({ value: e });
    // console.log('..............');
    // console.log(e);
    this.props.changeCity({...this.props.dashboard, targetCity: e.index});
  };

  render() {
    const { classes, loading, cities, targetCity } = this.props;
    const { open } = this.state;
    let options = cities.map(({ name, id }, index) => ({
      value: id,
      label: name,
      color: "#00B8D9",
      isFixed: true,
      index,
    }));
    // console.log("Headerlink render..");
    // console.log(targetCity);
    // console.log(options);
    // console.log(options[targetCity]);
    return (
      <div>
        <div className={classes.searchWrapper}>
          {/* <Select
            // value={this.state.age}
            // onChange={this.handleChange}
            input={<Input name="age" id="age-helper" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select> */}
          <Select
            ref={ref => {
              this.select = ref;
            }}
            value={options[targetCity] || this.state.value}
            onChange={this.handleChange}
            styles={customStyles}
            // className="basic-single"
            // classNamePrefix="Chọn vị trí"
            // defaultValue={ options[targetCity]}
            isLoading={loading}
            // isSearchable={true}
            name="Chọn vị trí"
            options={options}
            menuContainerStyle={{ zIndex: 3000, position: "relative" }}
          />
          {/* <CustomInput
            formControlProps={{
              className: `${classes.margin} ${classes.search}`,
            }}
            inputProps={{
              placeholder: 'Search',
              inputProps: {
                'aria-label': 'Search',
              },
            }}
          />
          <Button 
              color="white" 
              aria-label="edit" justIcon round>
            <Search />
          </Button> */}
        </div>

        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Person"
          className={classes.buttonLink}
          onClick={() => history.push("/profile")}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
      </div>
    );
  }
}

export default connect(
  state => ({
    loading: state.dashboard.loading,
    cities: state.dashboard.cities,
    targetCity: state.dashboard.targetCity,
    dashboard: state.dashboard,
  }),
  dispatch => ({
    changeCity: newStatus => {
      dispatch(dashboardActions.get(newStatus));
    }
  })
)(withStyles(headerLinksStyle)(HeaderLinks));
