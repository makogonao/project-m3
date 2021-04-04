let savingCurrency = "RUB";
let investCurrency = "USD";
const savingCurrencyAmount = document.querySelector(".saving input");
const investCurrencyAmount = document.querySelector(".invest input");
let savingCurrencySelect = document.querySelector(".saving-select");
let investCurrencySelect = document.querySelector(".invest-select");
let savingCurrencyOptions = document.querySelectorAll(".saving-select option");
let investCurrencyOptions = document.querySelectorAll(".invest-select option");
let savingCurrencyTabs = document.querySelectorAll(".saving li");
let investCurrencyTabs = document.querySelectorAll(".invest li");
let savingCurrencyBtns = [...savingCurrencyTabs, savingCurrencySelect];
let investCurrencyBtns = [...investCurrencyTabs, investCurrencySelect];
let replaceBtn = document.querySelector(".replace-corrency")
const savingPriceTag = document.querySelector(".p-saving");
const investPriceTag = document.querySelector(".p-invest");
let priceCurrency1 = 1;
let priceCurrency2 = 0;
let priceNow = {};
let allApiCurrency = []; 

fetch("https://api.ratesapi.io/api/latest?base=RUB")
    .then((response) => response.json())
    .then((price) => {
        priceNow = {...price.rates}
        //console.log(priceNow)
        allApiCurrency = Object.getOwnPropertyNames(priceNow).sort()
        priceCurrency2 = getPrice('USD');
        const selects = document.querySelectorAll('ul select')
            selects.forEach(element => {
                element.innerHTML = ""    
            });
            selects.forEach(element => {
                element.append
                allApiCurrency.forEach(e => {
                    let newOption  = document.createElement('option')
                    newOption.innerText = e;
                    if (!['RUB', 'GBP', 'USD', 'EUR'].includes(e))
                    {
                        element.append(newOption)                 
                    }
                })
            });
        updatePrice()
        savingCurrencyOptions = document.querySelectorAll(".saving-select option");
        investCurrencyOptions = document.querySelectorAll(".invest-select option");
    });

replaceBtn.addEventListener("click", () => {
    replace();
})    

function replace() {
    let newSavingCurrency = savingCurrencyBtns[GetCurrensyIndex(investCurrencyBtns)];
    let newInvestCurrency = investCurrencyBtns[GetCurrensyIndex(savingCurrencyBtns)];
    let oldSavingCurrencySelectVal = savingCurrencySelect.value
    let oldInvestCurrencySelectVal = investCurrencySelect.value
    //console.log(`${oldSavingCurrencySelectVal}, ${oldInvestCurrencySelectVal}`)
    savingCurrencySelect.value = oldInvestCurrencySelectVal
    investCurrencySelect.value = oldSavingCurrencySelectVal
    changeStyle(newSavingCurrency, savingCurrencyBtns)
    changeStyle(newInvestCurrency, investCurrencyBtns)

    if (GetCurrensyIndex(savingCurrencyBtns)===4) {
        // console.log(newSavingCurrency.value)
        savingCurrency = newSavingCurrency.value;
        priceCurrency1 = getPrice(newSavingCurrency.value);
        investCurrencyAmount.value = (Number(savingCurrencyAmount.value) * getK(true, priceCurrency1, priceCurrency2)).toFixed(2);
        updatePrice()
    } else {
        // console.log(newSavingCurrency.innerHTML)
        savingCurrency = newSavingCurrency.innerHTML;
        priceCurrency1 = getPrice(newSavingCurrency.innerHTML);
        investCurrencyAmount.value = (Number(savingCurrencyAmount.value) * getK(true, priceCurrency1, priceCurrency2)).toFixed(2);
        updatePrice()

    }

    if (GetCurrensyIndex(investCurrencyBtns)===4) {
        // console.log(newInvestCurrency.value)
        investCurrency = newInvestCurrency.value;
        priceCurrency2 = getPrice(newInvestCurrency.value);
        investCurrencyAmount.value = (Number(savingCurrencyAmount.value) * getK(true, priceCurrency1, priceCurrency2)).toFixed(2);
        updatePrice()
    } else {
        // console.log(newInvestCurrency.innerHTML)
        investCurrency = newInvestCurrency.innerHTML;
        priceCurrency2 = getPrice(newInvestCurrency.innerHTML);
        investCurrencyAmount.value = (Number(savingCurrencyAmount.value) * getK(true, priceCurrency1, priceCurrency2)).toFixed(2);
        updatePrice()
    }


 
    // if (['RUB', 'GBP', 'USD', 'EUR'].includes(savingCurrency)){

    //     savingCurrency = newSavingCurrency.innerText;
    //     priceCurrency1 = getPrice(newSavingCurrency.innerText);
    //     investCurrencyAmount.value = (Number(savingCurrencyAmount.value) * getK(true, priceCurrency1, priceCurrency2)).toFixed(2);
    //     updatePrice()

    // } else {
  
    // }

    // if (['RUB', 'GBP', 'USD', 'EUR'].includes(investCurrency)){

    //     investCurrency = newInvestCurrency.innerText;
    //     priceCurrency2 = getPrice(newInvestCurrency.innerText);
    //     investCurrencyAmount.value = (Number(savingCurrencyAmount.value) / getK(false, priceCurrency1, priceCurrency2)).toFixed(2);
    //     updatePrice()

    // } else {



    }

    function GetCurrensyIndex (btns) {
        s = 0;
        btns.forEach((e) => {
            //console.log(e)
            if (e.classList.contains('active-currency')) {
                s = [].indexOf.call(e.parentNode.children, e);
            }
        })
        return s;
    }


