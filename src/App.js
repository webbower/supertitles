import React from 'react';
// import PropTypes from 'prop-types';
import './App.css';
import autobind from 'class-autobind';

import SubtitlesTimeline from './components/SubtitlesTimeline';
import VideoPlayer from './components/VideoPlayer';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: [],
        };

        autobind(this);
    }

    handleNewRange(range) {
        this.setState({
            entries: this.state.entries.concat(range),
        });
    }

    render() {
        const { entries } = this.state;

        return (
            <div id="app">
                <VideoPlayer onNewRange={this.handleNewRange} />

                <SubtitlesTimeline entries={entries} />
            </div>
        );
    }
}

export default App;
