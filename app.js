const myApiUrl = "https://api.ratesapi.io/api/";
let savingCurrency = "RUB";
let investCurrency = "USD";
const savingCurrencyAmountInput = document.querySelector(".saving input");
const investCurrencyAmountInput = document.querySelector(".invest input");
let savingCurrencySelect = document.querySelector(".saving-select");
let investCurrencySelect = document.querySelector(".invest-select");
let savingCurrencyOptions = document.querySelectorAll(".saving-select option");
let investCurrencyOptions = document.querySelectorAll(".invest-select option");
let savingCurrencyTabs = document.querySelectorAll(".saving li");
let investCurrencyTabs = document.querySelectorAll(".invest li");
let savingCurrencyBtns = [...savingCurrencyTabs, savingCurrencySelect];
let investCurrencyBtns = [...investCurrencyTabs, investCurrencySelect];
let replaceBtn = document.querySelector(".replace-corrency");
const savingPriceTag = document.querySelector(".p-saving");
const investPriceTag = document.querySelector(".p-invest");
let coefficient = 1;
let priceNow = {};
let allApiCurrency = [];
const errorForm = document.querySelector(".error");
const closeErrBtn = document.querySelector(".close span");

closeErrBtn.addEventListener("click", (e) => {
    errorForm.classList.toggle('invisible')
});

fetch(`${myApiUrl}latest?base=RUB`)
    .then((response) => response.json())
    .then((price) => {
        priceNow = { ...price.rates };
        allApiCurrency = Object.getOwnPropertyNames(priceNow).sort();
        const selects = document.querySelectorAll("ul select");
        selects.forEach((element) => {
            element.innerHTML = "";
        });
        selects.forEach((element) => {
            element.append;
            allApiCurrency.forEach((e) => {
                let newOption = document.createElement("option");
                newOption.innerText = e;
                if (!["RUB", "GBP", "USD", "EUR"].includes(e)) {
                    element.append(newOption);}
            });
        });
        savingCurrencyOptions = document.querySelectorAll(".saving-select option");
        investCurrencyOptions = document.querySelectorAll(".invest-select option");
    });
getCurrenciesRatioFromApi(true);
    
replaceBtn.addEventListener("click", () => {
    replace();
});

function replace() {
    let newSavingCurrency = savingCurrencyBtns[GetCurrensyIndex(investCurrencyBtns)];
    let newInvestCurrency = investCurrencyBtns[GetCurrensyIndex(savingCurrencyBtns)];
    let oldSavingCurrencySelectVal = savingCurrencySelect.value;
    let oldInvestCurrencySelectVal = investCurrencySelect.value;
    savingCurrencySelect.value = oldInvestCurrencySelectVal;
    investCurrencySelect.value = oldSavingCurrencySelectVal;
    changeStyle(newSavingCurrency, savingCurrencyBtns);
    changeStyle(newInvestCurrency, investCurrencyBtns);

    if (GetCurrensyIndex(savingCurrencyBtns) === 4) {
        savingCurrency = newSavingCurrency.value;
        getCurrenciesRatioFromApi(true);
    } else {
        savingCurrency = newSavingCurrency.innerHTML;
        getCurrenciesRatioFromApi(true);
    }

    if (GetCurrensyIndex(investCurrencyBtns) === 4) {
        investCurrency = newInvestCurrency.value;
        getCurrenciesRatioFromApi(true);
    } else {
        investCurrency = newInvestCurrency.innerHTML;
        getCurrenciesRatioFromApi(true);
    }
}

function GetCurrensyIndex(btns) {
    s = 0;
    btns.forEach((e) => {
        if (e.classList.contains("active-currency")) {
            s = [].indexOf.call(e.parentNode.children, e);
        }
    });
    return s;
}

async function getCurrenciesRatioFromApi(isStraight) {
    if (savingCurrency === investCurrency) {
        coefficient = 1;
    } else {
        try {
        const response = await fetch(`${myApiUrl}latest?base=${savingCurrency}&symbols=${investCurrency}`);
        const data = await response.json();
        coefficient = await data.rates[investCurrency];
        } catch (err) {
            errorForm.classList.toggle('invisible')
        }
    }
    savingPriceTag.innerText = `1 ${savingCurrency} = ${coefficient.toFixed(4 )} ${investCurrency}`;
    investPriceTag.innerText = `1 ${investCurrency} = ${(1 / coefficient).toFixed(4)} ${savingCurrency}`;
    if (isStraight) {
        investCurrencyAmountInput.value = (Number(savingCurrencyAmountInput.value) * coefficient).toFixed(2);
    } else {
        investCurrencyAmountInput.value = (Number(savingCurrencyAmountInput.value) / coefficient).toFixed(2);
    }
}

function changeStyle(event, btns) {
    delActiveCurrensy(btns);
    event.classList.toggle("active-currency");
    function delActiveCurrensy(btns) {
        btns.forEach((element) => {
            if (element.classList.contains("active-currency")) {
                element.classList.toggle("active-currency");
            }
        });
    }
}

savingCurrencySelect.addEventListener("change", (event) => {
    changeStyle(event.target, savingCurrencyBtns);
    savingCurrency = event.target.options[event.target.selectedIndex].value;
    getCurrenciesRatioFromApi(true);
});

investCurrencySelect.addEventListener("change", (event) => {
    changeStyle(event.target, investCurrencyBtns);
    investCurrency = event.target.options[event.target.selectedIndex].value;
    getCurrenciesRatioFromApi(false);
});

savingCurrencyTabs.forEach((element) => {
    element.addEventListener("click", (event) => {
        changeStyle(event.target, savingCurrencyBtns);
        savingCurrency = event.target.innerText;
        getCurrenciesRatioFromApi(true);
    });
});

investCurrencyTabs.forEach((element) => {
    element.addEventListener("click", (event) => {
        changeStyle(event.target, investCurrencyBtns);
        investCurrency = event.target.innerText;
        getCurrenciesRatioFromApi(true);
    });
});

savingCurrencyAmountInput.addEventListener("keyup", (e) => {
    investCurrencyAmountInput.value = (
        Number(e.target.value) * coefficient
    ).toFixed(2);
});

investCurrencyAmountInput.addEventListener("keyup", (e) => {
    savingCurrencyAmountInput.value = (
        Number(e.target.value) / coefficient
    ).toFixed(2); // false *
});

savingCurrencyAmountInput.addEventListener("click", (e) => {
    investCurrencyAmountInput.value = (
        Number(e.target.value) * coefficient
    ).toFixed(2);
});

investCurrencyAmountInput.addEventListener("click", (e) => {
    savingCurrencyAmountInput.value = (
        Number(e.target.value) / coefficient
    ).toFixed(2); // false *
});

savingCurrencyAmountInput.addEventListener("blur", (e) => {
    savingCurrencyAmountInput.value = Number(e.target.value).toFixed(2);
});

investCurrencyAmountInput.addEventListener("blur", (e) => {
    investCurrencyAmountInput.value = Number(e.target.value).toFixed(2);
});
