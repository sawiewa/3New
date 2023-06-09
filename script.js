//jsPDF = require('jspdf');
const secondColumn = document.querySelector('.secondColumn');
const templateItem = document.querySelector('.template');
const priceSite = document.querySelector('.priceTitle');
const btnPrint = document.querySelector('.btnPrint');
const btnPrice = document.querySelector('.btnPrice');
const btnGroup = document.querySelector('.btnGroup');
const arrow = document.querySelector('.arrow');
const inputTitle = document.querySelector('.inputTitle');
const inputMessage = document.querySelector('.inputMessage');
const thirdSiteToPrint = document.querySelector('.thirdLayout');
const btnGeneratePrint = document.querySelector('.btnSaveTemplate');
const btnClean = document.querySelector('.btnClean');
const body = document.querySelector('body');
const btnMode = document.querySelector('.btnDarkLightMode');
const btnbtnDarkLightMode = document.querySelector('.btnDarkLightMode');
const btnsMenu = document.querySelectorAll('.btnMenu');
const date = document.querySelector('#date');
const pdata = document.querySelector('p.date');
//const pTitle = document.querySelector('.titleView');
//const pMessage = document.querySelector('.messageView');
const testSecons = document.querySelector('.test');
const messageP = document.querySelector('.messageView');
const titleP = document.querySelector('.titleView');
const printView = document.querySelector('.printView');
const printViewStyle = document.querySelector('.printViewStyle');
const main = document.querySelector('.main');
const mainStyle = document.querySelector('.mainStyle');
const btnPr = document.querySelector('.btnPrint2');
let isVisiblePrintForms = false;
const thirdSiteToPrintStyle = document.querySelector('.thirdLayoutStyle');
const btnPrintView = document.querySelector('.btnsToPrint');
// ---buttony na popupie
const btnSaveTemplate = document.querySelector('.popupPanelButtons .save');
const btnCancelTemplate = document.querySelector('.popupPanelButtons .cancel');
//---popup do zapisu szablonu
const popupTemplate = document.querySelector('.popupSaveTemplate');
const textAreaTitle = document.querySelector('#titleTemplate');
const error = document.querySelector('.error');
const errorForm = document.querySelector('.errorForm');
//---opcje szablonów
const selectTemplates = document.querySelector('#savedTemplates'); //lista rozwijana szablonów
const btns = [arrow, btnGroup, btnPrice];

const savedTemplates = document.getElementsByClassName('SaveTemplate'); //szablony z wartosciami, nie lista rozwijana szablonów
let selectedValueId;
let selectedValueText;

let templateID = 0;
let templateListID;

//popup do usuwania szablonów
const checkList = document.querySelector('.check');
const trashButton = document.querySelector('.template .fa-trash');
const popupDeletetemplate = document.querySelector('.popupDeletetemplate');
const btnCancelPopupRemove = document.querySelector(
	'.panel-buttons-list .cancel'
);
const btnDeleteTemplate = document.querySelector('.panel-buttons-list .delete');
const option = document.getElementById('option');
const thirdLayout = document.getElementsByClassName('thirdLayout');

//zmienne do opłat
const incomeSection = document.querySelector('.income-area');
const expansesSection = document.querySelector('.expanses-area');
const availableMoney = document.querySelector('.available-money');
const addTransactionPanel = document.querySelector('.add-transaction-panel');
const addTransactionBtn = document.querySelector('.add-transaction');
const saveBtn = document.querySelector('.panel-buttons .save');
const clearBtnAddTr = document.querySelector('.panel-buttons .cancel');
const deleteBtn = document.querySelector('.delete'); //każdy osobny x
const deleteAllBtn = document.querySelector('.delete-all');
const panelPrice = document.querySelector('.price');
const inputNameTrans = addTransactionPanel.querySelector('#name');
const inputPriceTrans = addTransactionPanel.querySelector('#amount');
const selectCategoryTrans = addTransactionPanel.querySelector('#category');
let transactionID = 10001;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

