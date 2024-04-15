import { defineStore } from 'pinia';
import axios from 'axios';

const BASE_URL = "https://public-api.wordpress.com/rest/v1.1/sites/groovediggers3.wordpress.com"




export const usePosts = defineStore('posts', {
  state: () => ({
    posts: [],
    category: '',
    currentPage: 1,
    perPage: 3
  }),
  actions: {
    async fetch(category = this.category, page = this.currentPage) {
      try {
        const response = await axios.get(`${BASE_URL}/posts`, {
          params: {
            category: category,
            page: page,
            number: this.perPage,
          },
        });

        this.posts = response.data.posts.map(post => (post));

        this.category = category;
        this.currentPage = page;

        return this.posts;
      } catch (error) {
        console.error('Error fetching posts:', error);
        return []; 
      }
    },
    async nextPage() {
      this.currentPage += 1;
      return await this.fetch();
    },
    async previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        return await this.fetch();
      }
      return this.posts;
    },
    async get(category) {
      this.category = category;
      this.currentPage = 1; 
      return await this.fetch();
    },
 
    async getPost({category=null,id=null,slug=null,title=null}){
      if(!category){
        throw new Error("post category not set");
      }
      if(slug){
       
        try {
          const response = await axios.get(`${BASE_URL}/posts/slug:${slug}`,{})
          return response.data

        } catch (error) {
          return error
        }
      }
     
    }
  },
  

});
