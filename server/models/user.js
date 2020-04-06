import bookshelf from '../config/postgresql/bookshelf.config';

export default bookshelf.Model.extend({
  tableName: 'users'
});