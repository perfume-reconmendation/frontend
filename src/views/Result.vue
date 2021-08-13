<template>
  <div class="result">
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body" id="container">
        <div class="box">
          <input class="input is-primary" type="text" readonly :value="$store.state.search.query">
          <article v-if="$store.state.search.label != ''" class="message" style="margin: 10px 0px;">
            <div class="message-body">
              <strong>{{labelData[$store.state.search.label].name}}</strong><br>
              {{labelData[$store.state.search.label].text}}
            </div>
          </article>
          <div class="tabs">
            <ul>
              <li v-for="(item, i) in alg" :key="i" :class="selected == item ? 'is-active': ''" @click="select(item)"><a>{{item}}</a></li>
            </ul>
          </div>
          <div v-for="(item, j) in recommend[selected]['reviews']" :key="j">
            <div class="box">
              <article class="media">
                <div class="media-left">
                  <figure class="image is-128x128">
                    <img :src="item.img" alt="Image">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <h3>{{item.perfume}} <small style="font-size: 14px; color: #333">Similarity : {{item.similarity}}</small> </h3>
                    <p v-html="highlight(item.text, item.highlight)"></p>
                    <div>
                      <span v-for="(acc, k) in eval(item.accords)" :key="k" style="margin: 0px 5px" class="tag is-success is-light">#{{acc}}</span>
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
  min-height: 800px;
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
import ApiService from '@/common/api.service.js'

