module.exports = function (room) {
  return {
    id: room.id,
    title: room.title,
    imgUrl: room.img_url,
    content: room.content,
    maxCapacity: room.max_capacity,
    price: room.price,
  };
};
