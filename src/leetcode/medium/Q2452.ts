function twoEditWords(queries: string[], dictionary: string[]): string[] {

    const answer:string[] = []

    for(let i = 0; i<queries.length; i++){

        const qWord:string = queries[i];

        //Loop through the dictionary
        for(let j = 0; j<dictionary.length; j++){
            const dWord:string = dictionary[j];

            // Compare the exact match
            if(qWord === dWord){
                answer.push(qWord);
                break;
            }else{
                // Try two edit if match
                let edits = 0;

                for(let index = 0; index < qWord.length; index++){
                    if(qWord[index] !== dWord[index]){
                        edits++;
                    }
                    if(edits === 3){
                        break;
                    }
                }

                if(edits <= 2){
                    // Word match within two edit.
                    answer.push(qWord)
                    break;
                }
            }
        }
    }

    return answer;
};

const answer:string[] =  twoEditWords(["word","note","ants","wood"],["wood","joke","moat"])
console.log(answer);