import auth from './auth_schema.json';
import blogCategory from './blog_category_schema.json';
import response from './response_schema.json';
import todo from './todo_schema.json';

const schemas = Object.assign(auth, blogCategory, todo, response);
export default schemas;
