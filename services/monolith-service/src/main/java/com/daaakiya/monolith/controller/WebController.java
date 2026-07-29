package com.daaakiya.monolith.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

@Controller
public class WebController {

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("title", "DAAKIYAA - Home");
        return "index";
    }

    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("title", "DAAKIYAA - Login");
        return "login";
    }

    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("title", "DAAKIYAA - Register");
        return "register";
    }

    @GetMapping("/feed")
    public String feed(Model model) {
        model.addAttribute("title", "DAAKIYAA - Feed");
        return "feed";
    }

    @GetMapping("/explore")
    public String explore(Model model) {
        model.addAttribute("title", "DAAKIYAA - Explore");
        return "explore";
    }

    @GetMapping("/matches")
    public String matches(Model model) {
        model.addAttribute("title", "DAAKIYAA - Matches");
        return "matches";
    }

    @GetMapping("/chat")
    public String chat(Model model) {
        model.addAttribute("title", "DAAKIYAA - Chat");
        return "chat";
    }

    @GetMapping("/stories")
    public String stories(Model model) {
        model.addAttribute("title", "DAAKIYAA - Stories");
        return "stories";
    }

    @GetMapping("/reels")
    public String reels(Model model) {
        model.addAttribute("title", "DAAKIYAA - Reels");
        return "reels";
    }
}
