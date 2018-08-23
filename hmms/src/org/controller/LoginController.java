package org.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.digest.DigestUtils;
import org.bean.Login;
import org.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import utils.JsonResult;

@Controller
@RequestMapping("/login")
public class LoginController {
	 @Autowired
	 LoginService loginService;
	 
	 @RequestMapping("/getLogin")
	 @ResponseBody
	 public JsonResult getLogin(Login bean){
		 return loginService.getUser(bean);
	 }
	 
	 @RequestMapping("/loginOut")
	 @ResponseBody
	 public JsonResult loginOut(HttpServletRequest request){
		 request.getSession().setAttribute("user", null);
		 return new JsonResult();
	 }
	 
	 @RequestMapping("/notLogin")
	 @ResponseBody
	 public JsonResult notLogin(HttpServletRequest request) {
		JsonResult jr=new JsonResult<>(2, "未登录");
		return jr;
	 }
	 
	 @RequestMapping("/getUser")
	 @ResponseBody
	 public JsonResult getUser(HttpServletRequest request) {
		Login login = (Login)request.getSession().getAttribute("user");
		return new JsonResult(login,0);
	 }
	 
	 @RequestMapping("/getUserInfo")
	 @ResponseBody
	 public JsonResult getUserInfo(Login bean) {
		 return loginService.getUserInfo(bean);
	 }
	 
	 @RequestMapping("/deleteUserInfo")
	 @ResponseBody
	 public JsonResult deleteUserInfo(Login bean) {
		 return loginService.deleteUserInfo(bean);
	 }
	 
	 @RequestMapping("/resetPwd")
	 @ResponseBody
	 public JsonResult resetPwd(Login bean) {
		 return loginService.resetPwd(bean);
	 }
	 
	 @RequestMapping("/addUser")
	 @ResponseBody
	 public JsonResult addUser(Login bean) {
		 return loginService.addUser(bean);
	 }
	 
	 @RequestMapping("/updateUserInfo")
	 @ResponseBody
	 public JsonResult updateUserInfo(Login bean) {
		 return loginService.updateUserInfo(bean);
	 }
	 
	 @RequestMapping("/getSelectType")
	 @ResponseBody
	 public JsonResult getSelectType() {
		 return loginService.getSelectType();
	 }
	 
	 @RequestMapping("/moPwd")
	 @ResponseBody
	 public JsonResult moPwd(String username,String password,String newpassword) {
		 Map<String,Object> map=new HashMap<>();
		 String npassword = DigestUtils.md5Hex(newpassword);
		 map.put("username", username);
		 map.put("password", password);
		 map.put("newpassword", npassword);
		 Login login = new Login();
		 login.setUsername(username);
		 login.setPassword(password);
		 JsonResult result =  loginService.getUser(login);
		 if(result.getState()==1){
			 return new JsonResult<>(1,"原始密码输入有误");
		 }else if (password.equals(newpassword)){
			 return new JsonResult<>(1,"新密码和原始密码相同");
		 }
		 return loginService.moPwd(map);
	 }
}
