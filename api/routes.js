export async function routes (fastify, options) {
  fastify.get('/search/:kitId', async (request, reply) => {
    // this filters any kits that include the passed search string and all if empty
    const filtered = global.kitShippingData.filter(el => {
      const { kitId } = request.params;
      return el.label_id.includes(kitId);
    })
    return { data: filtered };
  })
}

