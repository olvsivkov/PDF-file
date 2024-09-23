import React from 'react';
import '../styles/styles.css'; // Подключаем CSS файл для стилей

function PDFfile({PDFfileInfo, submittedData}) {
    return (
        <div id="pdf-content" className="pdf-container">
            <div>
                <p>Уважаемый клиент, добрый день!</p> 
                <p>Информируем Вас о распределении сделки в Центр ипотечного кредитования.</p>
            </div>
            <div className="deal-record">
                <h2>Запись на сделку</h2>
                <table className="deal-table">
                    <tbody>
                        <tr>
                            <th>Дата и время</th>
                            <td>01.01.2024 10:00</td>
                        </tr>
                        <tr>
                            <th>ЦИК</th>
                            <td>ЦИК-001</td>
                        </tr>
                        <tr>
                            <th>Наименование</th>
                            <td>Ипотечный кредит</td>
                        </tr>
                        <tr>
                            <th>Ответственный сотрудник ЦИК</th>
                            <td>Иванов Иван Иванович</td>
                        </tr>
                        <tr>
                            <th>ФИО и контакты (почта и телефон)</th>
                            <td>ivanov@mail.com, +7 (999) 123-45-67</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Кредитный договор</h3>
                <p>№ __________ от «     » __________ 2024 г.</p>

                <h3>Параметры кредита</h3>
                <p>Кредит – _____ руб., срок – ____ мес., ставка - __% годовых.</p>

                <h3>Реквизиты счета</h3>
                <p>Необходимо уточнить в Центре ипотечного кредитования.</p>
            </div>
            <h4 className="pdf-info">{PDFfileInfo}</h4>
            <p className="pdf-name">ФИО: {submittedData.inputClientName}</p>
            {submittedData.ElectricRegistration_IsChecked && <p className="pdf-price">ЭР: 9 900 р</p>}
        </div>
    );
}

export default PDFfile;