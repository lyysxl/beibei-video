<template>
  <div class="player">
    <div class="frame-title-bar">
      <div class="video-area">
        <div class="open-main">打开主界面</div>
        <div class="title-bar">{{ videoInfo.title || '贝贝视频' }}</div>
        <div class="control">xiazai</div>
      </div>
      <div class="frame-btn-area">
        <i>1</i>
        <i>1</i>
        <i>1</i>
      </div>
    </div>
    <div class="player-view">
      <div ref="playerRef"></div>
    </div>
    <div class="info-wrap">
      <ElScrollbar style="height: 100%">
        <div style="padding: 0 16px">
          <p>{{ videoInfo.title }}</p>
          <p>{{ videoInfo.remark }}</p>
          <h4>播放列表</h4>
          <ul class="play-list">
            <li
              class="play-item"
              :class="{ active: index === current }"
              v-for="(item, index) in list"
              @click="handlePlayNum(item, index)"
            >
              {{ index + 1 }}
            </li>
          </ul>
        </div>
      </ElScrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import Player, { Events } from 'xgplayer'
import 'xgplayer/dist/index.min.css'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const player: { value: Player | null } = {
  value: null
}
const videoInfo = ref<any>({})
const playerRef = ref<HTMLDivElement>()
const current = ref(0)
const list = ref<any[]>([1])

onMounted(() => {
  handleInit()
})

const handleInit = () => {
  const type: string = route.params.type as string
  const id: string = route.params.id as string
  type === 'movie' ? handleMovieLoad(id) : handleTVLoad(id)
}

const handleMovieLoad = (id: string) => {
  fetch('http://10.10.47.244:8080/movie/' + id)
    .then((res) => res.json())
    .then<any>((res) => {
      const url = `http://10.10.47.244/movie/${res.data.disk.replace(
        ':',
        '/'
      )}${res.data.file}`
      videoInfo.value = res.data
      document.title = res.data.title
      list.value = [1]
      handleXGPlayerInit(url)
    })
}
const handleTVLoad = (id: string) => {
  const req = [
    fetch('http://10.10.47.244:8080/tv/' + id),
    fetch('http://10.10.47.244:8080/tv_sub/findTvSubByTvId/' + id)
  ].map((r) => {
    return r.then((res) => res.json())
  })

  Promise.all(req).then<any>(([infoRes, listRes]) => {
    videoInfo.value = infoRes.data
    const urls = listRes.data.map((item: any) => ({
      src: `http://10.10.47.244/movie/${infoRes.data.disk.replace(':', '/')}${
        item.file
      }`
    }))
    console.log(urls)
    list.value = urls
    handleXGPlayerInit(urls)
  })
}

const handleXGPlayerInit = (urls: any) => {
  if (player.value) {
    player.value.switchURL(urls)
    return
  }
  player.value = new Player({
    el: playerRef.value,
    url: urls,
    height: '100%',
    width: '100%',
    autoplay: true
  })

  player.value.on(Events.TIME_UPDATE, (data) => {
    console.log(data)
  })
}

const handlePlayNum = (item: any, index: number) => {
  player.value?.switchURL(item.src)
  current.value = index
}

const handlePlayOther = (params: { type: string; id: string }) => {
  const { type, id } = params
  type === 'movie' ? handleMovieLoad(id) : handleTVLoad(id)
}

window.electronAPI.receiveMessageFromMain((message: any) => {
  console.log(message)
  handlePlayOther(message)
})

// window.handle = handlePlayOther
</script>

<style lang="less" scoped>
.player {
  position: fixed;
  inset: 0;
  background-color: #2e2e36;
}
.frame-title-bar {
  height: 45px;
  background-color: #2e2e36;
  color: #fff;
  display: flex;
  -webkit-app-region: drag;

  .video-area {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
  }

  .frame-btn-area {
    width: 300px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    i {
      height: 40px;
      width: 40px;
      line-height: 40px;
      margin-left: 8px;
    }
  }

  .title-bar {
    // align-self: center;
    overflow: hidden;
    /*文本不会换行*/
    white-space: nowrap;
    /*当文本溢出包含元素时，以省略号表示超出的文本*/
    text-overflow: ellipsis;
  }
}

.info-wrap {
  position: absolute;
  top: 45px;
  right: 0;
  bottom: 0;
  width: 300px;
  color: #fff;

  .play-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: -8px;
    margin-left: -8px;

    .play-item {
      font-size: 14px;
      width: 38px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      background-color: #202026;
      margin-top: 8px;
      margin-left: 8px;

      &.active {
        color: #ff5c38;
      }
    }
  }
}

.player-view {
  position: absolute;
  top: 45px;
  left: 0;
  bottom: 0;
  right: 300px;
}
</style>