//doc.save('a4.pdf');
let doc = new jsPDF();
function createPdf() {
	// const wrap = (texttest, n) => {
	const options = {
		orientation: 'p',
		unit: 'mm',
		format: 'a4',
		lineHeightFactor: 1.5,
		maxWidth: 200,
		align: 'justify',
	};
	// 	let lines = doc.splitTextToSize(texttest, 150);
	// 	for (let i = 0; i < lines.length; i++) {
	// 		doc.text(15, n + i * 10, lines[i]);
	// 		//doc.text(texttest, options);
	// 	}
	doc.setTextColor(0, 12, 100, 49);
	doc.setFillColor(0, 59, 100, 5);
	doc.setFontSize(15);

	// wrap(messageP.innerText, 50);
	// wrap(titleP.innerText, 30);
	doc.text(titleP.innerText, 50, 30, options);
	//doc.line(20, 20, 200, 20);
	//doc.setLineCap(0);
	doc.setTextColor(255, 0, 0);
	doc.text(messageP.innerText, 10, 60, options);
	//doc.line(30, 50, 200, 50);
	doc.setPage(1);
	doc.setLanguage('pl-PL');
	doc.setLineWidth(100);

	doc.save('myDoc.pdf');
	return;

	doc.deleteFonts();
}

//doc.title = 'Moja strona';

// const format = {
// 	margin: 50,

// 	filename: 'myfile.pdf',
// 	image: { type: 'jpeg', quality: 0.98 },
// 	html2canvas: { scale: 4 },
// 	jsPDF: {
// 		unit: 'px',
// 		format: 'a4',
// 		orientation: 'landscape',
// 	},
// };

function createPdf2() {
	var doc = new jsPDF();
	const format = {
		margin: [30, 30, 30, 30],
		filename: 'myfile.pdf',
		image: { type: 'jpeg', quality: 0.98 },
		html2canvas: { scale: 4 },
		jsPDF: {
			unit: 'px',
			format: 'a4',
			orientation: 'portrait',
		},
	};
	const options = {
		background: '#e5e5e5',
	};
	doc.setTextColor(0, 12, 100, 49);

	html2pdf().from(printView).set(format).save();
}
const controller = new AbortController();
btnPr.addEventListener('click', createPdf2);

//----tryb jasny ciemny funkcja
const changeMode = () => {
	if (body.getAttribute('data-mode') == 'light') {
		body.setAttribute('data-mode', 'dark');
		btnbtnDarkLightMode.textContent = 'Tryb jasny';
	} else {
		body.setAttribute('data-mode', 'light');
		btnbtnDarkLightMode.textContent = 'Tryb ciemny';
	}
};

//chowanie i ukrywanie kolumny
const showColumn = (column, hide, visible) => {
	//column.classList.remove(hide); //klasa do usunięcia
	column.classList.remove(hide); //klasa do usunięcia
	column.classList.add(visible); //klasa do dodania
};

const hideColumn = (column, hide, visible) => {
	column.classList.add(hide);
	column.classList.remove(visible);
};

//---do poprawki, tworzenie szablonu wydruku
const addPrintViewTemplate = () => {
	if (inputTitle.value == '' || inputMessage.value == '') {
		titleP.textContent = 'nie podałeś tekstów';
	} else {
		titleP.textContent = inputTitle.value;
		messageP.textContent = inputMessage.value;
	}
};
//--funkcja przypisywania wartosci z inputa do divów
const writeTextUptoDate = (mes, e) => {
	mes.textContent = e.target.value;
	//mes.style.color = 'black';
	mes.style.color = '';
};

//
// const hidePrintForms = () => {
// 	let pforms = document.querySelector('.firstSection');
// 	pforms.classList.add('hide');
// 	pforms.classList.remove('firstSection');
// };

