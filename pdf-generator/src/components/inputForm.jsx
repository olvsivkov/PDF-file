import React from 'react';
import '../styles/styles.css'; // Подключаем CSS файл

function InputForm({ setName, setIncludeName, includeName, name }) {
    return (
        <div className='form-wrapper'>
            <form>
                    <label htmlFor="name">ФИО клиента:
                      <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required 
                          placeholder='Костин Андрей Леонидович'
                      />
                    </label>
                    <label htmlFor="include">ЭР
                      <input
                          type="checkbox"
                          id="include"
                          checked={includeName}
                          onChange={() => setIncludeName(!includeName)}
                      />
                    </label>
            </form>
        </div>
    );
}

export default InputForm;

/*import '../styles/styles.css'

function InputForm({setName, setIncludeName, includeName, name}){

    return (
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          ЭР
          <input
            type="checkbox"
            checked={includeName}
            onChange={() => setIncludeName(!includeName)}
          />
        </label>
        <br />
      </form>
    )
}

export default InputForm*/