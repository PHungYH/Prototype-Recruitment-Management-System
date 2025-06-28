package com.peterhung.hk.demo.rms.rms.model.Enums;

public enum Gender {
    M('M'),
    F('F');

    private final char code;

    Gender(char code) {
        this.code = code;
    }

    public char getCode() {
        return code;
    }

    public static Gender fromCode(char code) {
        return switch (Character.toUpperCase(code)) {
            case 'M' -> M;
            case 'F' -> F;
            default -> throw new IllegalArgumentException("Unknown gender code: " + code);
        };
    }
}