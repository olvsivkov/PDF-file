import React from 'react';
import '../styles/styles.css'; // Подключаем CSS файл

function InputForm({state, handleChange, handleSubmit,generatePDF}) {

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
                    <button type="submit">
                      Generate PDF
                    </button >
            </form>
        </div>
    );
}

export default InputForm;

