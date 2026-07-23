package com.daaakiya.matchservice.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "match_profiles")
public class MatchProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private UUID userId; // Auth Service User ID

    private int age;
    private String gender;
    private String lookingFor; // Male, Female, Everyone
    private int maxDistanceKm = 50;
    
    @Column(length = 500)
    private String datingBio;

    private boolean isVerified = false;

    // Location coordinates for distance matching
    private Double latitude;
    private Double longitude;

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getLookingFor() { return lookingFor; }
    public void setLookingFor(String lookingFor) { this.lookingFor = lookingFor; }
    public int getMaxDistanceKm() { return maxDistanceKm; }
    public void setMaxDistanceKm(int maxDistanceKm) { this.maxDistanceKm = maxDistanceKm; }
    public String getDatingBio() { return datingBio; }
    public void setDatingBio(String datingBio) { this.datingBio = datingBio; }
    public boolean isVerified() { return isVerified; }
    public void setVerified(boolean verified) { isVerified = verified; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
}
