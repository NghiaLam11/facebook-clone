<template>
  <div>
    <div class="status" v-for="item in status" :key="item.id">
      <div class="status__auth">
        <NuxtLink  :to='`/router-auth/user/${item?.auth.id}`'>    <img
          class="status--avatar"
          :src="item.auth.avatar"
          @click="onUserStatus()"
          alt=""
        /></NuxtLink>
    
        <div class="auth">
          <div class="name">{{ item.auth.fname }} {{ item.auth.lname }}</div>
          <div class="time">{{ item.uploadTime }}</div>
        </div>
      </div>
      <div class="text">{{ item.content }}</div>
      <div v-if="item.attach !== ''" class="img">
        <img class="status__img" :src="item.attach" alt="" />
      </div>
      <div class="status__emotional">
        <i class="emotional fas fa-thumbs-up"></i>
        <i class="emotional fas fa-comment-dots"></i>
        <i class="emotional fas fa-share"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    fetchStatus();
    const status = computed(() => {
      return statusStore().value;
    });
    const isUserStatus = ref(false);
    const onUserStatus = () => {
      isUserStatus.value = true;
    };
    return {
      status,
      onUserStatus,
      isUserStatus,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/css/variables.scss";

.status {
  margin-top: 10px;
  background-color: $bg-color;
  border-radius: 2px;
}
.status__auth {
  align-items: center;
  padding: 5px;
  display: flex;
  .status--avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.text {
  padding: 5px;
  color: #333;
}
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(180, 175, 175);
  padding: 20px;
  .status__img {
    height: 500px;
  }
}
.status__emotional {
  border-top: 1px solid #000;
  display: flex;
  justify-content: space-around;
  .emotional {
    font-size: 1.5rem;
    padding: 15px 20px;
    flex: 100%;
    text-align: center;
    transition: all 0.1s linear;
    color: rgb(0, 0, 255, 0.6);
    cursor: pointer;
  }
  .emotional:hover {
    background-color: rgb(209, 207, 207);
  }
}
</style>
