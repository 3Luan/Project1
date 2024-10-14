package com.project1.util;

import java.io.UnsupportedEncodingException;
import java.util.Properties;

import jakarta.mail.*;
import jakarta.mail.internet.*;

public class EmailService {

    public void sendVerificationEmail(String email, String verificationCode) {
        // Thiết lập thông tin kết nối
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");

        final String username = "utc2nckh@gmail.com"; // Địa chỉ email của bạn
        final String password = "lacj gvrc tion qdie"; // Mật khẩu ứng dụng Gmail

        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            // Nội dung email
            Message message = new MimeMessage(session);
            message.setFrom(createInternetAddress("utc2nckh@gmail.com", "UTC2 Social"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
            // message.setSubject("Mã xác thực");

            String emailContent = String.format(
                    "<div style=\"font-family: Arial, sans-serif; display: inline-block; background-color: #f9f9f9; padding: 20px;\">"
                            +
                            "    <div style=\"display: inline-block; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\">"
                            +
                            "        <div style=\"background-color: #f5f5f5; border: 1px solid #dddddd; padding: 10px; border-radius: 5px; display: flex; align-items: center;\">"
                            +
                            "            <h3 style=\"color: #333333; margin-top: 0; margin-bottom: 0;\">Verification code:</h3>"
                            +
                            "            <p style=\"color: #facb01; font-size: 18px; font-weight: bold; margin: 0; margin-left: 10px;\">%s</p>"
                            +
                            "        </div>" +
                            "    </div>" +
                            "</div>",
                    verificationCode);

            message.setContent(emailContent, "text/html");

            // Gửi email
            Transport.send(message);
            System.out.println("Email sent successfully");
        } catch (MessagingException e) {
            System.out.println("Email not sent");
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            System.out.println("Error in encoding the email address");
            e.printStackTrace();
        }
    }

    private InternetAddress createInternetAddress(String address, String personal) throws UnsupportedEncodingException {
        return new InternetAddress(address, personal);
    }
}
