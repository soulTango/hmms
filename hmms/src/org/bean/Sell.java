package org.bean;

import java.math.BigDecimal;
import java.util.Date;

public class Sell {
    private Integer id;
    private String pinyinma;
    private String drugname;
    private String pihao;
    private String pizhunwenhao;
    private Integer samount;
    private BigDecimal sellprice;
    private BigDecimal allprice;
    private String stime;
    private String operator;
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
    public Integer getSamount() {
        return samount;
    }
    public void setSamount(Integer samount) {
        this.samount = samount;
    }
    public BigDecimal getSellprice() {
        return sellprice;
    }
    public void setSellprice(BigDecimal sellprice) {
        this.sellprice = sellprice;
    }
    public BigDecimal getAllprice() {
        return allprice;
    }
    public void setAllprice(BigDecimal allprice) {
        this.allprice = allprice;
    }
    public String getOperator() {
        return operator;
    }
    public void setOperator(String operator) {
        this.operator = operator == null ? null : operator.trim();
    }
	public String getStime() {
		return stime;
	}
	public void setStime(String stime) {
		this.stime = stime;
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