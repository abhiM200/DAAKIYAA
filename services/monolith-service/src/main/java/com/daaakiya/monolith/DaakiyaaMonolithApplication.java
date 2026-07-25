package com.daaakiya.monolith;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.daaakiya")
@EntityScan(basePackages = "com.daaakiya")
@EnableJpaRepositories(basePackages = "com.daaakiya")
public class DaakiyaaMonolithApplication {

    public static void main(String[] args) {
        SpringApplication.run(DaakiyaaMonolithApplication.class, args);
    }
}
