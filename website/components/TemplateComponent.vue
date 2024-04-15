<script setup lang="js">
import axios from "axios";
import { useRoute } from "vue-router"
import { useRouter } from 'vue-router'
import { formatDistanceToNow } from 'date-fns';
import { useWindowSize } from "@/composables/useWindowSize";
import { useInView } from "@/composables/useInView";
import { useScrollHandler } from "@/composables/useScrollHandler"
import { useHTMLContent } from '~/composables/useHTMLContent'
import { usePosts } from '~/stores/usePosts'
import { useUtils } from '@/composables/useUtils'

const props = defineProps({

})

const emit = defineEmits([])

defineExpose({

})

const utils = useUtils();
const route = useRoute();
const router = useRouter();
const { smallWindow, mediumWindow, largeWindow } = useWindowSize();
const scroll = useScrollHandler();


const wpPosts = usePosts();
const html = useHTMLContent();

//

onMounted(() => {

})

onUnmounted(() => {

})




</script>
<template>
    <div class="  min-h-72 flex justify-center items-center px-2 py-12 border">
        <div class="flex flex-wrap justify-evenly items-center gap-4 h-4/5 w-full ">
            <div class="flex flex-grow h-36 min-w-[400px] border-4 ">

            </div>
            <div class="flex flex-grow h-36 min-w-[400px] border-4 ">

            </div>
            <div class="flex flex-grow h-36 min-w-[400px] border-4 ">

            </div>
        </div>
    </div>
</template>