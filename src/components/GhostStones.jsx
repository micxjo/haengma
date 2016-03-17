import React from 'react';
import R from 'ramda';

import Stone from './Stone';

class GhostStones extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(x, y) {
        alert(`Ghost stone at (${x}, ${y}) clicked.`);
        if (this.props.onClick) {
            this.props.onClick(x, y);
        }
    }

    render() {
        const stones = R.map(
            ([x, y]) => (
                <Stone ghost
                       color={this.props.toPlay}
                       x={x}
                       y={y}
                       boardSize={this.props.boardSize}
                       gridWidth={this.props.gridWidth}
                       onClick={this.handleClick} />
            ),
            R.xprod(
                R.range(0, this.props.boardSize),
                R.range(0, this.props.boardSize)
            )
        );

        return <g>{stones}</g>;
    }
}

GhostStones.propTypes = {
    toPlay: React.PropTypes.string,
    boardSize: React.PropTypes.number.isRequired,
    gridWidth: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func
};

GhostStones.defaultProps = {
    toPlay: 'black'
};

export default GhostStones;
