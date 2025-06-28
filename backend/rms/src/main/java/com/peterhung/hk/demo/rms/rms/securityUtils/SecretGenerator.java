package com.peterhung.hk.demo.rms.rms.securityUtils;

import org.springframework.stereotype.Component;

@Component
public class SecretGenerator {
    private int[] byteInts = {196,106,196,106,96,110,112,104,96,112,198,96,104,110,114,194,194,200,204,194,108,112,100,112,204,108,96,112,194,96,110,198};
    
    public byte[] getSecretBytes() {
        byte[] bytes = new byte[32];

        for (int i = 0; i < 32; i++) {
            bytes[i] = (byte) (byteInts[i]/2);
        }

        return bytes;
    }
}
