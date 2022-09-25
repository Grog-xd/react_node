import React, {FC, useEffect, useState} from 'react';

import PaginationItem from '../PaginationItem/PaginationItem';

import classes from './PaginationList.module.scss';


interface PaginationListProps{
    pagesLen: number,
    currentPage: number,
    handler: (e:number) => void
}

const PaginationList:FC <PaginationListProps>= ({pagesLen, currentPage, handler}) => {

    const [pagesArr, setPagesArr] = useState<any>([])

    useEffect(()=>{
        createPages()
    }, [pagesLen, currentPage])

    // Функция для создания страниц

    function createPages(){
        let arr = []

        for(let i = 0; i < pagesLen; i++){
            if((currentPage + 6 > i && currentPage - 6 < i) || i + 1 === pagesLen || i === 0){
                if(i === pagesLen-1 && currentPage + 7 <= pagesLen - 1){
                    arr.push('...')
                }
                arr.push(i + 1)
            }
            if (i === 1 && currentPage > 6){
                arr.push('...')
            }
        }
        setPagesArr(arr)
    }

    return (
        <div className={classes.paginationList}>
            {
                pagesArr.map((page:any, index:number)=>
                    <PaginationItem key={index} currentPage={currentPage} handler={()=>handler} page={page}/>
                )
            }
        </div>
    );
};

export default PaginationList;
