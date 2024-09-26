import React from 'react';
import '../styles/styles.css'; // Подключаем CSS файл

function InputForm({state, handleChange, handleSubmit, handleOfficeChange, handleContactChange, offices}) {

    return (
        <div className='form-wrapper'>
            <form onSubmit={handleSubmit}>
                    <div>
                      <h3>Выберете офис:</h3>
                      <select onChange={handleOfficeChange} value={state.selectedOffice ? state.selectedOffice.address : ''}>
                        <option value="" disabled>
                          Выберите офис
                        </option>
                        {offices.map((office, index) => (
                          <option key={index} value={office.address}>
                            {office.address}
                         </option>
                        ))}
                      </select>
                    </div>

                    {state.selectedOffice && (
                      <div>
                        <h3>Контакты сотрудников:</h3>
                        <select onChange={handleContactChange} value={state.selectedContact || ''}>
                          <option value="" disabled>
                            Выберите контакт
                          </option>
                          {state.selectedOffice.contacts.map((contact, index) => (
                            <option key={index} value={contact}>
                              {contact}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <label htmlFor="date">Дата:
                      <input
                        type="date"
                        name="date"
                        value={state.date || ''}
                        onChange={handleChange}
                      />
                    </label>

                    <label htmlFor="dateTime">Время:
                      <input
                        type="time"
                        name="dateTime"
                        value={state.dateTime || ''}
                        onChange={handleChange}
                      />
                    </label>

                    <label htmlFor="creditAgreementNumber">Номер кредитного договора:
                      <input
                          type="text"
                          name="creditAgreementNumber"
                          value={state.creditAgreementNumber || ''} 
                          onChange={handleChange}
                          placeholder='V7899654/789878'
                      />
                    </label>

                    <label htmlFor="loanAmount">Сумма кредита:
                      <input
                          type="text"
                          name="loanAmount"
                          value={state.loanAmount || ''} 
                          onChange={handleChange}
                          placeholder='5 485 000,56'
                      />
                    </label>

                    <label htmlFor="loanTerm">Срок кредита:
                      <input
                          type="text"
                          name="loanTerm"
                          value={state.loanTerm || ''} 
                          onChange={handleChange}
                          placeholder='360'
                      />
                    </label>

                    <label htmlFor="loanRate">Процентная ставка:
                      <input
                          type="text"
                          name="loanRate"
                          value={state.loanRate || ''} 
                          onChange={handleChange}
                          placeholder='21,3'
                      />
                    </label>

                    <h5>Отметь документы заемщика на сделку:</h5>

                    <label htmlFor="">Справка о доходах и суммах налога физического лица
                      <input
                          type="checkbox"
                          name="taxDeclarationData_IsChecked"
                          checked={state.taxDeclarationData_IsChecked}
                          onChange={handleChange}
                      />
                    </label>
                    
                    <label htmlFor="">Справка с места работы в произвольной форме;
                      <input
                          type="checkbox"
                          name="workCertificateData_IsChecked"
                          checked={state.workCertificateData_IsChecked}
                          onChange={handleChange}
                      />
                    </label>
                    
                    <label htmlFor="">Выписка по банковскому счету (назначение платежа «зарплатные начисления»);
                      <input
                          type="checkbox"
                          name="salaryTransactionStatement_IsChecked"
                          checked={state.salaryTransactionStatement_IsChecked}
                          onChange={handleChange}
                      />
                    </label>
                    
                    <label htmlFor="">Выписка из СФР/ФНС в формате PDF;
                      <input
                          type="checkbox"
                          name="pdfTaxStatement_IsChecked"
                          checked={state.pdfTaxStatement_IsChecked}
                          onChange={handleChange}
                      />
                    </label>

                    <label htmlFor="">ЭР
                      <input
                          type="checkbox"
                          name="ElectricRegistration_IsChecked"
                          checked={state.ElectricRegistration_IsChecked}
                          onChange={handleChange}
                      />
                    </label>

                    <label htmlFor="name">ФИО клиента:
                      <input
                          type="text"
                          name="inputClientName"
                          value={state.inputClientName || ''} 
                          onChange={handleChange}
                          placeholder='Костин Андрей Леонидович'
                      />
                    </label>

                    <button type="submit">
                      Generate PDF
                    </button >
            </form>
        </div>
    );
}

export default InputForm;

