const Order = require('../models/Order');

class OrderController {
   handleShowAllOrder = async (req, res) => {
      try {
         const order = await Order.find({});

         let orders = {
            money: 0,
            count: 0,
         }

         for( let i =0; i < order.length; i++) {
            orders.money += order[i].moneyTotal;
            orders.count += order[i].quantityTotal;
         }

         res.json(orders);
      } catch (e) {
         res.status(500).json({ message: e.message });
      }
   };

   // hiển thị đơn hàng theo id user
   handleShowOrderById = async (req, res) => {
      try {
         const order = await Order.find({ userId: req.params.id });

         let orders = {
            count : 0,
            money: 0,
            orderUser: [],
         }

         // lấy số lượng đơn hàng
         for( let i =0; i < order.length; i++) {
            orders.count += 1;
         }

         // nếu có 1 đơn hàng trở lên thì push từng đơn hàng vào mảng orderUser
         if(orders.count > 0) {
            for( let i =0; i < order.length; i++) {
               orders.orderUser.push(order[i]);
            }
         }

         // tính tổng tiền
         for( let i =0; i < order.length; i++) {
            orders.money += order[i].moneyTotal;
         }

         res.render('donHang', { orders });
      } catch (e) {
         res.status(500).json({ message: e.message });
      }
   }

   // hiện thị sản phẩm bán chạy nhất
   handleShowProductBestSell = async (req, res) => {
      try {
         const order = await Order.find({});

         let prodBestSell = {
            products: {
               id: '',
               quantity: 0,
               total: 0,
            }
         }

         res.json(prodBestSell);
      } catch (e) {
         res.status(500).json({ message: e.message });
      }
   }
}

module.exports = new OrderController();
