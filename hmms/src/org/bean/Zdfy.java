package org.bean;

public class Zdfy {

    private String zdmc;
    private String zdz;
    private String sfxs;
    private String zdsm;
    public String getZdmc() {
        return zdmc;
    }
    public void setZdmc(String zdmc) {
        this.zdmc = zdmc == null ? null : zdmc.trim();
    }
    public String getZdz() {
        return zdz;
    }
    public void setZdz(String zdz) {
        this.zdz = zdz == null ? null : zdz.trim();
    }
    public String getSfxs() {
        return sfxs;
    }
    public void setSfxs(String sfxs) {
        this.sfxs = sfxs == null ? null : sfxs.trim();
    }
	public String getZdsm() {
		return zdsm;
	}
	public void setZdsm(String zdsm) {
		this.zdsm = zdsm;
	}
    
    
}