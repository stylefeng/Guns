package com.stylefeng.guns;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.impl.crypto.MacProvider;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.security.Key;

@SpringBootApplication
public class GunsRestApplication {

	public static void main(String[] args) {
		//SpringApplication.run(GunsRestApplication.class, args);

		Key key = MacProvider.generateKey();

		String compactJws = Jwts.builder()
				.setSubject("Joe")
				.signWith(SignatureAlgorithm.HS512, key)
				.compact();

		System.out.println(compactJws);


		try {

			Jwts.parser().setSigningKey(key).parseClaimsJws(compactJws);

			//OK, we can trust this JWT
			System.out.println("trust");

		} catch (SignatureException e) {

			//don't trust the JWT!
			System.out.println("not trust");

		}
	}
}
