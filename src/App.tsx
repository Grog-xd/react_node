import React, {useEffect, useState} from 'react';
import './App.scss';
import axios from 'axios';

import {ItemsProps} from './types/types';


import Table from './components/Table/Table';
import FilterSection from './components/FilterSection/FilterSection';
import Loader from './components/Loader/Loader';
import PaginationList from './components/Pagination/PaginationList/PaginationList';

function App() {

    const [items, setItems] = useState<ItemsProps[]>([])
    const [sortedItems, setSortedItems] = useState<any>([])
    const [errorStatus, setErrorStatus] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number | string>(1)

    //отвечает за то сколько товаров будет на странице
    const [limitItems, setLimitItems] = useState<number>(5)

    function getItems(){
        axios.get('http://localhost:3030/api/item')
            .then(response => response.data)
            .then(response => setItems(response))
            .catch(e => console.log(e.message))

    }




    //создание отсортированных items + пагинация
    function getSortedItems(items:any){
        let res = []
        let iteration = 0
        for (let i = 0; iteration < items.length; i++) {
            let obj = []
            for (let j = 0; j< limitItems; j++) {

                if(items[iteration]){
                    obj.push(items[iteration])
                    iteration++
                }

            }
            res.push(obj)
        }
        setSortedItems(res)
    }



    useEffect(getItems, [])
    useEffect(()=>{
        getSortedItems(items)
    },  [items])



    function filterItems(col:string, req:string, input:string){

        setErrorStatus(false)
        // обработка отмены (reset)
        if(col === '' && req === '' && input === ''){
            getSortedItems(items)
        }


        //очень тяжелая фильтрация, пытался сделать через два различных switch, но не получилось

        switch (col){


        case 'название':
            switch (req){
            case 'равно':
                getSortedItems(items.filter(e => e.name == input))
                break
            case 'содержит':
                getSortedItems(items.filter((e) => e.name.toLowerCase().includes(input)))
                break
            default:
                setErrorStatus(true)
            }
            break


        case 'количество':

            switch (req){
            case 'равно':
                getSortedItems(items.filter(e => e.quantity == input))
                break
            case 'больше':
                getSortedItems(items.filter(e => e.quantity > input))
                break
            case 'меньше':
                getSortedItems(items.filter(e => e.quantity < input))
                break
            default :
                setErrorStatus(true)
            }
            break
        case 'расстояние':
            switch (req){
            case 'равно':
                getSortedItems(items.filter(e => e.interval == input))
                break
            case 'больше':
                getSortedItems(items.filter(e => e.interval > input))
                break
            case 'меньше':
                getSortedItems(items.filter(e => e.interval < input))
                break
            default:
                setErrorStatus(true)
            }
            break

        }

    }


    return (
        <div className='App'>
            <FilterSection handler={(activeValueColumn, activeValueRequirement, inputValue) => filterItems(activeValueColumn.toLowerCase(), activeValueRequirement.toLowerCase(), inputValue.toLowerCase())}/>
            {errorStatus && <h2>Ошибка фильтрации, пожалуйста введите корректно данные в фильтры </h2>}
            {
                items.length
                    ? <Table  items={sortedItems} currentPage={currentPage}/>
                    : <Loader />
            }
            <PaginationList pagesLen={sortedItems.length} currentPage={currentPage} handler={(page) => setCurrentPage(page)} />
        </div>
    );
}

export default App;
