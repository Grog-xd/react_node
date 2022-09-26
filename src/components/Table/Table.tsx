import React, {FC} from 'react';


import Item from '../Item/Item';
import {ItemsProps} from '../../types/types';

import classes from './Table.module.scss';


interface TableProps{
    items: any,
    currentPage: number | string
}

const Table:FC<TableProps> = ({items, currentPage}) => {
    return (
        <div className={classes.Table}>
            <Item key={0} id={0} name={'Название'} quantity={'Количество'} interval={'Расстояние'} date={'Дата'} />

            {items.length  ?

                items[+currentPage-1].map((item:ItemsProps) =>
                    <Item key={item.id} id={item.id} name={item.name} quantity={item.quantity} interval={item.interval} date={item.date} />,
                )
                : <p className={classes.errorMessage}>По вашему запросу ни чего не найдено</p>

            }

        </div>
    );
};

export default Table;
