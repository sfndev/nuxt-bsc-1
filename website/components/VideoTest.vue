<script setup lang="js">
import axios from "axios";
import {useRoute } from "vue-router"
import {useRouter} from 'vue-router'
import { formatDistanceToNow } from 'date-fns';
import {useWindowSize} from "@/composables/useWindowSize";
import {useInView} from "@/composables/useInView";
import {useScrollHandler} from "@/composables/useScrollHandler"
import { useHTMLContent }  from '~/composables/useHTMLContent'
import  {usePosts} from '~/stores/usePosts'

const props = defineProps({

})

const emit = defineEmits([])

defineExpose({

})

const route = useRoute();
const router = useRouter();
const {smallWindow, mediumWindow, largeWindow} = useWindowSize();
const scroll = useScrollHandler();

const wpPosts = usePosts();
const html = useHTMLContent();

//

const post = ref()

onMounted(async()=>{
    const response = await wpPosts.getPost({slug:"video-test",category:"galeries"})
    console.log(response)
    post.value = response
})

onUnmounted(() => {

})




</script>
<template>

    <div v-if="post"  >
    
    </div>
</template>