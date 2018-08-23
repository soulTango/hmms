package org.mapper;

import java.util.List;
import java.util.Map;

import org.bean.Login;
import org.bean.Zdfy;

public interface LoginMapper {
	Login getUser(Login login);	//根据用户名和密码查询用户
	String getYgzt(Login login);	//获取员工状态
	List<Login> getUserInfo(Login login);	//获取用户列表
	int deleteUserInfo(Login bean);			//删除用户(根据用户名删除，用户名不重复)
	int resetPwd(Login bean);				//重置密码（重置后的密码：111111）
	int addUser(Login bean);				//添加用户
	int updateUserInfo(Login bean);			//编辑用户信息
	List<Zdfy> getSelectType();			//获取员工类型下拉框
	Login getIsHave(String username);		//添加新用户时，判断用户名是否存在
	int moPwd(Map<String, Object> map);		//修改密码
	
    int deleteByPrimaryKey(Integer id);
    int insertSelective(Login record);
    Login selectByPrimaryKey(Integer id);
    int updateByPrimaryKeySelective(Login record);
	
	
	
    
	
	
}