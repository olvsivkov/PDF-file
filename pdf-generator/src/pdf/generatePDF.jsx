import pdfMake from 'pdfmake/build/pdfmake';
import logo from '../assets/logo/vtb.png'

function generatePDF({state, documentNotarization}) {
    const docDefinition = {
      content: [
        {
          columns: [
              {
                  text: 'Уважаемый клиент, добрый день!',
                  style: 'header',
                  alignment: 'left' // Выравнивание текста
              },
              {
                image: logo,
                width: 300,
                margin: [0, 0, 0, 10]
              }
          ],
          columnGap: 10 // Отступ между колонками
      },
        { text: 'Информируем Вас о распределении сделки в Центр ипотечного кредитования.', style: 'subheader' },
        {
          table: {
            body: [
                [
                    { text: 'Дата', fillColor: '#f0ffff', border: [true, true, true, true] }, // Заголовок с заливкой
                    { text: state.date || '', fillColor: '#f0ffff', border: [true, true, true, true] } // Ячейка с заливкой
                ],
                [
                    { text: 'Время', fillColor: '#f0ffff', border: [true, true, true, true] }, // Заголовок с заливкой
                    { text: state.dateTime || '', fillColor: '#f0ffff', border: [true, true, true, true] } // Ячейка с заливкой
                ],
                [
                    { text: 'ЦИК', fillColor: '#f0ffff', border: [true, true, true, true] }, // Заголовок с заливкой
                    { text: state.selectedOffice.address || '', fillColor: '#f0ffff', border: [true, true, true, true] } // Ячейка с заливкой
                ],
                [
                    { text: 'Ответственный сотрудник ЦИК', fillColor: '#f0ffff', border: [true, true, true, true] }, // Заголовок с заливкой
                    { text: state.selectedContact || '', fillColor: '#f0ffff', border: [true, true, true, true] } // Ячейка с заливкой
                ],
            ],
            layout: {
                hLineColor: '#ddeeff', // Цвет горизонтальных линий
                vLineColor: '#ddeeff', // Цвет вертикальных линий
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
            }
          }
        },
        { text: 'Кредитный договор', style: 'subheader' },
        { text: `№ ${state.creditAgreementNumber} от ${state.date} г.`, margin: [0, 0, 0, 20], style: 'normalText' },
        { text: 'Параметры кредита', style: 'subheader' },
        { text: `Кредит – ${state.loanAmount || '__'} руб., срок – ${state.loanTerm || '__'} мес., ставка - ${state.loanRate || '__'}% годовых.`, margin: [0, 0, 0, 20], style: 'subheader'  },
        { text: 'Реквизиты счета необходимо уточнить в Центре ипотечного кредитования.', style: 'normalText' },

        // Документы заемщика
        { text: 'На сделке необходимо присутствовать заемщику и поручителю (при наличии поручителя) и предоставить:', style: 'subheader'},
        { text: ' - Паспорт, снилс свидетельство о заключении брака, свидетельство о рождении несовершеннолетних детей;', style: 'normalText' },
        ...(state.taxDeclarationData_IsChecked ? [{ text: ' - Справка о доходах и суммах налога физического лица', style: 'normalText' }] : []),
        ...(state.workCertificateData_IsChecked ? [{ text: ' - Справка с места работы в произвольной форме;', style: 'normalText' }] : []),
        ...(state.salaryTransactionStatement_IsChecked ? [{ text: ' - Выписка по банковскому счету (назначение платежа «зарплатные начисления»);', style: 'normalText' }] : []),
        ...(state.pdfTaxStatement_IsChecked ? [{ text: ' - Выписка из СФР/ФНС в формате PDF;', style: 'normalText' }] : []),
        ...(state.notarizedMarriageContract_IsChecked ? [{ text: ' - нотариально удостоверенный брачный договор для заключение кредитного договора и приобретение объекта недвижимости, и передачу его в залог банку ВТБ;', style: 'normalText' }] : []),
        ...(state.spouseNotaryConsent_IsChecked ? [{ text: ' - нотариальное согласие супруги (а) для заключение кредитного договора и приобретение объекта недвижимости, и передачу его в залог банку ВТБ;', style: 'normalText' }] : []),
        ...(state.borrowerSingleDeclaration_IsChecked ? [{ text: ' - Заявление заемщика в простой письменной форме о том, что он не состоит в браке на момент приобретения объекта недвижимости;', style: 'normalText' }] : []),
        ...(state.expertContingentConditions ? { text: `Иные отлагательные условия по решению или заключению эксперта: ${state.expertContingentConditions}`, margin: [0, 0, 0, 10], style: 'normalText' }: []),
        { text: ' - Первоначальный взнос необходимо разместить на счете заемщика в банке ВТБ или принести на сделку.', style: 'normalText' },

        // Документы продавца
        { text: 'Продавцу необходимо предоставить на сделку:', style: 'subheader'},
        { text: '- Паспорт, СНИЛС;', style: 'normalText'},
        { text: '- Правоустанавливающие документы по объекту недвижимости в оригиналах;', style: 'normalText'},
        ...(state.borrowerSingleDeclaration_IsChecked ? [{ text: ' - заявление о семейном положении на момент покупки (может быть представлено на сделке в простой письменной форме либо пункт о семейном положении может быть включен в Договор купли-продажи);', style: 'normalText'}] : []),
        ...(state.notaryConsentSpouse ? [{ text: ' - если продавец состоял(а) в браке на момент покупки объекта недвижимости, то представить нотариальное согласие супруги (а) ;', style: 'normalText' }] : []),
        ...(state.marriageContract_IsChecked ? [{ text: ' - нотариально удостоверенный брачный договор или соглашение о разделе имущества, подтверждающий раздельный режим имущества супругов;', style: 'normalText' }] : []),
        ...(state.notaryTrustDocument_IsChecked ? [{ text: ' - нотариальную доверенность, если от имени продавца действует представитель;', style: 'normalText' }] : []),

        { text: ``, margin: [10, 10, 10, 10] },

        // Тождественность документов по ЭР
        ...(state.ElectricRegistration_IsChecked ? [
          { text: 'Для электронной регистрации необходимо: сделать тождественность* следующих документов у нотариуса:', style: 'normalText'},
          { text: `${documentNotarization[0] || ['']}`, style: 'normalText' },
          { text: `${documentNotarization[1] || ['']}`, style: 'normalText' },
          { text: `${documentNotarization[2] || ['']}`, style: 'normalText' },
          { text: `${documentNotarization[3] || ['']}`, style: 'normalText' },
          { text: `${documentNotarization[4] || ['']}`, style: 'normalText' },

          { text: ``, margin: [10, 10, 10, 10] },

          { text: '*(с бумажного документа  делают скан  и  нотариус заверяет его электронной подписью, файлы в формате pdf  и sig с подписью нотариуса  Вам направят на почту, которые необходимо направить  менеджеру Ипотечного центра до проведения сделки)', style: 'smallText' },
        ] : []),

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          color:'#003366',
          margin:[0, 20, 0, 10],
          decorationStyle:'solid'
        },
        subheader:{
            fontSize: 14,
            bold:true,
            color:'#003366',
            margin:[0, 10 ,0 ,5]
        },
        normalText:{
            fontSize: 12,
            color:'#003366',
            margin:[0 ,5]
        },
        smallText:{
            fontSize: 8,
            color:'#003366',
            margin:[0 ,5]
        },
      }
    };

    pdfMake.createPdf(docDefinition).download('my-pdf.pdf');
  }

  export default generatePDF
