package com.peterhung.hk.demo.rms.rms.Testing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class UserGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String pwd = "P@ssw0rd";
        String hashedPassword = encoder.encode(pwd);
        System.out.printf("Raw: %s, Hashed password: %s%n", pwd, hashedPassword);
    }
}
