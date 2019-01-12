import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 4
    }
});

class CoordinateCheckbox extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Checkbox   onChange={(event, checked) => this.props.onChange(event, checked, this.props.row, this.props.col)}></Checkbox>
        );
    }

}

class AccessManagement extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tabs: [],
            users: [],
            accessMatrix: [],
        }

        this.GetAllUsers = this.GetAllUsers.bind(this);
        this.GetAllTabs = this.GetAllTabs.bind(this);
        this.SetupRows = this.SetupRows.bind(this);
        this.SetupColumns = this.SetupColumns.bind(this);
        this.SetupAccessMatrix = this.SetupAccessMatrix.bind(this);
        this.HandleChange = this.HandleChange.bind(this);
        this.HandleSubmit = this.HandleSubmit.bind(this);
    }

    componentDidMount() {
        Promise.all([this.SetupColumns(), this.SetupRows()]).then(() => this.SetupAccessMatrix());
    }

    SetupAccessMatrix() {
        const accessMatrix = Array.from(this.state.users, () => Array.from(this.state.tabs, () => false));
        this.setState({accessMatrix: accessMatrix});
    }

    GetAllUsers() {
        return new Promise((resolve, reject) => {
            const users = [
                {name: 'User 1', jwt: 'qwe'},
                {name: 'Moderator 1', jwt: 'asd'},
                {name: 'Admin 1', jwt: 'zxc'}
            ];
            resolve(users);
        });
    }

    SetupRows() {
        this.GetAllUsers().then((users) => {
            return new Promise((resolve, reject) => {
                resolve(this.setState({users: users.map((user, index) => Object.assign({}, {row_id: index}, user))}));
            });
        });
    }

    GetAllTabs() {
        return new Promise((resolve, reject) => {         
            const tabs = [
                {name: 'Col-1'},
                {name: 'Col-2'},
                {name: 'Col-3'},
                {name: 'Col-4'},
                {name: 'Col-5'},
                {name: 'Col-6'}
            ];
            resolve(tabs);
        });
    }

    SetupColumns() {
        this.GetAllTabs().then((tabs) => {
            return new Promise((resolve, reject) => {
                resolve(this.setState({tabs: tabs.map((tab, index) => Object.assign({}, {col_id: index}, tab))}));
            });
        });
    }

    HandleChange(event, checked, row, col) {
        let accessMatrix = this.state.accessMatrix.map(elem => elem.slice());
        accessMatrix[row][col] = event.target.checked;
        this.setState({accessMatrix: accessMatrix});
    }

    HandleSubmit() {
        const result = this.state.users.map((user, index) => {
            return {
                accessArr: this.state.accessMatrix[index].slice(),
                jwt: user.jwt
            };
        });  
        console.log(result);
    }

    render() {
        const { tabs, users } = this.state;
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {tabs.map(col => {
                                return (
                                    <TableCell  key = {col.col_id}
                                                align = 'center'>
                                        {col.name}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(row => {
                            return (
                                <TableRow   key = {row.row_id}>
                                    <TableCell  component = 'th'
                                                scope = 'row'>
                                        {row.name}
                                    </TableCell>
                                    {tabs.map(col => {
                                        return (
                                            <TableCell  key = {col.col_id}
                                                        align = 'center'>
                                                <CoordinateCheckbox row = {row.row_id}
                                                                    col = {col.col_id}
                                                                    onChange = {this.HandleChange}>
                                                </CoordinateCheckbox>
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <Button variant = 'contained' 
                        color = 'primary' 
                        className={this.props.classes.button}
                        onClick={this.HandleSubmit}>
                    Submit
                </Button>
            </Paper>
        );
    }

}

export default withStyles(styles)(AccessManagement);