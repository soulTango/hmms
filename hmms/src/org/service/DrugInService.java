package org.service;

import org.bean.Drug;
import org.bean.Ruku;

import utils.JsonResult;

public interface DrugInService {

	JsonResult getDrugInInfo(Ruku bean);

	JsonResult updateDrugInInfo(Ruku bean);

	JsonResult deleteDrugInInfo(Ruku bean);

	JsonResult addDrugInInfo(Ruku bean);

	JsonResult getUSDrugInfo(Ruku bean);
	
}
