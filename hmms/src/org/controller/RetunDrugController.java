package org.controller;

import java.util.HashMap;
import java.util.Map;

import org.bean.Retur;
import org.bean.Ruku;
import org.service.DrugInService;
import org.service.ReturnDrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import utils.JsonResult;

@Controller
@RequestMapping("/returnDrug")
public class RetunDrugController {
	 @Autowired
	 ReturnDrugService returnDrugService;
	 
	 @RequestMapping("/getSellAmount")
	 @ResponseBody
	 public JsonResult getSellAmount(String pinyinma,String drugname, String pihao,String pizhunwenhao) {
		 Map<String,Object> map=new HashMap<String, Object>();
		 map.put("pinyinma", pinyinma);
		 map.put("drugname", drugname);
		 map.put("pihao", pihao);
		 map.put("pizhunwenhao", pizhunwenhao);
		 return returnDrugService.getSellAmount(map);
	 }
	 
	 @RequestMapping("/addReturnDrug")
	 @ResponseBody
	 public JsonResult addReturnDrug(Retur bean) {
		 return returnDrugService.addReturnDrug(bean);
	 }
	 
	 @RequestMapping("/getReturnDrugInfo")
	 @ResponseBody
	 public JsonResult getReturnDrugInfo(Retur bean) {
		 return returnDrugService.getReturnDrugInfo(bean);
	 }
	 
	 @RequestMapping("/getRukuAmount")
	 @ResponseBody
	 public JsonResult getRukuAmount(String pinyinma,String drugname, String pihao,String pizhunwenhao) {
		 Map<String,Object> map=new HashMap<String, Object>();
		 map.put("pinyinma", pinyinma);
		 map.put("drugname", drugname);
		 map.put("pihao", pihao);
		 map.put("pizhunwenhao", pizhunwenhao);
		 return returnDrugService.getRukuAmount(map);
	 }
	 
	 @RequestMapping("/getReturAmount")
	 @ResponseBody
	 public JsonResult getReturAmount(String pinyinma,String drugname, String pihao,String pizhunwenhao) {
		 Map<String,Object> map=new HashMap<String, Object>();
		 map.put("pinyinma", pinyinma);
		 map.put("drugname", drugname);
		 map.put("pihao", pihao);
		 map.put("pizhunwenhao", pizhunwenhao);
		 return returnDrugService.getReturAmount(map);
	 }
	 
	 @RequestMapping("/addReturnDrug2")
	 @ResponseBody
	 public JsonResult addReturnDrug2(Retur bean) {
		 return returnDrugService.addReturnDrug2(bean);
	 }
	 
}
