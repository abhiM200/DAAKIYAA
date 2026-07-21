package com.daaakiya.jobsservice.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "job_postings")
public class JobPosting {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID recruiterId; // User Service Profile ID

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private String location;
    
    @Enumerated(EnumType.STRING)
    private JobType jobType = JobType.FULL_TIME; // FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP

    private boolean isRemote = false;

    @Column(updatable = false)
    private LocalDateTime postedAt;

    @PrePersist
    protected void onPost() {
        postedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getRecruiterId() { return recruiterId; }
    public void setRecruiterId(UUID recruiterId) { this.recruiterId = recruiterId; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public JobType getJobType() { return jobType; }
    public void setJobType(JobType jobType) { this.jobType = jobType; }
    public boolean isRemote() { return isRemote; }
    public void setRemote(boolean remote) { this.isRemote = remote; }
    public LocalDateTime getPostedAt() { return postedAt; }
}

enum JobType {
    FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP
}
