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
    const [currentPage, setCurrentPage] = useState<number>(1)

    //отвечает за то сколько товаров будет на странице
    const [limitItems, setLimitItems] = useState<number>(5)

    function getItems(){
        axios.get('http://localhost:3030/api/item')
            .then(response => response.data)
            .then(response => setItems(response))
            .catch(e => console.log(e.message))

    }


    //создание отсортированных
    function getSortedItems(){
        setSortedItems(items)
    }



    useEffect(getItems, [])
    useEffect(getSortedItems, [items])



    function filterItems(col:string, req:string, input:string){

        setErrorStatus(false)
        // обработка отмены (reset)
        if(col === '' && req === '' && input === ''){
            setSortedItems(items)
        }


        //очень тяжелая фильтрация, пытался сделать через два различных switch, но не получилось

        switch (col){


        case 'название':
            switch (req){
            case 'равно':
                setSortedItems(items.filter(e => e.name == input))
                break
            case 'содержит':
                setSortedItems(items.filter((e) => e.name.toLowerCase().includes(input)))
                break
            default:
                setErrorStatus(true)
            }
            break


        case 'количество':

            switch (req){
            case 'равно':
                setSortedItems(items.filter(e => e.quantity == input))
                break
            case 'больше':
                setSortedItems(items.filter(e => e.quantity > input))
                break
            case 'меньше':
                setSortedItems(items.filter(e => e.quantity < input))
                break
            default :
                setErrorStatus(true)
            }
            break
        case 'расстояние':
            switch (req){
            case 'равно':
                setSortedItems(items.filter(e => e.interval == input))
                break
            case 'больше':
                setSortedItems(items.filter(e => e.interval > input))
                break
            case 'меньше':
                setSortedItems(items.filter(e => e.interval < input))
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
            {errorStatus && <h2>Ошибка фильтрации, пожалуйста введите корректную фильтрацию </h2>}
            {
                items.length
                    ? <Table  items={sortedItems}/>
                    : <Loader />
            }
            {/*<PaginationList pagesLen={sortedItems.length} currentPage={currentPage} handler={(page) => setCurrentPage(page)} />*/}
        </div>
    );
}

export default App;
