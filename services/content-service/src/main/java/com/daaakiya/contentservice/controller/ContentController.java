package com.daaakiya.contentservice.controller;

import com.daaakiya.contentservice.model.Post;
import com.daaakiya.contentservice.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/content/posts")
public class ContentController {

    private final PostRepository postRepository;

    public ContentController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody PostRequest request, 
                                           @RequestHeader(value = "X-User-Id", required = false) UUID authorId) {
        Post post = new Post();
        post.setAuthorId(authorId != null ? authorId : UUID.randomUUID());
        post.setTextContent(request.textContent());
        
        Post savedPost = postRepository.save(post);
        return ResponseEntity.ok(savedPost);
    }

    @GetMapping("/feed")
    public ResponseEntity<Page<Post>> getFeed(@RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "20") int size) {
        Page<Post> posts = postRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(page, size));
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<Post>> getUserPosts(@PathVariable UUID userId,
                                                   @RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "20") int size) {
        Page<Post> posts = postRepository.findByAuthorIdOrderByCreatedAtDesc(userId, PageRequest.of(page, size));
        return ResponseEntity.ok(posts);
    }
}

record PostRequest(String textContent) {}
