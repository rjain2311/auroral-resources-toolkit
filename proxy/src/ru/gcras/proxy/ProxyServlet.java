package ru.gcras.proxy;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ProxyServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public void doGet(javax.servlet.http.HttpServletRequest request,
			javax.servlet.http.HttpServletResponse response)
			throws javax.servlet.ServletException, java.io.IOException {
		performTask(request, response);
	}

	public void doPost(javax.servlet.http.HttpServletRequest request,
			javax.servlet.http.HttpServletResponse response)
			throws javax.servlet.ServletException, java.io.IOException {
		performTask(request, response);
	}

	public void performTask(javax.servlet.http.HttpServletRequest request,
			javax.servlet.http.HttpServletResponse response)
			throws javax.servlet.ServletException, java.io.IOException {
		
		String realUrl = getInitParameter("url");

		// Copy the request parameters from the original request
		Enumeration paramNames = request.getParameterNames();
		String paramName;
		while (paramNames.hasMoreElements()) {
			paramName = (String) paramNames.nextElement();
			if (!"proxyId".equals(paramName)) {
				realUrl = realUrl.concat(paramName);
				String value = request.getParameter(paramName);
				if (value != null && !"".equals(value)) 
				realUrl = realUrl.concat("="
						+ request.getParameter(paramName));
				if (paramNames.hasMoreElements()) {
					realUrl = realUrl.concat("&");
				}
			}
		}

		// real URL will be returning XML data
		String contentType = getInitParameter("contentType");
		PrintWriter out = response.getWriter();

		// invoke the real URL and copy the result into the response
		// for the original request
		System.out.println(realUrl);
		URL real = new URL(realUrl);
		BufferedReader in = new BufferedReader(new InputStreamReader(
				real.openStream()));
		String inputLine;
		while ((inputLine = in.readLine()) != null)
			out.println(inputLine);
		in.close();

		return;
	}

}
