const sortList = [
  {
    "name": {
      "key": "0",
      "name": "颜色",
      "edit": true,
    },
    "value": [
      { "key": "000", "value": "白", "edit": true },
      { "key": "001", "value": "黑", "edit": true },
      { "key": "002", "value": "红", "edit": true }
    ]
  },
  {
    "name": {
      "key": "1",
      "name": "套餐",
      "edit": true
    },
    "value": [
      { "key": "100", "value": "套一", "edit": true },
      { "key": "101", "value": "套二", "edit": true }
    ]
  }
];

const item = {
      "uid": "000100",
      "skuBase":{
        "price":19900,
        "amount":9999,
        "code":"1033015",
        "imagePath":"201712/29/1819046kujhKwUkHYjtQCM_750x750.jpg"
      },
      "skuAttrs":["白","黑"]
}

const temp= [
  [
      { "key": "000", "value": "白", "edit": true },
      { "key": "001", "value": "黑", "edit": true },
      { "key": "002", "value": "红", "edit": true },
  ],
  [
      { "key": "100", "value": "套一", "edit": true },
      { "key": "101", "value": "套二", "edit": true }
  ],
  // [
  //   { "key": "200", "value": "大", "edit": true },
  //   { "key": "201", "value": "中", "edit": true },
  //   { "key": "201", "value": "小", "edit": true },
  // ]
];

const arrNew = temp.reverse().reduce( (result, property) => {
  return property.reduce( (acc, value) => {
      return acc.concat(result.map( ele => [].concat(ele, value) ));
  }, []);
});

const itemList = arrNew.map(value => {
  let uid = "";
  let skuAttrs =[];
  if(value instanceof Array) {
    skuAttrs = value.reverse().map(item => {
      uid += item.key;
      return item.value;
    })
  } else {
      uid = value.key;
      skuAttrs = [value.value];
  }
  return {
    uid,
    "skuBase":{
      "price":19900,
      "amount":9999,
      "code":"1033015",
      "imagePath":"201712/29/1819046kujhKwUkHYjtQCM_750x750.jpg"
    },
    skuAttrs,
  }
})

console.log(itemList);


