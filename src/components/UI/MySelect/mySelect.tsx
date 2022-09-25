import React, {FC, ReactNode, useState} from 'react';


import classes from './mySelect.module.scss'

interface OptionsProps{
    id:number,
    value:string
}

interface SelectProps {
    options: OptionsProps[],
    value:string,
    handler: (value:string) => void,
    children?: ReactNode,
}

const MySelect:FC<SelectProps> = ({options, value, handler, children}) => {
    const [selectActive, setSelectActive] = useState<boolean>(false)
    const clsChangeBlock = [
        classes.changeBlock,
        classes.changeBlockActive,
    ]

    function selectHandler(value: string){
        setSelectActive(!selectActive)
        handler(value)
    }

    return (
        <div className={classes.select}>
            <button type={'button'} onClick={()=> setSelectActive(!selectActive)}  className={selectActive ? clsChangeBlock.join(' ') : classes.changeBlock}>
                <div>
                    <p className={classes.textValue}>{value}</p>
                </div>
            </button>
            {
                selectActive
                    &&
                    <div className={classes.optionsBlock}>
                        {options.map((option) =>
                            <button onClick={()=>selectHandler(option.value)} key={option.id}>{option.value}</button>,
                        )}
                    </div>
            }

        </div>

    );
};



export default MySelect;
