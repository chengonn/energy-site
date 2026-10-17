# 衡能 React 網站（v2）

## GitHub Pages 部署

Repo：`chengonn/energy-site`，部署分支：`master`。
預計網站網址：https://chengonn.github.io/energy-site/ （部署成功後才會上線）。

1. GitHub repo → Settings → Pages → Build and deployment → Source 選擇 **GitHub Actions**。
2. 推送 `master`，或進入 Actions → Deploy website to GitHub Pages → Run workflow。
3. 等待 build 與 deploy 都成功，再開啟網站。

`.github/workflows/deploy-pages.yml` 會安裝依賴、建置並發布 `dist/`，不用手動提交產物或建立 gh-pages 分支。GitHub Actions 建置時設定 `VITE_BASE_PATH=/energy-site/`，本機預設路徑仍為 `/`。

若之後改 repo 名稱、使用 `chengonn.github.io` 根站或自訂網域，需同步調整 workflow 的 `VITE_BASE_PATH`。表單仍為示範；GitHub Pages 只託管這個靜態網站。

目前已改為 React + Vite + Tailwind CSS 4，使用官方 shadcn/ui 元件與 Lucide 圖示，並以 Three.js 加入真實 WebGL 3D 主視覺。

## 開啟專案

在本資料夾開啟 PowerShell：

```powershell
pnpm install
pnpm dev
```

開啟終端機顯示的 Local 網址，通常是 http://127.0.0.1:5173/ 。結束按 Ctrl+C。React 版本不能直接雙擊根目錄 index.html，也不要再使用 Python 伺服器提供原始碼。

目前已安裝依賴，可直接 pnpm dev。若套件下載出現 UNABLE_TO_VERIFY_LEAF_SIGNATURE，可使用 Node 24 的系統憑證信任庫：`$env:NODE_USE_SYSTEM_CA='1'`，再執行 pnpm install；不關閉 TLS 憑證驗證。

```powershell
pnpm build
pnpm preview
```

正式建置產生 dist/。可交由靜態網站主機提供，不含表單後端。

## 程式碼導覽

建議先看 `src/App.jsx`，它只負責組合頁面順序，再往各區塊閱讀。

```text
src/
  App.jsx                     頁面區塊與閱讀順序
  main.jsx                    React 入口
  data/siteContent.js         場域、FAQ、流程與表單欄位資料
  components/
    layout/                   頁首導覽、頁尾
    sections/                 首屏、信任、方案、流程、FAQ、行動區塊
    CallToAction.jsx          CTA 曝光與點擊追蹤
    SectionHeading.jsx       共用區塊標題
    AssessmentForm.jsx       表單驗證、示範完成回饋
    EnergyScene.jsx          3D 載入、播放狀態與靜態替代圖
    ui/                       官方 shadcn/ui 基礎元件
  lib/
    createEnergyScene.js      Three.js 建模、動畫與資源清理
    analytics.js              記憶體分析事件
    utils.js                  共用 className 工具
  styles/
    theme.css                 色彩、圓角與 Tailwind 主題
    base.css                  全域元素樣式
    sections.css              桌面版區塊樣式
    responsive.css            斷點、動態偏好與樣式覆寫
  index.css                   樣式匯入順序
```

### 常見修改位置

- 改場域、FAQ、流程或必要欄位：`src/data/siteContent.js`。
- 改首屏文案：`src/components/sections/HeroSection.jsx`。
- 改表單提交方式：`src/components/AssessmentForm.jsx` 的 `handleSubmit`。
- 改配色：`src/styles/theme.css`；改手机版排版：`src/styles/responsive.css`。
- 改 3D 模型與旋轉速度：`src/lib/createEnergyScene.js`。
- 加入新元件：`pnpm exec shadcn add 元件名稱`。

3D 建立函式回傳清理函式，讓 React 卸載或暫停時停止動畫、移除監聽器並釋放 GPU 資源。React 元件不直接管理建模細節。

