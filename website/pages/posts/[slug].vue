<script setup lang="js">
import axios from "axios"
import {useRoute } from "vue-router"
import { useWpPosts } from '~/stores/useWpPosts'
import { useHTMLContent }  from '~/composables/useHTMLContent'
const route = useRoute();
const slug = ref(null)
const wpPosts = useWpPosts();
const post = ref(null);
const heading = ref(null)

const html = useHTMLContent();

onMounted(async() =>{
    const rawPosts = toRaw(wpPosts.posts)
    post.value = rawPosts.find((post) => post.slug === route.params.slug)
    if(!post.value){
    await wpPosts.get("concerts")
    slug.value = route.params.slug
    post.value = await wpPosts.getPost({category:'concerts',slug:slug.value})
    }
})

</script>
<template>

<div v-if="post">
 <PostContent :post="post"/>
</div>
   
</template>
