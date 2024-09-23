import pdfMake from 'pdfmake/build/pdfmake';

function generatePDF({state, PDFfileInfo}) {
    const docDefinition = {
      content: [
        { text: 'Запись на сделку', style: 'header' },
        { text: `Регион: ${PDFfileInfo}`, style: 'subheader' },
        { text: 'Данные пользователя:', style: 'subheader' },
        {
          table: {
            body: [
              ['Дата', state.date || ''],
              ['Время', state.dateTime || ''],
              ['ЦИК', state.cik || ''],
              ['Наименование', state.name || ''],
              ['Ответственный сотрудник ЦИК', state.responsible || ''],
              ['ФИО и контакты (почта и телефон)', `${state.name} (${state.email}, ${state.phone})` || '']
            ]
          }
        },
        { text: 'Кредитный договор', style: 'subheader' },
        { text: '№ __________ от «     » __________ 2024 г.', margin: [0, 0, 0, 20] },
        { text: 'Параметры кредита', style: 'subheader' },
        { text: `Кредит – ${state.loanAmount || '__'} руб., срок – ${state.loanTerm || '__'} мес., ставка - ${state.loanRate || '__'}% годовых.`, margin: [0, 0, 0, 20] },
        { text: 'Реквизиты счета', style: 'subheader' },
        { text: 'Необходимо уточнить в Центре ипотечного кредитования.' },
        { text: `ФИО клиента: ${state.inputClientName}` },
        // Условное добавление текста "ЭР 9600 р"
        ...(state.ElectricRegistration_IsChecked ? [{ text: 'ЭР 9600 р' }] : [])
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        }
      }
    };

    pdfMake.createPdf(docDefinition).download('my-pdf.pdf');
  }

  export default generatePDF
