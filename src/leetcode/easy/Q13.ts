function romanToInt(s: string): number {
    
    let num:number = 0;
    let len = s.length

    function getVal(ch:string):number{
        switch(ch){
            case 'I':
                return 1;
                break;
            case 'V':
                return 5;
                break;
            case 'X':
                return 10;
                break;
            case "L":
                return 50;
                break;
            case "C":
                return 100;
                break;
            case "D":
                return 500;
                break;
            case "M":
                return 1000;
                break;
            default:
                0;
        }

        return 0;
    }

    for(let i = 0; i<s.length; i++){
        let current = s[i];

        let next:string = '';
        if(i < s.length-1){
            next = s[i+1];
        }

        let currentVal:number = getVal(current)
        let nextVal:number = getVal(next);

        if(currentVal < nextVal){
            num = num + (nextVal-currentVal);
            i++;
        }else{
            num+=currentVal;
        }
    }

    return num;

};

// Example usage:
console.log(romanToInt("III")); // Output: 3