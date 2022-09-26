import React, {FC, useEffect, useState} from 'react';

import classes from './PaginationItem.module.scss';

interface PaginationItemProps{
    currentPage:number | string,
    page:number | string,
    handler: (page: number | string) => void
}

const PaginationItem:FC <PaginationItemProps>= ({currentPage, handler, page}) => {


    const [disabled, setDisabled] = useState<boolean>(false)

    useEffect(() => {
        if (page === '...') {
            setDisabled(true)
        }
    }, [])

    const clsx = [
        classes.paginationItem,
        classes.active,
    ]

    return (
        <button
            onClick={() => handler(page)}
            className={currentPage === page ? clsx.join(' ') : classes.paginationItem}
            disabled={disabled}
        >
            {page}
        </button>
    );
};

export default PaginationItem;
