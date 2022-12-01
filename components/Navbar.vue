<template>
  <div>
    <div class="space"></div>
    <nav class="nav">
      <div class="nav-left">
        <a href=""><i class="nav-logo fab fa-facebook"></i></a>
        <div class="nav__search">
          <i class="nav__search--icon fas fa-search"></i>
          <input
            placeholder="Search facebook"
            class="nav__search--input"
            type="text"
          />
        </div>
      </div>
      <div class="nav-center">
        <NuxtLink to="/"><i class="nav__icon fas fa-home"></i></NuxtLink>
        <NuxtLink to="/watch"><i class="nav__icon fas fa-tv"></i></NuxtLink>
        <NuxtLink to="/shop"> <i class="nav__icon fas fa-store"></i> </NuxtLink>
        <NuxtLink to="/communication">
          <i class="nav__icon fas fa-users"></i>
        </NuxtLink>
      </div>
      <div class="nav-right">
        <i class="nav__icon fas fa-th"></i>
        <i class="nav__icon fab fa-facebook-messenger"></i>
        <i class="nav__icon fas fa-bell"></i>
        <NuxtLink
          class="user"
          v-if="firebaseUser === null"
          to="/router-auth/signup"
        >
          <i class="nav__icon fas fa-user"></i
        ></NuxtLink>
        <NuxtLink
          class="user"
          :to='`/router-auth/user/${auth?.id}`'
          v-else
          ><img class="avatar" :src="auth?.avatar" alt="avatar"
        /></NuxtLink>
      </div>
    </nav>
    <Loader v-if="isLoad" />
    <NoUser v-show="isShow" />
  </div>
</template>

<script setup>
const firebaseUser = useFirebaseUser();
const isShow = computed(() => {
  if (firebaseUser.value === null) {
    return true;
  } else if (firebaseUser.value !== null) {
    return false;
  }
});
const auth = computed(() => {
  return user().value;
});
const isLoad = computed(() => {
  return load().value;
});
</script>

<style lang="scss">
@import "../assets/css/variables.scss";
@mixin Flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.space {
  height: 63px;
}
.nav {
  background-color: $bg-color;
  z-index: 999;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  @include Flex;
  height: 64px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
  .nav__icon {
    font-size: 1.3rem;
  }
  .nav-left {
    @include Flex;
    justify-content: space-evenly;
    flex: 25%;
    .nav-logo {
      font-size: 2.4rem;
      color: $text-color-active;
      cursor: pointer;
    }
    .nav__search {
      border: 2px solid rgb(51, 51, 51, 0.3);
      border-radius: 20px;
      overflow: hidden;
      @include Flex;
      justify-content: flex-start;
      width: 60%;
      .nav__search--icon {
        font-size: 1.1rem;
        opacity: 0.7;
        padding: 2px 5px;
        cursor: pointer;
      }
      .nav__search--input {
        border: none;
        outline: none;
        padding: 5px;
        font-size: 1rem;
      }
    }
  }
  .nav-right {
    flex: 20%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .nav__icon {
      background-color: rgb(224, 220, 220);
      padding: 13px;
      border-radius: 50%;
      cursor: pointer;
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
    a.router-link-active {
      .avatar {
        border: 3px solid $text-color-active;
        border-radius: 50%;
        box-shadow: 0px 0px 10px $text-color-active;
      }
    }
    .user.router-link-active::before {
      border-bottom: 0px solid $text-color-active;
    }
  }
  .nav-center {
    display: flex;
    justify-content: space-evenly;
    flex: 55%;
  }
}
</style>
