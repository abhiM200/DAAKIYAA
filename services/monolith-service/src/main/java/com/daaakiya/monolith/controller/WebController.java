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
}
