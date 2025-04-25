package com.example.service;

import com.example.dto.ProductCountByDate;
import com.example.model.Product;
import com.example.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Fetch all products
    public List<Product> getAllProducts() {
        log.info("Fetching all products");
        return (List<Product>) productRepository.findAll();
    }

    // Count products grouped by creation date
    public List<ProductCountByDate> getProductsGroupedByDate() {
        log.info("Fetching product count grouped by date");
        return productRepository.countProductsByDate();
    }

    // Save a new product
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }
}
