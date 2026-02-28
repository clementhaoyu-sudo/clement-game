# Netlify 拖拽部署 — 三步完成

## 第一步：打开 Netlify 并登录/注册

1. 在浏览器打开：**https://app.netlify.com**
2. 若已有账号，点 **Log in**；没有则点 **Sign up**
3. 选 **Sign up with email**，用 **clement.haoyu@gmail.com** 注册并设置密码，或直接登录

---

## 第二步：上传项目

1. 登录后点击 **Add new site**（或 **Sites** → **Add new site**）
2. 选择 **Deploy manually**（或 **Drag and drop**）
3. 在电脑上打开文件夹：
   ```
   /Users/clement/Desktop/LclementsGame1
   ```
4. **选中该文件夹里的所有内容**（不要只选文件夹本身）：
   - 全选：`index.html`、`jbonus.html`、`j1.html`、`j2.html`、`j3.html`、`pintro.html`
   - 以及所有 `.css`、`.js` 文件
   - 以及 **audio** 文件夹（里面有 `beast-game.mp3`）
5. 把选中的这些**拖进** Netlify 网页上的虚线框里，松手

---

## 第三步：获取网址

1. 等待页面显示 **Site is live** 或 **Published**
2. 页面上会显示你的网站地址，例如：`https://xxxxx.netlify.app`
3. 点击该链接即可打开你的小游戏

---

之后若改了代码，再次打开 **https://app.netlify.com** → 进入你的站点 → **Deploys** → 把新的项目文件夹内容拖上去即可更新。
