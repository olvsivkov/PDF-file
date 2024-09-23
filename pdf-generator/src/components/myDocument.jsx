import React, { useState, useEffect, useReducer } from 'react';
import PDFfile from './pdfFile';
//import html2canvas from 'html2canvas';
//import jsPDF from 'jspdf';
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
  const [submittedData, setSubmittedData] = useState(initialState); // Состояние для хранения введенных пользователем данных в <inputForm/>
  const [activeRegion, setActiveRegion] = useState(false) // Клик по региону после которого появляется форма
  // eslint-disable-next-line no-unused-vars
  const [dataBaseJSON, setDataBaseJSON] = useState(json) // передаем в GetRegions названия городов из dataBase.json
  const [chooseRegionIndex, setChooseRegionIndex] = useState(0) // по клику на регион передается индекс региона в базе данных dataBase.json
  const [PDFfileInfo, setPDFfileInfo] = useState(json.items[chooseRegionIndex].region) // передается информация из dataBase.json о регионе который выбрал пользователь

  useEffect(() => { setPDFfileInfo(json.items[chooseRegionIndex].region) }, [chooseRegionIndex]); // при клике на регионы передается изменившийся индекс региона и далее передается в <PDFfile/>


  // редюсер отслеживает события пользователя в форме <inputForm/> в функции handleChange

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    if (type === 'checkbox') {
      dispatch({ type: 'TOGGLE_CHECKBOX', name }); // Вызываем новое действие для чекбокса
    } else {
      dispatch({ type: 'SET_INPUT', name, value }); // Обычное действие для текстового поля
    }
  };

  // handleSubmit сохраняет отправленные данные
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(state);
    console.log('Submitted Data:', state);
    setTimeout(() => { generatePDF({state, PDFfileInfo}); }, 1); // Не изменять!!! без setTimeout pdf генерируется без данных
  };

  

  /*function generatePDF() {
    const input = document.getElementById('pdf-content');
  
    html2canvas(input, {
      scale: 2, // Увеличиваем масштаб в 2 раза для повышения четкости
      useCORS: true, // Разрешаем кросс-доменные запросы для изображений
      allowTaint: true, // Разрешаем использование поврежденных изображений
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
  
      let position = 0;
  
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save('my-pdf.pdf');
    });
  }

  /*
  <GetRegions/> - блок с регионами
  <InputForm/>  - форма, которую заполняет пользователь, появляется только при клике на регион
  <PDFfile/> - layout pdf-файла который скачивает пользователь
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
        /> : false}
      <PDFfile 
        PDFfileInfo={PDFfileInfo} 
        submittedData={submittedData}
      />
    </div>
  );
}

export default GetPDFfile;