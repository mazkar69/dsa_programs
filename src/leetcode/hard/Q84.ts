function largestRectangleArea(heights: number[]): number {
    const rightSmall:number[] = [];
    const leftSmall:number[] = [];

    let st:number[] = [];
    const isEmpty = ()=> st.length === 0;
    const top = ()=> heights[st[st.length -1]];

    // Find right smallest;
    for(let i = heights.length-1; i>=0; i--){

        while(!isEmpty() && heights[i] <= top() ){
            st.pop();
        }

        if(isEmpty()){
            rightSmall[i] = heights.length;
            st.push(i);
        }else{
            rightSmall[i] = st[st.length - 1];
            st.push(i);
        }
    }
    
    // Find left smallest;
    st = [];
    for(let i = 0; i< heights.length; i++){
        
        while(!isEmpty() && heights[i] <= top() ){
            st.pop();
        }
        
        if(isEmpty()){
            leftSmall[i] = -1;
            st.push(i);
        }else{
            leftSmall[i] = st[st.length - 1];
            st.push(i);
        }
    }
    // console.log(rightSmall);
    // console.log(leftSmall);
    let max:number = 0;
    for(let i = 0; i<heights.length; i++){
        max = Math.max(max, heights[i] * (rightSmall[i] - leftSmall[i] - 1))
    }

    return max;
};

// Example usage:
const heights = [2,1,5,6,2,3];
console.log(largestRectangleArea(heights)); // Output: 10