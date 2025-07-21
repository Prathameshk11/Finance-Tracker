package com.financetracker.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DatabaseConfig {

    @Bean
    @Primary
    @Profile("prod")
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");

        if (databaseUrl != null && !databaseUrl.isEmpty()) {
            try {
                URI dbUri = new URI(databaseUrl);

                String username = dbUri.getUserInfo().split(":")[0];
                String password = dbUri.getUserInfo().split(":")[1];
                String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath();

                return DataSourceBuilder.create()
                        .url(dbUrl)
                        .username(username)
                        .password(password)
                        .driverClassName("org.postgresql.Driver")
                        .build();

            } catch (URISyntaxException e) {
                throw new RuntimeException("Invalid DATABASE_URL format", e);
            }
        } else {
            // Fallback to individual environment variables
            String dbUrl = System.getenv("DB_URL");
            String dbUsername = System.getenv("DB_USERNAME");
            String dbPassword = System.getenv("DB_PASSWORD");

            if (dbUrl == null || dbUsername == null || dbPassword == null) {
                throw new RuntimeException("Database configuration not found. Please set DATABASE_URL or DB_URL, DB_USERNAME, DB_PASSWORD");
            }

            return DataSourceBuilder.create()
                    .url(dbUrl)
                    .username(dbUsername)
                    .password(dbPassword)
                    .driverClassName("org.postgresql.Driver")
                    .build();
        }
    }
}
