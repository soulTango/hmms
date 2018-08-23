package org.controller;

import java.util.HashMap;
import java.util.Map;

import org.bean.Drug;
import org.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import utils.JsonResult;

@Controller
@RequestMapping("/drug")
public class DrugController {
	 @Autowired
	 DrugService drugService;
	 
	 @RequestMapping("/getDrugAddInfo")
	 @ResponseBody
	 public JsonResult getDrugAddInfo(Drug bean) {
		 return drugService.getDrugAddInfo(bean);
	 }
	 
	 @RequestMapping("/deleteDrugAddInfo")
	 @ResponseBody
	 public JsonResult deleteZdtraInfo(Drug bean) {
		 return drugService.deleteZdtraInfo(bean);
	 }

	 @RequestMapping("/updateDrugInfo")
	 @ResponseBody
	 public JsonResult updateDrugInfo(Drug bean) {
		 return drugService.updateDrugInfo(bean);
	 }
	 
	 @RequestMapping("/addDrugInfo")
	 @ResponseBody
	 public JsonResult addDrugInfo(Drug bean) {
		 return drugService.addDrugInfo(bean);
	 }
	 
	 @RequestMapping("/getSelectType")
	 @ResponseBody
	 public JsonResult getSelectType() {
		 return drugService.getSelectType();
	 }
	 
	 @RequestMapping("/selectPynTYpe")
	 @ResponseBody
	 public JsonResult selectPynTYpe() {
		 return drugService.selectPynTYpe();
	 }
	 
	 @RequestMapping("/selectDnTYpe")
	 @ResponseBody
	 public JsonResult selectDnTYpe(String pinyinma) {
		 Map<String,Object> map=new HashMap<String, Object>();
		 map.put("pinyinma", pinyinma);
		 return drugService.selectDnTYpe(map);
	 }
	 
	 @RequestMapping("/getDrugInfo")
	 @ResponseBody
	 public JsonResult getDrugInfo(String pinyinma,String drugname) {
		 Map<String,Object> map=new HashMap<String, Object>();
		 map.put("pinyinma", pinyinma);
		 map.put("drugname", drugname);
		 return drugService.getDrugInfo(map);
	 }
	 
	 @RequestMapping("/getlessDrugInfo")
	 @ResponseBody
	 public JsonResult getlessDrugInfo(String pinyinma,String drugname) {
		 Map<String,Object> map=new HashMap<String, Object>();
		 map.put("pinyinma", pinyinma);
		 map.put("drugname", drugname);
		 return drugService.getlessDrugInfo(map);
	 }
	 
	 @RequestMapping("/getNum")
	 @ResponseBody
	 public JsonResult getNum() {
		 return drugService.getNum();
	 }
}
