<script setup lang="js">
import axios from "axios"

import  {usePosts} from '~/stores/usePosts'

import {useWindowSize} from "@/composables/useWindowSize"
import {useInView} from "@/composables/useInView"
import {useScrollHandler} from "@/composables/useScrollHandler"
const posts = usePosts();
const html = useHTMLContent();
const imageList = ref([])

const slider = ref(null)

onMounted(async() => {

})
</script>

<template>
  <div>
      <div class="mt-24"></div>
         <SampleSliderGallery />
         <TemplateComponent/>
  
    
  </div>
</template>

