package org.service;

import java.util.Map;

import org.bean.Login;

import utils.JsonResult;

public interface LoginService {
	JsonResult getUser(Login bean);
	
	JsonResult getUserInfo(Login bean);

	JsonResult deleteUserInfo(Login bean);

	JsonResult resetPwd(Login bean);

	JsonResult addUser(Login bean);

	JsonResult updateUserInfo(Login bean);

	JsonResult getSelectType();

	JsonResult moPwd(Map<String, Object> map);
}
