package org.controller;

import org.bean.Zdfy;
import org.service.ZdTraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import utils.JsonResult;

@Controller
@RequestMapping("/zdTra")
public class ZdTraController {
	 @Autowired
	 ZdTraService zdTraService;
	 
	 @RequestMapping("/getZdtraInfo")
	 @ResponseBody
	 public JsonResult getZdtraInfo(Zdfy bean) {
		 return zdTraService.getZdtraInfo(bean);
	 }
	 
	 @RequestMapping("/deleteZdtraInfo")
	 @ResponseBody
	 public JsonResult deleteZdtraInfo(Zdfy bean) {
		 return zdTraService.deleteZdtraInfo(bean);
	 }
	 
	 @RequestMapping("/updateZdtraInfo")
	 @ResponseBody
	 public JsonResult updateZdtraInfo(Zdfy bean) {
		 return zdTraService.updateZdtraInfo(bean);
	 }
	 
	 @RequestMapping("/addZdtra")
	 @ResponseBody
	 public JsonResult addZdtra(Zdfy bean) {
		 return zdTraService.addZdtra(bean);
	 }
	 
}
