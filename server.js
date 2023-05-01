const stripeKey =
  "sk_test_51MbZHJDpu7qymUblrxLri0Dem0dB3MsDnpyIPo2hE53IXUBDnvmlxjc5wlniZiRz0b1t8Fza8ipwDBP6pxDms5EO00fedzB63x";
// Granola bar : price_1MbZNQDpu7qymUbl4ysMCkFR
//Chocolate bar : price_1MbZP9Dpu7qymUblJ73ydWmg
//Honnie cake : price_1MbZPqDpu7qymUblnQA5FrdA

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(stripeKey);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  console.log(req.body);

  let lineItems = [];
  const items = req.body.items;

  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("your server id listening on port 4000!"));
