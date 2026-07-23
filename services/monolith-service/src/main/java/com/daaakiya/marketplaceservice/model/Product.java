package com.daaakiya.marketplaceservice.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID sellerId;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private double price;

    @Enumerated(EnumType.STRING)
    private Category category = Category.ELECTRONICS;

    private boolean isSold = false;

    @Column(updatable = false)
    private LocalDateTime listedAt;

    @PrePersist
    protected void onList() {
        listedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getSellerId() { return sellerId; }
    public void setSellerId(UUID sellerId) { this.sellerId = sellerId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    public boolean isSold() { return isSold; }
    public void setSold(boolean sold) { this.isSold = sold; }
    public LocalDateTime getListedAt() { return listedAt; }
}

enum Category {
    ELECTRONICS, FURNITURE, VEHICLES, CLOTHING, OTHER
}
