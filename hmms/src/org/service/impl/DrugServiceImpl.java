package org.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.bean.Drug;
import org.bean.Product;
import org.bean.Retur;
import org.bean.Ruku;
import org.bean.Sell;
import org.bean.Zdfy;
import org.mapper.DrugMapper;
import org.mapper.ReturMapper;
import org.mapper.RukuMapper;
import org.mapper.SellMapper;
import org.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utils.JsonResult;

@Service
public class DrugServiceImpl implements DrugService {
	
	@Autowired
	DrugMapper drugMapper;
	
	@Autowired
	RukuMapper rukuMapper;
	
	@Autowired
	SellMapper sellMapper;
	
	@Autowired
	ReturMapper returMapper;

	@Override
	public JsonResult getDrugAddInfo(Drug bean) {
		// TODO Auto-generated method stub
		List<Drug> result = drugMapper.getDrugAddInfo(bean);
		return new JsonResult(result,result.size());
	}

	@Override
	public JsonResult deleteZdtraInfo(Drug bean) {
		// TODO Auto-generated method stub
		int i = drugMapper.deleteZdtraInfo(bean);
		if(i>0){
			return new JsonResult(JsonResult.SUCCESS,"删除成功");
		}else{
			return new JsonResult(JsonResult.ERROR,"删除失败");
		}
	}

	@Override
	public JsonResult updateDrugInfo(Drug bean) {
		// TODO Auto-generated method stub
		int i = drugMapper.updateDrugInfo(bean);
		if(i>0){
			return new JsonResult(JsonResult.SUCCESS,"编辑药品信息成功");
		}else{
			return new JsonResult(JsonResult.ERROR,"编辑药品信息失败");
		}
	}

	@Override
	public JsonResult addDrugInfo(Drug bean) {
		// TODO Auto-generated method stub
		Drug result = drugMapper.getIsHave(bean); 
		if(result!=null){
			return new JsonResult(JsonResult.ERROR,"该药品信息已存在！");
		}else{
			int i = drugMapper.addDrugInfo(bean);
			if(i>0){
				return new JsonResult(JsonResult.SUCCESS,"添加药品信息成功");
			}else{
				return new JsonResult(JsonResult.ERROR,"添加药品信息失败");
			}
		}
	}

	@Override
	public JsonResult getSelectType() {
		// TODO Auto-generated method stub
		List<Drug> result = drugMapper.getSelectType();
		return new JsonResult(result,result.size());
	}

	@Override
	public JsonResult selectPynTYpe() {
		// TODO Auto-generated method stub
		List<Drug> result = drugMapper.selectPynTYpe();
		//对result中拼音码有重复数据的进行去重
		if(result.size()>2){
			for(int i=0;i<result.size()-1;i++){
				String ipym = result.get(i).getPinyinma();
				for(int j = result.size() - 1; j > i; j--){
					String jpym = result.get(j).getPinyinma();
					if(ipym.equals(jpym))
						result.remove(j);
				}
			}
		}
		return new JsonResult(result,result.size());
	}

	@Override
	public JsonResult selectDnTYpe(Map<String,Object> map) {
		// TODO Auto-generated method stub
		List<Drug> result = drugMapper.selectDnTYpe(map);
		return new JsonResult(result,result.size());
	}

	@Override
	public JsonResult getDrugInfo(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<Drug> result = drugMapper.getDrugInfo(map);
		return new JsonResult(result,result.size());
	}

	@Override
	public JsonResult getlessDrugInfo(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<Drug> myresult = new ArrayList<>();
		List<Drug> result = drugMapper.getDInfo(map);	//drug表中的全部数据或者部分数据
		if(result.size()>0){
			for(int i=0;i<result.size();i++){
				 Drug drug = result.get(i);
				 Map<String,Object> map2=new HashMap<String, Object>();
				 map2.put("pinyinma", drug.getPinyinma());
				 map2.put("drugname", drug.getDrugname());
				 List<Ruku> rukus = rukuMapper.getRukAmount(map2);
				 int rukuAmount = 0;
				 if(rukus.size()>0){
					 for(int j=0;j<rukus.size();j++){
						 rukuAmount += rukus.get(j).getAmount();
					 }
				 }
				 List<Sell> sells = returMapper.getSelAmount(map2);
				 int sellAmount = 0;
				 if(sells.size()>0){
					 for(int k=0;k<sells.size();k++){
						 sellAmount += sells.get(k).getSamount();
					 }
				 }
				 List<Retur> returs = returMapper.getReAmount(map2);
				 int returAmount = 0;
				 if(returs.size()>0){
					 for(int m=0;m<returs.size();m++){
						 returAmount += returs.get(m).getRamount();
					 }
				 }
				 int restAmount = rukuAmount - sellAmount - returAmount;
				 if(restAmount<result.get(i).getLowwarning()){
					 drug.setKucun(restAmount);
					 myresult.add(drug);
				 } 
			}
			if(myresult==null){
				return new JsonResult(result,0);
			}else{
				return new JsonResult(myresult,myresult.size());
			}
		}else{
			return new JsonResult(result,0);
		}
	}

	@Override
	public JsonResult getNum() {
		// TODO Auto-generated method stub
		Map<String,Object> map=new HashMap<String, Object>();
		List<Drug> result = drugMapper.getDInfo(map);	//drug表中的全部数据
		int rukuAmount = 0;
		int sellAmount = 0;
		int returAmount = 0;
		for(int i=0;i<result.size();i++){
			 Drug drug = result.get(i);
			 Map<String,Object> map2=new HashMap<String, Object>();
			 map2.put("pinyinma", drug.getPinyinma());
			 map2.put("drugname", drug.getDrugname());
			 List<Ruku> rukus = rukuMapper.getRukAmount(map2);
			 
			 if(rukus.size()>0){
				 for(int j=0;j<rukus.size();j++){
					 rukuAmount += rukus.get(j).getAmount();
				 }
			 }
			 
		}
		//System.out.println("入库数量"+rukuAmount);
		for(int i=0;i<result.size();i++){
			 Drug drug = result.get(i);
			 Map<String,Object> map2=new HashMap<String, Object>();
			 map2.put("pinyinma", drug.getPinyinma());
			 map2.put("drugname", drug.getDrugname());
			 List<Sell> sells = returMapper.getSelAmount(map2);
			 
			 if(sells.size()>0){
				 for(int k=0;k<sells.size();k++){
					 sellAmount += sells.get(k).getSamount();
				 }
			 }
			 
		}
		//System.out.println("销售数量"+sellAmount);
		for(int i=0;i<result.size();i++){
			 Drug drug = result.get(i);
			 Map<String,Object> map2=new HashMap<String, Object>();
			 map2.put("pinyinma", drug.getPinyinma());
			 map2.put("drugname", drug.getDrugname());
			 List<Retur> returs = returMapper.getReAmount(map2);
			 
			 if(returs.size()>0){
				 for(int m=0;m<returs.size();m++){
					 returAmount += returs.get(m).getRamount();
				 }
			 }
			 
		}
		//System.out.println("退货数量"+returAmount);
		List<Product> list = new ArrayList<Product>();
		list.add(new Product("入库数量",rukuAmount));
		list.add(new Product("销售数量",sellAmount));
		list.add(new Product("退货数量",returAmount));
		return new JsonResult(list,list.size());
	}

}
