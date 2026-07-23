package com.daaakiya.matchservice.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "matches", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"userOneId", "userTwoId"})
})
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID userOneId; // Ensure userOneId < userTwoId alphabetically/numerically to prevent duplicates

    @Column(nullable = false)
    private UUID userTwoId;

    @Column(updatable = false)
    private LocalDateTime matchedAt;

    private boolean isUnmatched = false;

    @PrePersist
    protected void onMatch() {
        matchedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getUserOneId() { return userOneId; }
    public void setUserOneId(UUID userOneId) { this.userOneId = userOneId; }
    public UUID getUserTwoId() { return userTwoId; }
    public void setUserTwoId(UUID userTwoId) { this.userTwoId = userTwoId; }
    public LocalDateTime getMatchedAt() { return matchedAt; }
    public boolean isUnmatched() { return isUnmatched; }
    public void setUnmatched(boolean unmatched) { isUnmatched = unmatched; }
}
