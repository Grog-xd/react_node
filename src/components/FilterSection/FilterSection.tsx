import React, {FC, useState} from 'react';


import MySelect from '../UI/MySelect/mySelect';
import {OptionsProps} from '../../types/types';

import classes from './FilterSection.module.scss';

interface FilterSectionProps{
    handler:(activeValueColumn: string, activeValueRequirement:string, inputValue:string) => void
}

const FilterSection:FC <FilterSectionProps> = ({handler}) => {

    const [columnFilterOptions, setColumnFilterOptions] = useState<OptionsProps[]>([
        {id:1,value:'Название'},
        {id:2,value:'Количество'},
        {id:3,value:'Расстояние'},
    ])

    const [requirementFilterOptions, setRequirementFilterOptions] = useState<OptionsProps[]>([
        {id:1,value:'Равно'},
        {id:2,value:'Содержит'},
        {id:3,value:'Больше'},
        {id:4,value:'Меньше'},
    ])

    const [activeValueColumn, setActiveValueColumn] = useState<string>('')
    const [activeValueRequirement, setActiveValueRequirement] = useState<string>('')
    const [inputValue, setInputValue] = useState<string>('')


    function setColumn(value:string){
        setActiveValueColumn(value)
    }

    function setRequirement(value:string){
        setActiveValueRequirement(value)
    }

    function reset(){
        setActiveValueColumn('')
        setActiveValueRequirement('')
        setInputValue('')
        handler('', '', '')
    }

    function filter(){
        handler(activeValueColumn, activeValueRequirement, inputValue)
    }



    return (
        <form className={classes.FilterSection}>
            <MySelect options={columnFilterOptions} value={activeValueColumn ? activeValueColumn :'Колонка'} handler={(value) =>setColumn(value) }/>
            <MySelect options={requirementFilterOptions} value={activeValueRequirement ? activeValueRequirement :'Условие'} handler={(value) =>setRequirement(value)}/>
            <input type='text' placeholder={'Поле ввода'} className={classes.input}  value={inputValue} onChange={(e)=>setInputValue(e.target.value)} maxLength={25}/>
            <button className={classes.btn} type={'button'} onClick={reset}>Очистить</button>
            <button className={classes.btn} type={'button'} onClick={filter}>Показать</button>
        </form>
    );
};

export default FilterSection;
