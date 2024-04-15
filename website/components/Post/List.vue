<script setup lang="js">
import axios from "axios"
import { useSlideInMenu } from '~/stores/useSlideInMenu'
import  {usePosts} from '~/stores/usePosts'
import { onMounted, nextTick } from 'vue';
import {useWindowSize} from "@/composables/useWindowSize"
import {useInView, useNotInView} from "@/composables/useInView"
import {useScrollHandler} from "@/composables/useScrollHandler"

const props = defineProps({
    category:""
})

const {largeWindow,mediumWindow,smallWindow} = useWindowSize();
const {create } = useScrollHandler();
const posts = usePosts();

const postList = ref([])

const loader = ref(null);
const loaderInView = ref(true);
const hasMore = ref(true)

async function getPosts(){
  const response= await posts.get(props.category)
  postList.value = response
  hasMore.value = [...response].length > 0
}

async function load(){

  const response = await posts.nextPage()
  postList.value = [...postList.value, ...response]
  hasMore.value = [...response].length > 0
  return [...response];
}

onMounted(async() => {
 await getPosts()
  
nextTick(() =>{
 useInView(loader.value,async() =>{

    loaderInView.value = true;
    let loaded = await load();
    hasMore.value = loaded.length > 0
    while(loaderInView.value && hasMore.value){
     loaded = await load()
     hasMore.value = loaded.length > 0

    }

 })
 useNotInView(loader.value,()=>{
  loaderInView.value = false;
 })
})

})

</script>
<template>

  <div v-if="postList" class="">
    <div class="thumbnail-grid">
      <div v-for="post in postList" :key="post.title">
            <PostPreview :post="post" class=""/>
      </div>
    </div>

    <div v-if="hasMore" ref="loader" class="flex justify-center h-12">
      <GadgetsLoader/>
    </div>
  </div>

</template>
<style scoped>
  .thumbnail-grid{
    @apply grid 
    grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3
    px-8 sm:px-8 md:px-12 
    gap-12 my-4  
  }
</style>
