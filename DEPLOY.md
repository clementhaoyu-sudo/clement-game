# 小游戏部署指南

邮箱：clement.haoyu@gmail.com

---

## 方式一：不用 GitHub，直接上线（最快）

### 用 Netlify 拖拽部署（约 2 分钟）

1. 打开浏览器访问：**https://app.netlify.com**
2. 点击 **Sign up**，选择 **Sign up with email**
3. 用你的邮箱 **clement.haoyu@gmail.com** 注册，设置密码，按提示完成
4. 登录后点击 **Add new site** → **Deploy manually**
5. 把电脑上的整个 **LclementsGame1** 文件夹（包含 index.html、所有 html/css/js、audio 等）**拖进**网页上的虚线框
6. 等待部署完成，会显示一个链接，例如：`https://随机名.netlify.app`
7. 点击该链接即可玩你的游戏

之后若改了代码，重新拖拽同一文件夹即可更新网站。

---

## 方式二：先注册 GitHub，再部署（可自动更新）

### 第一步：注册 GitHub 账号

1. 打开：**https://github.com/signup**
2. 填写：
   - **Email**：clement.haoyu@gmail.com
   - **Password**：自己设一个密码（至少 15 位，或 8 位以上含数字和小写字母）
   - **Username**：选一个用户名（如 `clement-game` 或 `haoyu-clement`），只能英文、数字、连字符
   - 验证「我不是机器人」
3. 点击 **Create account**
4. 到邮箱 **clement.haoyu@gmail.com** 收验证邮件，点链接完成验证

### 第二步：在 GitHub 创建仓库并上传代码

在终端执行（把 `你的用户名` 换成你刚注册的 GitHub 用户名）：

```bash
cd /Users/clement/Desktop/LclementsGame1

# 初始化 Git（只需做一次）
git init

# 添加所有文件
git add .

# 第一次提交
git commit -m "Initial commit: Clement Game Saison 1"

# 在 GitHub 网页上先 New repository，名字例如 LclementsGame1，不要勾选 README
# 然后执行（替换 你的用户名）：
# git remote add origin https://github.com/你的用户名/LclementsGame1.git
# git branch -M main
# git push -u origin main
```

推送时浏览器会弹出 GitHub 登录，按提示登录即可。

### 第三步：用 Netlify 连接 GitHub 自动部署

1. 登录 **https://app.netlify.com**
2. **Add new site** → **Import an existing project**
3. 选 **GitHub**，授权 Netlify 访问你的仓库
4. 选择仓库 **LclementsGame1**
5. 保持默认（Build command 留空，Publish directory 填 `./` 或留空），点 **Deploy**
6. 部署完成后会得到一个固定网址，之后每次往 GitHub 推送代码都会自动重新部署

---

## 小结

- **只想马上上线**：用方式一，Netlify 拖拽即可，无需 GitHub。
- **想要自动部署、可改代码后自动更新**：按方式二注册 GitHub，上传代码，再用 Netlify 连接仓库。

如有报错，把终端或网页上的错误信息发给我即可。
