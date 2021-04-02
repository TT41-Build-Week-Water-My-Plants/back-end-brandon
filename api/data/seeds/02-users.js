exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "brandon", password: "123", phone_number: "8881231234" },
        { username: "Andrew", password: "123", phone_number: "8881231234" },
        { username: "courtney", password: "123", phone_number: "8881231234" },
      ]);
    });
};
