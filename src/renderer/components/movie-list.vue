<template>
  <ul class="movie-list">
    <li
      class="movie-item"
      v-for="movie in movieList"
      :key="movie.id"
      @click="handleToPlayer(movie)"
    >
      <div class="img">
        <img
          :src="
            'http://10.10.47.244/movie/' +
            movie.disk.replace(':', '/') +
            movie.image
          "
          :alt="movie.title"
        />
      </div>
      <div class="info">
        <div class="title">{{ movie.title }}</div>
        <div class="remark">{{ movie.remark.trim() }}</div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useElectron } from '../hooks/use-electron'
import { openPlayerFrame } from '../utils/electron'

const { isElectron } = useElectron()
const router = useRouter()
const handleToPlayer = (movie: any) => {
  const type = movie.image.split('/')[0]
  const url = `/player/${type}/${movie.id}`
  if (isElectron.value) {
    openPlayerFrame({ url, type, id: movie.id })
  } else {
    router.push(url)
  }
}

withDefaults(
  defineProps<{
    movieList: any[]
  }>(),
  {
    movieList: () => []
  }
)
</script>

<style lang="less" scoped>
.movie-list {
  display: flex;
  // justify-content: space-around;
  flex-wrap: wrap;
  margin-left: -16px;
}
.movie-item {
  color: #fff;
  width: calc(25% - 16px);
  box-sizing: border-box;
  padding: 8px;
  overflow: hidden;
  background-color: #2e2e36;
  margin-bottom: 16px;
  margin-left: 16px;
  border-radius: 5px;
}

.img {
  position: relative;
  border-radius: 3px;
  width: 100%;
  // min-height: 320px;
  // max-height: 500px;
  object-fit: contain;
  overflow: hidden;

  img {
    max-height: 500px;
    width: 100%;
    object-fit: cover;
  }
}

.title {
  color: #ededed;
  margin: 8px 0;
  overflow: hidden;
  /*文本不会换行*/
  white-space: nowrap;
  /*当文本溢出包含元素时，以省略号表示超出的文本*/
  text-overflow: ellipsis;
}

.remark {
  color: #626262;
  overflow: hidden;
  /*文本不会换行*/
  white-space: nowrap;
  /*当文本溢出包含元素时，以省略号表示超出的文本*/
  text-overflow: ellipsis;
}
</style>
