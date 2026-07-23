package com.daaakiya.contentservice.config;

import com.daaakiya.contentservice.model.Post;
import com.daaakiya.contentservice.repository.PostRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.List;

@Component
public class ContentDataSeeder implements CommandLineRunner {

    private final PostRepository postRepository;

    public ContentDataSeeder(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    private static final List<String> BOT_POSTS = List.of(
        "Building India's next digital revolution with Daaakiya Super App! 🇮🇳🚀 #startup #tech",
        "Exploring Bengaluru startup ecosystem today. The energy in Indiranagar coffee shops is unmatched ☕💡",
        "Just shipped a new microservices feature using Spring Boot 3 & Next.js 15! Tech stack feels super crisp 🔥",
        "What is your favorite weekend getaway near Mumbai? Lonavala or Alibaug? 🌊⛰️",
        "Deep diving into LLM agents and autonomous code generation. The future of software engineering is here! 🤖✨",
        "Morning filter coffee in Chennai + classical music = unmatched vibe 🎶⛅",
        "Designing glassmorphism UI components with Framer Motion. Micro-animations make all the difference! 🎨✨",
        "Attended an amazing tech meetup in Hyderabad. Great insights on distributed systems and Kafka! 🚀",
        "Who else is building in stealth mode right now? Drop a hint in the comments! 👇⚡",
        "Sunset views from Marine Drive. Mumbai never sleeps! 🌇✨"
    );

    @Override
    public void run(String... args) throws Exception {
        if (postRepository.count() >= 50) {
            return;
        }

        for (int i = 1; i <= 50; i++) {
            Post post = new Post();
            post.setAuthorId(UUID.randomUUID());
            post.setTextContent(BOT_POSTS.get((i - 1) % BOT_POSTS.size()) + " (Bot #" + i + ")");
            postRepository.save(post);
        }
        System.out.println("✅ Successfully seeded 50 Bot Posts into Content Service database!");
    }
}
