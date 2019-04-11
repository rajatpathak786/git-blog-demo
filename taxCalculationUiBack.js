const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
let  category, length, name, quantity, imported, tax = 0, totalPrice = 0, stat, price = 0, v;
app.post('/', function(req, res, next) { 
    if (req.headers["content-type"] == "text/plain") {
    let arry = req.body.split('\n');
    let order = arry[0].split(':');
    [order,] = order;
    arry.splice(0,1);
    let len = arry.length;
    let ret = tojason(arry,order,len);
    let b = bill(ret);
    res.send(b);
    } else {
      next ();
    } 
}),
app.post('/', function(req,res) {
    if (req.headers["content-type"]=="application/json") {
    let b = bill(req.body);
    res.send(b);
    }
});
app.listen(2500,"127.0.0.2");
let bill = (ret) => {
  stat = ret.name;
  let l = ret.items.length;
  for(let i = 0; i < l; ++i) {
    if ((ret.items[i].category == "book" || ret.items[i].category == "food" || ret.items[i].category == "medicine") && (ret.items[i].imported == 1)) {
      price = parseFloat(ret.items[i].price) * 0.05 + parseFloat(ret.items[i].price);
      price = parseFloat(price.toFixed(2));
      tax = tax + price - parseFloat(ret.items[i].price);
      tax = parseFloat(tax.toFixed(2)); 
      totalPrice = parseFloat(totalPrice) + parseFloat(price); 
    } else if ((ret.items[i].category == "book" || ret.items[i].category == "food" || ret.items[i].category == "medicine") && (ret.items[i].imported == 0)) {
      price = parseFloat(ret.items[i].price);
      price = parseFloat(price.toFixed(2));
      tax = tax + 0; 
      totalPrice = parseFloat(totalPrice) + parseFloat(price);   
    } else if (!(ret.items[i].category == "book" || ret.items[i].category == "food" || ret.items[i].category == "medicine") && (ret.items[i].imported == 1)) {
      price = parseFloat(ret.items[i].price) * 0.05 + parseFloat(ret.items[i].price) * 0.1 + parseFloat(ret.items[i].price);
      price = parseFloat(price.toFixed(2));
      tax = tax + price - parseFloat(ret.items[i].price);
      tax = parseFloat(tax.toFixed(2));
      totalPrice = parseFloat(totalPrice) + parseFloat(price); 
    } else if (!(ret.items[i].category == "book" || ret.items[i].category == "food" || ret.items[i].category == "medicine") && (ret.items[i].imported == 0)) {
      price = parseFloat(ret.items[i].price) * 0.1 + parseFloat(ret.items[i].price);
      price = parseFloat(price.toFixed(2));
      tax = tax + price - parseFloat(ret.items[i].price);
      tax = parseFloat(tax.toFixed(2));
      totalPrice = parseFloat(totalPrice) + parseFloat(price); 
    } else if ((ret.items[i].category == "book" || ret.items[i].category == "food" || ret.items[i].category == "medicine")) {
      price = parseFloat(ret.items[i].price);
      price = parseFloat(price.toFixed(2));
      tax = tax + 0; 
      totalPrice = parseFloat(totalPrice) + parseFloat(price); 
    } else {
      price = parseFloat(ret.items[i].price) * 0.1 + parseFloat(ret.items[i].price);
      price = parseFloat(price.toFixed(2));
      tax = tax + price - parseFloat(ret.items[i].price);
      tax = parseFloat(tax.toFixed(2));
      totalPrice = parseFloat(totalPrice) + parseFloat(price);
    }
    stat = `${stat}<br/>${ret.items[i].quantity} ${ret.items[i].name}: ${price}`;
  }
  stat = `${stat}<br/>Sales Taxes: ${tax}<br/>Total: ${totalPrice.toFixed(2)}`;
  return stat;
}
let tojason = (arry, order, len) => {  
  let ord = {"name":order,
  "items":[]
  };
  for (let i = 0; i < len; ++i) {
    let arr = arry[i].split(' ');
    length = arr.length;
    quantity = arr[0];
    v = arr.indexOf('at');
    name = arr.slice(1, v);
    name = name.join(' ');
    price = arr[length - 1];
    if (arr.includes('imported') > -1) {
      imported = true;
    } else {
      imported = false;
    }
    if (arr.includes('book') > -1){
      category = 'book';
    } else if (arr.includes('chocolate') > -1) {
      category = 'food';
    } else if (arr.includes('music') > -1){
      category = 'music';
    } else if (arr.includes('perfume') > -1) {
      category = 'perfume';
    } else if (arr.includes('pills') > -1) {
      category = 'medicine';
    } else if (arr.includes('chocolates') > -1) {
      category = 'food';
    }
    ord.items.push ({"name": name ,"category":category,"quantity":quantity,"price":price,"imported":imported});
  }
  return ord;
}
