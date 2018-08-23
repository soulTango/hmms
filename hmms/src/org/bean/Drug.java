package org.bean;

public class Drug {
    private Integer id;
    private String pinyinma;
    private String drugname;
    private String spec;
    private String unit;
    private Integer lowwarning;
    private String csname;
    private Integer kucun; 
    
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getPinyinma() {
        return pinyinma;
    }
    public void setPinyinma(String pinyinma) {
        this.pinyinma = pinyinma == null ? null : pinyinma.trim();
    }
    public String getDrugname() {
        return drugname;
    }
    public void setDrugname(String drugname) {
        this.drugname = drugname == null ? null : drugname.trim();
    }
    public String getSpec() {
        return spec;
    }
    public void setSpec(String spec) {
        this.spec = spec == null ? null : spec.trim();
    }
    public String getUnit() {
        return unit;
    }
    public void setUnit(String unit) {
        this.unit = unit == null ? null : unit.trim();
    }
    public Integer getLowwarning() {
        return lowwarning;
    }
    public void setLowwarning(Integer lowwarning) {
        this.lowwarning = lowwarning;
    }
    public String getCsname() {
        return csname;
    }
    public void setCsname(String csname) {
        this.csname = csname == null ? null : csname.trim();
    }
	public Integer getKucun() {
		return kucun;
	}
	public void setKucun(Integer kucun) {
		this.kucun = kucun;
	}
    
}