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
  componentWillMount(){
    PostApiForm(ip.server + '/aimlquestions/listtop10', {})
    .then(res=>{
      if (!res) throw new Error('err');
      aimlActions.setDataRecentlyTable(res);
    })
    .catch(err=>{console.log(err)});
  }
  render() {
    const { aiml } = this.props;
    return (
      <MUIDataTable
        title={'GẦN ĐÂY'}
        data={aiml.data}
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
