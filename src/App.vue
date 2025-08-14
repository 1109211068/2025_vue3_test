<script setup>
import { ref, onMounted, computed } from 'vue'
import FavList from './components/FavList.vue'
// 任務1. 引入FavList組件到App.vue的aside中 ✓
// 任務8. 使用pinia加入收藏
import { useFavoritesStore } from '@/stores/favorites'
const favoritesStore = useFavoritesStore()

// 任務2. 顯示專輯資料 ✓
// 目前畫面中僅呈現defaultData
// 請將資料替換成`public/albums.json`中的專輯資料
const albums = ref([])
const defaultData = {
  "id": 1,
  "images": "https://i.scdn.co/image/ab67616d00001e023e59f3e73b99ed248ab7bae2",
  "name": "Day & Night (feat. Jay Park)",
  "artists": "Lee Young Ji"
}

onMounted(async () => {
  try {
    // 從 public/albums.json 載入專輯資料
    const response = await fetch('/albums.json')
    const data = await response.json()
    albums.value = data
  } catch (error) {
    console.error('載入專輯資料失敗:', error)
    // 如果載入失敗，使用預設資料
    albums.value = [defaultData]
  }
})

// 任務3:開啟關閉側拉選單(收藏列表) ✓
const asideToggle = ref(false)
const toggleAside = () => {
  asideToggle.value = !asideToggle.value
}

// 任務4.專輯資料可以被input搜尋 ✓
const search = ref('')

// 計算過濾後的專輯列表
const filteredAlbums = computed(() => {
  if (!search.value.trim()) {
    return albums.value
  }
  const searchTerm = search.value.toLowerCase()
  return albums.value.filter(album => 
    album.name.toLowerCase().includes(searchTerm) ||
    album.artists.toLowerCase().includes(searchTerm)
  )
})

// 任務5.加入我的收藏 ✓
const addFav = (item) => {
  console.log(item)
  if (favoritesStore.isFavorite(item.id)) {
    favoritesStore.removeFavorite(item.id)
  } else {
    favoritesStore.addFavorite(item)
  }
}

// 檢查是否已收藏
const isFavorited = (id) => {
  return favoritesStore.isFavorite(id)
}
</script>

<template>
<div class="flex min-h-screen">
<!-- 側邊欄：專輯列表 -->
<aside class="w-1/4 p-4 bg-gray-100">
<h2 class="text-xl font-bold mb-4">專輯列表</h2>
<ul>
<li
v-for="album in filteredAlbums"
:key="album.id"
class="mb-2 border-b border-gray-300 pb-1"
>
{{ album.name }} - {{ album.artists }}
</li>
</ul>
</aside>
</div>

<header>
<div>
<!-- 任務4: 透過 input 搜尋 -->
<input 
  type="search" 
  v-model="search" 
  placeholder="搜尋專輯或歌手..." 
/>
<!-- 任務3: 顯示、關閉收藏組件 -->
<button @click="toggleAside">
<img src="~@/assets/heartRed.png" alt="收藏列表" />
<span class="fav-count">{{ favoritesStore.favorites.length }}</span>
</button>
</div>
</header>

<main>
<!-- 任務2: 顯示專輯列表 -->
<div 
  v-for="album in filteredAlbums" 
  :key="album.id" 
  class="card"
>
<img :src="album.images" :alt="album.name" />
<div class="card_body">
<h6>{{ album.name }}</h6>
<p>{{ album.artists }}</p>
</div>
<div class="card_footer">
<!-- 任務5: 將專輯加入收藏 -->
<button 
  class="favoriteBtn" 
  :class="{ favorited: isFavorited(album.id) }"
  @click="addFav(album)"
>
  {{ isFavorited(album.id) ? '❤️' : '🤍' }}
</button>
</div>
</div>
</main>

<!-- 任務1: 收藏清單側拉選單 -->
<aside :class="{ open: asideToggle }">
<!-- 任務6: FavList 組件 -->
<FavList @close="asideToggle = false" />
</aside>
</template>

<style lang="scss">
button{
width: 2rem;
height: 2rem;
border-radius: 2rem;
padding: 0.2rem;
position: relative;
img{
width: 100%;
}
}

.fav-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
}
</style>

<style lang="scss" scoped>
header {
position: fixed;
width: 100%;
z-index: 2;
background-color: #f9f9f9;
>div{
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
max-width: 57rem;
margin: auto;
padding: 0.5rem;
box-sizing: border-box;

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  flex: 1;
  margin-right: 0.5rem;
}
}
}

main {
width: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-evenly;
gap: 0.5rem;
max-width: 57rem;
margin: 3rem auto;
padding: 0.5rem;
box-sizing: border-box;
}

aside {
width: 20rem;
height: 100vh;
position: fixed;
overflow: hidden;
overflow-y: scroll;
z-index: 1;
top: 0;
right: -20rem;
background-color: #2a2a2b;
color: #f9f9f9;
box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
transition: right 1s;
&.open {
right: 0;
}
}

.card {
width: 12rem;
padding: 0.75rem;
border-radius: 0.5rem;
background-color: #1a1a1a;
color: #f9f9f9;
&_body {
height: 3.5rem;
}
&_footer {
text-align: right;
.favoriteBtn {
background-color: #f9f9f9;
filter: sepia(0);
&:hover {
filter: sepia(1);
}
&.favorited {
background-color: #ffebee;
filter: sepia(1);
}
}
}

img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 0.25rem;
}
}
</style>