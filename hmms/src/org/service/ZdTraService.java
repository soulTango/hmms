package org.service;

import org.bean.Login;
import org.bean.Zdfy;
import utils.JsonResult;

public interface ZdTraService {
	JsonResult getZdtraInfo(Zdfy bean);
	JsonResult deleteZdtraInfo(Zdfy bean);
	JsonResult updateZdtraInfo(Zdfy bean);
	JsonResult addZdtra(Zdfy bean);
}
