import React from 'react';

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { withStyles } from '@material-ui/core/styles';
import Chance from 'chance';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import SelectedCell from './SelectedCell';
import Switches from './Switches';
import testData from './test_data';

const CheckboxTable = checkboxHOC(ReactTable);

const chance = new Chance();

const styles = {
  fontFamily:
    '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", "sans-serif"',
  fontWeight: 300,
  fontSize: '14px',
};

function getData() {
  const data = testData.map(item => {
    // using chancejs to generate guid
    // shortid is probably better but seems to have performance issues
    // on codesandbox.io
    const _id = chance.guid();
    return {
      _id,
      ...item,
    };
  });
  return data;
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    // console.log('clogttttt');
    const data = getData();
    // console.log('clogttttt');
    this.getColumns = this.getColumns.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
    const columns = this.getColumns(data);
    // console.log(columns);
    // console.log('clogttttt');
    this.state = {
      data,
      columns,
      selection: [],
      selectAll: false,
    };
  }

  // this.state.data[cellInfo.index][cellInfo.column.id];
  getColumns(data) {
    const columns = [];
    const sample = data[0];
    Object.keys(sample).forEach(key => {
      if (key === 'group') {
        columns.push({
          accessor: key,
          Header: key,
          Cell: cellInfo => (
            <SelectedCell
              onChange={value => {
                const data = [...this.state.data];
                data[cellInfo.index][cellInfo.column.id] = value.selectedIndex;
                this.setState({ data }, () => {
                  console.log(this.state.data);
                });
              }}
              defaultKey={cellInfo.value}
            />
          ),
        });
      } else if (key.includes('status')) {
        columns.push({
          accessor: key,
          Header: key,
          Cell: this.renderProgress,
        });
      } else if (key !== '_id') {
        columns.push({
          accessor: key,
          Header: key,
          Cell: this.renderEditable,
        });
      }
    });
    return columns;
  }

  toggleSelection = (key, shift, row) => {
    /*
      Implementation of how to manage the selection state is up to the developer.
      This implementation uses an array stored in the component state.
      Other implementations could use object keys, a Javascript Set, or Redux... etc.
    */
    // start off with the existing state
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1),
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  };

  toggleAll = () => {
    /*
      'toggleAll' is a tricky concept with any filterable table
      do you just select ALL the records that are in your data?
      OR
      do you only select ALL the records that are in the current filtered data?
      
      The latter makes more sense because 'selection' is a visual thing for the user.
      This is especially true if you are going to implement a set of external functions
      that act on the selected information (you would not want to DELETE the wrong thing!).
      
      So, to that end, access to the internals of ReactTable are required to get what is
      currently visible in the table (either on the current page or any other page).
      
      The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
      ReactTable and then get the internal state and the 'sortedData'. 
      That can then be iterrated to get all the currently visible records and set
      the selection state.
    */
    const selectAll = !this.state.selectAll;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(item._original._id);
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key =>
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    this.state.selection.includes(key);

  logSelection = () => {
    console.log('selection:', this.state.selection);
  };

  renderProgress(row) {
    const val = row.value ? 1 : 0;
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#dadada',
          borderRadius: '2px',
        }}
      >
        <div
          style={{
            width: `${val}%`,
            height: '100%',
            backgroundColor:
              row.value > 66 ? '#85cc00' : val > 33 ? '#ffbf00' : '#ff2e00',
            borderRadius: '2px',
            transition: 'all .2s ease-out',
          }}
        />
      </div>
    );
  }

  renderSwitches(cellInfo) {
    return (
      <Switches
        onChange={value => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = value;
          this.setState({ data }, () => {
            console.log(this.state.data);
          });
        }}
        status={cellInfo.value}
      />
    );
  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data }, () => {
            console.log(this.state.data);
          });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id],
        }}
      />
    );
  }

  render() {
    const { toggleSelection, toggleAll, isSelected, logSelection } = this;
    const { data, columns, selectAll } = this.state;

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: 'checkbox',
      getTrProps: (s, r) => {
        const selected = r ? this.isSelected(r.original._id) : false; // because r might not exist
        return {
          style: {
            backgroundColor: selected ? 'lightgreen' : 'inherit',
          },
        };
      },
    };

    return (
      <div>
        <button onClick={logSelection}>Log Selection</button>
        <CheckboxTable
          ref={r => (this.checkboxTable = r)}
          data={data}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
          {...checkboxProps}
        />
      </div>
    );
  }
}
export default withStyles(styles)(Table);
