const random = () => Math.floor(Math.random() * 99) - 1;
const person = {
    id: random(),
    name: "Golf",
    age: random(),
    greet() {
        console.log('Hi I am ' + this.name);
    }
};
// console.log(person);
// person.greet()

const printName = ({name}) => {
    console.log(name);
}
printName(person)

const {name, age} = person  // person เป็นข้อมูล object ดังนั้นเวลาจะใช้ให้ {name,age}
console.log(name);
console.log(age);

const hobbies = ['Sports', 'Cooking'];
const [Hobby1,Hobby2] = hobbies // hobbies เป็น array ดังนั้นจึงใช้  [Hobby1,Hobby2]
console.log(Hobby1, Hobby2);
// for(let hobby of hobbies){
//     console.log(hobby);
// }
// console.log(hobbies.map(hobby => { return 'Hobby: ' + hobby}));
// console.log(hobbies);

// hobbies.push('Game')
// hobbies.push('Programming')
// console.log(hobbies.map(List => {return 'List:' + List}));
// console.log(hobbies);

// const copiedPerson = {...person}
// console.log(copiedPerson);

// const copiedArray = [...hobbies] // รวม array ให้เป็นชุดเดี่ยวกันด้วย ...
// console.log(copiedArray);


// const toArray = (arg1, arg2, arg3) => { //รับข้อมูล array ได้แค่ 3 ตัว เพราะมีการกำหนดค่ารับแค่ 3 
//     return [arg1,arg2,arg3]
// }
// console.log(toArray(1,2,3,4));

// const toArray2 = (...args) => { //รับข้อมูล array ได้หลายตัว
//     return args
// }
// console.log(toArray2(1,3,4,6,7)); 
