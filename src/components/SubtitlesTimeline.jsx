import React from 'react';
import PropTypes from 'prop-types';

import SubtitlesTimelineEntry from './SubtitlesTimelineEntry';

const { array } = PropTypes;

class SubtitlesTimeline extends React.Component {
    static propTypes = {
        entries: array,
    };

    static defaultProps = {
        entries: [],
    };

    render() {
        const { entries } = this.props;

        return (
            <div id="subtitle-entries">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Time</th>
                            <th scope="col">Subtitles</th>
                        </tr>
                    </thead>
                    <tbody id="subtitle-entries-rows">
                        {entries.map((e, i) => (
                            <SubtitlesTimelineEntry key={i} entry={e} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SubtitlesTimeline;
