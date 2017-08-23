package com.stylefeng.guns.rest.filter;

import com.stylefeng.guns.rest.auth.JwtTokenUtil;
import com.stylefeng.guns.rest.config.properties.JwtProperties;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    private final Log logger = LogFactory.getLog(this.getClass());

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtProperties jwtProperties;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {

        if (request.getServletPath().equals("/" + jwtProperties.getAuthPath())) {
            chain.doFilter(request, response);
            return;
        }

        final String requestHeader = request.getHeader(jwtProperties.getHeader());

        String username = null;
        String authToken = null;
        if (requestHeader != null && requestHeader.startsWith("Bearer ")) {
            authToken = requestHeader.substring(7);
            try {
                username = jwtTokenUtil.getUsernameFromToken(authToken);
            } catch (IllegalArgumentException e) {
                logger.error("an error occured during getting username from token", e);
                return;
            }
        } else {
            logger.warn("couldn't find bearer string, will ignore the header");
            return;
        }
        chain.doFilter(request, response);
    }
}