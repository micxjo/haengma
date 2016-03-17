import styles from './Goban.css';
import React from 'react';
import R from 'ramda';

const starPointMapping = {
    9: [
        [2, 2], [2, 6],
        [6, 2], [6, 6],
        [4, 4]
    ],
    19: [
        [3, 3], [3, 9], [3, 15],
        [9, 3], [9, 9], [9, 15],
        [15, 3], [15, 9], [15, 15]
    ]
};

function Grid(props) {
    const { boardSize, width } = props;
    const boxSize = width / (boardSize - 1);
    const path = R.join(
        ' ',
        R.map(
            (i) => `M0,${i * boxSize} H${width} M${i * boxSize},0 V${width}`,
            R.range(0, boardSize)
        )
    );
    const starPoints = R.map(
        ([x, y]) => <circle cx={boxSize * x} cy={boxSize * y} r={3} />,
        starPointMapping[boardSize] || []
    );
    return (
        <g>
            <path className={styles.grid} d={path} />
            {starPoints}
        </g>
    );
}

Grid.propTypes = {
    boardSize: React.PropTypes.number,
    width: React.PropTypes.number
};

export default Grid;
