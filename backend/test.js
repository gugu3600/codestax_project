const prime = n => {

     if(n <= 1) {
          return false;
     }

     for(let i = 2 ; i < n ; i++){

          if(n % i === 0){
               return false;
          }
     }
     return true;
}

console.log(prime(67) ? "Prime" : "Not Prime");