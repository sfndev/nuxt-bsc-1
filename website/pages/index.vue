<script setup lang="js">
import axios from "axios"

import { useWpPosts } from '~/stores/useWpPosts'

import { useWindowSize } from "@/composables/useWindowSize"
import { useInView } from "@/composables/useInView"
import { useScrollHandler } from "@/composables/useScrollHandler"
const wpPosts = useWpPosts();
const html = useHTMLContent();
const imageList = ref([])

const slider = ref(null)

const posts = ref([])

onMounted(async () => {
  posts.value = await wpPosts.get("concerts",9)
  console.log(posts.value.length)
})
</script>

<template>
  <div>
    <div class="mt-24">
<!--          <PostListContainerV2 :posts="posts" />-->
        <PostSearch></PostSearch>
    </div>
  </div>
</template>
