// CASH REGISTER APP
let price = 3.26;

const purchaseBtn = document.getElementById('purchase-btn');
const change = document.getElementById('change-due');
const cash = document.getElementById('cash');

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
    if(cashDenum > counterMoneySum) return alert('Insufficient funds inside counter.');

    if(cashDenum<priceDenum){
        return alert('User does not have enough money to pay.');
    }else if(cashDenum===priceDenum){
        return alert('User payed off exact amount.');
    }else{
        const denums =[10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
        let values = [];
        const denumMoney = counterMoney.map(([val, el])=>[val,Math.round(el*100)]).reverse();
        
        let change = cashDenum - priceDenum;
        console.log(counterMoneySum, change, cashDenum, priceDenum);
        denums.forEach(el=>{
            while(el<=change && change > 0){
            console.log(el);
            values.push(el);
            change -= el;
            } 
        });
        console.log(denumMoney, values);
    }

    
})

