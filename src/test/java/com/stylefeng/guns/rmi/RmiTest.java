package com.stylefeng.guns.rmi;

import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

/**
 * 远程调用测试
 *
 * @author fengshuonan
 * @date 2017-03-19 20:14
 */
public class RmiTest {

    public static void main(String[] args) throws RemoteException, NotBoundException {
        Registry registry = LocateRegistry.getRegistry("localhost");
        Bussiness bussiness = (Bussiness) registry.lookup("BussinessDemo");
        System.out.println(bussiness.echo(""));
    }
}
