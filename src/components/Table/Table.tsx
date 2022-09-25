import React, {FC} from 'react';


import Item from '../Item/Item';
import {ItemsProps} from '../../types/types';

import classes from './Table.module.scss';


interface TableProps{
    items: ItemsProps[],
}

const Table:FC<TableProps> = ({items}) => {
    return (
        <div className={classes.Table}>
            <Item key={0} id={0} name={'Название'} quantity={'Количество'} interval={'Расстояние'} date={'Дата'} />

            {items.length !== 0 ?

                items.map((item) =>
                    <Item key={item.id} id={item.id} name={item.name} quantity={item.quantity} interval={item.interval} date={item.date} />,
                )
                : <p className={classes.errorMessage}>По вашему запросу ни чего не найдено</p>

            }

        </div>
    );
};

export default Table;
