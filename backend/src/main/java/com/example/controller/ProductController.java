package com.example.controller;

import com.example.dto.ProductCountByDate;
import com.example.exception.ResourceNotFoundException;
import com.example.model.Product;
import com.example.repository.ProductRepository;
import com.example.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // React runs on port 3000 by default
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository productRepository;

    @Autowired  // Dependency injection of the repository
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Autowired
    private ProductService productService;

    // Fetch all products
    @GetMapping
    public List<Product> getProducts() {
        return productService.getAllProducts();
    }

    // Add a new product
    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        System.out.println("Received product: " + product); // 👈 Add this
        Product savedProduct = productRepository.save(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }


    // Update an existing product
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product product = productService.getAllProducts().stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));

        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());

        return productService.saveProduct(product);
    }

    // Delete a product
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        Product product = productService.getAllProducts().stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));

        productRepository.delete(product);


        return ResponseEntity.ok().build();
    }

    // Get product count by date
    @GetMapping("/products-by-date")
    public List<ProductCountByDate> getProductsGroupedByDate() {
        return productService.getProductsGroupedByDate();
    }

    @GetMapping("/count-by-date")
    public List<ProductCountByDate> getProductCountsByDate() {
        return productRepository.countProductsByDate();
    }

    @GetMapping("/price-distribution")
    public Map<String, Long> getPriceDistribution() {
        return productRepository.getPriceDistribution();
    }

}