function getPrice(currency) {
    return 1/priceNow[currency];
}    

function updatePrice() {
    savingPriceTag.innerText = `1 ${savingCurrency} = ${(1/getK(false, priceCurrency1, priceCurrency2)).toFixed(4)} ${investCurrency}`
    investPriceTag.innerText = `1 ${investCurrency} = ${getK(false, priceCurrency1, priceCurrency2).toFixed(4)} ${savingCurrency}`
}

function getK(from, k1, k2) {
    if (from) {
        return k1 / k2;
    } else {
        return k2 / k1;
    }
}


function changeStyle (event, btns) {
    //console.log(event)
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
    //console.log(event.target.options[event.target.selectedIndex].value)
    savingCurrency = event.target.options[event.target.selectedIndex].value;
    priceCurrency1 = getPrice(event.target.options[event.target.selectedIndex].value);
    investCurrencyAmount.value = (Number(savingCurrencyAmount.value) * getK(true, priceCurrency1, priceCurrency2)).toFixed(2);
    updatePrice()
    //console.log(event.target.innerText)
});

investCurrencySelect.addEventListener("change", (event) => {
    changeStyle(event.target, investCurrencyBtns);
    //console.log(event.target.options[event.target.selectedIndex].value)
    investCurrency = event.target.options[event.target.selectedIndex].value;
    priceCurrency2 = getPrice(event.target.options[event.target.selectedIndex].value);
    investCurrencyAmount.value = (Number(savingCurrencyAmount.value) / getK(true, priceCurrency1, priceCurrency2)).toFixed(2);
    updatePrice()
    //console.log(event.target.innerText)
});


savingCurrencyTabs.forEach((element) => {
    element.addEventListener("click", (event) => {

        changeStyle(event.target, savingCurrencyBtns)
        savingCurrency = event.target.innerText;
        priceCurrency1 = getPrice(event.target.innerText);
        investCurrencyAmount.value = (Number(savingCurrencyAmount.value) * getK(true, priceCurrency1, priceCurrency2)).toFixed(2);
        updatePrice()
        //console.log(event.target.innerText)
    });
});

investCurrencyTabs.forEach((element) => {
    element.addEventListener("click", (event) => {
        changeStyle(event.target, investCurrencyBtns)
        investCurrency = event.target.innerText;
        priceCurrency2 = getPrice(event.target.innerText);
        investCurrencyAmount.value = (Number(savingCurrencyAmount.value) / getK(false, priceCurrency1, priceCurrency2)).toFixed(2);
        updatePrice()
        //console.log(event.target.innerText)
    });
});

savingCurrencyAmount.addEventListener("keyup", (e) => {
    investCurrencyAmount.value = (Number(e.target.value) * getK(true, priceCurrency1, priceCurrency2)).toFixed(2);
});

investCurrencyAmount.addEventListener("keyup", (e) => {
    savingCurrencyAmount.value = (Number(e.target.value) * getK(false, priceCurrency1, priceCurrency2)).toFixed(2);
});

savingCurrencyAmount.addEventListener("click", (e) => {
    investCurrencyAmount.value = (Number(e.target.value) * getK(true, priceCurrency1, priceCurrency2)).toFixed(2);
});

investCurrencyAmount.addEventListener("click", (e) => {
    savingCurrencyAmount.value = (Number(e.target.value) * getK(false, priceCurrency1, priceCurrency2)).toFixed(2);
});

savingCurrencyAmount.addEventListener("blur", (e) => {
  savingCurrencyAmount.value = (Number(e.target.value)).toFixed(2);
});

investCurrencyAmount.addEventListener("blur", (e) => {
  investCurrencyAmount.value = (Number(e.target.value)).toFixed(2);
});