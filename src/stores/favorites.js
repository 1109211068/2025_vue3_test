// src/stores/favorites.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 任務8: 使用pinia加入收藏
export const useFavoritesStore = defineStore('favorites', () => {
  // 狀態：收藏的專輯列表
  const favorites = ref([])

  // Getters：計算屬性
  const favoriteCount = computed(() => favorites.value.length)
  
  // 檢查指定ID的專輯是否已收藏
  const isFavorite = computed(() => {
    return (albumId) => favorites.value.some(album => album.id === albumId)
  })

  // Actions：操作方法
  
  // 添加到收藏
  const addFavorite = (album) => {
    // 檢查是否已經收藏，避免重複添加
    if (!favorites.value.some(fav => fav.id === album.id)) {
      favorites.value.push({ ...album })
      console.log(`已將 "${album.name}" 加入收藏`)
    }
  }

  // 從收藏中移除
  const removeFavorite = (albumId) => {
    const index = favorites.value.findIndex(album => album.id === albumId)
    if (index > -1) {
      const removedAlbum = favorites.value.splice(index, 1)[0]
      console.log(`已將 "${removedAlbum.name}" 從收藏中移除`)
    }
  }

  // 切換收藏狀態
  const toggleFavorite = (album) => {
    if (isFavorite.value(album.id)) {
      removeFavorite(album.id)
    } else {
      addFavorite(album)
    }
  }

  // 清空所有收藏
  const clearFavorites = () => {
    favorites.value = []
    console.log('已清空所有收藏')
  }

  // 根據關鍵字搜尋收藏中的專輯
  const searchFavorites = (searchTerm) => {
    if (!searchTerm.trim()) return favorites.value
    
    const term = searchTerm.toLowerCase()
    return favorites.value.filter(album => 
      album.name.toLowerCase().includes(term) ||
      album.artists.toLowerCase().includes(term)
    )
  }

  // 獲取收藏列表（按添加時間排序，最新的在前面）
  const getFavoritesSorted = computed(() => {
    return [...favorites.value].reverse()
  })

  return {
    // 狀態
    favorites,
    
    // Getters
    favoriteCount,
    isFavorite,
    getFavoritesSorted,
    
    // Actions
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
    searchFavorites
  }
})

// 持久化收藏數據的版本（可選）
export const usePersistentFavoritesStore = defineStore('persistent-favorites', () => {
  const favorites = ref([])

  // 從 localStorage 載入收藏
  const loadFavorites = () => {
    try {
      const saved = localStorage.getItem('album-favorites')
      if (saved) {
        favorites.value = JSON.parse(saved)
      }
    } catch (error) {
      console.error('載入收藏資料失敗:', error)
    }
  }

  // 儲存收藏到 localStorage
  const saveFavorites = () => {
    try {
      localStorage.setItem('album-favorites', JSON.stringify(favorites.value))
    } catch (error) {
      console.error('儲存收藏資料失敗:', error)
    }
  }

  const favoriteCount = computed(() => favorites.value.length)
  
  const isFavorite = computed(() => {
    return (albumId) => favorites.value.some(album => album.id === albumId)
  })

  const addFavorite = (album) => {
    if (!favorites.value.some(fav => fav.id === album.id)) {
      favorites.value.push({ ...album })
      saveFavorites()
    }
  }

  const removeFavorite = (albumId) => {
    const index = favorites.value.findIndex(album => album.id === albumId)
    if (index > -1) {
      favorites.value.splice(index, 1)
      saveFavorites()
    }
  }

  const toggleFavorite = (album) => {
    if (isFavorite.value(album.id)) {
      removeFavorite(album.id)
    } else {
      addFavorite(album)
    }
  }

  const clearFavorites = () => {
    favorites.value = []
    saveFavorites()
  }

  // 初始化時載入資料
  loadFavorites()

  return {
    favorites,
    favoriteCount,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
    loadFavorites,
    saveFavorites
  }
})