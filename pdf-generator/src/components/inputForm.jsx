import React from 'react';
import '../styles/styles.css'; // Подключаем CSS файл

function InputForm({state, handleChange, handleSubmit, handleOfficeChange, handleContactChange, offices}) {

    return (
        <div className='form-wrapper'>
            <form onSubmit={handleSubmit}>

                    <label htmlFor="name">ФИО клиента:
                      <input
                          type="text"
                          name="inputClientName"
                          value={state.inputClientName || ''} 
                          onChange={handleChange}
                          placeholder='Костин Андрей Леонидович'
                      />
                    </label>
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

                    <label htmlFor="">ЭР
                      <input
                          type="checkbox"
                          name="ElectricRegistration_IsChecked"
                          checked={state.ElectricRegistration_IsChecked}
                          onChange={handleChange}
                      />
                    </label>

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

                    <button type="submit">
                      Generate PDF
                    </button >
            </form>
        </div>
    );
}

export default InputForm;

