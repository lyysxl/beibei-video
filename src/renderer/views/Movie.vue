<template>
  <div>
    <LayoutMain>
      <ElScrollbar style="height: 100%">
        <div class="movie">
          <el-row>
            <el-col>
              <el-input
                v-model="params.title"
                placeholder="请输入搜索内容"
                @keydown.{Enter}="handleSearchClick"
              >
                <template #append>
                  <el-button @click="handleSearchClick">搜索</el-button>
                </template>
              </el-input>
            </el-col>
            <el-col>
              <TagCheckedList
                :tagList="tagList"
                @tag-change="handleTagChange"
              />
            </el-col>
          </el-row>
          <MovieList :movieList="movieList" />
        </div>
      </ElScrollbar>
    </LayoutMain>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { getMovieTag, getMovieList } from '@/api'
import LayoutMain from '@/layouts/layout-main.vue'
import MovieList from '@/components/movie-list.vue'
import TagCheckedList from '@/components/tag-checked-list.vue'

const params = ref({
  current: 1,
  size: 12,
  title: '',
  categoryId: null
})

const movieList = ref<object[]>()
const tagList = ref<object[]>()

const handleSearchClick = () => {
  params.value.current = 1
  _getMovieList()
}

const handleTagChange = (tag: any) => {
  params.value.categoryId = tag.id
  params.value.current = 1
  _getMovieList()
}

const _getMovieList = () => {
  getMovieList(params.value).then((res) => {
    movieList.value = res.data.records
    params.value.current++
  })
}

onMounted(() => {
  _getMovieList()
  getMovieTag().then((res) => {
    tagList.value = res.data
  })
})
</script>

<style lang="less" scoped>
.movie {
  padding: 0 40px;
}
</style>
