package org.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.bean.Login;
import org.bean.Ruku;
import org.bean.Sell;
import org.mapper.RukuMapper;
import org.mapper.SellMapper;
import org.service.SellService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import utils.JsonResult;
@Service
public class SellServiceImpl implements SellService {

	@Autowired
	SellMapper sellMapper;
	@Autowired
	RukuMapper RukuMapper;
	
	@Override
	public JsonResult addSellDrug(Sell bean) {
		// TODO Auto-generated method stub
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		Login login =  (Login) request.getSession().getAttribute("user");
		String operator = login.getUsername();
		bean.setOperator(operator);
		int i = sellMapper.addSellDrug(bean);
		if(i>0){
			Ruku ruku = new Ruku();
			ruku.setPinyinma(bean.getPinyinma());
			ruku.setDrugname(bean.getDrugname());
			ruku.setPihao(bean.getPihao());
			ruku.setPizhunwenhao(bean.getPizhunwenhao());
			System.out.println(ruku.getPinyinma()+"+"+ruku.getDrugname()+"+"+ruku.getPihao()+"+"+ruku.getPizhunwenhao());
			int x = RukuMapper.setSfxs(ruku);
			System.out.println("设置是否出售标志："+x);
			return new JsonResult(JsonResult.SUCCESS,"出售成功");
		}else{
			return new JsonResult(JsonResult.ERROR,"出售失败");
		}
	}

	@Override
	public JsonResult getSellDrugInfo(Sell bean) {
		// TODO Auto-generated method stub
		List<Sell> result = sellMapper.getSellDrugInfo(bean);
		return new JsonResult(result, result.size());
	}

	@Override
	public JsonResult addSellDrug2(Sell bean) {
		// TODO Auto-generated method stub
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		Login login =  (Login) request.getSession().getAttribute("user");
		String operator = login.getUsername();
		bean.setOperator(operator);
		int i = sellMapper.addSellDrug(bean);
		if(i>0){
			return new JsonResult(JsonResult.SUCCESS,"出售成功");
		}else{
			return new JsonResult(JsonResult.ERROR,"出售失败");
		}
	}

}
