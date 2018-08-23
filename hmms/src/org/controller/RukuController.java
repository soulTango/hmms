package org.controller;

import org.bean.Ruku;
import org.service.DrugInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import utils.JsonResult;

@Controller
@RequestMapping("/drugIn")
public class RukuController {
	 @Autowired
	 DrugInService drugInService;
	 
	 @RequestMapping("/getDrugInInfo")
	 @ResponseBody
	 public JsonResult getDrugInInfo(Ruku bean) {
		 return drugInService.getDrugInInfo(bean);
	 }
	 
	 @RequestMapping("/updateDrugInInfo")
	 @ResponseBody
	 public JsonResult updateDrugInInfo(Ruku bean) {
		 return drugInService.updateDrugInInfo(bean);
	 }
	 
	 @RequestMapping("/deleteDrugInInfo")
	 @ResponseBody
	 public JsonResult deleteDrugInInfo(Ruku bean) {
		 return drugInService.deleteDrugInInfo(bean);
	 }
	 
	 @RequestMapping("/addDrugInInfo")
	 @ResponseBody
	 public JsonResult addDrugInInfo(Ruku bean) {
		 return drugInService.addDrugInInfo(bean);
	 }
	 
	 @RequestMapping("/getUSDrugInfo")
	 @ResponseBody
	 public JsonResult getUSDrugInfo(Ruku bean) {
		 return drugInService.getUSDrugInfo(bean);
	 }
}
