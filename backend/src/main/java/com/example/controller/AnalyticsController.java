package com.example.controller;

import com.example.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/analytics")
public class AnalyticsController {

    @Autowired
    private ProductRepository productRepository;

    // Get the price distribution
    @GetMapping("/price-distribution")
    public Map<String, Long> getPriceDistribution() {
        return productRepository.getPriceDistribution();
    }
}
