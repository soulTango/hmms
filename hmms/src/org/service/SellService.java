package org.service;

import org.bean.Sell;

import utils.JsonResult;

public interface SellService {

	JsonResult addSellDrug(Sell bean);

	JsonResult getSellDrugInfo(Sell bean);

	JsonResult addSellDrug2(Sell bean);

}
