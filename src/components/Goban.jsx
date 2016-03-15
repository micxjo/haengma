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

function Stone(props) {
    const className = styles[`${props.color}Stone`];
    const boxSize = props.gridWidth / (props.boardSize - 1);
    const radius = props.radius || (boxSize / 2.05);
    const cx = props.x * boxSize;
    const cy = props.y * boxSize;

    const circle = <circle cx={cx} cy={cy} r={radius} />;

    if (props.label) {
        const textY = cy + (boxSize / 6);
        const lenLabel = `label${props.label.length}`;
        const textClassName = `${styles.label} ${styles[lenLabel]}`;
        return (
            <g className={className}>
                {circle}
                <text className={textClassName} x={cx} y={textY}>
                    {props.label}
                </text>
            </g>
        );
    }

    return <g className={className}>{circle}</g>;
}

Stone.propTypes = {
    color: React.PropTypes.string.isRequired,
    gridWidth: React.PropTypes.number,
    boardSize: React.PropTypes.number,
    radius: React.PropTypes.number,
    label: React.PropTypes.string,
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
    const boardSize = props.boardSize;
    const viewBox = `-20 -20 ${gridWidth + 50} ${gridWidth + 50}`;
    return (
        <svg viewBox={viewBox} xmlns="http://w3.org/2000/svg">
            <defs>
                {gradients}
            </defs>
            <rect className={styles.wood} x="-20" y="-20" height="100%" width="100%" />
            <Grid boardSize={boardSize} width={gridWidth} />
            {
                (props.showCoordinates
                    ? <Coordinates boardSize={boardSize} gridWidth={gridWidth} />
                    : null)
            }
            {
                R.map(
                    (stone) => (<Stone gridWidth={gridWidth}
                                       boardSize={boardSize}
                                       {...stone} />),
                    props.stones
                )
            }
        </svg>
    );
}

Goban.propTypes = {
    boardSize: React.PropTypes.number,
    stones: React.PropTypes.arrayOf(React.PropTypes.object),
    showCoordinates: React.PropTypes.bool
};

Goban.defaultProps = {
    boardSize: 19,
    stones: [],
    showCoordinates: false
};

export default Goban;
