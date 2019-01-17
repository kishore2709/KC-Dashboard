import Chip from '@material-ui/core/Chip';
import React from 'react';
import FaceIcon from '@material-ui/icons/Face';

const Warning = (
  <Chip
    icon={<FaceIcon />}
    label="Deletable Secondary Chip"
    color="secondary"
  />
);
export default Warning;
