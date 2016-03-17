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

class Stone extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.x, this.props.y);
        }
    }

    render() {
        const stoneClass = this.props.color === 'white' ? styles.whiteStone : styles.blackStone;
        const className = this.props.ghost ? `${stoneClass} ${styles.ghost}` : stoneClass;

        const boxSize = this.props.gridWidth / (this.props.boardSize - 1);
        const radius = this.props.radius || (boxSize / 2.05);
        const cx = this.props.x * boxSize;
        const cy = this.props.y * boxSize;

        const circle = <circle cx={cx} cy={cy} r={radius} />;

        let body = [circle];

        if (this.props.label) {
            const textY = cy + (boxSize / 6);
            const lenLabel = `label${this.props.label.length}`;
            const textClassName = `${styles.label} ${styles[lenLabel]}`;
            body = R.append(
                <text className={textClassName} x={cx} y={textY}>
                    {this.props.label}
                </text>,
                body
            );
        }

        return <g className={className} onClick={this.handleClick}>{body}</g>;
    }
}

Stone.propTypes = {
    color: React.PropTypes.string.isRequired,
    gridWidth: React.PropTypes.number,
    boardSize: React.PropTypes.number,
    radius: React.PropTypes.number,
    label: React.PropTypes.string,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    ghost: React.PropTypes.bool,
    onClick: React.PropTypes.func
};

Stone.defaultProps = {
    ghost: false
};

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
            <GhostStones toPlay="black" boardSize={boardSize} gridWidth={gridWidth} />
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
