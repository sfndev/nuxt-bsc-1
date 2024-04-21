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
  const response = await wpPosts.search("prod 18",5)
  posts.value = response;
})
</script>

<template>
  <div>
    <div class="mt-24">
      <div v-for="post in posts" :key="post.ID">
          {{post.title}}
      </div>
<!--      <SampleSliderGallery category="galleries" slug="my-test-post"/>-->
    </div>
  </div>
</template>
