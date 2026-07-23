package com.daaakiya.userservice.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "user_settings")
public class UserSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private UUID profileId;

    private boolean isPrivateProfile = false;
    private boolean receiveEmailNotifications = true;
    private boolean receivePushNotifications = true;
    private String language = "en";
    private String theme = "system"; // light, dark, system

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getProfileId() { return profileId; }
    public void setProfileId(UUID profileId) { this.profileId = profileId; }
    public boolean isPrivateProfile() { return isPrivateProfile; }
    public void setPrivateProfile(boolean privateProfile) { isPrivateProfile = privateProfile; }
    public boolean isReceiveEmailNotifications() { return receiveEmailNotifications; }
    public void setReceiveEmailNotifications(boolean receiveEmailNotifications) { this.receiveEmailNotifications = receiveEmailNotifications; }
    public boolean isReceivePushNotifications() { return receivePushNotifications; }
    public void setReceivePushNotifications(boolean receivePushNotifications) { this.receivePushNotifications = receivePushNotifications; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public String getTheme() { return theme; }
    public void setTheme(String theme) { this.theme = theme; }
}
