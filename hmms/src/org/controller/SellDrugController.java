package org.controller;

import java.util.HashMap;
import java.util.Map;

import org.bean.Retur;
import org.bean.Ruku;
import org.bean.Sell;
import org.service.DrugInService;
import org.service.ReturnDrugService;
import org.service.SellService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import utils.JsonResult;

@Controller
@RequestMapping("/sellDrug")
public class SellDrugController {
	@Autowired
	SellService serllservice;
	
	@RequestMapping("/addSellDrug")
	@ResponseBody
	public JsonResult addSellDrug(Sell bean) {
		return serllservice.addSellDrug(bean);
	}
	
	@RequestMapping("/getSellDrugInfo")
	@ResponseBody
	public JsonResult getSellDrugInfo(Sell bean) {
		return serllservice.getSellDrugInfo(bean);
	}
	
	@RequestMapping("/addSellDrug2")
	@ResponseBody
	public JsonResult addSellDrug2(Sell bean) {
		return serllservice.addSellDrug2(bean);
	}
	
	
}
