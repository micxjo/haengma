import styles from './main.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Goban from './components/Goban';

const initialStones = [
    { x: 3, y: 3, color: 'white', label: '2' },
    { x: 3, y: 4, color: 'black', label: '1' }
];

function App() {
    return (
        <div className={styles.goban}>
            <Goban stones={initialStones} showCoordinates={true} />,
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
