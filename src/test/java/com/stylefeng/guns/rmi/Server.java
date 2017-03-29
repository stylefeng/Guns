package com.stylefeng.guns.rmi;

import java.rmi.AlreadyBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

/**
 * 远程调用测试
 *
 * @author fengshuonan
 * @date 2017-03-19 20:14
 */
public class Server {

    public static void main(String[] args) throws RemoteException, AlreadyBoundException {
        while(true){
            BussinessImpl bussiness = new BussinessImpl();
            UnicastRemoteObject.exportObject(new BussinessImpl(),9999);
            Registry registry = LocateRegistry.createRegistry(1099);
            registry.rebind("BussinessDemo",bussiness);
        }

    }
}
