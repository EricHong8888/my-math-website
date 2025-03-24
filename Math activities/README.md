# 数学故事 - 莫比乌斯环 (Math Story - Möbius Strip)

这是一个关于莫比乌斯环的数学故事的H5网页项目，针对小学生设计，采用苹果风格的视觉设计。

## 项目内容

该项目包含以下部分：

1. **数学故事**：通过一个简短易懂的故事介绍莫比乌斯环的特性。
2. **动画视频**：使用Manim库生成的莫比乌斯环3D动画。
3. **互动网页**：采用苹果风格设计的响应式H5网页。

## 项目文件结构

```
.
├── index.html              # 主HTML文件
├── css/                    # 样式文件
│   └── styles.css          # 主样式表
├── js/                     # JavaScript文件
│   └── script.js           # 交互脚本
├── videos/                 # 视频文件夹
│   └── animation_message.html  # 动画提示页面
├── mobius_animation.py     # Manim动画脚本
└── requirements.txt        # Python依赖项
```

## 如何查看网页

1. 直接在浏览器中打开`index.html`文件即可查看网页。
2. 也可以使用本地服务器运行，例如：

```bash
# 使用Python的http.server模块
python -m http.server

# 然后在浏览器中访问
# http://localhost:8000
```

## 如何生成Manim动画

要生成莫比乌斯环的动画视频，需要安装Manim库和相关依赖项：

1. 安装依赖项：
```bash
pip install -r requirements.txt
```

2. 运行动画脚本：
```bash
python mobius_animation.py
```

3. 生成的视频将保存在`videos`文件夹中，命名为`mobius_strip.mp4`。

## 可能遇到的问题

- **Manim安装问题**：Manim依赖于多个第三方库，如果安装过程中遇到问题，请参考[Manim官方文档](https://docs.manim.community/en/stable/installation.html)。
- **视频生成失败**：如果视频生成失败，网页会自动显示一个带有简单动画的替代页面。

## 项目作者

大同小学 三年3班 蔡睿哲

---

*本项目采用苹果风格的设计理念，旨在为小学生提供一个生动、易懂的数学概念介绍。* 