
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'kali', password: '1234'},
        {username: 'afie', password: 'bar'},
        {username: 'izzy', password: 'baz'}
      ]);
    });
};
