// CASH REGISTER APP
let price = 3.26;

const purchaseBtn = document.getElementById('purchase-btn');
const cash = document.getElementById('cash');
const due = document.getElementById('change-due');
const display =  document.getElementById('display');

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
        due.innerText = "Status: CLOSED";
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
        console.log(counterMoneySum, change, cashDenum, priceDenum);
        denums.forEach((el, ind)=>{
            while(el<=change && change > 0){
            console.log(el, denumMoney[ind][0]);
            values.push([denumMoney[ind][0], el]);
            change -= el;
            } 
        });
        
        //to deduct in cashier
        let ctr = 0;
        denumMoney.forEach((el, ind)=>{
           while(el[0] === values[ctr][0]){
            el[1] -= values[ctr][1];
            console.log(el, values[ctr]);
            ctr++;
            if(ctr === values.length){
                break;
            }
        }

        });
    }
    
});

//DEBUG
const update = arr =>{
    if(arr){
        
    }
    cash.value = '';
    counterMoney.forEach(([name, num])=>{
       const el = document.createElement('p');
       el.innerText = `${name}: $${num}`;
       display.appendChild(el);
    });
};
//DEBUG

update();


