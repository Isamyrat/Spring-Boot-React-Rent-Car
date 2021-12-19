package com.rent.car.service;

import com.rent.car.model.Rental;
import com.rent.car.model.User;
import com.rent.car.model.utils.Status;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import java.util.Objects;


@Service
public class SendEmailService {

    private final Environment env;

    private final JavaMailSender mailSender;



    public SendEmailService(Environment env, JavaMailSender mailSender) {
        this.env = env;
        this.mailSender = mailSender;
    }
    public void sendRegistrationMail(User user) {
        MimeMessagePreparator mimeMessagePreparator = mimeMessage -> {

            mimeMessage.setFrom(new InternetAddress(Objects.requireNonNull(env.getProperty("email.sender"))));
            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(user.getEmail()));
            mimeMessage.setSubject("Поздравляем, вы успешно зарегестрировались!!!");

            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setText("<html><body>" +
                    "<h1>" +  "Добрый день" + " " + user.getName() + "!</h1>" +
                    "<p>" + "Спасибо за регистрацию в нашем сайте." + "." + "</p>" +
                    "<p>" + "</p>" +
                    "<p>" + "</p>" +
                    "<p>" + "</p>" +
                    "<h1>" +  "ПОЖАЛУЙСТА, НЕ ОТВЕЧАЙТЕ НА ЭТО ПИСЬМО, так как оно было отправлено с сервера!!!!"  + "!</h1>" +
                    "<p>" + "Для связи с работодателем используйте, пожалуйста контакты:" + "(+375-25-765-16-51) - (+375-25-985-14-54)" + "</p>" +
                    "</body></html>", true);

        };

        try {
            mailSender.send(mimeMessagePreparator);
        } catch (MailException e) {
            e.printStackTrace();
        }
    }

    public void sendAcceptOrDeniedMail(User user, Rental rental) {
        String answer;
        System.out.println(rental.getStatus());
        if(rental.getStatus().equals(Status.BOOKING)){
            answer = "Одобрено";
        }else{
            answer = "Отказано";
        }
        MimeMessagePreparator mimeMessagePreparator = mimeMessage -> {

            mimeMessage.setFrom(new InternetAddress(Objects.requireNonNull(env.getProperty("email.sender"))));
            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(user.getEmail()));
            mimeMessage.setSubject("Ответ на ваш запрос");

            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setText("<html><body>" +
                    "<h1>" + "Добрый день" + " " + user.getName() + "!</h1>" +
                    "<p>" + "Ответ на ваш запрос" + " " + rental.getCarRental().getModel() + " " +  rental.getCarRental().getBrand() +  " ." +"<p>"+
                    "<p>" +   "На дату:" + " " + rental.getStartDate() + "." +  "<p>" +
                    "<p>" +   "На:" + " " + rental.getCountOfDays() + "дней." +  "<p>" +
                    "<p>" +   "Сумма в общем:" + " " +  rental.getPrice() + "." +  "<p>" +
                    "<p>" +   "Наш ответ:" + " " + answer + "." +  "<p>" +
                    "<p>" + "</p>" +
                    "<p>" + "</p>" +
                    "<p>" + "</p>" +
                    "<h1>" +  "ПОЖАЛУЙСТА, НЕ ОТВЕЧАЙТЕ НА ЭТО ПИСЬМО, так как оно было отправлено с сервера!!!!"  + "!</h1>" +
                    "<p>" + "Для связи с работодателем используйте, пожалуйста контакты:" + "(+375-25-765-16-51) - (+375-25-985-14-54)" + "</p>" +
                    "</body></html>", true);
        };

        try {
            mailSender.send(mimeMessagePreparator);
        } catch (MailException e) {
            e.printStackTrace();
        }
    }
    public void securityService(String name, String email, String message) {
        MimeMessagePreparator mimeMessagePreparator = mimeMessage -> {
            mimeMessage.setFrom(new InternetAddress(Objects.requireNonNull(env.getProperty("email.sender"))));
            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress("davidovr27@gmail.com"));
            mimeMessage.setSubject("Служба поддержки, от " + name);

            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setText("<html><body>" +
                    "<h1>" +  "Писмо от " + " " + email + "!</h1>" +
                    "<p>" + message + "." + "</p>" +
                    "</body></html>", true);

        };

        try {
            mailSender.send(mimeMessagePreparator);
        } catch (MailException e) {
            e.printStackTrace();
        }
    }

}
