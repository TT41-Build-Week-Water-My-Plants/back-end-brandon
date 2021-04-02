exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("plants")
    .del()
    .then(function () {
      return knex("plants").insert([
        {
          nickname: "Stewey",
          species: "Venus Fly Trap",
          h2o_frequency: "2pm everyday ",
          image:
            "https://images.unsplash.com/photo-1517369428076-d7a1fc6acb9e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        },
        {
          nickname: "spike lee",
          species: "cactus",
          h2o_frequency: "3 times a day",
          image:
            "https://images.unsplash.com/photo-1459156212016-c812468e2115?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=649&q=80",
        },
      ]);
    });
};
