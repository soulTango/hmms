package org.service.impl;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.digest.DigestUtils;
import org.bean.Login;
import org.bean.Zdfy;
import org.mapper.LoginMapper;
import org.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import utils.JsonResult;
@Service
public class LoginServiceImpl implements LoginService {
	@Autowired
	LoginMapper loginMapper;
	
	@Override
	public JsonResult getUser(Login bean) {
		// TODO Auto-generated method stub
		String pwd = DigestUtils.md5Hex(bean.getPassword());
		bean.setPassword(pwd);
		Login result = loginMapper.getUser(bean);
		String ygzt = loginMapper.getYgzt(bean);
		System.out.println("result"+result);
		if(result == null){
			return new JsonResult(JsonResult.ERROR,"用户名或者密码有误！");
		}else if(ygzt.equals("Y")){
			return new JsonResult(JsonResult.ERROR,"该员工已离职！");
		}else{
			HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
			request.getSession().setAttribute("user", result);
			return new JsonResult(result,0);
		}
		
	}

	@Override
	public JsonResult getUserInfo(Login bean) {
		// TODO Auto-generated method stub
		List<Login> result = loginMapper.getUserInfo(bean);
		if(result.size()>0){
			for(int i=0;i<result.size();i++){
				Login login = result.get(i);
			}
		}
		return new JsonResult(result,result.size());
	}

	@Override
	public JsonResult deleteUserInfo(Login bean) {
		// TODO Auto-generated method stub
		int i = loginMapper.deleteUserInfo(bean);
		if(i>0){
			return new JsonResult(JsonResult.SUCCESS,"删除成功");
		}else{
			return new JsonResult(JsonResult.ERROR,"删除失败");
		}
		
	}

	@Override
	public JsonResult resetPwd(Login bean) {
		// TODO Auto-generated method stub
		int i = loginMapper.resetPwd(bean);
		if(i>0){
			return new JsonResult(JsonResult.SUCCESS,"重置密码成功");
		}else{
			return new JsonResult(JsonResult.ERROR,"重置密码失败");
		}
	}

	@Override
	public JsonResult addUser(Login bean) {
		// TODO Auto-generated method stub
		Login result = loginMapper.getIsHave(bean.getUsername()); 
		if(result!=null){
			return new JsonResult(JsonResult.ERROR,"该登录别名已存在！");
		}else{
			String pwd = DigestUtils.md5Hex(bean.getPassword());
			bean.setPassword(pwd);
			int i = loginMapper.addUser(bean);
			if(i>0){
				return new JsonResult(JsonResult.SUCCESS,"添加用户成功");
			}else{
				return new JsonResult(JsonResult.ERROR,"添加用户失败");
			}
		}
	}

	@Override
	public JsonResult updateUserInfo(Login bean) {
		// TODO Auto-generated method stub
		int i = loginMapper.updateUserInfo(bean);
		if(i>0){
			return new JsonResult(JsonResult.SUCCESS,"编辑用户信息成功");
		}else{
			return new JsonResult(JsonResult.ERROR,"编辑用户信息失败");
		}
	}

	@Override
	public JsonResult getSelectType() {
		// TODO Auto-generated method stub
		List<Zdfy> result = loginMapper.getSelectType();
		return new JsonResult(result,result.size());
	}

	@Override
	public JsonResult moPwd(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int i = loginMapper.moPwd(map);
		if(i>0){
			return new JsonResult(JsonResult.SUCCESS,"修改密码成功");
		}else{
			return new JsonResult(JsonResult.ERROR,"修改密码失败");
		}
	}

}
