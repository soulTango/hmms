package org.bean;

public class Login {

    private Integer id;
    private String username;
    private String password;
    private String type;
    private String ygzt;
    private String typeStr;
    
	public String getTypeStr() {
		return typeStr;
	}
	public void setTypeStr(String typeStr) {
		this.typeStr = typeStr;
	}
	public String getYgzt() {
		return ygzt;
	}
	public void setYgzt(String ygzt) {
		this.ygzt = ygzt;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
    
}