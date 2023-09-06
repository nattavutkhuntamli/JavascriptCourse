// for(let counter = 0; counter < 5; counter++){
//     counter+1
//     if(counter ==1){
//         console.log(`Hello One!${counter-1}`);
//     }else if(counter ==2){
//         console.log(`Hello Two!${counter}`);
//     }else if(counter ==3){
//         console.log(`Hello Three!${counter}`);
//     }else if(counter ==4){
//         console.log(`Hello four!${counter+1}`);
//     }else{
//         console.log(`Hello five!${counter+1}`);
        
//     }
// }

let qrt = prompt('จำนวนรายการสินค้า: ');
let sum = 0;
for(let i = 0; i< qrt; i++){
    let itemPrice = prompt(`ราคาสินค้า${i+1}`);
    sum = sum+ parseInt(itemPrice);
    console.log(sum);
    document.getElementById('price-list').innerHTML += 'รายการสินค้าชิ้นที่ชิ้นที่ ' +i + ' : ' +  itemPrice +  ' บาท <br>';
}
document.getElementById('result').innerHTML='ราคาสินค้ารวมทั้งหมด ' + sum + ' บาท '
