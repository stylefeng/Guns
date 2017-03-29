package com.stylefeng.guns.rmi;

import java.rmi.RemoteException;

/**
 * @author fengshuonan
 * @date 2017-03-19 20:16
 */
public interface Bussiness {
    String echo(String message) throws RemoteException;
}