//--czyszczenie zawartości inputów wydruku
const cleanForm = (input) => {
	input.forEach((element) => {
		if (element.value !== '') {
			element.value = '';
		} else {
			element.value = '';
		}
	});
};

//---dodanie  tekstów komunikatów o braku tekstów
const defaultValueView = (title, message, date) => {
	title.textContent = 'Nie dodałeś tytułu';
	title.style.color = 'grey';
	message.textContent = ' Nie dodałeś treści';
	message.style.color = 'grey';
	date.textContent = ' ';
	return;
};

const showThird = (p) => {
	p.forEach((el) => {});
};

const showPopup = (popup) => {
	popup.style.display = 'flex';
	errorForm.style.visibility = 'hidden';
};
const hidePopup = (popup) => {
	popup.style.display = 'none';
	error.style.visibility = 'hidden'; //czysci error w przypadku gdy wystąpił podczas dodawania formularza
};
let checkID = 0;
let templateToRemoveFromPopup;
const saveTemplates = () => {
	if (textAreaTitle.value !== '') {
		const newSelectTemplate = document.createElement('option');
		newSelectTemplate.innerText = textAreaTitle.value;
		templateListID = templateID + 11;
		newSelectTemplate.setAttribute('id', templateListID);
		selectTemplates.appendChild(newSelectTemplate);

		hidePopup(popupTemplate);
		cleanForm([textAreaTitle]);
		error.style.visibility = 'hidden';
		createTemplate();
		const fillListTempletoToRemove = () => {
			const newLabelList = document.createElement('div');
			const templateListPopupID = templateListID + 12;
			newLabelList.classList.add('check1');
			newLabelList.setAttribute('id', templateListPopupID);
			option.appendChild(newLabelList);
			newLabelList.innerHTML = `<p>${newSelectTemplate.innerText}</p><i onclick="removeT(${templateListPopupID},${templateID},${templateListID})" class="fas fa-times icon"></i>`;
			// console.log(`id elementu listy popupa ${templateListPopupID}`);
			// console.log(`id elementu listy rozwijanej ${templateListID}`);
			// console.log(`id elementu szablonu w trzeciej kolumnie ${templateID}`);
		};

		fillListTempletoToRemove();
		templateID++;
	} else {
		error.style.visibility = 'visible';
	}
};

//--stworzenie nowego szablonu, dane wprowadzane do inputa zapiszą się jako nowy szablon do wykorzystania później

const createTemplate = () => {
	const newTemplate = document.createElement('div');
	const newTemplateDate = document.createElement('p');
	const newTemplateTitle = document.createElement('p');
	const newTemplateMessage = document.createElement('p');

	newTemplate.classList.add('SaveTemplate');
	newTemplate.classList.add('hide');
	newTemplateDate.classList.add('dateSave');
	newTemplateTitle.classList.add('titleViewSave');
	newTemplateMessage.classList.add('messageViewSave');

	thirdSiteToPrint.appendChild(newTemplate);
	newTemplate.setAttribute('id', templateID);
	newTemplate.appendChild(newTemplateDate);
	newTemplate.appendChild(newTemplateTitle);
	newTemplate.appendChild(newTemplateMessage);

	newTemplateDate.textContent = date.value;
	newTemplateTitle.textContent = inputTitle.value;
	newTemplateMessage.textContent = inputMessage.value;
	//templateID++;
	titleP.textContent = '';
	messageP.textContent = '';

	cleanForm([date, inputTitle, inputMessage]);
	//defaultValueView(titleP, messageP, pdata);
};

//-- uzupełnianie wartosci na podglądzie o tresci które zostały przekazane z szablonu do inputów
const setPrintValue = () => {
	titleP.textContent = inputTitle.value;
	messageP.textContent = inputMessage.value;
	pdata.textContent = date.value;
};
//--pokazywanie popupu do tworzenia szablonu + sprawdzanie czy pola nie są puste
const checkForm = () => {
	if (inputTitle.value !== '' && inputMessage.value !== '') {
		showPopup(popupTemplate);
	} else {
		errorForm.style.visibility = 'visible';
	}
};

