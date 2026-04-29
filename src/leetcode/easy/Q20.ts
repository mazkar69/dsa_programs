function isValid(s: string): boolean {
    const stack:string[] = [];

    for(let ch of s){
        if(ch === "(" || ch === "[" || ch === "{"){
            stack.push(ch);
        }else{
            const poped:string = stack.pop()!;

            if(ch === ")" && poped === "(" || ch === "]" && poped === "[" || ch === "}" && poped === "{"){
                continue;
            }
            stack.push(poped);
            break;
        }
    }
    return stack.length > 0 ? false : true    
};