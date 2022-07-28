# 单词与长难句
<ul>
  <li v-for="item in theme.sidebar['/'][0].items">
    <a :href="withBase(item.link)">{{item.text}}</a>
  </li>
</ul>

<script setup>
import { useData,withBase } from 'vitepress'
const {theme} = useData()
</script>