//----------tutaj pokazywanie wartosci szablonów po wybraniu z listy select
const selectValue = () => {
	//-----połączenie wybranej option z szablonem zapisanym
	const addToid = 11; //musze odejmować tą wartosc poniewaz dodaje ją zeby tworzyc unikalne id przy tworzeniu szablonów i listy rozwijanej w funkcj saveTemplates()
	const titleViewSave = document.getElementsByClassName('titleViewSave');
	savedTemplates.forEach((zapisaneTeksty) => {
		//getElementsByClassName ponieważ to są żywe kolekcje inaczej funkcje nie działały na elementach dynamicznie dodanych
		if (
			selectTemplates.options[selectTemplates.selectedIndex].id - addToid ==
			zapisaneTeksty.id
		) {
			titleViewSave.forEach((temp) => {
				//dostaję się do tytułu, który jest pierszy na liscie a potem do rodzica i porównuje id rodzica z id opcji w select
				if (
					selectTemplates.options[selectTemplates.selectedIndex].id - addToid ==
					temp.parentElement.id
				) {
					date.value = zapisaneTeksty.children[0].textContent;
					inputTitle.value = zapisaneTeksty.children[1].textContent;
					inputMessage.value = zapisaneTeksty.children[2].textContent;
				}
			});
			// console.log(`wybrany id options ${selectedValueId} i template ${zapisaneTeksty.innerHTML} i dziecko pierwsze ${zapisaneTeksty.children[0].textContent} i dziecko drugie ${zapisaneTeksty.children[1].textContent} i dziecko trzecie ${zapisaneTeksty.children[2].textContent}
			// `);
		}
	});
	setPrintValue(); //uzupelnienie wartosciami podglądu
};

const checkDefaultOptions = () => {
	//ustawienie domyślnej opcji wybierz kategorię
	selectTemplates.selectedIndex = 0;
};

//--usuwanie szablonów z listy rozwijanej, popupu i z trzeciej kolumny
const removeT = (idPopup, idTemplates, idFromList) => {
	const templateToRemoveFromPopup = document.getElementById(idPopup); //element z listy popupa do usuniecia
	option.removeChild(templateToRemoveFromPopup); //option to rodzic dla listy na popupie
	const templateToRemove = document.getElementById(idTemplates); //szablon do usunięcia, divy z wartosciami zapisanych szablonów, nie lista
	thirdSiteToPrint.removeChild(templateToRemove); //
	const ListToremove = document.getElementById(idFromList); //element listy rozwijanej do usunięcia
	selectTemplates.removeChild(ListToremove); //usuniecie dziecka listy rozwijanej czyli wybranego elementu
};

//-- opłaty
const selectCategory = () => {
	selectedCategory =
		selectCategoryTrans.options[selectCategoryTrans.selectedIndex].text; //wybieranie kategorii, wywoływane onclickiem w htmlu
	//console.log(selectCategoryTrans.options[selectCategoryTrans.selectedIndex].text)
};

