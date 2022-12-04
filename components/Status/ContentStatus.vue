<template>
  <div>
    <div
      class="status"
      v-for="item in status"
      :key="item.id"
      v-show="idAuth === item.auth.id || item.isPublic === true"
    >
      <div class="status__auth">
        <NuxtLink :to="`/router-auth/user/${item?.auth.id}`">
          <img
            class="status--avatar"
            :src="item.auth.avatar"
            @click="onUserStatus()"
            alt=""
        /></NuxtLink>
        <div class="auth">
          <div class="name">{{ item.auth.fname }} {{ item.auth.lname }}</div>
          <div class="time">
            <i v-if="!item.isPublic" class="fas fa-lock"></i
            ><i v-else class="fas fa-globe-americas"></i>{{ item.uploadTime }}
          </div>
        </div>
        <i class="status__more fas fa-ellipsis-h"></i>
      </div>
      <div class="text">{{ item.content }}</div>
      <div v-if="item.attach !== ''" class="img">
        <img class="status__img" :src="item.attach" alt="" />
      </div>
      <div class="status__emotional">
        <div
          v-if="idItem === item.id"
          @mouseleave="onDisplayEmotionalOut"
          class="status__emotional--hide"
        >
          <div class="status__emotional--hide--child">
            <i @click="onLike(item)" class="like fas fa-thumbs-up"></i>
          </div>
          <div class="status__emotional--hide--child">
            <i @click="onLove(item)" class="love fas fa-heart"></i>
          </div>
          <div class="status__emotional--hide--child">
            <i @click="onHaha(item)" class="haha fas fa-grin-squint"></i>
          </div>
          <div class="status__emotional--hide--child">
            <i @click="onSad(item)" class="sad fas fa-sad-tear"></i>
          </div>
          <div class="status__emotional--hide--child">
            <i @click="onSurprise(item)" class="surprise fas fa-surprise"></i>
          </div>
          <div class="status__emotional--hide--child">
            <i @click="onAngry(item)" class="angry fas fa-angry"></i>
          </div>
        </div>
        <div
          v-else
          class="status__emotional--child"
          @mouseover="onDisplayEmotional(item)"
        >
          <span>{{ item.countLike }}</span>
          <i
            @click="onLike(item)"
            class="emotional fas fa-thumbs-up"
            :class="{ liked: isLike }"
          ></i>
        </div>
        <div class="status__emotional--child">
          <i class="emotional fas fa-comment-dots"></i>
        </div>
        <div class="status__emotional--child">
          <i class="emotional fas fa-share"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    fetchStatus();
    const idAuth = computed(() => {
      return idUser().value;
    });
    // sap xep theo thoi gian som toi tre
    const status = computed(() => {
      return statusStore().value.sort(function (a: any, b: any) {
        const date1 = new Date(a.uploadTime);
        const date2 = new Date(b.uploadTime);
        return Number(date1) + Number(date2);
      });
    });
    const isUserStatus = ref(false);
    const onUserStatus = () => {
      isUserStatus.value = true;
    };
    const idItem = ref("");
    const onDisplayEmotional = (item: any) => {
      idItem.value = item.id;
    };
    const onDisplayEmotionalOut = () => {
      idItem.value = "";
    };
    const isLike = ref(false);
    const onLike = async (item: any) => {
      if (isLike.value === true) {
        const updateValue = ref({
          countLike: --item.countLike,
        });
        const data = await updateStatus(updateValue.value, item.id);
        isLike.value = false;
      } else {
        const updateValue = ref({
          countLike: ++item.countLike,
        });
        const data = await updateStatus(updateValue.value, item.id);
        isLike.value = true;
      }
    };
    const onLove = async (item: any) => {
      try {
        if (item?.id) {
          const updateValue = ref({
            countLove: ++item.countLove,
          });

          const data = await updateStory(updateValue.value, item.id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const onHaha = async (item: any) => {
      try {
        if (item?.id) {
          const updateValue = ref({
            countHaha: ++item.countHaha,
          });

          const data = await updateStory(updateValue.value, item.id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const onSad = async (item: any) => {
      try {
        if (item?.id) {
          const updateValue = ref({
            countSad: ++item.countSad,
          });

          const data = await updateStory(updateValue.value, item.id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const onSurprise = async (item: any) => {
      try {
        if (item?.id) {
          const updateValue = ref({
            countSurprise: ++item.countSurprise,
          });

          const data = await updateStory(updateValue.value, item.id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const onAngry = async (item: any) => {
      try {
        if (item?.id) {
          const updateValue = ref({
            countAngry: ++item.countAngry,
          });

          const data = await updateStory(updateValue.value, item.id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    return {
      status,
      onUserStatus,
      isUserStatus,
      onLike,
      isLike,
      idAuth,
      onLove,
      onHaha,
      onSad,
      onSurprise,
      onAngry,
      onDisplayEmotional,
      onDisplayEmotionalOut,
      idItem,
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
  position: relative;
  .status--avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .status__more {
    position: absolute;
    right: 1%;
    top: 10%;
    padding: 3px;
    opacity: 0.6;
    cursor: pointer;
  }
  .status__more:hover {
    opacity: 1;
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
  background-color: rgb(226, 225, 225);
  padding: 20px;
  .status__img {
    height: 500px;
  }
}
.status__emotional {
  border-top: 1px solid #000;
  display: flex;
  justify-content: space-around;
  .status__emotional--hide {
    display: flex;
    flex: 100%;
    .status__emotional--hide--child {
      i {
        transition: all 0.1s linear;
        font-size: 2rem;
        margin: 3px;
      }
      .like {
        color: blue;
      }
      .love {
        color: red;
      }
      .haha {
        color: yellow;
      }
      .sad {
        color: rgb(253, 253, 95);
      }
      .surprise {
        color: rgb(248, 212, 9);
      }
      .angry {
        color: red;
      }
      i:hover {
        transform: scale(1.1);
        opacity: 1;
      }
    }
  }
  .status__emotional--child {
    flex: 100%;
    padding: 15px 20px;
    text-align: center;
    .emotional {
      font-size: 1.5rem;
      transition: all 0.1s linear;
      color: rgb(0, 0, 0, 0.5);
      cursor: pointer;
    }
  }

  .status__emotional--child:hover {
    background-color: rgb(209, 207, 207);
  }
  .liked {
    color: blue;
  }
}
</style>
