package org.service;

import java.util.Map;

import org.bean.Drug;

import utils.JsonResult;

public interface DrugService {

	JsonResult getDrugAddInfo(Drug bean);

	JsonResult deleteZdtraInfo(Drug bean);

	JsonResult updateDrugInfo(Drug bean);

	JsonResult addDrugInfo(Drug bean);

	JsonResult getSelectType();

	JsonResult selectPynTYpe();

	JsonResult selectDnTYpe(Map<String, Object> map);

	JsonResult getDrugInfo(Map<String, Object> map);

	JsonResult getlessDrugInfo(Map<String, Object> map);

	JsonResult getNum();

}
