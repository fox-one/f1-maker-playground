import React from 'react';
import moment from 'moment';

const TimeFormat = ({ date, format }) => (
  <div>
    <span>{moment(date).format(format)}</span>
  </div>
);

export default TimeFormat;
