package utils;

import java.io.Serializable;
import java.util.Map;

/**
 * JsonResult是一个泛型实体返回类，通过state查看执行成功与否，当state为0时为成功，返回对象为data，当state为1时，data为null，需要读取msg
 * 给用户进行提示，该类可以根据业务进行修改，由于本业务是通过存储过程执行，我增加了returnResult、returnResultBoolean、returnERRMSG方法，
 * 方便使用者快速返回数据给前台，而不用操作过多的步骤。当分页过多时，可以采用total属性，方便传递分页属性
 */
public class JsonResult<T> implements Serializable {

    private static final long serialVersionUID = -7330453556127986084L;
    public static final int SUCCESS = 0;
    public static final int ERROR = 1;
    public static final String P_ERRMSG = "P_ERRMSG";
    public static final String P_CURSOR = "P_CURSOR";
    //状态
    private int state;
    //返回的数据
    private T data;
    //分页查询用的
    private int total;
    //返回错误信息
    private String msg;

    public JsonResult() {
    }

    public JsonResult(T t) {
        state = SUCCESS;
        data = t;
        msg = "";
    }
    public JsonResult(T t,int total) {
        state = SUCCESS;
        data = t;
        this.total = total;
        msg = "";
    }
    public JsonResult(int state, String msg) {
        this.state = state;
        data = null;
        this.msg = msg;
    }

    public JsonResult(Throwable e) {
        state = ERROR;
        data = null;
        msg = e.getMessage();
    }

    public JsonResult(int state, Throwable e) {
        this.state = state;
        this.msg = e.getMessage();
        this.data = null;
    }

    public static JsonResult returnResult( Map<String ,Object> map){
        if(null==map.get(P_ERRMSG)||"".equals(map.get(P_ERRMSG))){
            return new JsonResult(map.get(P_CURSOR));
        }
        return new JsonResult(1,map.get(P_ERRMSG).toString());
    }


    public static JsonResult returnResult( Map<String ,Object> map,String data){
        if(null==map.get(P_ERRMSG)||"".equals(map.get(P_ERRMSG))){
            return new JsonResult(data);
        }
        return new JsonResult(1,map.get(P_ERRMSG).toString());
    }

    public static boolean returnResultBoolean( Map<String ,Object> map){
        System.out.println("".equals(map.get(P_ERRMSG)));
        if(null==map.get(P_ERRMSG)||"".equals(map.get(P_ERRMSG))){
            return true;
        }
        return false;
    }
    public static JsonResult returnERRMSG( Map<String ,Object> map){
        return new JsonResult(1,map.get(P_ERRMSG).toString());
    }
    public int getState() {
        return state;
    }
    public void setState(int state) {
        this.state = state;
    }
    
    /** 返回时间格式化操作*/
    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getTotal() {return total;}

    public void getTotal(int total) {this.total = total;}
}
