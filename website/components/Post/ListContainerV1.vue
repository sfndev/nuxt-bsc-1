<script setup lang="js">
import axios from "axios";
import { useRoute } from "vue-router"
import { useRouter } from 'vue-router'
import { formatDistanceToNow } from 'date-fns';
import { useWindowSize } from "@/composables/useWindowSize";
import { useInView } from "@/composables/useInView";
import { useScrollHandler } from "@/composables/useScrollHandler"
import { useHTMLContent } from '~/composables/useHTMLContent'
import { useWpPosts } from '~/stores/useWpPosts'
import { useUtils } from '@/composables/useUtils'

const props = defineProps({
  post:Object
})

const emit = defineEmits([])

defineExpose({

})

const utils = useUtils();
const route = useRoute();
const router = useRouter();
const { smallWindow, mediumWindow, largeWindow } = useWindowSize();
const scroll = useScrollHandler();


const wpPosts = useWpPosts();
const html = useHTMLContent();

//

onMounted(() => {

})

onUnmounted(() => {

})


</script>

<template>
  <div class=" w-full ">
    <div class="thumbnail-grid">
      <slot></slot>
    </div>
    <div ref="loader" class="flex justify-center w-[100vw] h-12">
      <GadgetsLoader />
    </div>
  </div>
</template>

<style scoped>
.thumbnail-grid {
  @apply grid grid-cols-1
  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3
  px-8 sm:px-8 md:px-12
  gap-12 my-4
}
</style>