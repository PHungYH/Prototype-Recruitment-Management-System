package com.peterhung.hk.demo.rms.rms.dto.response;

public class SimpleErrorResponse {
    private boolean result;
    private int errorCode;
    private String message;

    public SimpleErrorResponse(int errorCode, String message) {
        this.errorCode = errorCode;
        this.message = message;
    }

    public boolean getResult() {return result;}

    public int getErrorCode() {return errorCode;}

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    
}
