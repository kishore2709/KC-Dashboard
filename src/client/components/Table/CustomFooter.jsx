import React from "react";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const defaultFooterStyles = {};

class CustomFooter extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <TableFooter>
        <TableRow>
          <TableCell><Button variant="contained" color="primary">
        Thêm người dùng
      </Button></TableCell>
        </TableRow>
      </TableFooter>
    );
  }
}

export default withStyles(defaultFooterStyles, { name: "CustomFooter" })(
  CustomFooter
);
