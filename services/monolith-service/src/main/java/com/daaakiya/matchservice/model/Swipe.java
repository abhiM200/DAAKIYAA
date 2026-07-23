package com.daaakiya.matchservice.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "swipes", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"swiperId", "swipedId"})
})
public class Swipe {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID swiperId; // The user who is swiping

    @Column(nullable = false)
    private UUID swipedId; // The user being swiped on

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SwipeDirection direction; // LEFT (Reject), RIGHT (Like)

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getSwiperId() { return swiperId; }
    public void setSwiperId(UUID swiperId) { this.swiperId = swiperId; }
    public UUID getSwipedId() { return swipedId; }
    public void setSwipedId(UUID swipedId) { this.swipedId = swipedId; }
    public SwipeDirection getDirection() { return direction; }
    public void setDirection(SwipeDirection direction) { this.direction = direction; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}

enum SwipeDirection {
    LEFT, RIGHT
}
