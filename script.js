// CASH REGISTER APP

//amount user needs to pay
let price = 3.26;

const purchaseBtn = document.getElementById('purchase-btn');
const cash = document.getElementById('cash');
const due = document.getElementById('change-due');
const display =  document.getElementById('display');

//let as declared to change
let counterMoney =[
    ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

//elem[1] to access amount, elem[0] to access how much is in each tab.
purchaseBtn.addEventListener('click',()=>{
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
        let values = [];
        const denumMoney = counterMoney.map(([val, el])=>[val,Math.round(el*100)]).reverse();
        let change = cashDenum - priceDenum;
        console.log("Change due: ",Math.round(change)/100);
        denums.forEach((el, ind)=>{
            while(el<=change && change > 0){
            values.push([denumMoney[ind][0], el]);
            change -= el;
            } 
        });
        //to deduct in cashier
        let ctr = 0;
        denumMoney.forEach((el, ind)=>{
           while(el[0] === values[ctr][0]){
            el[1] -= values[ctr][1];
            ctr++;
            if(ctr === values.length){
                break;
            }
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
            ${elem[0]}: ${Math.floor(elem[1])/100}`);
        
    update(values);
    }
    
});

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


