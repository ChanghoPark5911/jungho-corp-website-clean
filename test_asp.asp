<%@ Language="VBScript" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ASP Test</title>
</head>
<body>
    <h1>ASP Hosting Test</h1>
    <p><strong>Result:</strong> 
    <%
        Response.Write("✅ SUCCESS - Windows Hosting Confirmed!")
    %>
    </p>
    <p><strong>Server Time:</strong> <%= Now() %></p>
    <p><strong>Server Software:</strong> <%= Request.ServerVariables("SERVER_SOFTWARE") %></p>
</body>
</html>


