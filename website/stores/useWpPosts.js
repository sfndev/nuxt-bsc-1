import { defineStore } from 'pinia';
import axios from 'axios';

const SITE_NAME = "groovediggers3"
const BASE_URL = `https://public-api.wordpress.com/rest/v1.1/sites/${SITE_NAME}.wordpress.com`

export const useWpPosts = defineStore('posts', {
  state: () => ({
    categories: []
  }),

  actions: {
    async fetch(categoryName = "", page = 1) {
      const category = this.categories.find(c => c.name === categoryName);
      if (!category) {
        this.categories.push({
          name: categoryName,
          posts: [],
          currentPage: 1,
          perPage: 3
        });
      }

      try {
        const response = await axios.get(`${BASE_URL}/posts`, {
          params: {
            category: categoryName,
            page: page,
            number: category ? category.perPage : 3,
          },
        });

        if (category) {
          category.posts = response.data.posts.map(post => post);
          category.currentPage = page;
        }

        return category ? category.posts : [];
      } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
      }
    },

    async nextPage(categoryName) {
      const category = this.categories.find(c => c.name === categoryName);
      if (category) {
        category.currentPage += 1;
        return await this.fetch(categoryName, category.currentPage);
      }
    },

    async previousPage(categoryName) {
      const category = this.categories.find(c => c.name === categoryName);
      if (category && category.currentPage > 1) {
        category.currentPage -= 1;
        return await this.fetch(categoryName, category.currentPage);
      }
      return category ? category.posts : [];
    },

    async get(categoryName) {
      const category = this.categories.find(c => c.name === categoryName);
      if (!category) {
        this.categories.push({
          name: categoryName,
          posts: [],
          currentPage: 1,
          perPage: 3
        });
      }
      return await this.fetch(categoryName);
    },

    async getPost({category = null, id = null, slug = null, title = null}) {
      if (!id && !slug && !title) {
        return null;
      }

      const found = this.findPost({category, id, slug, title});
      if (found) {
        console.log("found")
        return found;
      }
      console.log("not found and fetching")

      if (slug) {
        try {
          const response = await axios.get(`${BASE_URL}/posts/slug:${slug}`);
          return response.data;
        } catch (error) {
          return error;
        }
      } else {
        throw new Error("No slug");
      }
    },

    findPost({ id = null, slug = null, title = null, category = null }) {
      const searchInCategory = (cat) => {
        return cat.posts.find(post =>
            (id && post.id === id) ||
            (slug && post.slug === slug) ||
            (title && post.title === title)
        );
      };
      if (category) {
        const categoryData = this.categories.find(c => c.name === category);
        if (!categoryData) {
          return null;
        }
        return searchInCategory(categoryData);
      } else {

        for (let cat of this.categories) {
          const foundPost = searchInCategory(cat);
          if (foundPost) {
            return foundPost;
          }
        }
        return null; // No post found in any category
      }
    }
  }
});
