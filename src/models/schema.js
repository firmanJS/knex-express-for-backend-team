module.exports = {
  TABLES: {
    TODO: 'mst_todo',
    ARCHIVE_TODO: 'archive_todo',
    USERS: 'users',
    BLOG: 'mst_category',
    BLOG_CAT: 'mst_category_blog',
  },
  FUNC: {
    COPY_TODO: 'function_copy_todo()',
    UPDATE_TODO: 'function_update_todo()',
  },
  TRIGGER: {
    TODO: 'trigger_copy_todo',
    UPDATE_TODO: 'trigger_update_todo',
  },
};
