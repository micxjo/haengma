import styles from './Goban.css';
import React from 'react';
import R from 'ramda';

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

export default Stone;
