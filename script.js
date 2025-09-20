// CASH REGISTER APP

//amount user needs to pay
let price = 3.26;

const purchaseBtn = document.getElementById('purchase-btn');
const cash = document.getElementById('cash');
const due = document.getElementById('change-due');
const display =  document.getElementById('display');

//let as declared to change
let counterMoney =
    [["PENNY", 0.5], 
    ["NICKEL", 0], ["DIME", 0], 
    ["QUARTER", 0], ["ONE", 0], 
    ["FIVE", 0], ["TEN", 0], 
    ["TWENTY", 0], ["ONE HUNDRED", 0]]
;

//elem[1] to access amount, elem[0] to access how much is in each tab.
purchaseBtn.addEventListener('click',checkRegister);

//detect enter key
window.addEventListener('keypress', e=>{if(e.key === 'Enter') checkRegister()});


//DEBUG THIS AREA
const update = (arr) =>{
    if(arr){
        Array.from(display.children).forEach(elem=>{
            if(elem.tagName !== 'H3'){
                display.removeChild(elem);
            }
        });
       console.log(arr);
       arr.forEach(elem=>{
        const target = counterMoney.find(([denumName])=>denumName === elem[0]);
        target[1] = (Math.round(target[1] * 100) - Math.round(elem[1])) / 100;
        console.log(target[1]);
       });
    }
    cash.value = '';
    
    counterMoney.forEach(([name, num])=>{
        const el = document.createElement('p');
        el.innerText += `${name}: $${num}`;//theres a space here to format
        display.appendChild(el);
    });
};
//DEBUG THIS AREA

update();

function checkRegister(){
    const priceDenum = Math.round(Number(price)*100);
    const cashDenum = Math.round(Number(cash.value)*100);
    const counterMoneySum = counterMoney.reduce((prev, [_,num])=>prev+num,0)*100;
    
    if(cashDenum > counterMoneySum){
        due.innerText = "Status: INSUFFICIENT_FUNDS";
        return alert('Insufficient funds inside counter.');
    } 

    if(cashDenum === counterMoneySum){
        return due.innerText = "Status: CLOSED";
    } 

    if(cashDenum<priceDenum){
        cash.value = '';
        return alert("Customer does not have enough money to purchase the item");
    }else if(cashDenum===priceDenum){
        due.innerText = "No change due - customer paid with exact cash";
    }else{
        const denums =[10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
        const denumMoney = counterMoney.map(([val, el])=>[val,Math.round(el*100)]).reverse();
        let values = [];
        let change = cashDenum - priceDenum;
        console.log("Change due: ",Math.round(change)/100);

        denums.forEach((denomValue, ind) => {
        let denomName = denumMoney[ind][0];
        let available = denumMoney[ind][1]; // in cents
        let needed = Math.floor(change / denomValue);
        let canGive = Math.floor(available / denomValue);
        let toGive = Math.min(needed, canGive);

        if (toGive > 0) {
        let amount = toGive * denomValue;
        values.push([denomName, amount]);
        change -= amount;
        denumMoney[ind][1] -= amount;
    }
});
        
        
        //to deduct in cashier
        let ctr = 0;
        denumMoney.forEach((el)=>{
           while(ctr < values.length && el[0] === values[ctr][0]){
            console.log("Values: ",values," El: ", el, "Ctr: ", ctr, " Values: ",values.length);
            el[1] -= values[ctr][1];
            ctr++;
        }
        });

        //remove dupes
        const toSum = new Map();
       values.forEach(arr => {
        const key = arr[0]; // use first element as key
        if (!toSum.has(key)) {
            toSum.set(key, [...arr]); 
        } else {
            const exists = toSum.get(key);
            exists[1] += arr[1];
            toSum.set(key, exists);
        }
        });
        values = Array.from(toSum.values()).map(arr => arr);
        
        //to display
        due.innerText = 'STATUS: OPEN';
        values.forEach(elem => due.innerText += `
            ${elem[0]}: $${Math.floor(elem[1])/100}`);
        
    update(values);
    console.log(counterMoney);
    }
    
}

