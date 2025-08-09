package recursion;

public class FirstOccurence {

    private static int findFirstIndex(int []arr,int val, int fromIndex){

        if(arr[fromIndex] == val){
            return fromIndex;
        }

        if(fromIndex == arr.length -1){
            return  -1;
        }

       return findFirstIndex(arr,val,fromIndex+1);



    }

    public static void main(String []args){
        int []arr = {8,3,6,9,5,10,2,5,3};

        int firstIndex = findFirstIndex(arr,5,5);

        System.out.println("First Index is: "+firstIndex);
    }
}
