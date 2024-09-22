import React from 'react';
import '../styles/styles.css'; // Подключаем CSS файл для стилей

function PDFfile({PDFfileInfo, submittedData}) {
    return (
        <div id="pdf-content" className="pdf-container">
            <h1 className="pdf-title">Параметры сделки:</h1>
            <h4 className="pdf-info">{PDFfileInfo}</h4>
            <p className="pdf-name">ФИО: {submittedData.inputClientName}</p>
            {submittedData.ElectricRegistration_IsChecked && <p className="pdf-price">ЭР: 9 900 р</p>}
        </div>
    );
}

export default PDFfile;