import React, { useState }  from 'react';
import '../styles/styles.css'

function Region({ region, onClick, style }) {
    // выводится имя региона
    return (
        <div className='region-item' onClick={onClick} style={style}>
            <h3>{region}</h3>
        </div>
    );
}

function GetRegions({setActiveRegion, dataBaseJSON, setChooseRegionIndex}) { // компонент который выводит массив регионов
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleClick = (index) => {
        setClickedIndex(index);
    };

    const getBlockStyle = (index) => {
        if (clickedIndex === index) {
            return { backgroundColor: 'darkblue' }; // Темно-синий при клике
        }
    };

    const handleRegionClick = (index) => { // клик по которому форма становится видимой
        setActiveRegion(true);
        setChooseRegionIndex(index)
        handleClick(index)
    };
    const arrayOfRegion = dataBaseJSON.items
  
    const regions = arrayOfRegion.map((item, index) => ( 
        <Region 
            region={item.region} 
            key={index} 
            onClick={() => handleRegionClick(index)}
            style={getBlockStyle(index)}
        />
    ));

    return (
        <div>
            <h3>Выберете регион сделки:</h3>
            <div className='regions-wrapper'>
                {regions}
            </div>
        </div>
    );
}

export default GetRegions;