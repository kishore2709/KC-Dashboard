import {
    defaultFont,
    container,
    primaryColor
  } from "assets/jss/material-dashboard-react.jsx";
  
  const numberMailStyle = {
    textNumber: {
      color: "white",
      textAlign: "center",
      textAlignVertical:'center',
      fontWeight:'bold',
      margin: 'auto',
      ...defaultFont,
    },
    cntNumber: {
      width:"25px",
      height:"25px",  
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "red",
      display: 'flex',
      borderRadius: "25px",
    },
    right: {
      padding: "15px 0",
      margin: "0",
      fontSize: "14px",
      float: "right!important"
    },
    footer: {
      bottom: "0",
      borderTop: "1px solid #e7e7e7",
      padding: "15px 0",
      ...defaultFont
    },
    container,
    a: {
      color: primaryColor,
      textDecoration: "none",
      backgroundColor: "transparent"
    },
    list: {
      marginBottom: "0",
      padding: "0",
      marginTop: "0"
    },
    inlineBlock: {
      display: "inline-block",
      padding: "0px",
      width: "auto"
    }
  };
  export default numberMailStyle;
  