<template>
  <LayoutMain>
    <ElScrollbar style="height: 100%">
      <div class="home">
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
      </div>
    </ElScrollbar>
  </LayoutMain>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import LayoutMain from '@/layouts/layout-main.vue'
import MovieList from '@/components/movie-list.vue'

import { getMovieList, getTVList } from '@/api'

const movieList = ref<any[]>([])
const tvList = ref<any[]>([])
const newList = ref<any[]>([])
const hotList = ref<any[]>([])

onMounted(() => {
  getPageData()
})

const getPageData = () => {
  getTVList({
    current: 1,
    size: 12
  }).then((res) => {
    tvList.value = res.data.records
  })

  getMovieList({
    current: 1,
    size: 4,
    sort: 2
  }).then((res) => {
    hotList.value = res.data.records
  })

  getMovieList({
    current: 1,
    size: 4,
    sort: 2,
    recommended: true
  }).then((res) => {
    movieList.value = res.data.records
  })

  getMovieList({
    current: 1,
    size: 4,
    sort: 1
  }).then((res) => {
    newList.value = res.data.records
  })
}
</script>

<style lang="less" scoped>
.home {
  padding: 0 40px;
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

.fixed {
  position: sticky;
  top: 20px;
}
</style>
