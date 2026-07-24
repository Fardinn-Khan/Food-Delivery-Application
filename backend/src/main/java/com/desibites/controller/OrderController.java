package com.desibites.controller;

import com.desibites.dto.OrderResponse;
import com.desibites.entity.Order;
import com.desibites.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;


    // Place Order API
    @PostMapping("/place")
    public Order placeOrder(@RequestBody Order order) {

        return orderService.placeOrder(order);

    }


    // Get All Orders (Admin)
    @GetMapping
    public List<Order> getAllOrders() {

        return orderService.getAllOrders();

    }


    // Get Orders By User API
    @GetMapping("/{userId}")
    public List<OrderResponse> getOrders(@PathVariable Long userId) {

        return orderService.getOrdersByUser(userId);

    }


    // Update Order Status API
    @PutMapping("/{id}/status")
    public Order updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return orderService.updateStatus(id, status);

    }


    // Delete Order API
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Long id) {

        return orderService.deleteOrder(id);

    }

}