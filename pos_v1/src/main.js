// Pos V_1 To realize a printInventory function
function printInventory(inputs) {
  var purchasedItems = getPurchasedItems(inputs);
  var list = getListItem(purchasedItems);
  var listWithPromotion = getListWithPromotion(list);
  var costAndSavings = getCostAndSavings(listWithPromotion);
  var allCost = getAllCost(costAndSavings);
  var allSaving = getAllSaving(costAndSavings);
  //console.log(costAndSavings);
  console.log(allCost);
  console.log(allSaving);


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

function ListItem(barcode, amount, name, unit, price, promotionNum, cost, saving){
  this.barcode = barcode;
  this.amount = amount;
  this.name = name;
  this.unit = unit;
  this.price = price;
  this.promotionNum = promotionNum;
  this.cost = cost||0;
  this.saving = saving||0;
}

function getListItem(items){
  var allItems = loadAllItems();
  var list = [];
  for(var barcode in items){
    listItem = new ListItem(barcode, items[barcode]);
    for(var j=0; j<allItems.length; j++){
      if (listItem.barcode == allItems[j].barcode){
        listItem.name = allItems[j].name;
        listItem.price = allItems[j].price;
        listItem.unit = allItems[j].unit;
      }
    }
    list.push(listItem);
  }
  return list;
}

function getListWithPromotion(list){
  var promotions = loadPromotions();
  var promotionBarcodes = promotions[0].barcodes;
  for (var i=0; i<promotionBarcodes.length; i++){
    for(var j=0; j<list.length; j++ ){
      if (list[j].barcode == promotionBarcodes[i]){
        list[j].promotionNum = parseInt(list[j].amount / 3);
      }
    }
  }
  return list;
}

function getCostAndSavings (list){
  for (var i=0; i<list.length; i++ ){
    if(list[i].promotionNum >= 1){
       list[i].cost = list[i].price * (list[i].amount - list[i].promotionNum);
       list[i].saving = list[i].promotionNum*list[i].price;
    } else {
      list[i].cost = list[i].price * list[i].amount;
    }
  }
  // for(var x in list){    //I wanna use 'for in' here.but failed,why?
  //   if(x.promotionNum >= 1){
  //     this.cost = this.price * (this.amount - this.promotionNum);
  //     this.saving = this.price * this.promotionNum;
  //   } else {
  //     this.cost = this.price * this.amount;
  //   }
  // }
  return list;
}

function getAllCost (list){
  var allCost = 0;
  for(var i=0; i<list.length; i++ ){
    allCost = allCost + list[i].cost;
  }
  alert(allCost);
  return allCost;
}
function getAllSaving (list){
  var allSaving = 0;
  for(var i=0; i<list.length; i++ ){
    allSaving = allSaving + list[i].saving;
  }
  alert(allSaving);
  return allSaving;
}

function getReceipt(list){
  var receipt = "***<没钱赚商店>购物清单***";


}
