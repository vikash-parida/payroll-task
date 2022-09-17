function add(...args) {
  let a = [...args];
  let result = a.map((e)=>{
    return e+e;
    })
  console.log(result);  
}

add(10,20,30);