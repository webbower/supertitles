import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'class-autobind';
import classnames from 'classnames';

import SubtitleRange from '../data/SubtitleRange';

import formatVideoTime from '../utils/formatVideoTime';
import noop from '../utils/noop';

const { func } = PropTypes;

class SubtitlesTimeline extends React.Component {
    static propTypes = {
        onNewRange: func,
    };

    static defaultProps = {
        onNewRange: noop,
    };

    constructor(props) {
        super(props);

        this.state = {
            video: null,
            videoObjUrl: null,
            currentTime: 0,
            activeRangeStartTime: null,
        };

        autobind(this);
    }

    getCurrentTime() {
        if (!this.refs.videoPlayer) return 0;

        return this.refs.videoPlayer.currentTime.toFixed(3);
    }

    startActiveRange() {
        this.setState(() => ({
            activeRangeStartTime: parseFloat(this.getCurrentTime())
        }));
        // this.setState({
        //     activeRangeStartTime: parseFloat(this.getCurrentTime()),
        // });
    }

    endActiveRange() {
        const { activeRangeStartTime: startTime } = this.state;
        const endTime = this.getCurrentTime();
        const newRange = SubtitleRange({
            startTime,
            endTime,
        });

        this.props.onNewRange(newRange);

        // this.setState({ activeRangeStartTime: null });
        this.setState(() => ({ activeRangeStartTime: null }));
    }

    handleVideoSelectClick(ev) {
        this.refs.videoSelect.click();
    }

    handleVideoSelectChange(ev) {
        const video = ev.target.files[0];
        this.setState({
            video,
            videoObjUrl: URL.createObjectURL(video),
        });
    }

    handleVideoTimeUpdate(ev) {
        this.setState({
            currentTime: ev.target.currentTime,
        });
    }

    handleStartRangeClick(ev) {
        this.startActiveRange();
    }

    handleEndRangeClick(ev) {
        this.endActiveRange();
        // currentSubtitle.endTime = parseFloat(player.currentTime.toFixed(3));
        // subtitles.push(currentSubtitle);
        // // console.log(subtitleBlockTmpl(currentSubtitle));
        // subtitleEntries.appendChild(subtitleBlockTmpl(currentSubtitle));
        // console.log(currentSubtitle, subtitles);
        // currentSubtitle = null;
        // this.hidden = true;
        // transitionBlockBtn.hidden = true;
        // startBlockBtn.hidden = false;
    }

    handleTransitionRangeClick(ev) {
        this.endActiveRange();
        this.startActiveRange();
    }

    render() {
        const { video, videoObjUrl, activeRangeStartTime } = this.state;
        const hasActiveRange = activeRangeStartTime !== null;

        return (
            <div id="video-viewport" className={classnames({ 'has-video': !!video })}>
                {video ? (
                    <div id="video-player">
                        <video ref="videoPlayer" src={videoObjUrl} onTimeUpdate={this.handleVideoTimeUpdate} controls></video>
                        <span id="video-timer">{formatVideoTime(this.state.currentTime)}</span>

                        <div id="block-actions" className="actions">
                            <button type="button" hidden={hasActiveRange} onClick={this.handleStartRangeClick}>Start Range</button>
                            <button type="button" hidden={!hasActiveRange} onClick={this.handleEndRangeClick}>End Range</button>
                            <button type="button" hidden={!hasActiveRange} onClick={this.handleTransitionRangeClick}>Transition Range</button>
                        </div>
                    </div>
                ) : (
                    <div id="video-select" onClick={this.handleVideoSelectClick}>
                        <input ref="videoSelect" type="file" accept="video/*" onChange={this.handleVideoSelectChange} />
                    </div>
                )}
            </div>
        );
    }
}

export default SubtitlesTimeline;
