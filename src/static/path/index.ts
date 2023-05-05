import auth from './auth_path.json';
import blogCategory from './blog_category_path.json';
import todo from './todo_path.json';

const paths = Object.assign(auth, blogCategory, todo);
export default paths;
