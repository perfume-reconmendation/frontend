<template>
  <div class="test">
    <section class="hero is-danger is-fullheight-with-navbar">
      <div class="hero-body" id="container">
        <div class="box">
          <figure class="box image is-480x480">
            <img :src="questions[step].img">
          </figure> 
          <div class="q">Q{{step+1}} : {{questions[step].text}}</div>
          <div class="search box">
            <textarea class="textarea is-info" v-model="questions[step].input" style="width: 350px; resize:none" placeholder="input your answer"></textarea>
            <div>
              <button class="button is-info is-outlined" v-on:click="clearText">Clear</button>
              <button class="button is-success" v-on:click="nextQ">Next</button>
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
  #container > .box > .image {
    position: absolute;
    left: 0;
    top: 0;
    width: 600px;
    height: 600px;
    padding: 20px;
  }
  #container > .box > .q {
    position: absolute;
    left: 100px;
    bottom: 300px;
    width: 400px;
    height: 80px;
    background-color: rgba(0,0,0,0.9);
    font-weight: bold;
    text-align: center;
    color: #FFF;
    line-height: 80px;
    font-size: 24px;
  }
  #container > .box > .search { 
    position: absolute;
    bottom: 0;
    right: 0;
    width: 400px;
    height: 400px;
    padding: 20px;
  }
  #container > .box > .search > textarea {
    width: 100%;
    height: calc(100% - 40px);
  }
  #container > .box > .search > div > button {
    float: left;
    width: calc(100% / 2);
    height: 40px;
  }

</style>

<script>
import ApiService from '@/common/api.service.js'

export default {
  name: 'Test',
  components: {
    
  },
  methods: {
    nextQ() {
      if(this.step+1 == this.questions.length) {
        // class 분류
        let query = this.questions.map(x => x.input).join(' ')
        ApiService.post("class", { "query": query })
          .then(({data}) => {
            console.log(query, data)
            this.$store.state.search = {
              "query" : query,
              "label" : data,
              "load" : true
            }
          }).catch((error) => {
            throw new Error(error);
          });
        this.$router.push({path: 'result', query: {query}})
      }
      else {
        this.step += 1
      }
    },
    clearText() {
      this.questions[this.step].input = ''
    }
  },
  data() {
    return {
      step: 0,
      questions: [
        {text: '향을 비유적으로 묘사해주세요\n', img: 'https://i.pinimg.com/474x/a7/75/22/a7752282444951cbc7a9179a8913d640.jpg', input: ''},
      ]
    }
  }
}
</script>
