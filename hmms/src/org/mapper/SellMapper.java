package org.mapper;

import java.util.List;

import org.bean.Sell;

public interface SellMapper {
	
	int addSellDrug(Sell bean);							//添加数据到sell表
	List<Sell> getSellDrugInfo(Sell bean);				//获取sell表的数据
	
	
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sell
     *
     * @mbggenerated Tue Apr 24 17:24:54 CST 2018
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sell
     *
     * @mbggenerated Tue Apr 24 17:24:54 CST 2018
     */
    int insert(Sell record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sell
     *
     * @mbggenerated Tue Apr 24 17:24:54 CST 2018
     */
    int insertSelective(Sell record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sell
     *
     * @mbggenerated Tue Apr 24 17:24:54 CST 2018
     */
    Sell selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sell
     *
     * @mbggenerated Tue Apr 24 17:24:54 CST 2018
     */
    int updateByPrimaryKeySelective(Sell record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sell
     *
     * @mbggenerated Tue Apr 24 17:24:54 CST 2018
     */
    int updateByPrimaryKey(Sell record);



	



	

	
}