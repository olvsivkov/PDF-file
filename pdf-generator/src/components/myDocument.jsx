import React, { useState, useEffect, useReducer } from 'react';
//import PDFfile from './pdfFile'; не удалять, будет нужен в <PDFfile/>
import InputForm from './inputForm';
import GetRegions from './getRegion';
import json from "../db/dataBase.json"
import reducer from "../hooks/hooks" 
import initialState from "../initialState/initialState"
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import generatePDF from '../pdf/generatePDF'

import '../styles/styles.css'

pdfMake.vfs = pdfFonts.pdfMake.vfs; // Подключаем шрифты


function GetPDFfile() {

  const [state, dispatch] = useReducer(reducer, initialState); // создание и изменение состояния
  //const [submittedData, setSubmittedData] = useState(initialState); // не удалять, будет нужен в <PDFfile/> Состояние для хранения введенных пользователем данных в <inputForm/>
  const [activeRegion, setActiveRegion] = useState(false) // Клик по региону после которого появляется форма
  // eslint-disable-next-line no-unused-vars
  const [dataBaseJSON, setDataBaseJSON] = useState(json) // передаем в GetRegions названия городов из dataBase.json
  const [chooseRegionIndex, setChooseRegionIndex] = useState(0) // по клику на регион передается индекс региона в базе данных dataBase.json
  const [PDFfileInfo, setPDFfileInfo] = useState(json.items[chooseRegionIndex].region) // передается информация из dataBase.json о регионе который выбрал пользователь
  const offices = json.items[chooseRegionIndex].offices // массив объектов - офисы + контактные лица
  let region = json.items[chooseRegionIndex].region
  let documentNotarization = json.items[chooseRegionIndex].documentNotarization
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setPDFfileInfo(region) }, [chooseRegionIndex]); // при клике на регионы передается изменившийся индекс региона и далее передается в <PDFfile/>


  // редюсер отслеживает события пользователя в форме <inputForm/> в функции handleChange

  const handleChange = (e) => { // handleChange переключает чекбокс
    const { name, type, value } = e.target;
    if (type === 'checkbox') {
      dispatch({ type: 'TOGGLE_CHECKBOX', name }); // переключаем
    } else if (type === 'date') {
      // Преобразуем дату из формата YYYY-MM-DD в дд:мм:гг
      const date = new Date(value);
      const dd = String(date.getDate()).padStart(2, '0'); // День
      const mm = String(date.getMonth() + 1).padStart(2, '0'); // Месяц
      const yyyy = String(date.getFullYear()).slice(-4); // Последние две цифры года

      const formattedDate = `${dd}.${mm}.${yyyy} г.`; // Форматируем дату
      dispatch({ type: 'SET_INPUT', name, value: formattedDate}); // Отправляем отформатированную дату
  }  else {
      dispatch({ type: 'SET_INPUT', name, value }); // Обычное действие для текстового поля
    }
  };
  
  const handleOfficeChange = (event) => { // handleOfficeChange сохраняет выбранный офис
    const selectedOffice = offices.find(office => office.address === event.target.value);
    dispatch({ type: 'SELECT_OFFICE', payload: selectedOffice });
  };
  
  const handleContactChange = (event) => { // handleContactChange сохраняет выбранные контакты офисса
    dispatch({ type: 'SELECT_CONTACT', payload: event.target.value });
  };
  
  const handleSubmit = (e) => {   // handleSubmit сохраняет отправленные данные в state
    e.preventDefault();
    //setSubmittedData(state); // не удалять, будет нужен в <PDFfile/>
    setTimeout(() => { generatePDF({state, PDFfileInfo, documentNotarization}); }, 1); // Не изменять!!! без setTimeout pdf генерируется без данных
  };

  /*
  <div>
    <GetRegions/> - блок с регионами
    <InputForm/>  - форма, которую заполняет пользователь, появляется только при клике на регион
    <PDFfile PDFfileInfo={PDFfileInfo} submittedData={submittedData} /> - TODO доработать чтоб пользователь видел предварительный pdf файл перед скачиванием
  </div>
  */

  return (
    <div>
      <GetRegions
        setActiveRegion={setActiveRegion}
        dataBaseJSON={dataBaseJSON}
        setChooseRegionIndex={setChooseRegionIndex}
      /> 
      {activeRegion ? <InputForm 
        state={state} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        dispatch={dispatch}
        handleOfficeChange={handleOfficeChange}
        handleContactChange={handleContactChange} 
        offices={offices}
        /> : false}
    </div>
  );
}

export default GetPDFfile;