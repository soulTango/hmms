package org.service.impl;

import java.util.List;
import java.util.Map;

import org.bean.Retur;
import org.bean.Ruku;
import org.bean.Sell;
import org.mapper.ReturMapper;
import org.mapper.RukuMapper;
import org.service.ReturnDrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utils.JsonResult;
@Service
public class ReturnDrugServiceImpl implements ReturnDrugService {
	@Autowired
	ReturMapper ReturMapper;
	@Autowired
	RukuMapper RukuMapper;
	
	@Override
	public JsonResult getSellAmount(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<Sell> result = ReturMapper.getSellAmount(map);
		if(result.size()==0){
			return new JsonResult(result, result.size());
		}else{
			int sAmount = 0;
			for(int j=0;j<result.size();j++){
				Sell sell = result.get(j);
				sAmount += sell.getSamount();
			}
			return new JsonResult(result, sAmount);
		}
	}

	@Override
	public JsonResult addReturnDrug(Retur bean) {
		// TODO Auto-generated method stub
		int i = ReturMapper.addReturnDrug(bean);
		if(i>0){
			Ruku ruku = new Ruku();
			ruku.setPinyinma(bean.getPinyinma());
			ruku.setDrugname(bean.getDrugname());
			ruku.setPihao(bean.getPihao());
			ruku.setPizhunwenhao(bean.getPizhunwenhao());
			System.out.println(ruku.getPinyinma()+"+"+ruku.getDrugname()+"+"+ruku.getPihao()+"+"+ruku.getPizhunwenhao());
			int x = RukuMapper.setSfth(ruku);
			System.out.println("设置是否退货标志："+x);
			return new JsonResult(JsonResult.SUCCESS,"退货成功");
		}else{
			return new JsonResult(JsonResult.ERROR,"退货失败");
		}
	}

	@Override
	public JsonResult getReturnDrugInfo(Retur bean) {
		// TODO Auto-generated method stub
		List<Retur> result = ReturMapper.getReturnDrugInfo(bean);
		return new JsonResult(result, result.size());
	}

	@Override
	public JsonResult getRukuAmount(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<Ruku> result = RukuMapper.getRukuAmount(map);
		if(result.size()==0){
			return new JsonResult(result, result.size());
		}else{
			Ruku ruku = result.get(0);
			return new JsonResult(result, ruku.getAmount());
		}
	}

	@Override
	public JsonResult getReturAmount(Map<String, Object> map) {
		// TODO Auto-generated method stub
		List<Retur> result = ReturMapper.getReturAmount(map);
		if(result.size()==0){
			return new JsonResult(result, result.size());
		}else{
			int returAmount = 0;
			for(int j=0;j<result.size();j++){
				Retur retur = result.get(j);
				returAmount += retur.getRamount();
			}
			return new JsonResult(result, returAmount);
		}
	}

	@Override
	public JsonResult addReturnDrug2(Retur bean) {
		// TODO Auto-generated method stub
		int i = ReturMapper.addReturnDrug(bean);
		if(i>0){
			return new JsonResult(JsonResult.SUCCESS,"再次退货成功");
		}else{
			return new JsonResult(JsonResult.ERROR,"再次退货失败");
		}
	}
	

}
