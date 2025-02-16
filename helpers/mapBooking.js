module.exports = function (booking) {
  return {
    id: booking.id,
    room: {
      id: booking.room.id,
      title: booking.room.title,
      imgUrl: booking.room.img_url,
      content: booking.room.content,
      maxCapacity: booking.room.max_capacity,
      price: booking.room.price,
    },
    author: {
      id: booking.author.id,
      login: booking.author.login,
      roleId: booking.author.role,
    },
    date: booking.date,
    status: booking.status,
  };
};
