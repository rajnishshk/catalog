const fs = require('fs');


const baseToDecimal = (value, base) => {
    return parseInt(value, base);
};


const lagrangeInterpolation = (points) => {
    let constant = 0;

 
    for (let i = 0; i < points.length; i++) {
        let xi = points[i][0];
        let yi = points[i][1];

     
        let Li = 1;
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let xj = points[j][0];
                Li *= (0 - xj) / (xi - xj);  
            }
        }

        
        constant += yi * Li;
    }

    return Math.round(constant); 
};


const findSecret = (fileName) => {
   
    const input = JSON.parse(fs.readFileSync(fileName, 'utf-8'));

    const n = input.keys.n;
    const k = input.keys.k;

    let points = [];

    
    for (let key in input) {
        if (key !== 'keys') {
            let x = parseInt(key); 
            let base = parseInt(input[key].base);  
            let yValue = input[key].value;  

           
            let y = baseToDecimal(yValue, base);

        
            points.push([x, y]);


            if (points.length === k) {
                break;
            }
        }
    }

   
    const constantTerm = lagrangeInterpolation(points);

    console.log(`Secret (constant term): ${constantTerm}`);
};


findSecret('testcase1.json');
findSecret('testcase2.json');
