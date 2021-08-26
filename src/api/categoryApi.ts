import Category from '../interfaces/ICategory';

import client from './client';

class CategoryApi {
  public async getCategories(): Promise<Category[]> {
    return client.get('/categories');
  }
}

export default new CategoryApi();
