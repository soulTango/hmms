package org.service.impl;

import java.util.List;
import org.bean.Zdfy;
import org.mapper.ZdfyMapper;
import org.service.ZdTraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utils.JsonResult;


@Service
public class ZdTraServiceImpl implements ZdTraService {
	@Autowired
	ZdfyMapper zdfyMapper;
	
	@Override
	public JsonResult getZdtraInfo(Zdfy bean) {
		// TODO Auto-generated method stub
		List<Zdfy> result = zdfyMapper.getZdtraInfo(bean);
		return new JsonResult(result,result.size());
	}

	@Override
	public JsonResult deleteZdtraInfo(Zdfy bean) {
		// TODO Auto-generated method stub
		int i = zdfyMapper.deleteZdtraInfo(bean);
		if(i>0){
			return new JsonResult(JsonResult.SUCCESS,"删除成功");
		}else{
			return new JsonResult(JsonResult.ERROR,"删除失败");
		}
	}

	@Override
	public JsonResult updateZdtraInfo(Zdfy bean) {
		// TODO Auto-generated method stub
		int i = zdfyMapper.updateZdtraInfo(bean);
		if(i>0){
			return new JsonResult(JsonResult.SUCCESS,"编辑字段翻译成功");
		}else{
			return new JsonResult(JsonResult.ERROR,"编辑字段翻译失败");
		}
	}

	@Override
	public JsonResult addZdtra(Zdfy bean) {
		// TODO Auto-generated method stub
		Zdfy result = zdfyMapper.getIsHave(bean); 
		if(result!=null){
			return new JsonResult(JsonResult.ERROR,"该字段已存在！");
		}else{
			int i = zdfyMapper.addZdtra(bean);
			if(i>0){
				return new JsonResult(JsonResult.SUCCESS,"添加字段成功");
			}else{
				return new JsonResult(JsonResult.ERROR,"添加字段失败");
			}
		}
	}

}
