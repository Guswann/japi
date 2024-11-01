<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>


<script>

// import Categories from './components/Categories.vue';
import navbar from './components/navbar.vue';

export default {
  components:{
    navbar
  }
}
</script>