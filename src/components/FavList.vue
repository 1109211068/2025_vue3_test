<template>
  <div class="fav-list">
    <!-- 任務7: 顯示收藏列表和無列表的UI -->
    <div class="fav-header">
      <h2>我的收藏</h2>
      <button @click="$emit('close')" class="close-btn">
        ✕
      </button>
    </div>
    
    <div class="fav-content">
      <!-- 有收藏時顯示列表 -->
      <div v-if="favoritesStore.favorites.length > 0" class="fav-items">
        <div 
          v-for="album in favoritesStore.favorites" 
          :key="album.id"
          class="fav-item"
        >
          <img :src="album.images" :alt="album.name" class="album-thumbnail" />
          <div class="album-info">
            <h4>{{ album.name }}</h4>
            <p>{{ album.artists }}</p>
          </div>
          <!-- 任務6: 移除收藏 -->
          <button 
            @click="removeFavorite(album.id)" 
            class="remove-btn"
            title="移除收藏"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <!-- 無收藏時的UI -->
      <div v-else class="empty-state">
        <div class="empty-icon">💔</div>
        <h3>還沒有收藏任何專輯</h3>
        <p>點擊專輯卡片的愛心按鈕來添加收藏吧！</p>
      </div>
    </div>
    
    <!-- 收藏統計 -->
    <div class="fav-footer">
      <p>共 {{ favoritesStore.favorites.length }} 張專輯</p>
    </div>
  </div>
</template>

<script setup>
import { useFavoritesStore } from '@/stores/favorites'

// 任務8: 使用pinia管理收藏狀態
const favoritesStore = useFavoritesStore()

// 定義emit事件
const emit = defineEmits(['close'])

// 任務6: 移除收藏功能
const removeFavorite = (albumId) => {
  favoritesStore.removeFavorite(albumId)
}
</script>

<style lang="scss" scoped>
.fav-list {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.fav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #444;
  margin-bottom: 1rem;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #f9f9f9;
  }

  .close-btn {
    background: transparent;
    border: none;
    color: #f9f9f9;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    width: auto;
    height: auto;

    &:hover {
      background-color: #444;
    }
  }
}

.fav-content {
  flex: 1;
  overflow-y: auto;
}

.fav-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background-color: #333;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #444;
  }

  .album-thumbnail {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 0.25rem;
    flex-shrink: 0;
  }

  .album-info {
    flex: 1;
    min-width: 0;

    h4 {
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
      color: #f9f9f9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p {
      margin: 0;
      font-size: 0.875rem;
      color: #ccc;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .remove-btn {
    background: transparent;
    border: none;
    color: #ff6b6b;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
    width: auto;
    height: auto;
    flex-shrink: 0;

    &:hover {
      background-color: rgba(255, 107, 107, 0.1);
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.9);
    }
  }
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #ccc;

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  h3 {
    margin: 0 0 1rem 0;
    color: #f9f9f9;
    font-size: 1.25rem;
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.5;
    opacity: 0.8;
  }
}

.fav-footer {
  border-top: 1px solid #444;
  padding-top: 1rem;
  margin-top: 1rem;
  text-align: center;

  p {
    margin: 0;
    font-size: 0.875rem;
    color: #ccc;
  }
}

/* 滾動條樣式 */
.fav-content::-webkit-scrollbar {
  width: 6px;
}

.fav-content::-webkit-scrollbar-track {
  background: #2a2a2b;
}

.fav-content::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 3px;
}

.fav-content::-webkit-scrollbar-thumb:hover {
  background: #777;
}
</style>