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

onMounted(async () => {


})

onUnmounted(() => {

})
const searching = ref(false)

async function handleSearch() {
  console.log("handling search")
  postContainer.value.enableLoader()
  posts.value = await wpPosts.search(searchInput.value, 3)

}

async function searchPosts() {
  console.log(searchInput.value)
  if (!searchInput.value) return
  posts.value = await wpPosts.search(searchInput.value, 2)
}

async function searchMore() {
  if (!searchInput.value || posts.value.length === 0) return
  console.log('searching more')
  const response = await wpPosts.searchMore();
  if (response.length === 0) postContainer.value.disableLoader();
  posts.value = [...posts.value, ...response]
}

</script>

<template>
  <div class=" ">
    <div class="flex justify-center w-full ">
      <div class="flex w-full lg:w-1/2 px-3">
        <div class="w-full">
          <input @keydown.enter="handleSearch" v-model="searchInput" type="text" class="w-full h-10 border-4" placeholder="Search..."/>
        </div>
        <div class="flex items-center ">
          <button @click="handleSearch" class="bg-blue-500 p-2  ">Search</button>
        </div>
      </div>

    </div>
    <div>
      <PostListContainerV1
          ref="postContainer"
          :posts="posts"
          @loader-in-view="searchMore"

      ></PostListContainerV1>
    </div>
  </div>

</template>

<style scoped>

</style>