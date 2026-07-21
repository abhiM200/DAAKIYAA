package com.daaakiya.matchservice.controller;

import com.daaakiya.matchservice.model.MatchProfile;
import com.daaakiya.matchservice.repository.MatchProfileRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;
import java.util.Optional;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    private final MatchProfileRepository profileRepository;

    public MatchController(MatchProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @PostMapping("/profile")
    public ResponseEntity<MatchProfile> createOrUpdateProfile(@RequestBody ProfileRequest request, @RequestHeader("X-User-Id") UUID userId) {
        Optional<MatchProfile> existingOpt = profileRepository.findByUserId(userId);
        MatchProfile profile = existingOpt.orElse(new MatchProfile());
        
        profile.setUserId(userId);
        profile.setAge(request.age());
        profile.setGender(request.gender());
        profile.setLookingFor(request.lookingFor());
        profile.setDatingBio(request.datingBio());
        
        return ResponseEntity.ok(profileRepository.save(profile));
    }

    @GetMapping("/discover")
    public ResponseEntity<Page<MatchProfile>> discoverProfiles(@RequestHeader("X-User-Id") UUID userId,
                                                               @RequestParam(defaultValue = "0") int page,
                                                               @RequestParam(defaultValue = "10") int size) {
        // In a real app, we'd filter by 'lookingFor' preference and check if already swiped.
        // For now, just return profiles not belonging to the current user.
        Optional<MatchProfile> myProfile = profileRepository.findByUserId(userId);
        if (myProfile.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        String lookingFor = myProfile.get().getLookingFor();
        Page<MatchProfile> recommendations = profileRepository.findByGenderAndUserIdNot(lookingFor, userId, PageRequest.of(page, size));
        return ResponseEntity.ok(recommendations);
    }
}

record ProfileRequest(int age, String gender, String lookingFor, String datingBio) {}
