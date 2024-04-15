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
    <div>

    </div>
</template>
