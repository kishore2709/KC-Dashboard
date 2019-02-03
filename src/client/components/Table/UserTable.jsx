import React from 'react';
import MUIDataTable from 'mui-datatables';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class UserTable extends React.Component {
  render() {
    const columns = [
      {
        name: 'Name',
        options: {
          filter: false,
        },
      },
      {
        name: 'Title',
        options: {
          filter: true,
        },
      },
      {
        name: 'Age',
        options: {
          filter: false,
        },
      },
      {
        name: 'Salary',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const nf = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });

            return nf.format(value);
          },
        },
      },
      {
        name: 'Active',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => (
              <FormControlLabel
                label={value ? "Yes" : "No"}
                value={value ? "Yes" : "No"}
                control={
                  <Switch
                    color="primary"
                    checked={value}
                    value={value ? "Yes" : "No"}
                  />
                }
                onChange={event => {
                  updateValue(event.target.value === "Yes" ? false : true);
                }}
              />
            ),
        },
      },
    ];

    const data = [
      ['Robin Duncan', 'Business Analyst', 20, 77000, false],
      ['Mel Brooks', 'Business Consultant', 37, 135000, true],
    ];

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'scroll'
    };

    return (
      <MUIDataTable
        title="ACME Employee list"
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}
export default UserTable;
