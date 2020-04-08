exports.up = function(knex) {
  return knex.schema.createTable('users', (table)=>{
      table.increments();
      table.text('email').notNullable().unique();
      table.text('password');
      table.text('name');
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
