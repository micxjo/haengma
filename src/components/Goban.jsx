import styles from './Goban.css';
import React from 'react';
import * as R from 'ramda';

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

function Stone(props) {
    const className = styles[`${props.color}Stone`];
    const boxSize = props.gridWidth / (props.boardSize - 1);
    const radius = props.radius || (boxSize / 2.05);
    return (<circle className={className}
                    cx={props.x * boxSize}
                    cy={props.y * boxSize}
                    r={radius} />);
}

Stone.propTypes = {
    color: React.PropTypes.string.isRequired,
    gridWidth: React.PropTypes.number,
    boardSize: React.PropTypes.number,
    radius: React.PropTypes.number,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
};

const gradients = [
    <radialGradient id="blackGradient" cx="50%" cy="45%" r="60%" fx="10%" fy="10%">
        <stop offset="0%" style={{ stopColor: 'rgb(75, 75, 75)',
                                   stopOpacity: '1px' }}
        />
        <stop offset="100%" style={{ stopColor: 'rgb(0, 0, 0)',
                                     stopOpacity: '1px' }}
        />
    </radialGradient>,
    <radialgradient id="whiteGradient" cx="50%" cy="45%" r="60%" fx="10%" fy="10%">
        <stop offset="0%" style={{ stopColor: 'rgb(255, 255, 255)',
                                   stopOpacity: '1px' }}
        />
        <stop offset="100%" style={{ stopColor: 'rgb(180, 180, 180)',
                                     stopOpacity: '1px' }}
        />
    </radialgradient>
];


function Goban(props) {
    const gridWidth = 342;
    const viewBox = `-10 -10 ${gridWidth + 20} ${gridWidth + 20}`;
    return (
        <svg viewBox={viewBox} xmlns="http://w3.org/2000/svg">
            <defs>
                {gradients}
            </defs>
            <rect className={styles.wood} x="-10" y="-10" height="100%" width="100%" />
            <Grid boardSize={props.boardSize} width={gridWidth} />
            {
                R.map(
                    (stone) => (<Stone gridWidth={gridWidth}
                                       boardSize={props.boardSize}
                                       {...stone} />),
                    props.stones
                )
            }
        </svg>
    );
}

Goban.propTypes = {
    boardSize: React.PropTypes.number,
    stones: React.PropTypes.arrayOf(React.PropTypes.object)
};

Goban.defaultProps = {
    boardSize: 19,
    stones: []
};

export default Goban;
