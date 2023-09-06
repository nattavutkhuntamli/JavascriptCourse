//console.log แสดงข้อความ

let text = document.getElementById('text');
text.style.color = "red"
text.innerHTML = "ระบบสุ่มเลขหวย"

console.log('Hello Golf');
console.log('Hello Golf');
console.log('Hello Golf');

let message = "คุณคือผู้ใช้งานที่ 10000 ได้รับรางวัล 1แสนบาท"
// alert(message)
// alert(message)
// alert(message)
// alert(message)

let FirstName = "Nattawut"
let LastName = "Khuntamli"
let age = 27;
let status = true;
let grand = 4.00
console.log(FirstName)
console.log(LastName)
console.log(age);
console.log(status);

console.log(typeof (FirstName))
console.log(typeof (LastName))
console.log(typeof (age));
console.log(typeof (status));
console.log(typeof (grand));
console.log(10 + 10 ** 2 / 4);
let textArea = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit molestias iusto,
 reiciendis maxime sed non voluptate! Pariatur, rerum similique quidem possimus quae aliquid repellendus,
  veritatis voluptates, laboriosam illo aliquam ipsum. ${FirstName} ${LastName} ${age} `

console.log(textArea);
console.log(typeof (textArea));

let check = textArea != null ? "true" : "false"
console.log(check);

//รองรับการใช้งาน inputกก
//  let text1 = prompt('กรอกข้อมูลชื่อนามสกุล: ')
//  let text2 = prompt('กรอกอายุ: ')
//  let result = document.getElementById('text').innerHTML=`<h1>ชื่อนามสกุล ${text1}  อายุ ${text2} </h1>`

// โปรแกรมคำนวณหวย
// let text1 = prompt('กรุณากรอกเลขที่ต้องการชื้อ ')

// let textrs_ = prompt('กรุณาระบุอายุเพื่อเข้าชมเว็บไซต์')
// let messages = "";
// let result_ = textrs_ > 13 ? message = "กรุณากดสุ่มหวยเลย" : message = "คุณอายุน้อยเกินไปไม่แน่นำให้เล่น "
// document.getElementById('message').innerHTML = `<h1>${message}</h1>`
function randomLotto() {
    let randomLotoNumber = (Math.floor(Math.random() * 999) + 1) // ถ้าใส่ 10 มันจะสุ่มแค่ 1 หลัก ถ้า 100 จะได้ 2 หลัก ถ้า 1000 จะได้ 3 หลัก
    document.getElementById('textShow').removeAttribute('hidden')
    document.getElementById('lottoNumber').innerHTML = randomLotoNumber
    let resultLottoNumber2 = (Math.floor(Math.random() * 999) + 1)
    let check = randomLotoNumber == resultLottoNumber2 ? document.getElementById('result_lotto').innerHTML = `${resultLottoNumber2} คุณถูกรางวัล` : document.getElementById('result_lotto').innerHTML = `เลขที่ออก ${resultLottoNumber2} คุณไม่ถูกรางวัล`
}

let score = prompt('คะแนนของคุณ')
if(score >= 80){
    console.log('A');
}else if(score >=70){
    console.log('B');
}else if(score >=60){
    console.log('c');
}else if(score >=50){
    console.log('D');
}else{
    console.log('F');
}
document.getElementsByTagName('li').innerHTML = "dd"
console.log(1 == 1);
console.log(1 == 2);
console.log(3 == 1);
console.log(3 >= 1);
console.log(4 >= 51);
console.log(4 + " 4");
console.log(10 != 1);
console.log(10 != 10);