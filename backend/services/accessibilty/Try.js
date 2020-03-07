var a = 1;

// let myPromise = new Promise((resolve, reject) => {

// })

let myPromise = new Promise((resolve, reject) => {
    var b = a;
    // for(var i = 1; i<= 100; i++){
    //     b *= i;
    // }
    b = a+1;
    if(b == 2)
        resolve("old value : " + a + "\nnew value : " + b);
    else
        reject("error occured")
})

// function myfun(){
//     for(var i = 1; i<= 1000000; i++){
//         a *= i;
//     }
// }
// myPromise.then(()=>{

// }).catch(() => {

// })
// my promise Object
// resolve(value of promise object)

async function myfunc(){
    //console.log(myPromise);
    await myPromise.then((m) => {
        console.log(m)
    }).catch((err) => {
        console.log(err)
    });
}
myfunc();