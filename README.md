# WebNavigation

键盘样式的导航
预览图
![预览图](https://s1.ax1x.com/2018/11/24/FFbWbd.png)
## 踩坑：
[项目过程记录一](https://segmentfault.com/a/1190000014463632)

[项目过程记录二](https://segmentfault.com/a/1190000014518824)

- 当inut获取焦点的时候，如何停止键盘监听事件：具体做法是在input获得焦点的时候添加一个属性，键盘事件再判断是否有这哥属性
- e.currentTarget和e.target的区别，捕获和冒泡
- 点击编辑按钮，阻止事件冒泡