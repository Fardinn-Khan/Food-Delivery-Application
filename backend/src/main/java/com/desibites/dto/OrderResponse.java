package com.desibites.dto;


public class OrderResponse {

    private Long orderId;

    private String productName;

    private String image;

    private double price;

    private int quantity;

    private String status;


    public OrderResponse(
            Long orderId,
            String productName,
            String image,
            double price,
            int quantity,
            String status
    ) {

        this.orderId = orderId;
        this.productName = productName;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
        this.status = status;

    }


    public Long getOrderId() {
        return orderId;
    }

    public String getProductName() {
        return productName;
    }

    public String getImage() {
        return image;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getStatus() {
        return status;
    }
}