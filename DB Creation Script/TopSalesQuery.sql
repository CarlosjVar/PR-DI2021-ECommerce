USE CompuHardware;

SELECT t.* from (Select count(*) as count , Products.name, Products.id FROM Orders
INNER  JOIN OrderDetails on (Orders.id = OrderDetails.orderId)
INNER JOIN Products on (OrderDetails.productId = Products.id)
group by name) t order by (t.count ) desc