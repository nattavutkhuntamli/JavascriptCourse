let round = prompt('คุณจะเล่นทั้งหมดกี่รอบ ')
for(let  i = 0; i< round; i++){
    var answer = prompt('หัว หรือ ก้อย ! ')
    var random_answer = ""
    if(Math.floor(Math.random()* 10) < 5){
        random_answer = 'หัว'
    }else{
        random_answer = 'ก้อย'
    }

    if(answer == random_answer){
        alert('ตอบถูก')
    }else{
        alert('ตอบผิด')
    }
}