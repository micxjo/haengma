import styles from './Goban.css';
import React from 'react';
import R from 'ramda';

import Grid from './Grid';
import Coordinates from './Coordinates';
import Stone from './Stone';
import GhostStones from './GhostStones';

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
