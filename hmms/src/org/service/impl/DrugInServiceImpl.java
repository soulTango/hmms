package org.service.impl;

import java.math.BigDecimal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.bean.Drug;
import org.bean.Login;
import org.bean.Ruku;
import org.mapper.DrugMapper;
import org.mapper.RukuMapper;
import org.service.DrugInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import utils.JsonResult;

@Service
public class DrugInServiceImpl implements DrugInService {
	
	@Autowired
	RukuMapper rukuMapper;

	@Override
	public JsonResult getDrugInInfo(Ruku bean) {
		// TODO Auto-generated method stub
		List<Ruku> result = rukuMapper.getDrugInInfo(bean);
		return new JsonResult(result,result.size());
	}

	@Override
	public JsonResult updateDrugInInfo(Ruku bean) {
		// TODO Auto-generated method stub
		int i = rukuMapper.updateDrugInInfo(bean);
		if(i>0){
			return new JsonResult(JsonResult.SUCCESS,"编辑入库药品信息成功");
		}else{
			return new JsonResult(JsonResult.ERROR,"编辑入库药品信息失败");
		}
	}

	@Override
	public JsonResult deleteDrugInInfo(Ruku bean) {
		// TODO Auto-generated method stub
		int i = rukuMapper.deleteDrugInInfo(bean);
		if(i>0){
			return new JsonResult(JsonResult.SUCCESS,"删除成功");
		}else{
			return new JsonResult(JsonResult.ERROR,"删除失败");
		}
	}

	@Override
	public JsonResult addDrugInInfo(Ruku bean) {
		// TODO Auto-generated method stub
		Ruku result = rukuMapper.getIsHave(bean);
		if(result!=null){
			return new JsonResult(JsonResult.ERROR,"该药品信息已存在！");
		}else{
			HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
			Login login =  (Login) request.getSession().getAttribute("user");
			String operator = login.getUsername();
			bean.setOperator(operator);
			int i = rukuMapper.addDrugInInfo(bean);
			if(i>0){
				return new JsonResult(JsonResult.SUCCESS,"添加药品信息成功");
			}else{
				return new JsonResult(JsonResult.ERROR,"添加药品信息失败");
			}
		}
	}

	@Override
	public JsonResult getUSDrugInfo(Ruku bean) {
		// TODO Auto-generated method stub
		List<Ruku> result = rukuMapper.getUSDrugInfo(bean);
		return new JsonResult(result,result.size());
	}



	
}
