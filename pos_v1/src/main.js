//TODO: Please write code in this file.

// Pos V_1 To realize a printInventory function

    var allItems = loadAllItems();
    var purchasedItems = {
        barcode:['ITEM000000','ITEM000001','ITEM000002','ITEM000003','ITEM000004','ITEM000005'],
        amount: [0           , 0          ,0           ,0           ,0           ,0           ],
        cost:   [0           , 0          ,0           ,0           ,0           ,0           ]
    };    //to store the purchased items
    function getPurchasedItems(inputs){      //to get the information of purchased items, and put them in the var purchasedItems
        for(var iPI=0 ; iPI < inputs.length ; iPI++){        
            for(var iAI=0 ; iAI < purchasedItems.barcode.length ; iAI++ ){             
                if(inputs[iPI] == purchasedItems.barcode[iAI]){
                    purchasedItems.amount[iAI] +=1;
                }
                else if (inputs[iPI].split('-')[0] == purchasedItems.barcode[iAI]){
                    purchasedItems.amount[iAI] = parseInt(inputs[iPI].split('-')[1]);
                }
                else{
                    //   alert("warning:No such products.")
                }                
            }
        }
    }    
    var promotions = loadPromotions();
    var allCost=0;
    var allSavings=0;
    var savings = {
        barcode:['ITEM000000','ITEM000001','ITEM000005'],
        name:   ['可口可乐','雪碧','方便面'],
        unit:   ['瓶','瓶','袋'],
        saveAmount:[0   ,0   ,0  ],
        savingMoney:[0  ,0   ,0  ]
    }    // to store the promotion information
    function getCostsAndSavings(){    //to get the information of promotions, and put them in the var savings
        for(var iAI=0 ; iAI < purchasedItems.barcode.length ; iAI++){
            for(var iprm =0 ; iprm < promotions[0].barcodes.length ;iprm ++){
                if(purchasedItems.barcode[iAI] == promotions[0].barcodes[iprm] && purchasedItems.amount[iAI] > 2){ 
                    var rem = purchasedItems.amount[iAI]%3;
                    var quot = Math.floor(purchasedItems.amount[iAI]/3);
                    purchasedItems.cost[iAI] = ( purchasedItems.amount[iAI]- 1 )*(allItems[iAI].price);
                    savings.saveAmount[iprm] = quot;
                    savings.savingMoney[iprm] = quot*allItems[iAI].price;
                    allSavings += savings.savingMoney[iprm];
                    break;
                   // alert(allItems[iAI].price)
                }
                else{
                    purchasedItems.cost[iAI]=purchasedItems.amount[iAI]*allItems[iAI].price;                
                }
                
              // alert( purchasedItems.cost[iAI]);
            }
            allCost += purchasedItems.cost[iAI];
        }
    } 
    function printInventory(inputs){
        getPurchasedItems(inputs);
        getCostsAndSavings();
  //    console.log( purchasedItems); 
        var text = "";
        text += '***<没钱赚商店>购物清单***\n';
        for ( var iAI=0 ; iAI < purchasedItems.barcode.length ; iAI++){
            if(purchasedItems.cost[iAI] != 0){
                text += ('名称：'+allItems[iAI].name+'，数量：'+purchasedItems.amount[iAI]+allItems[iAI].unit+'，单价：'+allItems[iAI].price.toFixed(2) +'(元)，小计：'+purchasedItems.cost[iAI].toFixed(2)+'(元)'+"\n"); 
            }
        } 
        text += '----------------------\n' +'挥泪赠送商品：\n' ;
        for(var iprm =0 ; iprm < (promotions[0].barcodes.length) ; iprm ++){
             if(savings.saveAmount[iprm] != 0){
                 text += ('名称：'+savings.name[iprm]+'，数量：'+savings.saveAmount[iprm]+savings.unit[iprm]+"\n");
             }
        }
        text += '----------------------\n' +'总计：'+allCost.toFixed(2)+'(元)\n' +'节省：'+allSavings.toFixed(2)+'(元)\n'+'**********************';
        console.log(text);  
    }


