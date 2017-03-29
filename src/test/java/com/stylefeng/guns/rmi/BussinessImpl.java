package com.stylefeng.guns.rmi;

import java.io.Serializable;
import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 * @author fengshuonan
 * @date 2017-03-19 20:17
 */
public class BussinessImpl implements Bussiness, Remote,Serializable {

    @Override
    public String echo(String message) throws RemoteException {
        return "123123123";
    }
}
