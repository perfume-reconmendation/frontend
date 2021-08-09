<template>
  <div class="test">
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body" id="container">
        <div class="box">
          <figure class="image is-480x480">
            <img src="https://bulma.io/images/placeholders/480x480.png">
          </figure> 
          <div class="q">Q{{step+1}} : {{questions[step].text}}</div>
          <div class="search">
            <textarea class="textarea" v-model="questions[step].input" style="width: 350px" placeholder="10 lines of textarea"></textarea>
            <div>
              <button class="button is-outlined" v-on:click="clearText">Clear</button>
              <button class="button is-outlined" v-on:click="nextQ">Next</button>
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
    background-color: #DDD;
    position: relative;
  }
  #container > .box > .image {
    position: absolute;
    left: 0;
    top: 0;
    width: 600px;
    height: 600px;
    background-color: #AAA;
    padding: 20px;
  }
  #container > .box > .q {
    position: absolute;
    left: 100px;
    bottom: 350px;
    width: 400px;
    height: 80px;
    background-color: rgba(0,0,0,0.8);
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
    background-color: #AAA;
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
export default {
  name: 'Test',
  components: {
    
  },
  methods: {
    nextQ() {
      if(this.step == this.questions.length-1) {
        console.log(1)  
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
        {text: '1asdfadsf', img: '', input: ''},
        {text: '2adsfasdfaa', img: '', input: ''},
      ]
    }
  }
}
</script>
