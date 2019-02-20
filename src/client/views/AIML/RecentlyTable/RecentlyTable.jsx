import React from 'react';
import { PostApiForm, ip } from '_helpers/Utils';
import { aimlActions } from '_actions';
import { connect } from 'react-redux';
// import Text2AIML from './Text2AIML';
// core
// custom Component Card
//

import MUIDataTable from 'mui-datatables';

const columns = ['Pattern', 'Template'];

const options = {
  filterType: 'checkbox',
  selectableRows: false,
};

class RecentlyTable extends React.Component {
  render() {
    const { aiml } = this.props;
    const data = aiml.data.map(val => {
      return [val.aiml_question, val.aiml_answer];
    });
    console.log(data);
    return (
      <MUIDataTable
        title="GẦN ĐÂY"
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

export default connect(
  state => ({ aiml: state.aiml }),
  null
)(RecentlyTable);
