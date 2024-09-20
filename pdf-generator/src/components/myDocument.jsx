import React, { useState, useEffect } from 'react';
import PDFfile from './pdfFile';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import InputForm from './inputForm';
import GetRegions from './getRegion';
import json from "../db/dataBase.json" 

import '../styles/styles.css'


function GetPDFfile() {
  const [name, setName] = useState(''); // Имя клиента
  const [includeName, setIncludeName] = useState(false); // чекбокс с ЭР
  const [activeRegion, setActiveRegion] = useState(false) // Клик по региону после которого появляется форма
  // eslint-disable-next-line no-unused-vars
  const [dataBaseJSON, setDataBaseJSON] = useState(json) // загружаем в стейт данные из базы данных и передаем в GetRegions
  const [chooseRegionIndex, setChooseRegionIndex] = useState(0) // по клику на регион передается индекс региона в базе данных
  const [PDFfileInfo, setPDFfileInfo] = useState(json.items[chooseRegionIndex].region) // передается информация об активном регионе

  useEffect(() => { setPDFfileInfo(json.items[chooseRegionIndex].region) }, [chooseRegionIndex]); // при клике на регионы передается изменившийся индекс региона и далее передается в <PDFfile/>

  const generatePDF = () => { // генерация и скачивание пдф файла
    const input = document.getElementById('pdf-content');

    html2canvas(input).then((canvas) => {
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
  };

  return (
    <div>
      <GetRegions
        setActiveRegion={setActiveRegion}
        dataBaseJSON={dataBaseJSON}
        setChooseRegionIndex={setChooseRegionIndex}
      /> 
      {activeRegion ? <InputForm setName={setName} setIncludeName={setIncludeName} name={name} includeName={includeName}/> : false}

      <button type="button" 
        onClick={generatePDF}
      >
        Generate PDF
      </button>
     
      <PDFfile 
        name={name} 
        includeName={includeName}
        PDFfileInfo={PDFfileInfo}
      />
    </div>
  );
}

export default GetPDFfile;