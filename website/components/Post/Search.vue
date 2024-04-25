<script setup lang="js">
import axios from "axios";
import {useRoute} from "vue-router"
import {useRouter} from 'vue-router'
import {formatDistanceToNow} from 'date-fns';
import {useWindowSize} from "@/composables/useWindowSize";
import {useInView, useNotInView} from "@/composables/useInView";
import {useScrollHandler} from "@/composables/useScrollHandler"
import {useHTMLContent} from '~/composables/useHTMLContent'
import {useWpPosts} from '~/stores/useWpPosts'
import {useUtils} from '@/composables/useUtils'

const props = defineProps({})

const emit = defineEmits([])

defineExpose({})

const utils = useUtils();
const route = useRoute();
const router = useRouter();
const {smallWindow, mediumWindow, largeWindow} = useWindowSize();
const scroll = useScrollHandler();


const wpPosts = useWpPosts();
const html = useHTMLContent();

//
const postContainer = ref(null)

const posts = ref([])
const searchInput = ref("")

const loader = ref(null);
const loaderVisible = ref(true);
const loaderInView = ref(false);

onMounted(async () => {
  await nextTick(() => {
    enableLazyLoad()
  })

})

onUnmounted(() => {

})
const searching = ref(false)

// async function handleSearch() {
//   console.log("handling search")
//   posts.value = await wpPosts.search(searchInput.value, 3)
//
// }

async function searchPosts() {
  posts.value = await wpPosts.search(searchInput.value, 2)
  loaderVisible.value = true;
  await searchMore()
}

async function searchMore() {
  if (posts.value.length < 1) {return}
  console.log('searching more')

  let response = await wpPosts.searchMore();
  posts.value = [...posts.value, ...response]
  let hasMore = response.length > 0;
  while(hasMore && loaderInView.value) {
    response = await wpPosts.searchMore();
    posts.value = [...posts.value, ...response];
    hasMore = response.length > 0;
    if (!loaderInView.value){
      break;
    }
  }

}

async function enableLazyLoad(){
  useInView(loader.value, async ()=>{
    loaderInView.value = true
    console.log("loader in view")
    await searchMore();
  })
  useNotInView(loader.value,()=>{
      loaderInView.value = false
    console.log("loader not in view")
  })
}

</script>

<template>
  <div class=" ">
    <div class="flex justify-center w-full ">
      <div class="flex w-full lg:w-1/2 px-3">
        <div class="w-full">
          <input @keydown.enter="searchPosts" v-model="searchInput" type="text" class="w-full h-10 border-4" placeholder="Search..."/>
        </div>
        <div class="flex items-center ">
          <button @click="searchPosts" class="bg-blue-500 p-2  ">Search</button>
        </div>
      </div>

    </div>
    <div>
      <PostListContainerV1
          ref="postContainer"
          :posts="posts"
      ></PostListContainerV1>
          <div ref="loader" class="flex justify-center  w-[100vw] ">
            <GadgetsLoader v-if="loaderVisible"   />
          </div>
    </div>
  </div>

</template>

<style scoped>

</style>