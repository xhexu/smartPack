<template>
  <div class="topBar">
    <div style="position: relative;width: 400px;margin: 0 auto">
      <img src="../assets/title.png">
      <div class="clock">
        <div style="float: left">
          <span>{{nowYear.substr(0,2)+'  '+nowYear.substr(2,4)}}</span>
          <div><span>{{nowMonth+'  '+nowDay}}</span></div>
        </div>
        <div class="nowtime">
          <label>{{nowTime}}</label>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'topBar',
    data() {
      return {
        nowYear:'',
        nowMonth:'',
        nowDay:'',
        nowTime: ''
      }
    },
    mounted () {
      let me = this
      var timerID = setInterval(updateTime, 1000);
      updateTime();
      function updateTime() {
          var cd = new Date();
          me.nowYear = zeroPadding(cd.getFullYear(), 4)
          me.nowMonth = zeroPadding(cd.getMonth()+1, 2)
          me.nowDay = zeroPadding(cd.getDate(), 2)
          me.nowTime = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) 
          //zeroPadding(cd.getSeconds(), 2)
      };

      function zeroPadding(num, digit) {
          var zero = '';
          for(var i = 0; i < digit; i++) {
              zero += '0';
          }
          return (zero + num).slice(-digit);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .topBar {
    height: 100px;
    .clock{
      position: absolute;
      top: 30px;
      right: -100px;
      span{
        color: #01F6FB;
        font-size: 16px;
        letter-spacing: 0,05em;
      }
    }
    .nowtime{
      float: left;
      color: #01F6FB;
      font-size: 35px !important;
      margin: -4px 0 0 10px;
      letter-spacing: 0,05em;
    }
    
  }
</style>
