import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import numberMailStyle from "assets/jss/material-dashboard-react/components/numberMailStyle.jsx";

function NumberMail({ ...props }) {
  const {
    title
  } = props;
  return (
    <div 
    style={numberMailStyle.cntNumber}>
        <p style={numberMailStyle.textNumber}>
            {title}
        </p>
    </div>   
  );
}


export default withStyles(numberMailStyle)(NumberMail);
