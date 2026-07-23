package com.daaakiya.propertyservice.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "roommate_profiles")
public class RoommateProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private UUID userId;

    private double maxBudget;
    private String preferredLocation;
    
    @Column(length = 1000)
    private String lifestylePreferences; // e.g. Non-smoker, Pet friendly

    private boolean isLooking = true;

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
    public double getMaxBudget() { return maxBudget; }
    public void setMaxBudget(double maxBudget) { this.maxBudget = maxBudget; }
    public String getPreferredLocation() { return preferredLocation; }
    public void setPreferredLocation(String preferredLocation) { this.preferredLocation = preferredLocation; }
    public String getLifestylePreferences() { return lifestylePreferences; }
    public void setLifestylePreferences(String lifestylePreferences) { this.lifestylePreferences = lifestylePreferences; }
    public boolean isLooking() { return isLooking; }
    public void setLooking(boolean looking) { isLooking = looking; }
}
