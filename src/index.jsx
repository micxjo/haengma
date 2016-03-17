import styles from './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import R from 'ramda';

import Goban from './components/Goban';

const initialStones = [
    { x: 3, y: 3, color: 'white', label: '2' },
    { x: 3, y: 4, color: 'black', label: '1' }
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handlePointClick = this.handlePointClick.bind(this);
        this.state = {
            toPlay: 'black',
            stones: initialStones,
            moveNum: 3
        };
    }

    handlePointClick(x, y) {
        const stone = {
            x,
            y,
            color: this.state.toPlay,
            label: this.state.moveNum.toString()
        };
        const stones = R.append(stone, this.state.stones);
        const toPlay = this.state.toPlay === 'white' ? 'black' : 'white';
        this.setState({
            toPlay,
            stones,
            moveNum: this.state.moveNum + 1
        });
    }

    render() {
        return (
            <div className={styles.goban}>
                <Goban stones={this.state.stones}
                       toPlay={this.state.toPlay}
                       showCoordinates
                       onPointClick={this.handlePointClick} />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
