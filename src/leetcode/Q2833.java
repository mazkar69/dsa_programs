package leetcode;

class Q2833 {
    public static int furthestDistanceFromOrigin(String moves) {
        int left = 0;
        int right = 0;

        for (int i = 0; i < moves.length(); i++) {
            char ch = moves.charAt(i);

            if (ch == 'L') {
                left++;
                right--;
            } else if (ch == 'R') {
                right++;
                left--;
            } else {
                left++;
                right++;
            }
        }

        return Math.max(left, right);
    }

    public static void main(String args[]){
        int n = furthestDistanceFromOrigin("L_RL__R");
        System.out.println(n);

    }
}


/* ============== IN TYPE-SCRIPT
function furthestDistanceFromOrigin(moves: string): number {
    let L = 0, R = 0, blank = 0;

    for (let ch of moves) {
        if (ch === 'L') L++;
        else if (ch === 'R') R++;
        else blank++;
    }

    return Math.abs(L - R) + blank;
}

* */