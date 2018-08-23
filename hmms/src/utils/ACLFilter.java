package utils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;


/**
 * 过滤器（登陆验证）
 */
public class ACLFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("init");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        if(request.getRequestURI().endsWith("login.html")||request.getRequestURI().contains("service/login/getLogin")){
            filterChain.doFilter(servletRequest,servletResponse);
            return ;
        }else {
            HttpSession session = request.getSession();
            if(session.getAttribute("user")!=null){
                filterChain.doFilter(servletRequest,servletResponse);
            }else {
            	response.sendRedirect(request.getContextPath()+"/login.html");
            }
        }
    }

    @Override
    public void destroy() {
    	System.out.println("destroy");
    }

}
