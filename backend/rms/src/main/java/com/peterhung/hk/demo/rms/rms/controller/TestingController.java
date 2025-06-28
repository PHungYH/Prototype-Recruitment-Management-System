package com.peterhung.hk.demo.rms.rms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/apitest/")
public class TestingController {
    @GetMapping("/hi")
    public String home() {
        return "Hello world";
    }
}
