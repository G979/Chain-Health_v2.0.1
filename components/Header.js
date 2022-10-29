import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

import styles from './components.module.css';

export default () => {
    return(
        <Menu className={styles.header}>
            <Link route="/">
            <a className={styles.headerItems}>Chain-Health</a>
            </Link>
            <Menu.Menu position='right'>
                <Link route="/">
                    <a className={`${styles.headerItems} ${styles.borderBoth}`}>Campaigns</a>
                </Link>
                <Link route="/campaigns/new">
                    <a className={styles.headerItems}>+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
} ;
