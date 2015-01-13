// Pos V_1 To realize a printInventory function


function printInventory(inputs) {
  // var purchasedItems = getPurchasedItems(inputs);
  // console.log(purchasedItems);
  getPurchasedItems(inputs);

}

function PurchasedItem(barcode, name, amount, price){
  this.barcode = barcode;
  this.name = name;
  this.amount = amount;
  this.price = price;
}

function isWeightedItem(input){
  return input.indexOf("-") != -1;
}

function getPurchasedItems(inputs){
  var items = {};
  var barcode = "";
  var amount = 0;
  for(var i=0; i<inputs.lenght; i++){
    if (isWeightedItem(inputs[i])){
      var r = inputs[i].split("-");
      barcode = r[0];
      amount = parseInt(r[1]);
      items[barcode] = amount;
      continue;
    }
    barcode = inputs[i];
    if(items[barcode]) {
      items[barcode]++;
    }else {
      items[barcode] = 1;
    }
  }
  console.log(items);
  return items;
}
