const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, userData, price, shippingFee } = ctx.request.body;
    try {
      let totalUnitAmount = 0; // Initialiser le total des unit_amount

      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::item.item")
            .findOne(product.id);

          const unitAmount = item.price * 100;
          totalUnitAmount += unitAmount; // Ajouter l'unit_amount au total

          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.name,
              },
              unit_amount: unitAmount,
            },
            quantity: product.count,
          };
        })
      );

      const shippingCost = shippingFee*100;
      
      // Ajoutez les frais de livraison si nécessaires
      if (shippingCost >= 0) {
        lineItems.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: "Frais de livraison",
            },
            unit_amount: shippingCost,
          },
          quantity: 1, // Ajoutez un frais de livraison une seule fois
        });
      }

        console.log(products, userData, price, lineItems)

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: userData.email,
        mode: "payment",
        success_url: "http://localhost:3000/checkout/success",
        cancel_url: "http://localhost:3000/checkout/failed",
        line_items: lineItems,
      });

      await strapi
        .service("api::order.order")
        .create({ data: { products, userData, price, stripeId: session.id, s>
      return { stripeSession: session };
    } catch (error) {
      console.error("Erreur Stripe  :", error);
      ctx.response.status = 500;
      ctx.send({ error: "Erreur de paiement Stripe."});
      return { error };
    }
  },
}));

