<template>
  <div class="tag-list">
    <div class="row">
      <div class="all" :class="{ active: checkedId < 0 }">
        <span @click="handleAllClick">全部</span>
      </div>
      <ul class="list">
        <li
          class="item"
          :class="{ active: checkedId === tag.id }"
          v-for="tag in tagList"
          :key="tag.id"
          @click="handleTagClick(tag)"
        >
          {{ tag.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    tagList: any[]
  }>(),
  {
    tagList: () => []
  }
)

const emit = defineEmits(['tag-change'])

const checkedId = ref(-1)

const handleAllClick = () => {
  checkedId.value = -1
  emit('tag-change', { id: null })
}

const handleTagClick = (tag: any) => {
  checkedId.value = tag.id
  emit('tag-change', tag)
}
</script>

<style lang="less" scoped>
.row {
  font-size: 14px;
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  align-items: center;

  .all {
    width: 60px;
    // padding: 0 10px;
    text-align: justify;
    text-align-last: justify;
    color: #626262;

    &:hover,
    &.active {
      color: #ff5c38;
    }
  }

  .list {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    margin-bottom: -8px;
    // margin-left: -8px;
    margin-left: 20px;

    .item {
      margin-left: 8px;
      margin-bottom: 8px;
      color: #626262;

      &:hover,
      &.active {
        color: #ff5c38;
      }
    }
  }
}
</style>
