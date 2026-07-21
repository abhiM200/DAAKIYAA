package com.daaakiya.propertyservice.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID ownerId; // User Service Profile ID

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private String location;
    private double rentAmount;
    
    @Enumerated(EnumType.STRING)
    private PropertyType type = PropertyType.APARTMENT; // APARTMENT, PG, HOUSE, FLAT

    private boolean isAvailable = true;

    @Column(updatable = false)
    private LocalDateTime listedAt;

    @PrePersist
    protected void onList() {
        listedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getOwnerId() { return ownerId; }
    public void setOwnerId(UUID ownerId) { this.ownerId = ownerId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public double getRentAmount() { return rentAmount; }
    public void setRentAmount(double rentAmount) { this.rentAmount = rentAmount; }
    public PropertyType getType() { return type; }
    public void setType(PropertyType type) { this.type = type; }
    public boolean isAvailable() { return isAvailable; }
    public void setAvailable(boolean available) { isAvailable = available; }
    public LocalDateTime getListedAt() { return listedAt; }
}

enum PropertyType {
    APARTMENT, PG, HOUSE, FLAT
}
