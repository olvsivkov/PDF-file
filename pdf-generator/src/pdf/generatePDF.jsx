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
              ['ЦИК', state.selectedOffice.address || ''],
              ['Ответственный сотрудник ЦИК', state.selectedContact || ''],
            ]
          }
        },
        { text: 'Кредитный договор', style: 'subheader' },
        { text: `№ ${state.creditAgreementNumber} от ${state.date} г.`, margin: [0, 0, 0, 20] },
        { text: 'Параметры кредита', style: 'subheader' },
        { text: `Кредит – ${state.loanAmount || '__'} руб., срок – ${state.loanTerm || '__'} мес., ставка - ${state.loanRate || '__'}% годовых.`, margin: [0, 0, 0, 20] },
        { text: 'Реквизиты счета необходимо уточнить в Центре ипотечного кредитования.' },

        // Документы заемщика
        { text: 'На сделке необходимо присутствовать заемщику и поручителю (при наличии поручителя) и предоставить:', style: 'subheader'},
        { text: ' - Паспорт, снилс свидетельство о заключении брака, свидетельство о рождении несовершеннолетних детей;' },
        ...(state.taxDeclarationData_IsChecked ? [{ text: ' - Справка о доходах и суммах налога физического лица' }] : []),
        ...(state.workCertificateData_IsChecked ? [{ text: ' - Справка с места работы в произвольной форме;' }] : []),
        ...(state.salaryTransactionStatement_IsChecked ? [{ text: ' - Выписка по банковскому счету (назначение платежа «зарплатные начисления»);' }] : []),
        ...(state.pdfTaxStatement_IsChecked ? [{ text: ' - Выписка из СФР/ФНС в формате PDF;' }] : []),

        { text: `ФИО клиента: ${state.inputClientName}` },
        // Услуги
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
