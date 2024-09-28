import React from 'react';
import '../styles/styles.css'; // Подключаем CSS файл

function InputForm({state, handleChange, handleSubmit, handleOfficeChange, handleContactChange, offices}) {

    return (
        <div className='form-wrapper'>
            <form onSubmit={handleSubmit}>
                    <div className='office-contacts'>
                      <h3>Выберете офис:</h3>
                      <select onChange={handleOfficeChange} value={state.selectedOffice ? state.selectedOffice.address : ''} required > 
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
                      <div className='office-contacts'>
                        <h3>Контакты сотрудников:</h3>
                        <select onChange={handleContactChange} value={state.selectedContact || ''} required >
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
                    
                   <div className="input-container">
                      <label htmlFor="date" className='input-text input-label-wrapper'>
                        <p className='input-text'>Дата:</p>
                        <input
                          type="date"
                          name="date"
                          //value={state.date || ''}
                          onChange={handleChange}
                          className='date-block'
                          required
                        />
                      </label>
                    </div>

                    <div className="input-container">
                      <label htmlFor="dateTime" className='input-text input-label-wrapper'>
                        <p className='input-text'>Время:</p>
                        <input
                          type="time"
                          name="dateTime"
                          value={state.dateTime || ''}
                          onChange={handleChange}
                          className='date-block'
                          required
                        />
                      </label>
                    </div>

                    <div className="input-container">
                      <p className='input-text'>Номер кредитного договора:</p>
                      <label htmlFor="creditAgreementNumber" className="input-label-wrapper">
                        <input
                            type="text"
                            name="creditAgreementNumber"
                            value={state.creditAgreementNumber || ''} 
                            onChange={handleChange}
                            placeholder='V7899654/789878'
                            className="input-label-inner"
                            required
                        />
                      </label>
                    </div>

                    <div className="input-container">
                      <p className='input-text'>Сумма кредита:</p>
                      <label htmlFor="loanAmount" className="input-label-wrapper">
                        <input
                            type="text"
                            name="loanAmount"
                            value={state.loanAmount || ''} 
                            onChange={handleChange}
                            placeholder='5 485 000,56'
                            className="input-label-inner"
                            required
                        />
                      </label>
                    </div>

                    <div className="input-container">
                      <p className='input-text'>Срок кредита:</p>
                      <label htmlFor="loanTerm" className="input-label-wrapper">
                        <input
                            type="text"
                            name="loanTerm"
                            value={state.loanTerm || ''} 
                            onChange={handleChange}
                            placeholder='360'
                            className="input-label-inner"
                            required
                        />
                      </label>
                    </div>

                    <div className="input-container">
                    <p className='input-text'>Процентная ставка:</p>
                    <label htmlFor="loanRate" className="input-label-wrapper">
                      <input
                          type="text"
                          name="loanRate"
                          value={state.loanRate || ''} 
                          onChange={handleChange}
                          placeholder='21,3'
                          className="input-label-inner"
                          required
                      />
                    </label>
                    </div>

                    <h5>Услуги:</h5>

                    <label htmlFor="" className="custom-checkbox">
                      <input
                          type="checkbox"
                          name="ElectricRegistration_IsChecked"
                          checked={state.ElectricRegistration_IsChecked}
                          onChange={handleChange}
                      /> - ЭР
                    </label>

                    <h5>Отметь дополнительные документы заемщика на сделку:</h5>

                    <label htmlFor="" className="custom-checkbox">
                      <input
                          type="checkbox"
                          name="taxDeclarationData_IsChecked"
                          checked={state.taxDeclarationData_IsChecked}
                          onChange={handleChange}
                      /> - Справка о доходах и суммах налога физического лица
                    </label>
                    
                    <label htmlFor="" className="custom-checkbox">
                      <input
                          type="checkbox"
                          name="workCertificateData_IsChecked"
                          checked={state.workCertificateData_IsChecked}
                          onChange={handleChange}
                      /> - Справка с места работы в произвольной форме;
                    </label>
                    
                    <label htmlFor="" className="custom-checkbox">
                      <input
                          type="checkbox"
                          name="salaryTransactionStatement_IsChecked"
                          checked={state.salaryTransactionStatement_IsChecked}
                          onChange={handleChange}
                      /> - Выписка по банковскому счету (назначение платежа «зарплатные начисления»);
                    </label>
                    
                    <label htmlFor="" className="custom-checkbox">
                      <input
                          type="checkbox"
                          name="pdfTaxStatement_IsChecked"
                          checked={state.pdfTaxStatement_IsChecked}
                          onChange={handleChange}
                      /> - Выписка из СФР/ФНС в формате PDF;
                    </label>

                    <label htmlFor="" className="custom-checkbox">
                      <input
                          type="checkbox"
                          name="notarizedMarriageContract_IsChecked"
                          checked={state.notarizedMarriageContract_IsChecked}
                          onChange={handleChange}
                      /> - Нотариально удостоверенный брачный договор;
                    </label>
                    
                    <label htmlFor="" className="custom-checkbox">
                      <input
                          type="checkbox"
                          name="spouseNotaryConsent_IsChecked"
                          checked={state.spouseNotaryConsent_IsChecked}
                          onChange={handleChange}
                      /> - нотариальное согласие супруги (а);
                    </label>

                    <label htmlFor="" className="custom-checkbox">
                      <input
                          type="checkbox"
                          name="borrowerSingleDeclaration_IsChecked"
                          checked={state.borrowerSingleDeclaration_IsChecked}
                          onChange={handleChange}
                      /> - Заявление заемщика что он не в браке на момент сделки;
                    </label>
                    
                    <p>Иные отлагательные условия:</p>
                    <label htmlFor="expertContingentConditions"> 
                    <textarea
                          id='expertContingentConditions'
                          rows="5" 
                          cols="33"
                          name="expertContingentConditions"
                          value={state.expertContingentConditions || ''} 
                          onChange={handleChange}
                          placeholder='предоставить справку о закрытии кредита на сделку...'
                          className="expert-contingent-textarea"
                      /> 
                    </label>

                    <h5>Отметь дополнительные документы продаца на сделку:</h5>

                    <label htmlFor="" className="custom-checkbox">
                      <input
                          type="checkbox"
                          name="maritalStatusDeclaration_IsChecked"
                          checked={state.maritalStatusDeclaration_IsChecked}
                          onChange={handleChange}
                      /> - заявление что продавец не был в браке на момент покупки;
                    </label>

                    <label htmlFor="" className="custom-checkbox">
                      <input
                          type="checkbox"
                          name="notaryConsentSpouse_IsChecked"
                          checked={state.notaryConsentSpouse_IsChecked}
                          onChange={handleChange}
                      /> - нотариальное согласие супруги;
                    </label>

                    <label htmlFor="" className="custom-checkbox">
                      <input
                          type="checkbox"
                          name="marriageContract_IsChecked"
                          checked={state.marriageContract_IsChecked}
                          onChange={handleChange}
                      /> - брачный договор или соглашение о разделе имущества продавца;
                    </label>

                    <label htmlFor="" className="custom-checkbox">
                      <input
                          type="checkbox"
                          name="notaryTrustDocument_IsChecked"
                          checked={state.notaryTrustDocument_IsChecked}
                          onChange={handleChange}
                      /> - нотариальная доверенность;
                    </label>

                    <button type="submit">
                      Generate PDF
                    </button >
            </form>
        </div>
    );
}

export default InputForm;

