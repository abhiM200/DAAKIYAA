package com.daaakiya.authservice.config;

import com.daaakiya.authservice.model.User;
import com.daaakiya.authservice.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AuthDataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthDataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() >= 50) {
            return;
        }

        String encodedPassword = passwordEncoder.encode("password123");

        for (int i = 1; i <= 50; i++) {
            String email = "bot" + i + "@daaakiya.com";
            if (userRepository.findByEmail(email).isEmpty()) {
                User bot = new User();
                bot.setEmail(email);
                bot.setPassword(encodedPassword);
                userRepository.save(bot);
            }
        }
        System.out.println("✅ Successfully seeded 50 Bot Accounts into Auth Service database!");
    }
}
