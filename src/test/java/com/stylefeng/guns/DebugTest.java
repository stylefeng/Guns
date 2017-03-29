package com.stylefeng.guns;

import java.util.Random;

/**
 * idea的测试
 *
 * @author fstyle
 * @date 2017-03-12 21:28
 */
public class DebugTest {

    public static void main(String[] args) {
        int temp1 = 100;
        int temp2 = 200;
        int temp3 = add(temp1,temp2);

        System.out.println(temp1);
        System.out.println(temp2);
        System.out.println(temp3);

        Random random = new Random();

        random.doubles();

    }

    public static int add(int i,int j){
        int temp3 = i + j;
        return temp3;
    }

}
