package com.peterhung.hk.demo.rms.rms.dto.response;

import java.util.ArrayList;

public class ErrorWithMissingIdsResponse {
    private boolean result;
    private ArrayList<Integer> ids;

    public ErrorWithMissingIdsResponse(ArrayList<Integer> ids) {
        this.ids = ids;
    }
    public boolean isResult() {
        return result;
    }
    
    public ArrayList<Integer> getIds() {
        return ids;
    }
    public void setIds(ArrayList<Integer> ids) {
        this.ids = ids;
    }
}
