package com.example.repository;

import com.example.dto.ProductCountByDate;
import com.example.model.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {


    @Query("SELECT new com.example.dto.ProductCountByDate(p.createdAt, COUNT(p)) FROM Product p GROUP BY p.createdAt")
    List<ProductCountByDate> countProductsByDate();

    @Query(value = "SELECT " +
            "SUM(CASE WHEN p.price <= 50 THEN 1 ELSE 0 END) AS price_0_50, " +
            "SUM(CASE WHEN p.price > 50 AND p.price <= 100 THEN 1 ELSE 0 END) AS price_51_100, " +
            "SUM(CASE WHEN p.price > 100 AND p.price <= 200 THEN 1 ELSE 0 END) AS price_101_200, " +
            "SUM(CASE WHEN p.price > 200 THEN 1 ELSE 0 END) AS price_200_plus " +
            "FROM product p", nativeQuery = true)
    Map<String, Long> getPriceDistribution();
}
