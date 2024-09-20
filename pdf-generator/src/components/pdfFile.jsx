import React from 'react';
import '../styles/styles.css'; // Подключаем CSS файл для стилей

function PDFfile({ name, includeName, PDFfileInfo }) {
    return (
        <div id="pdf-content" className="pdf-container">
            <h1 className="pdf-title">Параметры сделки:</h1>
            <h4 className="pdf-info">{PDFfileInfo}</h4>
            <p className="pdf-name">ФИО: {name}</p>
            {includeName && <p className="pdf-price">ЭР: 9 900 р</p>}
        </div>
    );
}

export default PDFfile;

/*import React from 'react';

function PDFfile({ name, includeName, PDFfileInfo }) {
  
    return (
      <div id="pdf-content">
        <h1>Параметры сделки:</h1>
        <h4>{PDFfileInfo}</h4>
        <p>ФИО: {name}</p>
        {includeName ? <p>ЭР 9 900 р</p> : false}
      </div>
    );
}

export default PDFfile*/