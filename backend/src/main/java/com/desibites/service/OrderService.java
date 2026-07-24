package com.desibites.service;

import com.desibites.dto.OrderResponse;
import com.desibites.entity.Order;
import com.desibites.entity.Product;
import com.desibites.repository.OrderRepository;
import com.desibites.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;


    // Place Order
    public Order placeOrder(Order order) {

        order.setStatus("PLACED");

        return orderRepository.save(order);

    }


    // Get All Orders (Admin)
    public List<Order> getAllOrders() {

        return orderRepository.findAll();

    }


    // Get Orders By User with Product Details
    public List<OrderResponse> getOrdersByUser(Long userId) {

        List<Order> orders = orderRepository.findByUserId(userId);

        List<OrderResponse> response = new ArrayList<>();

        for (Order order : orders) {

            Product product = productRepository
                    .findById(order.getProductId())
                    .orElse(null);

            if (product != null) {

                OrderResponse orderResponse = new OrderResponse(

                        order.getId(),
                        product.getName(),
                        product.getImage(),
                        product.getPrice(),
                        order.getQuantity(),
                        order.getStatus()

                );

                response.add(orderResponse);

            }

        }

        return response;

    }


    // Update Order Status
    public Order updateStatus(Long id, String status) {

        Order order = orderRepository
                .findById(id)
                .orElse(null);

        if (order != null) {

            order.setStatus(status);

            return orderRepository.save(order);

        }

        return null;

    }


    // Delete Order
    public String deleteOrder(Long id) {

        orderRepository.deleteById(id);

        return "Order deleted successfully";

    }

}