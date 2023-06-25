<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>JSP TSV Table Example</title>
</head>
<body>
    <%@ page import="java.io.FileReader, java.io.BufferedReader, java.nio.charset.StandardCharsets" %>
    <%!
        private String readLine(BufferedReader reader) throws Exception {
            return new String(reader.readLine().getBytes(StandardCharsets.ISO_8859_1), "UTF-8");
        }
    %>
    <%
        request.setCharacterEncoding("UTF-8"); // 요청의 인코딩을 UTF-8로 설정

        String tsvFile = "/Users/choehyeonseog/Desktop/jeju_web/tourdata2.tsv";
        String line;
        String[] headers = null;

        try {
            FileReader fileReader = new FileReader(tsvFile);
            BufferedReader bufferedReader = new BufferedReader(fileReader);

            // 첫 번째 줄은 헤더로 처리
            if ((line = readLine(bufferedReader)) != null) {
                headers = line.split("\\t");
            }

            // 데이터를 테이블로 출력
            out.println("<table>");
            out.println("<tr>");
            for (String header : headers) {
                out.println("<th>" + header + "</th>");
            }
            out.println("</tr>");

            while ((line = readLine(bufferedReader)) != null) {
                String[] data = line.split("\\t");
                out.println("<tr>");
                for (String value : data) {
                    out.println("<td>" + value + "</td>");
                }
                out.println("</tr>");
            }

            out.println("</table>");

            bufferedReader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    %>
</body>
</html>
