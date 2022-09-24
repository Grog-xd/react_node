import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

import {ItemsProps} from '../types/types';

function App() {

    const [items, setItems] = useState<ItemsProps[]>([])

    function getItems(){
        axios.get('http://localhost:3030/api/item')
            .then(response => response.data)
            .then(response => setItems(response))
            .catch(e => console.log(e.message))
    }

    useEffect(getItems, [])

    return (
        <div className='App'>
            {items.map((item) =>
                <div key={item.id}>
                    <p>{item.name}</p>
                    <p>{item.quantity}</p>
                    <p>{item.interval}</p>
                </div>,
            )}
        </div>
    );
}

export default App;
