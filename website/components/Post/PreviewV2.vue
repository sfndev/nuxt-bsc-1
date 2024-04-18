<script setup lang="js">
import axios from "axios";
import {useRoute} from "vue-router"
import {useRouter} from 'vue-router'
import {formatDistanceToNow} from 'date-fns';
import {useWindowSize} from "@/composables/useWindowSize";
import {useInView} from "@/composables/useInView";
import {useScrollHandler} from "@/composables/useScrollHandler"
import {useHTMLContent} from '~/composables/useHTMLContent'
import {useWpPosts} from '~/stores/useWpPosts'


const route = useRoute();
const router = useRouter();
const {smallWindow, mediumWindow, largeWindow} = useWindowSize();
const scroll = useScrollHandler();

const wpPosts = useWpPosts();
const html = useHTMLContent();

const props = defineProps({
  post: Object
});


const post = props.post;
onBeforeMount(() => {

})

onMounted(() => {
})

const formattedDate = computed(() => {
  return formatDistanceToNow(new Date(props.post.date), {addSuffix: true});
});


function toPost() {
  router.push(`/posts/${props.post.slug}`);
}
</script>
<template>


  <div class="min-h-1 flex flex-wrap justify-center items-center p-2 border  bg-amber-950 lg:w-2/3 ">
    <div class=" flex flex-grow justify-center items-center lg:w-1/3 w-full  min-w-[180px] image-ratio  border-4 bg-red-800">
      <img :src="post.featured_image" class="w-full h-full  object-cover " alt="">
    </div>
    <div class=" flex-col flex-grow  lg:w-2/3   w-full  min-w-[180px]  border-4 bg-blue-400 ">
      <div>
        <h1 class="text-3xl font-semibold text-gray-800 mb-3">
          {{ post.title.length > 50 ? `${post.title.slice(1, 51)}...` : post.title }}</h1>
      </div>
      <div class="text-gray-700 text-base  mb-4 break-words">

        {{ html.extractAll(post.excerpt, 'p')[0].replace("[&hellip;]", "").slice(1, 201) }}
        <span @click="toPost" class="hover:font-bold transition-all duration-200 cursor-pointer">...</span>

      </div>
      <div class="flex justify-between items-center">
        <span @click="toPost" class="text-sm text-gray-600 hover:underline">{{ formattedDate }}</span>
        <button @click="toPost"
                class="px-4 py-2 bg-blue-500 text-white font-semibold text-xs rounded hover:bg-blue-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Read more
        </button>
      </div>
    </div>

  </div>


</template>

<style scoped>
.image-ratio {
  aspect-ratio: 10 / 10;
}
.container-ratio{
  aspect-ratio: 20 / 10;
}
.image-container {
}

.title-container {
}
</style>
