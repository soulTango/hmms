package org.bean;

import java.math.BigDecimal;

public class Retur {
    private Integer id;
    private String pinyinma;
    private String drugname;
    private String pihao;
    private String pizhunwenhao;
    private Integer ramount;
    private BigDecimal inprice;
    private BigDecimal allprice;
    private String rtime;
    private String operator;
    private String reason;
    private String dateStart;
    private String dateEnd;
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
    public String getPihao() {
        return pihao;
    }
    public void setPihao(String pihao) {
        this.pihao = pihao == null ? null : pihao.trim();
    }
    public String getPizhunwenhao() {
        return pizhunwenhao;
    }
    public void setPizhunwenhao(String pizhunwenhao) {
        this.pizhunwenhao = pizhunwenhao == null ? null : pizhunwenhao.trim();
    }
    public Integer getRamount() {
        return ramount;
    }
    public void setRamount(Integer ramount) {
        this.ramount = ramount;
    }
    public BigDecimal getInprice() {
        return inprice;
    }
    public void setInprice(BigDecimal inprice) {
        this.inprice = inprice;
    }
    public BigDecimal getAllprice() {
        return allprice;
    }
    public void setAllprice(BigDecimal allprice) {
        this.allprice = allprice;
    }
    public String getRtime() {
		return rtime;
	}
	public void setRtime(String rtime) {
		this.rtime = rtime;
	}
	public String getOperator() {
        return operator;
    }
    public void setOperator(String operator) {
        this.operator = operator == null ? null : operator.trim();
    }
    public String getReason() {
        return reason;
    }
    public void setReason(String reason) {
        this.reason = reason == null ? null : reason.trim();
    }
	public String getDateStart() {
		return dateStart;
	}
	public void setDateStart(String dateStart) {
		this.dateStart = dateStart;
	}
	public String getDateEnd() {
		return dateEnd;
	}
	public void setDateEnd(String dateEnd) {
		this.dateEnd = dateEnd;
	}
    
}