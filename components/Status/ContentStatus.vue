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
      <!-- Small emotional -->
      <div @mouseleave="onDisplayEmotionalOut" class="status__emotional">
        <div class="status__emotional--total">
          <span class="emotional__count">{{
            item.countLike +
            item.countLove +
            item.countSad +
            item.countHaha +
            item.countAngry +
            item.countSurprise
          }}</span>
          <i v-show="item.countLike > 0" class="like fas fa-thumbs-up"></i>
          <i v-show="item.countLove > 0" class="love fas fa-heart"></i>
          <i v-show="item.countHaha > 0" class="haha fas fa-grin-squint"></i>
          <i v-show="item.countSad > 0" class="sad fas fa-sad-tear"></i>
          <i
            v-show="item.countSurprise > 0"
            class="surprise fas fa-surprise"
          ></i>
          <i v-show="item.countAngry > 0" class="angry fas fa-angry"></i>
        </div>
        <!-- Emotional display focus -->
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
        <!-- Button Like -->

        <div
          v-for="e in item.userReact"
          :key="e.idAuth"
          class="status__emotional--display--child"
          v-show="idAuth === e?.idAuth && e?.nameEmotional !== 'like'"
        >
          <div
            @click="onLove(item)"
            @mouseover="onDisplayEmotional(item)"
            class="status__emotional--child"
            v-show="idAuth === e?.idAuth && e?.nameEmotional === 'love'"
          >
            <i class="love emotional fas fa-heart"></i>
          </div>
          <div
            @click="onHaha(item)"
            @mouseover="onDisplayEmotional(item)"
            class="status__emotional--child"
            v-show="idAuth === e?.idAuth && e?.nameEmotional === 'haha'"
          >
            <i class="haha emotional fas fa-grin-squint"></i>
          </div>
          <div
            @click="onSad(item)"
            @mouseover="onDisplayEmotional(item)"
            class="status__emotional--child"
            v-show="idAuth === e?.idAuth && e?.nameEmotional === 'sad'"
          >
            <i class="sad emotional fas fa-sad-tear"></i>
          </div>
          <div
            @click="onSurprise(item)"
            @mouseover="onDisplayEmotional(item)"
            class="status__emotional--child"
            v-show="idAuth === e?.idAuth && e?.nameEmotional === 'surprise'"
          >
            <i class="surprise emotional fas fa-surprise"></i>
          </div>
          <div
            @click="onAngry(item)"
            @mouseover="onDisplayEmotional(item)"
            class="status__emotional--child"
            v-show="idAuth === e?.idAuth && e?.nameEmotional === 'angry'"
          >
            <i class="angry emotional fas fa-angry"></i>
          </div>
        </div>
        <div
          class="status__emotional--child"
          @mouseover="onDisplayEmotional(item)"
          @click="onLike(item)"
        >
          <i
            :class="{ 'status__emotional--liked': item.userReact.length !== 0 }"
            class="like emotional fas fa-thumbs-up"
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
// Fix emotional////////////////////////////////
export default defineComponent({
  setup() {
    // CALL fROM THE COMPOSABLES/USEFIREBASE FOLDER
    fetchStatus();
    // (1) GET AUTH
    const idAuth = computed(() => {
      return idUser().value;
    });
    // (2) GET ALL STATUS IN STORE
    const status = computed(() => {
      return statusStore().value.sort(function (a: any, b: any) {
        const date1 = new Date(a.uploadTime);
        const date2 = new Date(b.uploadTime);
        return Number(date1) + Number(date2);
      });
    });
    // (3) GET USER WHO UPLOAD STATUS
    const isUserStatus = ref(false);
    const onUserStatus = () => {
      isUserStatus.value = true;
    };

    const auth = computed(() => {
      return user().value;
    });

    // DISPLAY EMOTIONAL WHEN YOU FOCUS LIKE BUTTON
    const idItem = ref("");
    const onDisplayEmotional = (item: any) => {
      idItem.value = item.id;
    };
    const onDisplayEmotionalOut = () => {
      idItem.value = "";
    };
    // HANDLE LIKE BUTTON EMOTIONAL
    const isReact = ref(false);
    const onLike = async (item: any) => {
      item.userReact.forEach((element: any) => {
        element.idAuth === idAuth.value
          ? (isReact.value = true)
          : (isReact.value = false);
      });
      if (item.userReact && isReact.value === true) {
        const index = item.userReact.indexOf(idAuth);
        item.userReact.splice(index, 1);
        const updateValue = ref({
          countLike: --item.countLike,
          userReact: item.userReact,
          isReact: item.isReact,
        });
        const data = await updateStatus(updateValue.value, item.id);
        isReact.value = false;
      } else {
        item.userReact.push({ idAuth: idAuth.value, nameEmotional: "like" });
        const updateValue = ref({
          countLike: ++item.countLike,
          userReact: item.userReact,
          isReact: !isReact.value,
        });
        const data = await updateStatus(updateValue.value, item.id);
        isReact.value = true;
      }
      idItem.value = "";
    };
    // HANDLE LOVE BUTTON EMOTIONAL
    const onLove = async (item: any) => {
      try {
        if (isReact.value === true && item.userReact) {
          const index = item.userReact.indexOf(idAuth);
          item.userReact.splice(index, 1);
          const updateValue = ref({
            userReact: item.userReact,
            countLove: --item.countLove,
          });
          const data = await updateStatus(updateValue.value, item.id);
          isReact.value = false;
        } else {
          item.userReact.push({ idAuth: idAuth.value, nameEmotional: "love" });

          const updateValue = ref({
            userReact: item.userReact,
            countLove: ++item.countLove,
          });
          const data = await updateStatus(updateValue.value, item.id);
          isReact.value = true;
        }
      } catch (error) {
        console.log(error);
      }
      idItem.value = "";
    };
    // HANDLE HAHA BUTTON EMOTIONAL
    const onHaha = async (item: any) => {
      try {
        if (isReact.value === true && item.userReact) {
          const index = item.userReact.indexOf(idAuth);
          item.userReact.splice(index, 1);
          const updateValue = ref({
            userReact: item.userReact,
            countHaha: --item.countHaha,
          });
          isReact.value = false;
          const data = await updateStatus(updateValue.value, item.id);
        } else {
          item.userReact.push({ idAuth: idAuth.value, nameEmotional: "haha" });

          const updateValue = ref({
            userReact: item.userReact,
            countHaha: ++item.countHaha,
          });
          const data = await updateStatus(updateValue.value, item.id);
          isReact.value = true;
        }
      } catch (error) {
        console.log(error);
      }
      idItem.value = "";
    };
    // HANDLE SAD BUTTON EMOTIONAL
    const onSad = async (item: any) => {
      try {
        if (isReact.value === true && item.userReact) {
          const index = item.userReact.indexOf(idAuth);
          item.userReact.splice(index, 1);
          const updateValue = ref({
            userReact: item.userReact,
            countSad: --item.countSad,
          });
          isReact.value = false;

          const data = await updateStatus(updateValue.value, item.id);
        } else {
          item.userReact.push({ idAuth: idAuth.value, nameEmotional: "sad" });

          const updateValue = ref({
            userReact: item.userReact,
            countSad: ++item.countSad,
          });
          const data = await updateStatus(updateValue.value, item.id);
          isReact.value = true;
        }
      } catch (error) {
        console.log(error);
      }
      idItem.value = "";
    };
    // HANDLE SURPRISE BUTTON EMOTIONAL
    const onSurprise = async (item: any) => {
      try {
        if (isReact.value === true && item.userReact) {
          const index = item.userReact.indexOf(idAuth);
          item.userReact.splice(index, 1);
          const updateValue = ref({
            userReact: item.userReact,
            countSurprise: --item.countSurprise,
          });
          isReact.value = false;

          const data = await updateStatus(updateValue.value, item.id);
        } else {
          item.userReact.push({
            idAuth: idAuth.value,
            nameEmotional: "surprise",
          });

          const updateValue = ref({
            userReact: item.userReact,
            countSurprise: ++item.countSurprise,
          });
          const data = await updateStatus(updateValue.value, item.id);
          isReact.value = true;
        }
      } catch (error) {
        console.log(error);
      }
      idItem.value = "";
    };
    // HANDLE ANGRY BUTTON EMOTIONAL
    const onAngry = async (item: any) => {
      try {
        if (isReact.value === true && item.userReact) {
          const index = item.userReact.indexOf(idAuth);
          item.userReact.splice(index, 1);
          const updateValue = ref({
            userReact: item.userReact,
            countAngry: --item.countAngry,
          });
          isReact.value = false;
          const data = await updateStatus(updateValue.value, item.id);
        } else {
          item.userReact.push({ idAuth: idAuth.value, nameEmotional: "angry" });
          const updateValue = ref({
            userReact: item.userReact,
            countAngry: ++item.countAngry,
          });
          const data = await updateStatus(updateValue.value, item.id);
          isReact.value = true;
        }
      } catch (error) {
        console.log(error);
      }
      idItem.value = "";
    };
    return {
      status,
      onUserStatus,
      isUserStatus,
      onLike,
      isReact,
      idAuth,
      auth,
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
  position: relative;
  .status__emotional--total {
    position: absolute;
    left: 2px;
    top: 2px;
    font-size: 0.8rem;
    .emotional__count {
      padding-right: 5px;
    }
    i {
      margin-left: -4px;
    }
  }
  .status__emotional--hide {
    display: flex;
    position: absolute;
    flex: 100%;
    left: 1%;
    top: -90%;
    animation: emotional 1s ease-in-out;
    @keyframes emotional {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    .status__emotional--hide--child {
      i {
        transition: all 0.1s linear;
        font-size: 2rem;
        margin: 3px;
        cursor: pointer;
        background-color: #000;
        border-radius: 50%;
        padding: 5px;
        overflow: hidden;
        animation: shadowEmotional 5s ease-in-out infinite;
      }
      @keyframes shadowEmotional {
        0% {
          box-shadow: 0 0 10px rgb(229, 255, 0);
        }
        30% {
          box-shadow: 0 0 7px #2e00fc;
        }
        70% {
          box-shadow: 0 0 5px rgb(255, 240, 23);
        }
        100% {
          box-shadow: 0 0 3px rgba(236, 18, 18, 0.5);
        }
      }
      i:hover {
        transform: scale(1.3);
        opacity: 1;
      }
    }
  }
  .status__emotional--display--child {
    flex: 100%;
    display: flex;
    justify-content: space-around;

    .status__emotional--child {
      flex: 100%;
      text-align: center;
      padding: 20px 20px;
      cursor: pointer;
      transition: all 0.13s linear;
      .emotional {
        font-size: 1.5rem;
        transition: all 0.1s linear;
        padding-left: 2px;
        color: rgb(51, 51, 51, 0.8);
      }
    }
    .status__emotional--child:hover .emotional {
      transform: scale(1.1);
    }
    .status__emotional--child:hover {
      background-color: rgb(219, 217, 217);
    }
  }
  .status__emotional--child {
    flex: 100%;
    text-align: center;
    padding: 20px 20px;
    cursor: pointer;
    transition: all 0.13s linear;
    .emotional {
      font-size: 1.5rem;
      transition: all 0.1s linear;
      padding-left: 2px;
      color: rgb(51, 51, 51, 0.8);
    }
    .status__emotional--liked {
      color: blue;
    }
  }
  .status__emotional--child:hover .emotional {
    transform: scale(1.1);
  }
  .status__emotional--child:hover {
    background-color: rgb(219, 217, 217);
  }
}

@import "../assets/css/emotional-color.scss";
</style>
