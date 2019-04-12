import React from 'react';
import InfinitedTable from './InfinitedTable';
import 'react-virtualized/styles.css';

import data from './data.json';

const TestContainer = () => <InfinitedTable list={data} />;

export default TestContainer;
