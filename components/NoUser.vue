<template>
  <div class="no-user">
    <div class="title">Hi! Welcome to my Facebook clone</div>
    <div class="no-user-btn">
      <NuxtLink to="/router-auth/signup"><button>Sign up</button></NuxtLink>
      <NuxtLink to="/router-auth/signin"><button>Sign in</button></NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/css/variables.scss";
.no-user {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: $bg-color;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .title{
    font-size: 2.5rem;
    text-align: center;
  }
  .no-user-btn {
    margin-top: 20px;
    display: flex;
    button {
      margin: 0 5px;
      appearance: button;
      background-color: #0276ff;
      border-radius: 3px;
      border-style: none;
      box-shadow: rgba(255, 255, 255, 0.26) 0 1px 2px inset;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      font-size: 1.2rem;
      line-height: 1.15;
      padding: 10px 21px;
      transition: color 0.13s ease-in-out, background 0.13s ease-in-out,
        opacity 0.13s ease-in-out, box-shadow 0.13s ease-in-out;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    button:active {
      background-color: #006ae8;
    }

    button:hover {
      background-color: #1c84ff;
    }
  }
}
</style>
