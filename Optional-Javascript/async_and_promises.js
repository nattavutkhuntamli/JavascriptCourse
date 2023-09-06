/***
 *  Promise เป็นอ็อบเจกต์ที่ใช้ในการจัดการการประมวลผลแบบแบ่งเป็นส่วน หรือการทำงานแบบไม่บล็อก (non-blocking) 
 *ในภาษา JavaScript โดย Promise ช่วยให้คุณจัดการกับการเรียกใช้งานฟังก์ชันหรือการร้องขอข้อมูลที่อาจใช้เวลาในการดำเนินการ
 *ดยไม่ทำให้แอปพลิเคชันของคุณหยุดทำงาน (non-blocking) และทำให้คุณสามารถจัดการกับผลลัพธ์หรือข้อผิดพลาดที่อาจเกิดขึ้นในอนาคตได้อย่างมีระเบียบและสะดวก.
 * 
 *สิ่งหลักที่คุณควรรู้เกี่ยวกับ Promise คือ:
 *1.สถานะของ Promise: มีสถานะสามแบบคือ "pending" (รอการประมวลผล), "fulfilled" (สำเร็จ), และ "rejected" (ถูกปฏิเสธ). 
 * เมื่อ Promise ถูกสร้างขึ้น มันจะอยู่ในสถานะ "pending" และจะเปลี่ยนสถานะเมื่อการประมวลผลเสร็จสมบูรณ์หรือเกิดข้อผิดพลาดขึ้น.
 *2.การใช้งาน Promise: คุณสร้าง Promise โดยใช้คอนสตรักเตอร์ของ Promise และส่งฟังก์ชันที่มีการประมวลผลแบบไม่บล็อก (asynchronous)
 * เข้าไปในคอนสตรักเตอร์นั้น ๆ ในฟังก์ชันนี้, คุณควรเรียก resolve เมื่อการประมวลผลสำเร็จ หรือ reject เมื่อเกิดข้อผิดพลาด.
 *3.การใช้งาน .then() และ .catch(): เมื่อ Promise สำเร็จ (fulfilled) คุณสามารถใช้เมธอด .then() เพื่อจัดการกับผลลัพธ์ และใช้ .catch() 
 *เพื่อจัดการกับข้อผิดพลาด. เรียก .then() หลายครั้งเพื่อทำงานต่อไปตามลำดับ.
 */

const fetchData = callback => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!')
        }, 1500);
    });
    return promise;
}
setTimeout(() => {
    console.log('Timer is done!')

    fetchData().then(text =>{
        console.log(text);
        return fetchData()
    }).then(text2 => {
        console.log(text2);
    })
    .catch(errors => {
        console.log(errors);
    })
}, 2000);

// console.log('Hello!');
// console.log('Hi!');
