import React, {FC} from 'react';

import {ItemsProps} from '../../types/types';

import classes from './Item.module.scss'



const Item:FC<ItemsProps> = ({id,date, name, quantity, interval}) => {
    return (
        <div className={classes.Item}>
            <time>{date}</time>
            <p>{name}</p>
            <p>{quantity}</p>
            <p>{interval}</p>
        </div>
    );
};

export default Item;
