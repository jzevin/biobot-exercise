export async function routes(fastify, options) {
  fastify.get("/kits/search/:searchToken", async (request, reply) => {
    // for scalability we obviously don't want to return 1000+ results
    // every time, so this filters any kits that include the passed search
    const filtered = global.kitShippingData.filter((el) => {
      const { searchToken } = request.params;
      return el.label_id.includes(searchToken);
    });
    return filtered;
  });
  fastify.get("/kits", async (request, reply) => {
    return global.kitShippingData;
  });
  fastify.get("/kits/:kitId", async (request, reply) => {
    const found = global.kitShippingData.find((el) => {
      const { kitId } = request.params;
      return el.id === parseInt(kitId);
    });
    return found || { error: "not found", params: request.params };
  });
}
