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
import PreviewV2 from "~/components/Post/PreviewV2.vue";

const props = defineProps({
  posts: Object
})

const emit = defineEmits(["loader-in-view", "loader-not-in-view"])

defineExpose({
  removeLoader
})

const utils = useUtils();
const route = useRoute();
const router = useRouter();
const {smallWindow, mediumWindow, largeWindow} = useWindowSize();
const scroll = useScrollHandler();


const wpPosts = useWpPosts();
const html = useHTMLContent();

//

const loader = ref(null)
const loaderVisible = ref(true);
onMounted(() => {
  nextTick(() => {
    useInView(loader.value, () => {
      emit("loader-in-view")
    })
    useNotInView(loader.value, () => {
      emit("loader-not-in-view")
    })
  })
})

onUnmounted(() => {

})

function removeLoader() {
  loaderVisible.value = false;
}

</script>

<template>
  <div class="flex flex-col space-y-4 px-6   justify-center items-center  border-black w-full  pt-0">
    <PreviewV2 v-if="posts" v-for="post in posts" :post="post" class=" "></PreviewV2>
    <div v-if="loaderVisible" ref="loader" class="flex justify-center h-12">
      <GadgetsLoader/>
    </div>
  </div>
</template>
<style scoped>


</style>