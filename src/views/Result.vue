<template>
  <div class="result">
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body" id="container">
        <div class="box">
          <input class="input is-primary" type="text" readonly :value="$route.query.query">
          <div class="tabs">
            <ul>
              <li v-for="(item, i) in alg" :key="i" :class="selected == i ? 'is-active': ''" @click="select(i)"><a>{{item}}</a></li>
            </ul>
          </div>
          <div v-for="(item, i) in recommend[selected].reviews" :key="i">
            <div class="box">
              <article class="media">
                <div class="media-left">
                  <figure class="image is-128x128">
                    <img :src="item.img" alt="Image">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <h3>{{item.perfume}}</h3>
                    <p v-html="highlight(item.text, item.highlight)"></p>
                    <div>
                      <span v-for="(acc, j) in item.accords" :key="j" style="margin: 0px 5px" class="tag is-success is-light">#{{acc}}</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
#container {
  display: flex;
  align-items: center;
  justify-content: center;
}
#container > .box {
  width: 1000px;
  height: 800px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}
.hero .tabs ul {
  border-bottom: 1px solid #dbdbdb;
}
.box {
  margin: 10px 0;
}
</style>

<script>

export default {
  name: 'Result',
  components: {
    
  },
  data() {
    return {
      selected: 0,
      alg: ['Word2Vec', 'Doc2Vec', 'Bert'],
      recommend: [
        {
          reviews: [
            {
              text: '향기나는 리뷰 세르주루텐 상탈 마제스퀼 Serge Lutens Santal Majuscule Eau De Parfum 진입 장벽이 높다고 알려진, 예술가 감성의 세르주루텐 향수. 하지만 요즘엔 소비자 분들이 굉장히 용감해지기도 하셨고, 후각의 스펙트럼도 넓어지신 것 같아서 이제는 더 이상 예전만큼 향기 자체가 막 어렵다고 느끼실 것 같진 않다', 
              perfume: '향수이름',
              accords: ['a', 'b', 'c'],
              img: 'https://bulma.io/images/placeholders/128x128.png',
              highlight: [
                ['리뷰', '#333333'],
              ]
            },
            {
              text: '텍스트', 
              perfume: '향수이름',
              accords: ['a', 'b', 'c'],
              img: 'https://bulma.io/images/placeholders/128x128.png',
              highlight: []
            },
            {
              text: '텍스트', 
              perfume: '향수이름',
              accords: ['a', 'b', 'c'],
              img: 'https://bulma.io/images/placeholders/128x128.png',
              highlight: []
            },
          ]
        },
        {},
        {}
      ]
    }
  },
  methods: {
    select(i) {
      this.selected = i
    },
    highlight(text, hdata) {
      let w = text.split(' ').map((x)=> {
        let t = x
        for(let i=0;i<hdata.length;i++) {
          let bg = hdata[i][1]
          let color = '#FFF'
          t = t.replace(hdata[i][0], `<span style="background-color:${bg}; color:${color}; border-radius: 4px; padding: 2px">${hdata[i][0]}</span>`)
        }
        return t
      })
      return w.join(' ')
    }
  },
  computed: {
    
  },
  watch: {
    
  },
}
</script>
