package com.desibites.service;

import com.desibites.entity.Cart;
import com.desibites.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;


    // Add item to cart
    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }


    // Get user's cart
    public List<Cart> getCartByUser(Long userId) {
        return cartRepository.findByUserId(userId);
    }


    // Remove cart item
    public String removeFromCart(Long id) {
        cartRepository.deleteById(id);
        return "Item removed from cart successfully";
    }
}