export default {
  name: 'Result',
  components: {
    
  },
  mounted() {

  },
  data() {
    return {
      labelData: [
        {name: '라벨이름1', text: '해당 텍스트는 꽃과 달콤함등으로 구성된 라벨로 분류되었습니다.'},
        {name: '라벨이름2', text: '해당 텍스트는 꽃과 달콤함등으로 구성된 라벨로 분류되었습니다.'},
        {name: '라벨이름3', text: '해당 텍스트는 꽃과 달콤함등으로 구성된 라벨로 분류되었습니다.'},
        {name: '라벨이름4', text: '해당 텍스트는 꽃과 달콤함등으로 구성된 라벨로 분류되었습니다.'},
      ],
      selected: 'Bert',
      alg: ['Word2Vec', 'Doc2Vec', 'Bert'],
      recommend: {
        'Word2Vec': {
          reviews: [
            // { // ex
            //   text: '향기나는 리뷰 세르주루텐 상탈 마제스퀼 Serge Lutens Santal Majuscule Eau De Parfum 진입 장벽이 높다고 알려진, 예술가 감성의 세르주루텐 향수. 하지만 요즘엔 소비자 분들이 굉장히 용감해지기도 하셨고, 후각의 스펙트럼도 넓어지신 것 같아서 이제는 더 이상 예전만큼 향기 자체가 막 어렵다고 느끼실 것 같진 않다', 
            //   perfume: '향수이름',
            //   accords: ['a', 'b', 'c'],
            //   img: 'https://bulma.io/images/placeholders/128x128.png',
            //   similarity: 0.9,
            //   highlight: [
            //     ['리뷰', '#333333'],
            //   ]
            // },
          ]
        },
        'Doc2Vec': {
          reviews: []
        },
        'Bert': {
          reviews: []
        }
      }
    }
  },
  methods: {
    select(name) {
      this.selected = name
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
    },
    eval(x) {
      return eval(x)
    }
    // dataSpreed(i) {
    //   if(this.$store.state.search.load) {
    //     let query = this.$store.state.search.query
    //     let label = this.$store.state.search.label
    //     if(i == 0) {
    //       ApiService.post("similar/bert", { "query": query, "label": label })
    //       .then((data) => {
    //         console.log(data)
    //       })
    //     }
    //     else if(i == 1) {
    //       ApiService.post("similar/bert", { "query": query, "label": label })
    //       .then((data) => {
    //         console.log(data)
    //       })
    //     }
    //     else if(i == 2) {
    //       ApiService.post("similar/bert", { "query": query, "label": label })
    //       .then((data) => {
    //         console.log(data)
    //       })
    //     }
    //   }
    // }
  },
  computed: {
    load() {
      return this.$store.state.search.load
    },
    // perfumeData() {
    //   return 
    // }
  },
  watch: {
    load(v) {
      if(v) {
        let query = this.$store.state.search.query
        let label = this.$store.state.search.label

        ApiService.post("similar/bert", { "query": query, "label": label }).then(({data}) => {
          console.log(data)
          this.recommend['Bert'].reviews = data.map(x=> {
            return {
              "text": x.review,
              "perfume": x.name,
              "accords": x.accords,
              "similarity": x.similarity,
              "img": 'https://bulma.io/images/placeholders/128x128.png',
              "highlight": [
                ['리뷰', '#333333'],
              ]
            }
          })
        }).catch((error) => {
          console.log(error)
        })
        ApiService.post("similar/word2vec", { "query": query, "label": label }).then(({data}) => {
          console.log(data)
          this.recommend['Word2Vec'].reviews = data.map(x=> {
            return {
              "text": x.review,
              "perfume": x.name,
              "accords": x.accords,
              "similarity": x.similarity,
              "img": 'https://bulma.io/images/placeholders/128x128.png',
              "highlight": [
                ['리뷰', '#333333'],
              ]
            }
          })
        }).catch((error) => {
          console.log(error)
        })
        ApiService.post("similar/doc2vec", { "query": query, "label": label }).then(({data}) => {
          console.log(data)
          this.recommend['Doc2Vec'].reviews = data.map(x=> {
            return {
              "text": x.review,
              "perfume": x.name,
              "accords": x.accords,
              "similarity": x.similarity,
              "img": 'https://bulma.io/images/placeholders/128x128.png',
              "highlight": [
                ['리뷰', '#333333'],
              ]
            }
          })
        }).catch((error) => {
          console.log(error)
        })
        

        // let w2v = await ApiService.post("similar/word2vec", { "query": query, "label": label })
        // this.recommend['Word2Vec'] = w2v.data.map(x=> {
        //   return {
        //     "text": x.review,
        //     "perfume": x.name,
        //     "accords": x.accords,
        //     "img": 'https://bulma.io/images/placeholders/128x128.png',
        //     "highlight": [
        //       ['리뷰', '#333333'],
        //     ]
        //   }
        // })
        // let d2v = await ApiService.post("similar/doc2vec", { "query": query, "label": label })
        // this.recommend['Doc2Vec'] = d2v.data.map(x=> {
        //   return {
        //     "text": x.review,
        //     "perfume": x.name,
        //     "accords": x.accords,
        //     "img": 'https://bulma.io/images/placeholders/128x128.png',
        //     "highlight": [
        //       ['리뷰', '#333333'],
        //     ]
        //   }
        // })
        
        // console.log(data)
        // let w2v = await ApiService.post("similar/word2vec", { "query": query, "label": label })
        // console.log(w2v.data)
        // let d2v = await ApiService.post("similar/doc2vec", { "query": query, "label": label })
        // console.log(d2v.data)
        
        // [bert.data, d2v.data].foreach(x => {
        //   {
        //     "text": x.review,
        //     "perfume": x.name,
        //     "accords": x.accords,
        //     "img": 'https://bulma.io/images/placeholders/128x128.png',
        //     "highlight": [
        //       ['리뷰', '#333333'],
        //     ]
        //   }
        // });
        // console.log(data)

        // this.recommend.push({
        //   reviews: [
        //     {
        //       text: '향기나는 리뷰 세르주루텐 상탈 마제스퀼 Serge Lutens Santal Majuscule Eau De Parfum 진입 장벽이 높다고 알려진, 예술가 감성의 세르주루텐 향수. 하지만 요즘엔 소비자 분들이 굉장히 용감해지기도 하셨고, 후각의 스펙트럼도 넓어지신 것 같아서 이제는 더 이상 예전만큼 향기 자체가 막 어렵다고 느끼실 것 같진 않다', 
        //       perfume: ,
        //       accords: ['a', 'b', 'c'],
        //       img: 'https://bulma.io/images/placeholders/128x128.png',
        //       highlight: [
        //         ['리뷰', '#333333'],
        //       ]
        //     },
        //     {},
        //     {}
        //   ]
        // })
      }
    }
  },
}
</script>
