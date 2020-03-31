exports.up = function(knex) {
  return knex.schema.createTable('users', (table)=>{
      table.increments();
      table.text('email').notNullable().unique();
      table.text('password');
      table.text('name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
