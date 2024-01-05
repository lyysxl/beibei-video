<template>
  <LayoutMain>
    <div class="home">
      <ElScrollbar style="height: 100%;">
        <!-- <div class="banner">
          <img src="http://10.10.47.244/movie/static/media/Avengers.1c5f54b72d93604594d5.png" style="width: ;" alt="">
        </div> -->
        <div class="movie-bar">
          <span>电视剧</span>
        </div>
        <MovieList :movieList="tvList" />
        <div class="movie-bar">
          <span>最新电影</span>
        </div>
        <MovieList :movieList="newList" />
        <div class="movie-bar">
          <span>热播电影</span>
        </div>
        <MovieList :movieList="hotList" />
        <div class="movie-bar">
          <span>推荐电视</span>
        </div>
        <MovieList :movieList="movieList" />
      </ElScrollbar>
    </div>
  </LayoutMain>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import LayoutMain from '@/layouts/layout-main.vue'
import MovieList from '@/components/movie-list.vue'

import { ElScrollbar } from 'element-plus'

const movieList = ref<any[]>([])
const tvList = ref<any[]>([])
const newList = ref<any[]>([])
const hotList = ref<any[]>([])

onMounted(() => {
  fetch('http://10.10.47.244:8080/tv/page?current=1&size=4')
    .then<any>((res) => res.json())
    .then((res) => {
      console.log(res.data.records)
      tvList.value = res.data.records
    })

  fetch('http://10.10.47.244:8080/movie/page?current=1&size=4&sort=2')
    .then<any>((res) => res.json())
    .then((res) => {
      console.log(res.data.records)
      hotList.value = res.data.records
    })

  fetch('http://10.10.47.244:8080/movie/page?current=1&size=4&recommended=true')
    .then<any>((res) => res.json())
    .then((res) => {
      console.log(res.data.records)
      movieList.value = res.data.records
    })

  fetch('http://10.10.47.244:8080/movie/page?current=1&size=4&sort=1')
    .then<any>((res) => res.json())
    .then((res) => {
      console.log(res.data.records)
      newList.value = res.data.records
    })
})
</script>

<style lang="less" scoped>
.home {
  position: relative;
  height: 100%;
}
.banner {
  transform: translate(-160px, -60px);
}

.movie-bar {
  margin: 16px 0;

  span {
    color: #fff;
    font-size: 22px;
  }
}
</style>
