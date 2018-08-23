package org.bean;

import java.math.BigDecimal;

public class Ruku {

    private Integer id;
    private String pinyinma;
    private String drugname;
    private String pihao;
    private String pizhunwenhao;
    private String spec;
    private String unit;
    private Integer amount;
    private BigDecimal inprice;
    private BigDecimal sellprice;
    private BigDecimal allprice;
    private String intime;
    private String infrom;
    private String factory;
    private String producedate;
    private String usefuldate;
    private String operator;
    private String sfth;
    private String sfxs;
    private String remark;
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
    public Integer getAmount() {
        return amount;
    }
    public void setAmount(Integer amount) {
        this.amount = amount;
    }
    public BigDecimal getInprice() {
        return inprice;
    }
    public void setInprice(BigDecimal inprice) {
        this.inprice = inprice;
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

    public String getInfrom() {
        return infrom;
    }
    public void setInfrom(String infrom) {
        this.infrom = infrom == null ? null : infrom.trim();
    }
    public String getFactory() {
        return factory;
    }
    public void setFactory(String factory) {
        this.factory = factory == null ? null : factory.trim();
    }
    public String getOperator() {
        return operator;
    }
    public void setOperator(String operator) {
        this.operator = operator == null ? null : operator.trim();
    }
    public String getRemark() {
        return remark;
    }
    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
	public String getIntime() {
		return intime;
	}
	public void setIntime(String intime) {
		this.intime = intime;
	}
	public String getProducedate() {
		return producedate;
	}
	public void setProducedate(String producedate) {
		this.producedate = producedate;
	}
	public String getUsefuldate() {
		return usefuldate;
	}
	public void setUsefuldate(String usefuldate) {
		this.usefuldate = usefuldate;
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
	public String getSfth() {
		return sfth;
	}
	public void setSfth(String sfth) {
		this.sfth = sfth;
	}
	public String getSfxs() {
		return sfxs;
	}
	public void setSfxs(String sfxs) {
		this.sfxs = sfxs;
	}
	
    
}