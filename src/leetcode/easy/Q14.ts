function longestCommonPrefix(strs: string[]): string {
    
    let commonString:string = strs[0];

    for(let i = 1; i < strs.length; i++){
        const word = strs[i];

        // Match the common letters
        let pointer:number = 0;
        for(pointer; pointer < commonString.length; pointer++){
            if(commonString[pointer] != word[pointer]){
                break;
            }
        }
        commonString = commonString.slice(0, pointer)
    }
    return commonString;
};