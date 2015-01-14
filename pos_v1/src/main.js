// Pos V_1 To realize a printInventory function


function printInventory(inputs) {
  var purchasedItems = getPurchasedItems(inputs);
  var list = getListItem(purchasedItems);
//  var listItem = getListDetails (list);
//  getListDetails (list);
//  console.log(purchasedItems);
  console.log(list);

}



function isWeightedItem(input){
  return input.indexOf("-") != -1;
}

function getPurchasedItems(goods){
  var items = {};
  var barcode = "";
  var amount = 0;
  for(var i=0; i<goods.length; i++){
    if (isWeightedItem(goods[i])){
      var r = goods[i].split("-");
      barcode = r[0];
      amount = parseInt(r[1]);
      items[barcode] = amount;
      continue;
    }
    barcode = goods[i];
    if(items[barcode]) {
      items[barcode]++;
    }else {
      items[barcode] = 1;
    }
  }
  return items;
}

function ListItem(barcode, amount, name, unit, price){
  this.barcode = barcode;
  this.amount = amount;
  this.name = name;
  this.unit = unit;
  this.price = price;
}

function getListItem(items){
  var allItems = loadAllItems();
  var list = [];
  for(var barcode in items){
    listItem = new ListItem(barcode, items[barcode]);
    list.push(listItem);
  }
  for (var i=0; i<list.length; i++){
    for(var j=0; j<allItems.length; j++){
      if (list[i].barcode == allItems[j].barcode){
        list[i].name = allItems[j].name;
        list[i].price = allItems[j].price;
        list[i].unit = allItems[j].unit;
      }
    }
  }
  return list;
}