const createNewTransaction = () => {
	const newTransaction = document.createElement('div');
	newTransaction.classList.add('transaction');
	newTransaction.setAttribute('id', transactionID);

	checkCategory(selectedCategory); //funkcja która sprawdza jaka jest wybrana kategoria, i przypisuje do niej ikone
	newTransaction.innerHTML = `
    <p class="transaction-name">${categoryIcon} ${inputNameTrans.value}</p>
    <p class="transaction-amount">${inputPriceTrans.value} zł 
    <button class="delete" onclick = "deleteTransaction(${transactionID})"><i class="fas fa-times"></i></button>
    </p>`;

	inputPriceTrans.value > 0 //instrukcja warunkowa, jezeli wartosc jest większa od 0
		? incomeSection.appendChild(newTransaction) && //to dodajemy newTransaction do sekcji income
		  newTransaction.classList.add('income') // i dodajemy mu class income
		: expansesSection.appendChild(newTransaction) && //w przeciwnym wypadku jak kwota jest ujemna to do expanses czyli do wydatków
		  newTransaction.classList.add('expense');

	moneyArr.push(parseFloat(inputPriceTrans.value)); // dodajemy do tablicy moneyArr elementy jakie są pobrane z inputa, ale w inpucie zawsze jest string, parseFloat zamienia go na liczbę
	console.log(inputPriceTrans.value);
	console.log(moneyArr);
	countMoney(moneyArr); //wywolujemy funkcję co zlicza pieniądze, argumentem jest tablica z całą wpisaną kasą
	transactionID++;
	cleanForm([inputNameTrans, inputPriceTrans, selectCategoryTrans]);
};
const checkFormTransaction = () => {
	if (
		inputNameTrans.value !== '' &&
		inputPriceTrans.value !== ' ' &&
		selectCategoryTrans.value !== 'none'
	) {
		//console.log('bedzie ok');
		createNewTransaction();
	} else {
		alert('Wypełnij wszystkie pola transakcji');
	}
};
const checkCategory = (transaction) => {
	//bedziemy sprawdzac transakcję do jakiej przypisac i wrzucac odpowiednią ikone pod categoryIcon
	switch (transaction) {
		case '[+]Przychód':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
			break;
		case '[-]Wydatek':
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
			break;
	}
};

const countMoney = (money) => {
	const newMoney = money.reduce((a, b) => a + b); //reduce to metoda wykonywana na kazdym elemencie tablicy
	availableMoney.textContent = ` ${newMoney} zł`;
};

const deleteTransaction = (id) => {
	const transactionToDelete = document.getElementById(id);

	const transactionAmount = parseFloat(
		transactionToDelete.childNodes[3].innerText
	); //indekx 3 przechowuje wartość którą potem bedziemy wywalac
	//parsefloat bierze tylko cyfry dlatego nie bedzie zł, nie zwraca liter
	const indexOfTransaction = moneyArr.indexOf(transactionAmount);
	moneyArr.splice(indexOfTransaction, 1);
	transactionToDelete.classList.contains('income')
		? incomeSection.removeChild(transactionToDelete)
		: expansesSection.removeChild(transactionToDelete);

	countMoney(moneyArr);
	// console.log(transactionAmount);
	// console.log(moneyArr);
};

const deleteAllTransaction = () => {
	incomeSection.innerHTML = '<h3>Przychód</h3>';
	expansesSection.innerHTML = '<h3>Wydatki</h3>';
	availableMoney.textContent = '0zł';
	moneyArr = [0];
};
//btnDeleteTemplate.addEventListener('click', removeTemp);

btnPrint.addEventListener('click', (element) => {
	showColumn(secondColumn, 'hide', 'secondColumnStyle');
	showColumn(templateItem, 'hide', 'templateStyle');
	showColumn(thirdSiteToPrint, 'hide', 'thirdLayoutStyle');
	showColumn(printView, 'hide', 'printViewStyle');
	hideColumn(main, 'hide', 'mainStyle');
	showColumn(btnPrintView, 'hide', 'btnsView');
	hideColumn(addTransactionPanel, 'hide', 'add-transaction-panel');
	hideColumn(panelPrice, 'hide', 'price');
});

arrow.addEventListener('click', (element) => {
	hideColumn(secondColumn, 'hide', 'secondColumnStyle');
	hideColumn(printView, 'hide', 'printViewStyle');
	showColumn(main, 'hide', 'mainStyle');
	hideColumn(btnPrintView, 'hide', 'btnsView');
	hideColumn(panelPrice, 'hide', 'price');
});

//----tryb jasny ciemny wywołanie
btnMode.addEventListener('click', changeMode);

//---wywołanie funkcji uzupełniającej na bieżąco wydruk, prosto z formularza---
inputTitle.addEventListener('keyup', (e) => writeTextUptoDate(titleP, e)); //nasłuchanie na to co jest wpisane w inputa tytułu i przypisanie do tutułu w podglądzie wydruku

