"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::email.email", ({ strapi }) => ({
  async create(ctx) {
    const { mailCustomer, mailConfiotes, objet, content } = ctx.request.body;
    try {
      // Envoyer l'e-mail
      await strapi.plugins["email"].services.email.send({
        to: mailCustomer,
        from: mailConfiotes,
        subject: objet,
        text: content,
      });

      console.log("Email sent successfully.");
      return { message: "Email sent successfully." };
    } catch (error) {
      console.error("Error sending email:", error);
      ctx.response.status = 500;
      return { error: "Error sending email." };
    }
  },
}));
