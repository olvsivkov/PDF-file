import React from 'react';
import '../styles/styles.css'; // Подключаем CSS файл

function InputForm({state, handleChange, handleSubmit}) {

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

