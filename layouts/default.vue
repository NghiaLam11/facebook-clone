<template>
  <div>
    <Html lang="en">
      <Head>
        <Title>Facebook</Title>
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link rel="preconnect" href="https://fonts.gstatic.com" />
        <Link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <Link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link rel="preconnect" href="https://fonts.gstatic.com" />
        <Link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        /> </Head
    ></Html>
    <div>
      <Navbar />
    </div>
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss">
@import "../assets/css/variables.scss";
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
  font: inherit;
  vertical-align: baseline;
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
table {
  border-collapse: collapse;
  border-spacing: 0;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
  color: $text-color;
  // font-family: 'Roboto', sans-serif;
  font-family: "Nunito", sans-serif;
  background-color: $bg-color-second;
}
body::-webkit-scrollbar {
  display: none;
}
a {
  text-decoration: none;
  color: $text-color;
}
a.router-link-exact-active {
  color: $text-color-active;
}
a.router-link-active {
  width: 20%;
  text-align: center;
  transform: scale(1.01);
  transition: all 0.1s linear;
  position: relative;
}
a.router-link-active::before {
  content: "";
  position: absolute;
  width: 100px;
  border-bottom: 3px solid $text-color-active;
  bottom: -82%;
  left: calc(50% - (100px / 2));
}
</style>