`legacy/` 保留原先靜態版本。根目錄不再保留重複的舊 `app.js` 與 `style.css`。舊版可從 `legacy/index.html` 開啟；新版請使用 `pnpm dev`。

### 格式工具

```powershell
pnpm format        # 整理程式碼縮排與換行
pnpm format:check  # 檢查格式，不修改檔案
pnpm build         # 驗證正式建置
```

## 頁面與指標

看到 → 信任 → 理解 → 行動的內容順序不變。表單仍是示範，不會將資料送往服務團隊。

`window.energyAnalytics.events` 可查看本頁事件，`summary()` 可查看計數；`energy:analytics` 自訂事件可供正式分析串接。事件不包含表單內容。

- `cta_view`：按鈕可見至少 50%，每次元件掛載記錄一次。
- `cta_click`：記錄 CTA 位置。
- `scenario_select`：記錄場域切換。
- `form_start`：首次改變欄位值。
- `form_validation_error`：只記錄欄位名稱。
- `form_demo_complete`：示範完成，不可當成正式表單成功轉換。

正式 CTA 點擊率需依位置與訪客去重。表單完成率需以伺服器確認接收的成功工作階段数 ÷ 開始填寫的工作階段數計算；目前記憶體事件不是正式統計系統。

## 上線前需完成

- 替換正式品牌、聯絡方式、服務範圍、費用規則與真實案例。
- 串接表單接收服務／API，加入隱私告知、濫用防護、伺服器驗證、失敗重試。只有伺服器確認接收成功才觸發 form_submit_success。
- 將按鈕「試填完成，查看下一步」改為正式申請文字，移除示範提示。
- 串接正式分析服務；目前事件僅存在記憶體，不保存、不傳送個資，重整即清除。
- 新版使用系統字型，不依賴外部字型下載。

## 參考

參考網站：https://drone.riotters.com/。品牌、文案、圖形、配色與實作皆為重新設計；未使用參考網站素材或原始碼。

## 敘事互動版本

互動節奏參考 https://nickho-motorsports.nl/ ，不使用參考網站的影像、文案或程式碼。

- 全螢幕主視覺：大字、能源核心與原創圖形，3D 隨捲動改變視角。
- 全螢幕導覽：Radix Dialog 管理焦點、Esc 與關閉後返回原按鈕。
- 桌面合作流程：原生滾動搭配 sticky 區塊，三個階段切換，可點擊階段或跳過。
- 改善方向：滑鼠拖曳、觸控滑動、左右按鈕與方向鍵都可操作。
- 區塊進場：IntersectionObserver 漸入，降低動態效果偏好下完整顯示。
- 手機版：合作流程三段直排，不需要經過長距離固定滾動。

維護位置：`src/styles/interaction.css`、`src/hooks/`、`src/components/ImprovementGallery.jsx`、`src/data/improvementDirections.js` 與 `ProcessSection.jsx`。既有場域切換、CTA 與表單邏輯保持可用。

若 5173 已被占用，Vite 會改用其他埠號，例如 5174；以啟動終端機顯示的 Local 網址為準。

## 中英文切換

頁首與全螢幕選單提供「中 / EN」按鈕，預設為繁體中文。選擇會儲存於瀏覽器 localStorage（heng-language），重新開啟後沿用；儲存受限時仍可在當頁切換。

- src/i18n/LanguageContext.jsx：語言狀態、內容翻譯、HTML lang 與頁面標題／描述。
- src/i18n/en.json：中文原文對應的英文翻譯，更新原文時請同步補上對應鍵值。
- src/components/LanguageSwitcher.jsx：可鍵盤操作的語言按鈕。
- src/styles/language.css：英文與手機排版調整。

切換不重新載入頁面，不重建 3D 場景，保留已填表單內容與場域選項。示範表單的完成訊息也隨語言更新。語言偏好是唯一新增儲存的項目；表單內容仍不儲存、不傳送。
