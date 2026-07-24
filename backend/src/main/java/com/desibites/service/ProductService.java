package com.desibites.service;

import com.desibites.entity.Product;
import com.desibites.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Add Product
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // Get All Products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get Product By ID
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // ✅ Update Product
    public Product updateProduct(Long id, Product product) {

        Product existing = productRepository.findById(id).orElse(null);

        if (existing != null) {

            existing.setName(product.getName());
            existing.setDescription(product.getDescription());
            existing.setPrice(product.getPrice());
            existing.setImage(product.getImage());
            existing.setCategory(product.getCategory());

            return productRepository.save(existing);
        }

        return null;
    }

    // Delete Product
    public String deleteProduct(Long id) {

        productRepository.deleteById(id);

        return "Product deleted successfully";
    }
}