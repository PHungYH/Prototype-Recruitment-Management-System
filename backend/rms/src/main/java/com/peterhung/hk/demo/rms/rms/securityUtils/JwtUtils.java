package com.peterhung.hk.demo.rms.rms.securityUtils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.peterhung.hk.demo.rms.rms.controller.AuthController;
import com.peterhung.hk.demo.rms.rms.service.Enum.UserType;

import java.util.Date;

@Component
public class JwtUtils {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Value("${jwt.expiration}")
    private int jwtExpirationMs;
	private byte[] key;

	private JwtUtils(SecretGenerator secretGenerator) {
		key = secretGenerator.getSecretBytes();
	}
    // Generate JWT token
    public String generateToken(String username, UserType userType) {
        return Jwts.builder()
                .setSubject(username + ":" + userType)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(Keys.hmacShaKeyFor(key))
                .compact();
    }
    // Get username from JWT token
    public String[] getUsernameTypeFromToken(String token) {
        String subject = Jwts.parserBuilder()
                .setSigningKey(key).build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        if (subject != null && !subject.isEmpty()) {
            String[] parts = subject.split(":");
            if (parts.length == 2) {
                return parts; // returns [username, userType]
            }
        }
        return null;
    }
    // Validate JWT token
    public boolean validateJwtToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (SecurityException e) {
            logger.error("Invalid JWT signature: " + e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: " + e.getMessage());
        }
        return false;
    }
}