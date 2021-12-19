package com.rent.car.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Objects;
import java.util.Properties;

@Configuration
@ComponentScan("com.rent.car.service")
@PropertySource(value = "classpath:db.properties")
public class MailConfiguration {
    @Autowired
    private final Environment env;

    @Autowired
    public MailConfiguration(Environment env) {
        this.env = env;
    }

    @Bean
    JavaMailSender createMailSender(){
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername(env.getProperty("email.sender"));
        mailSender.setPassword(env.getProperty("email.password"));
        mailSender.setDefaultEncoding("utf-8");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }

    @Bean
    public SimpleMailMessage emailTemplate() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(Objects.requireNonNull(env.getProperty("email.admin")));
        message.setFrom(Objects.requireNonNull(env.getProperty("email.sender")));

        return message;
    }
}
