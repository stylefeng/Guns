package com.stylefeng.guns;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GunsApplication {

    protected final static Logger logger = LoggerFactory.getLogger(GunsApplication.class);


    public static void main(String[] args) {
        SpringApplication.run(GunsApplication.class, args);
        logger.info("PortalApplication is sussess!");
    }
}
