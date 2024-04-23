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

})
</script>

<template>
  <div>
    <div class="mt-24">
        <PostSearch></PostSearch>
    </div>
  </div>
</template>
