package com.daaakiya.matchservice.repository;

import com.daaakiya.matchservice.model.MatchProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.Optional;

public interface MatchProfileRepository extends JpaRepository<MatchProfile, UUID> {
    Optional<MatchProfile> findByUserId(UUID userId);
    Page<MatchProfile> findByGenderAndUserIdNot(String gender, UUID userId, Pageable pageable);
}
