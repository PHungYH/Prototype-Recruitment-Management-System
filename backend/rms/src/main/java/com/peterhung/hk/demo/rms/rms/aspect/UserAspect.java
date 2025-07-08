package com.peterhung.hk.demo.rms.rms.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.peterhung.hk.demo.rms.rms.securityUtils.JwtUtils;
import com.peterhung.hk.demo.rms.rms.service.Enum.UserType;

import jakarta.servlet.http.HttpServletRequest;

@Aspect
@Component
public class UserAspect {
    private static final Logger logger = LoggerFactory.getLogger(UserAspect.class);
    @Autowired
    private JwtUtils jwtUtils;

    @Around("@annotation(com.peterhung.hk.demo.rms.rms.annotations.RequireApplicantToken)")
    public Object validateApplicant(ProceedingJoinPoint joinPoint) throws Throwable {
        logger.info("[Aspect] Validate applicant token...");
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes == null) {
            logger.error("[Aspect] No request attributes found.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        HttpServletRequest request = attributes.getRequest();
        String token = request.getHeader("token");

        if (token != null && !token.isEmpty()) {
            String[] usernameType = jwtUtils.getUsernameTypeFromToken(token);
            if (usernameType != null && usernameType[1].equals(UserType.APPLICANT.toString()))
            return joinPoint.proceed();
        } 

        logger.error("[Aspect] Illegal request.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

     @Around("@annotation(com.peterhung.hk.demo.rms.rms.annotations.RequireAdminToken)")
    public Object validateAdmin(ProceedingJoinPoint joinPoint) throws Throwable {
        logger.info("[Aspect] Validate applicant token...");
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes == null) {
            logger.error("[Aspect] No request attributes found.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        HttpServletRequest request = attributes.getRequest();
        String token = request.getHeader("token");

        if (token != null && !token.isEmpty()) {
            String[] usernameType = jwtUtils.getUsernameTypeFromToken(token);
            if (usernameType != null && usernameType[1].equals(UserType.ADMIN.toString()))
            return joinPoint.proceed();
        } 

        logger.error("[Aspect] Illegal request.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