inputMessage.addEventListener('keyup', (e) => writeTextUptoDate(messageP, e)); //nasłuchanie na to co jest wpisane w inputa wiadomości i przypisanie do tutułu w podglądzie wydruku
date.addEventListener('input', (e) => writeTextUptoDate(pdata, e)); //nasłuchanie na to co jest wybrane w inputa daty i przypisanie do tutułu w podglądzie wydruku

//--czyszczenie wszystkich wartości w formularzu drukowania
btnClean.addEventListener('click', (e) => {
	//e.preventDefault(); //chcemy zeby przycisk nie przeładowywał strony
	cleanForm([date, inputTitle, inputMessage]); //funkcja bedzie wywoływana i jako argumety bedzie po kolej przyjmowac wszystkie elementy tablicy, beda one argumentem który u nas nazywa sie input
	defaultValueView(titleP, messageP, pdata); //po wyczyszczeniu formularza wydruku domyślne wartości dla trzeciej kolumny
	errorForm.style.visibility = 'hidden';
	checkDefaultOptions();
});

clearBtnAddTr.addEventListener('click', (e) => {
	cleanForm([inputNameTrans, inputPriceTrans, selectCategoryTrans]);
});

//--otworzyc 2gą kolumnę po kliknieniu jakiegokolwiek przycisku z menu
// btnsMenu.forEach((btns) =>
// 	btns.addEventListener('click', (e) => {
// 		showColumn(secondColumn, 'hide', 'secondColumnStyle');
// 	})
// );

btnGroup.addEventListener('click', () => {
	showColumn(secondColumn, 'hide', 'secondColumnStyle');
	hideColumn(printView, 'hide', 'printViewStyle');
	hideColumn(templateItem, 'hide', 'templateStyle');
	hideColumn(main, 'hide', 'mainStyle');
	showColumn(thirdSiteToPrint, 'hide', 'thirdLayoutStyle');
	hideColumn(btnPrintView, 'hide', 'btnsView');
	hideColumn(addTransactionPanel, 'hide', 'add-transaction-panel');
	hideColumn(panelPrice, 'hide', 'price');
});

btnPrice.addEventListener('click', () => {
	showColumn(secondColumn, 'hide', 'secondColumnStyle');
	showColumn(thirdSiteToPrint, 'hide', 'thirdLayoutStyle');
	//hideColumn(thirdSiteToPrint, 'hide', 'thirdLayoutStyle');
	hideColumn(templateItem, 'hide', 'templateStyle');
	hideColumn(main, 'hide', 'mainStyle');
	hideColumn(printView, 'hide', 'printViewStyle');
	hideColumn(btnPrintView, 'hide', 'btnsView');
	showColumn(addTransactionPanel, 'hide', 'add-transaction-panel');
	showColumn(panelPrice, 'hide', 'price');
});
btnGeneratePrint.addEventListener('click', () => {
	checkForm();
});
btnCancelTemplate.addEventListener('click', () => {
	hidePopup(popupTemplate);
	cleanForm([textAreaTitle]); // uzycie funckji którs służy do czyszczenia formularzy
	selectTemplates.selectedIndex = 0;
	cleanForm([date, inputTitle, inputMessage]);
	defaultValueView(titleP, messageP, pdata);
});
btnSaveTemplate.addEventListener('click', () => {
	saveTemplates();
	checkDefaultOptions();
	//fillListTempletoToRemove();
});
trashButton.addEventListener('click', () => {
	showPopup(popupDeletetemplate);
	//fillListTempletoToRemove();
});

btnCancelPopupRemove.addEventListener('click', () => {
	hidePopup(popupDeletetemplate);
});
saveBtn.addEventListener('click', checkFormTransaction);
deleteAllBtn.addEventListener('click', deleteAllTransaction);