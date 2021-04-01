let savingCurrency = "RUB";
let investCurrency = "USD";
const currencyAmount1 = document.querySelector(".saving input");
const currencyAmount2 = document.querySelector(".invest input");
const savingCurrencyBtns = document.querySelectorAll(".saving li");
const investCurrencyBtns = document.querySelectorAll(".invest li");
const savingPriceTag = document.querySelector(".p-saving");
const investPriceTag = document.querySelector(".p-invest");
let USD2RUB = 0;
let EUR2RUB = 0;
let GBP2RUB = 0;
let priceCurrency1 = 1;
let priceCurrency2 = USD2RUB;

fetch("https://api.ratesapi.io/api/latest?base=USD&symbols=RUB")
    .then((response) => response.json())
    .then((price) => {
        USD2RUB = price.rates.RUB;
        priceCurrency2 = USD2RUB;
        savingPriceTag.innerText = `1 ${savingCurrency} = ${(1/getK(false, priceCurrency1, priceCurrency2)).toFixed(4)} ${investCurrency}`
        investPriceTag.innerText = `1 ${investCurrency} = ${getK(false, priceCurrency1, priceCurrency2).toFixed(4)} ${savingCurrency}`
    });
fetch("https://api.ratesapi.io/api/latest?base=EUR&symbols=RUB")
    .then((response) => response.json())
    .then((price) => {
        EUR2RUB = price.rates.RUB;
    });
fetch("https://api.ratesapi.io/api/latest?base=GBP&symbols=RUB")
    .then((response) => response.json())
    .then((price) => {
        GBP2RUB = price.rates.RUB;
    });

// async function getApiPrice(currency) {
//   const response = await fetch(
//       `https://api.ratesapi.io/api/latest?base=${currency}&symbols=RUB`
//   );
//   const data = await response.json();
//   return data.rates.RUB;
// }

function getPrice(currency) {
    switch (currency) {
        case "USD":
            return USD2RUB;
        // return getApiPrice(currency);
        case "EUR":
            return EUR2RUB;
        //return getApiPrice(currency);
        case "GBP":
            return GBP2RUB;
        //return getApiPrice(currency);
        case "RUB":
            return 1;
    }
}

function getK(from, k1, k2) {
    if (from) {
        return k1 / k2;
    } else {
        return k2 / k1;
    }
}

function delActiveCurrensy(btns) {
    btns.forEach((element) => {
        if (element.classList.contains("active-currency")) {
            element.classList.toggle("active-currency");
        }
    });
}

savingCurrencyBtns.forEach((element) => {
    element.addEventListener("click", (event) => {
        delActiveCurrensy(savingCurrencyBtns);
        event.target.classList.toggle("active-currency");
        savingCurrency = event.target.innerText;

        priceCurrency1 = getPrice(event.target.innerText);
        currencyAmount2.value = (
            Number(currencyAmount1.value) *
            getK(true, priceCurrency1, priceCurrency2)
        ).toFixed(2);

        savingPriceTag.innerText = `1 ${savingCurrency} = ${(1/getK(false, priceCurrency1, priceCurrency2)).toFixed(4)} ${investCurrency}`
        investPriceTag.innerText = `1 ${investCurrency} = ${getK(false, priceCurrency1, priceCurrency2).toFixed(4)} ${savingCurrency}`
        //console.log(event.target.innerText)
    });
});

investCurrencyBtns.forEach((element) => {
    element.addEventListener("click", (event) => {
        delActiveCurrensy(investCurrencyBtns);
        event.target.classList.toggle("active-currency");
        investCurrency = event.target.innerText;

        priceCurrency2 = getPrice(event.target.innerText);
        currencyAmount2.value = (
            Number(currencyAmount1.value) /
            getK(false, priceCurrency1, priceCurrency2)
        ).toFixed(2);

        savingPriceTag.innerText = `1 ${savingCurrency} = ${(1/getK(false, priceCurrency1, priceCurrency2)).toFixed(4)} ${investCurrency}`
        investPriceTag.innerText = `1 ${investCurrency} = ${getK(false, priceCurrency1, priceCurrency2).toFixed(4)} ${savingCurrency}`
        //console.log(event.target.innerText)
    });
});

currencyAmount1.addEventListener("keyup", (e) => {
    currencyAmount2.value = (Number(e.target.value) * getK(true, priceCurrency1, priceCurrency2)).toFixed(2);
});

currencyAmount2.addEventListener("keyup", (e) => {
    currencyAmount1.value = (Number(e.target.value) * getK(false, priceCurrency1, priceCurrency2)).toFixed(2);
});

currencyAmount1.addEventListener("click", (e) => {
    currencyAmount2.value = (Number(e.target.value) * getK(true, priceCurrency1, priceCurrency2)).toFixed(2);
});

currencyAmount2.addEventListener("click", (e) => {
    currencyAmount1.value = (Number(e.target.value) * getK(false, priceCurrency1, priceCurrency2)).toFixed(2);
});

currencyAmount1.addEventListener("blur", (e) => {
  currencyAmount1.value = (Number(e.target.value)).toFixed(2);
});

currencyAmount2.addEventListener("blur", (e) => {
  currencyAmount2.value = (Number(e.target.value)).toFixed(2);
});