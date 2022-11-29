<template>
  <div id="app">
    <Poll />
  </div>
</template>

<script>
import Poll from './components/Poll.vue'

export default {
  name: 'App',
  components: {
    Poll
  }
}
</script>

<style>
@font-face {font-family: 'Open Sans';font-style: italic;font-weight: 300;font-stretch: normal;font-display: swap;src: url(https://fonts.gstatic.com/s/opensans/v27/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk5hkWV4ewA.woff2) format('woff2');}
@font-face {font-family: 'Open Sans';font-style: italic;font-weight: 400;font-stretch: normal;font-display: swap;src: url(https://fonts.gstatic.com/s/opensans/v27/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk8ZkWV4ewA.woff2) format('woff2');}
@font-face {font-family: 'Open Sans';font-style: italic;font-weight: 600;font-stretch: normal;font-display: swap;src: url(https://fonts.gstatic.com/s/opensans/v27/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0RkxhjWV4ewA.woff2) format('woff2');}
@font-face {font-family: 'Open Sans';font-style: italic;font-weight: 700;font-stretch: normal;font-display: swap;src: url(https://fonts.gstatic.com/s/opensans/v27/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0RkyFjWV4ewA.woff2) format('woff2');}
@font-face {font-family: 'Open Sans';font-style: italic;font-weight: 800;font-stretch: normal;font-display: swap;src: url(https://fonts.gstatic.com/s/opensans/v27/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk0ZjWV4ewA.woff2) format('woff2');}
@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 300;font-stretch: normal;font-display: swap;src: url(https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsiH0B4uaVI.woff2) format('woff2');}
@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 400;font-stretch: normal;font-display: swap;src: url(https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4uaVI.woff2) format('woff2');}
@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 600;font-stretch: normal;font-display: swap;src: url(https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsgH1x4uaVI.woff2) format('woff2');}
@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 700;font-stretch: normal;font-display: swap;src: url(https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4uaVI.woff2) format('woff2');}
@font-face {font-family: 'Open Sans';font-style: normal;font-weight: 800;font-stretch: normal;font-display: swap;src: url(https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgshZ1x4uaVI.woff2) format('woff2');}
@font-face {font-family: 'Oswald';font-style: normal;font-weight: 200;font-display: swap;src: url(https://fonts.gstatic.com/s/oswald/v41/TK3_WkUHHAIjg75cFRf3bXL8LICs13FvsUhiZQ.woff2) format('woff2');}
@font-face {font-family: 'Oswald';font-style: normal;font-weight: 300;font-display: swap;src: url(https://fonts.gstatic.com/s/oswald/v41/TK3_WkUHHAIjg75cFRf3bXL8LICs169vsUhiZQ.woff2) format('woff2');}
@font-face {font-family: 'Oswald';font-style: normal;font-weight: 400;font-display: swap;src: url(https://fonts.gstatic.com/s/oswald/v41/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvsUhiZQ.woff2) format('woff2');}
@font-face {font-family: 'Oswald';font-style: normal;font-weight: 500;font-display: swap;src: url(https://fonts.gstatic.com/s/oswald/v41/TK3_WkUHHAIjg75cFRf3bXL8LICs18NvsUhiZQ.woff2) format('woff2');}
@font-face {font-family: 'Oswald';font-style: normal;font-weight: 600;font-display: swap;src: url(https://fonts.gstatic.com/s/oswald/v41/TK3_WkUHHAIjg75cFRf3bXL8LICs1y9osUhiZQ.woff2) format('woff2');}
@font-face {font-family: 'Oswald';font-style: normal;font-weight: 700;font-display: swap;src: url(https://fonts.gstatic.com/s/oswald/v41/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZosUhiZQ.woff2) format('woff2');}

#app {
  font-family: "Open Sans";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  }

#app h1{
  font-family: "Oswald";
   text-transform: uppercase; 
}

#app h2{
  font-family: "Oswald";
   text-transform: uppercase; 
}

#app h3{
  font-family: "Oswald";
   text-transform: uppercase; 
}

#app h4{
  font-family: "Oswald";
   text-transform: uppercase; 
}

#app h5{
  font-family: "Oswald";
   text-transform: uppercase; 
}



</style>