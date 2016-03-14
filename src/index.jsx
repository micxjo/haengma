import styles from './main.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Goban from './components/Goban';

const initialStones = [
    { x: 3, y: 3, color: 'white' },
    { x: 3, y: 4, color: 'black' }
];

function App() {
    return (
        <div className={styles.goban}>
            <Goban stones={initialStones} />,
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
