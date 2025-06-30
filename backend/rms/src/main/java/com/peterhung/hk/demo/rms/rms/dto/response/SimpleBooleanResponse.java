package com.peterhung.hk.demo.rms.rms.dto.response;

public class SimpleBooleanResponse {
    private boolean result;

    public SimpleBooleanResponse(boolean result) {
        this.result = result;
    }

    public boolean getResult() {return result;}

    public void setResult(boolean result) {
        this.result = result;
    }
}
