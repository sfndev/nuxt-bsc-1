<script setup lang="js">
import {useRouter } from 'vue-router'
import { useSlideInMenu } from '../../stores/useSlideInMenu';
import {useWindowSize} from "@/composables/useWindowSize"

const {largeWindow, mediumWindow, smallWindow} = useWindowSize();
const router = useRouter();

const mobileMenu = ref(null)




</script>

<template>

<div class="min-w-[400px] border-6 border-black">
  <div class="flex justify-start gap-56 px-2 items-end bg-black h-16 ">
    <div @mousedown="router.push('/')" class="logo flex justify-center items-center h-full   cursor-pointer" >
        <img class="max-h-full " src="@/assets/images/images.png" alt="">
    </div>
    <div v-if="largeWindow" class="flex justify-center items-end h-full w-full">
      <HeaderNavLinks class="text-white text-3xl max-w-2x w-full " />
    </div>   
  </div>



   <HeaderMobileMenu ref="mobileMenu" v-if="!largeWindow" />
   </div>

</template>
