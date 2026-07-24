package com.desibites.controller;

import com.desibites.entity.Cart;
import com.desibites.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;


    // Add item to cart
    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {
        return cartService.addToCart(cart);
    }


    // Get cart by user id
    @GetMapping("/{userId}")
    public List<Cart> getCart(@PathVariable Long userId) {
        return cartService.getCartByUser(userId);
    }


    // Remove item from cart
    @DeleteMapping("/{id}")
    public String removeItem(@PathVariable Long id) {
        return cartService.removeFromCart(id);
    }
}