import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

function TableList(props) {
  const { classes } = props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="danger">
            <h4 className={classes.cardTitleWhite}>DNS Logs</h4>
            <p className={classes.cardCategoryWhite}>
              Thông tin log về DNS
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Thread ID", "TCP/UDP", "Gửi/Nhận", "Địa chỉ IP"]}
              tableData={[
                ["1936", "TCP", "Gửi", "127.0.0.1"],
                ["32", "UDP", "Gửi", "32.6.22.99"],
                ["12", "TCP", "Nhận", "16.0.132.12"],
                ["1233", "TCP", "Gửi", "8.62.36.46"],
                ["236", "TCP", "Gửi", "127.0.0.1"],
                ["660", "TCP", "Gửi", "127.0.0.1"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="danger">
            <h4 className={classes.cardTitleWhite}>
              System Logs
            </h4>
            <p className={classes.cardCategoryWhite}>
              Thông tin về log của hệ thống
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Tài nguyên", "Mã Pid", "Lệnh", "Đối tượng chia sẻ", "Ký hiệu"]}
              tableData={[
                ["42.0%", "19326", "apt-config", "libc-2.15.so", "malloc"],
                ["2.23%", "19326", "grep", "libc-2.15.so", "malloc"],
                ["3.3%", "19326", "sshd", "libc-2.15.so", "malloc"],
                ["32.33%", "19326", "sed", "libc-2.15.so", "malloc"],
                ["1.66%", "19326", "kill", "libc-2.15.so", "malloc"],
                ["2.78%", "19326", "top", "libc-2.15.so", "malloc"],
                ["0.75%", "19326", "uname", "libc-2.15.so", "malloc"],
                ["0.73%", "19326", "groups", "libc-2.15.so", "malloc"],
                ["0.42%", "19326", "stats", "libc-2.15.so", "malloc"],
                ["11.32%", "19326", "login", "libc-2.15.so", "malloc"],
                ["22.32%", "19326", "mesg", "libc-2.15.so", "malloc"],
                ["0.32%", "19326", "apt-config", "libc-2.15.so", "malloc"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default withStyles(styles)(TableList);
