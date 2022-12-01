<template>
  <div class="user">
    <div class="layout--left">
      <div
        :class="{ active: active == 'personal' }"
        @click="onActive('personal')"
        class="user__category"
      >
        Personal
      </div>
      <div
        :class="{ active: active == 'timeline' }"
        @click="onActive('timeline')"
        class="user__category"
      >
        Timeline
      </div>
      <div
        @click="onSignOut"
        v-if="id === route.params.id"
        class="user__category"
      >
        Sign out
      </div>
    </div>
    <div class="layout__personal--right">
      <img
        @click="onSignOut"
        class="user__avatar"
        :src="auth?.avatar"
        alt="avatar"
      />
      <h1 class="user__name">{{ auth?.lname }} {{ auth?.fname }}</h1>
      <span class="user__bio">{{ auth?.bio }}</span>
    </div>
    <Loader v-if="isLoad" />
  </div>
</template>

<script setup>
// Categories left
const active = ref("personal");
const onActive = (name) => {
  active.value = name;
};
// sign out
const onSignOut = async () => {
  const signOut = await signOutUser();
};
//Get auth data follow the route
const route = useRoute();
const users = auths();
const auth = computed(() => {
  let hashMap = new Map();
  users.value.filter((authItem) => {
    hashMap.set(authItem.id, authItem);
  });
  return hashMap.get(route.params.id);
});
// Get id auth to hide or show the sign out
const id = computed(() => {
  return idUser().value;
});
// Load when the page render data
const isLoad = computed(() => {
  return load().value;
});
</script>

<style lang="scss" scoped>
@import "../assets/css/variables.scss";
.user {
  display: flex;
  .layout--left {
    flex: 30%;
    .user__category {
      padding: 20px 30px;
      background-color: $bg-color;
      margin: 2px 0;
      cursor: pointer;
    }
    .user__category:hover {
      background-color: rgb(202, 202, 202);
    }
  }
  .layout__personal--right {
    flex: 70%;
    height: calc(100vh - 64px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $bg-color;
    .user__name {
      font-size: 2rem;
    }
    .user__bio {
      font-weight: bold;
      opacity: 0.9;
    }
    .user__avatar {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}
.active {
  color: $text-color-active;
}
</style>
