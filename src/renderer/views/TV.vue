<template>
  <div class="about">
    <LayoutMain>
      <ElScrollbar style="height: 100%">
        <div class="tv">
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
        </div> </ElScrollbar
    ></LayoutMain>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import { getTVList, getTvTag } from '@/api'
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
  _getTVList()
}

const handleTagChange = (tag: any) => {
  params.value.categoryId = tag.id
  params.value.current = 1
  _getTVList()
}

const _getTVList = () => {
  getTVList(params.value).then((res) => {
    movieList.value = res.data.records
    params.value.current++
  })
}

onMounted(() => {
  _getTVList()
  getTvTag().then((res) => {
    tagList.value = res.data
  })
})
</script>

<style lang="less" scoped>
.tv {
  padding: 0 40px;
}
</style>
