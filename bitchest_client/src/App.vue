<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* FONT */
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");

body {
  background-color: #212121 !important;
  color: #fefefe !important;
}

/* RESET CSS */

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  font-family: "Nunito", sans-serif;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

main {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* BUTTONS STYLE */

button.link-inside {
  padding: 0px !important;
  display: inline-flex;
}

button.btn a {
  color: white;
  text-decoration: none;
  padding: 6px 12px;
  width: 100%;
  height: 100%;
}

button.btn a:hover {
  color: white;
}

.green {
  color: #0bc18d !important;
}

/* MODAL STYLE */
.modal-content {
  display: flex;
  flex-direction: column;
  border: none;
}

.modal-content h1,
.modal-content p {
  margin-bottom: 16px;
  color: black;
}

.modal-content h1 {
  font-size: 32px;
}

.modal-content p {
  font-size: 18px;
}

@media (max-width: 768px) {
  main {
    padding: 0px;
    flex-direction: column;
  }

  main > div,
  main > section {
    width: 100%;
    margin-left: 0px;
    margin-top: 70px; /* 70px de hauteur nav + 10px de margin */
    padding: 7.5px 5px;
  }
}

@media (min-width: 769px) {
  main {
    padding: 15px 10px;
  }

  main > div,
  main > section {
    width: calc(100% - 130px);
    margin-left: 130px; /* 120px de largeur nav + 10px de margin */
    padding: 0px;
  }
}
</style>