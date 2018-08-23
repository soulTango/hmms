package org.service;

import java.util.Map;

import org.bean.Retur;

import utils.JsonResult;

public interface ReturnDrugService {

	JsonResult getSellAmount(Map<String, Object> map);

	JsonResult addReturnDrug(Retur bean);

	JsonResult getReturnDrugInfo(Retur bean);

	JsonResult getRukuAmount(Map<String, Object> map);

	JsonResult getReturAmount(Map<String, Object> map);

	JsonResult addReturnDrug2(Retur bean);
	
}
