import {
  defaultFont,
  primaryColor,
  dangerColor
} from "assets/jss/material-dashboard-react.jsx";
import tooltipStyle from "assets/jss/material-dashboard-react/tooltipStyle.jsx";
import checkboxAdnRadioStyle from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.jsx";
const tasksStyle = {
  ...tooltipStyle,
  ...checkboxAdnRadioStyle,
  table: {
    marginBottom: "0",
    overflow: "visible"
  },
  tableRow: {
    position: "relative",
    borderBottom: "1px solid #dddddd"
  },
  tableActions: {
    display: "flex",
    border: "none",
    padding: "12px 8px !important",
    verticalAlign: "middle"
  },
  tableCell: {
    ...defaultFont,
    padding: "2px 8px 2px 8px",
    verticalAlign: "middle",
    border: "none",
    lineHeight: "1.42857143",
    fontSize: "14px"
  },
  tableActionButton: {
    width: "27px",
    height: "27px",
    padding: "0"
  },
  tableActionButtonIcon: {
    width: "17px",
    height: "17px"
  },
  edit: {
    backgroundColor: "transparent",
    color: primaryColor,
    boxShadow: "none"
  },
  close: {
    backgroundColor: "transparent",
    color: dangerColor,
    boxShadow: "none"
  }
};
export default tasksStyle;
