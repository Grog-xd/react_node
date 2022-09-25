import {FC} from 'react';

import classes from './Loader.module.scss'

const Loader:FC = () => {
    return (
        <div className={classes.ldsDualRing}></div>
    );
};

export default Loader;
