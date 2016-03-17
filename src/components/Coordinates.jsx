import styles from './Goban.css';
import React from 'react';
import R from 'ramda';

function Coordinates(props) {
    const { boardSize, gridWidth } = props;
    const boxSize = gridWidth / (boardSize - 1);
    const rows = R.map(
        (i) => {
            const y = (boardSize - i) * boxSize + 4;
            return (
                <g>
                    <text x="-4" y={y}>{i}</text>
                    <text x={gridWidth + 14} y={y}>{i}</text>
                </g>
            );
        },
        R.range(1, boardSize + 1)
    );
    const cols = R.zipWith(
        (i, c) => {
            const x = i * boxSize + 4;
            return (
                <g>
                    <text x={x} y="-4">{c}</text>,
                    <text x={x} y={gridWidth + 14}>{c}</text>
                </g>
            );
        },
        R.range(0, boardSize),
        [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K',
            'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'
        ]
    );
    return (
        <g className={styles.coordinates}>
            {rows}
            {cols}
        </g>
    );
}

Coordinates.propTypes = {
    boardSize: React.PropTypes.number.isRequired,
    gridWidth: React.PropTypes.number.isRequired
};

export default Coordinates;
