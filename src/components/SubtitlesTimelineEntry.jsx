import React from 'react';
// import PropTypes from 'prop-types';

import formatVideoTime from '../utils/formatVideoTime';

const SubtitlesTimelineEntry = ({ entry }) => (
    <tr>
        <th scope="row">{formatVideoTime(entry.startTime)} --> {formatVideoTime(entry.endTime)}</th>
        <td><textarea></textarea></td>
    </tr>
);

export default SubtitlesTimelineEntry;
