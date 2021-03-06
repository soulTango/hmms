package org.mapper;

import java.util.List;
import java.util.Map;

import org.bean.Retur;
import org.bean.Sell;

public interface ReturMapper {
	
	List<Sell> getSellAmount(Map<String, Object> map);		//查找销售表数据
	int addReturnDrug(Retur bean);							//向retur表中添加数据
	List<Retur> getReturnDrugInfo(Retur bean);				//查找retur表中的数据
	List<Retur> getReturAmount(Map<String, Object> map);	//查询已退货总额
	List<Sell> getSelAmount(Map<String, Object> map2);
	List<Retur> getReAmount(Map<String, Object> map2);
	
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table retur
     *
     * @mbggenerated Tue Apr 24 17:22:01 CST 2018
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table retur
     *
     * @mbggenerated Tue Apr 24 17:22:01 CST 2018
     */
    int insert(Retur record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table retur
     *
     * @mbggenerated Tue Apr 24 17:22:01 CST 2018
     */
    int insertSelective(Retur record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table retur
     *
     * @mbggenerated Tue Apr 24 17:22:01 CST 2018
     */
    Retur selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table retur
     *
     * @mbggenerated Tue Apr 24 17:22:01 CST 2018
     */
    int updateByPrimaryKeySelective(Retur record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table retur
     *
     * @mbggenerated Tue Apr 24 17:22:01 CST 2018
     */
    int updateByPrimaryKey(Retur record);
	
	
	
	
	


	

	

	
}