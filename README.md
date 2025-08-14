# CJD101_test
> For CJD101測驗
> 之前去其他公司的面試方式，作題時間為30-45分鐘。

- 這兩年避免面試者用『複製貼上』的方式作答，通常會側錄作答操作畫面。
- 但除非先告知不可以使用AI，有導入AI的公司會希望看到面試者如何用AI協作，比如如何有效問問題、怎麼限制及規範AI、怎麼和AI反覆問答取得最適合的回覆、怎麼在專案中debuuger甚至是優化
  > 看簡報內容能夠寫出來code就覺得自己好棒棒，工程師的工作內容有那麼easy就好了🙄

- 考試時間結束後，會把參考解法放在分支「Answer」。
- 如果覺得現在還沒準備好可以之後再練習，或是想要評估『準備前後差異』的作答狀況，可以現在試試看!



## 作答方式：

1. 前往[Github Repository URL](https://github.com/ingridkao/2025_vue3_test)
2. 點擊右上角『Fork』，複製一份到自己的Repository下
3. 可以將程式碼clone到自己的vsCode中，開始進行coding測驗
4. 完成後進行push，並把「自己的Repository URL」填寫到tibame繳交考試的平台中。
6. 晚上review code會陸續給予建議並在課程成績中加分。



## 建議

> 依序完成會比較好寫

|   | 需求                            | 撰寫位置                     |
| - | ------------------------------ | --------------------------- |
| 1 | 引入FavList組件到App.vue的aside中 | src/App.vue                 |
| 2 | 顯示專輯列表                      | src/App.vue                 |
| 3 | 透過 input搜尋                   | src/App.vue                 |
| 4 | 將專輯加入收藏                    | src/App.vue                 |
| 5 | 顯示、關閉收藏組件                 | src/App.vue                 |
| 6 | 移除收藏                         | src/components/FavList.vue |
| 7 | 顯示收藏列表和無列表的UI            | src/components/FavList.vue |
| 8 | 使用pinia加入收藏                 | src/stores/favorites       |




## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

