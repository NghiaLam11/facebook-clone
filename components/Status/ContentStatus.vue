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
          <div
            v-for="emotional in emotionals"
            :key="emotional.name"
            class="status__emotional--hide--child"
          >
            <i @click="onReact(item, emotional)" :class="emotional.style"></i>
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
            @mouseover="onDisplayEmotional(item)"
            class="status__emotional--child"
          >
            <i
              v-show="idAuth === e?.idAuth"
              @click="
                onReact(item, {
                  name: e.nameEmotional,
                  style: e.styleEmotional,
                })
              "
              :class="e?.styleEmotional"
            ></i>
          </div>
        </div>
        <div
          v-for="e in item.userReact"
          :key="e.idAuth"
          class="status__emotional--child"
          @mouseover="onDisplayEmotional(item)"
          @click="
            onReact(item, {
              style: 'like emotional fas fa-thumbs-up',
              name: 'like',
            })
          "
        >
          <i
            v-if="idAuth === e?.idAuth && e?.nameEmotional === 'like'"
            class="status__emotional--liked like emotional fas fa-thumbs-up"
          ></i>
          <i
            v-if="idAuth === e?.idAuth && e?.nameEmotional === 'like'"
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
// Fixe click thi user khac bi an mat nut click
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
    const emotionals = ref([
      {
        style: "like emotional fas fa-thumbs-up",
        name: "like",
      },
      {
        name: "love",
        style: "love emotional fas fa-heart",
      },
      {
        name: "haha",
        style: "haha emotional fas fa-grin-squint",
      },
      {
        name: "sad",
        style: "sad emotional fas fa-sad-tear",
      },
      {
        name: "surprise",
        style: "surprise emotional fas fa-surprise",
      },
      {
        name: "angry",
        style: "angry emotional fas fa-angry",
      },
    ]);
    const isReact = ref();
    const emotionalName = ref("");
    const a = computed(() => {
      status.value.forEach((e: any) => {
        if (e.userReact.length === 0) {
        }
      });
    });
    const onReact = async (item: any, react: any) => {
      if (react.name === "like") {
        isReact.value = false;
      }
      if (item.userReact.length < 2) {
        emotionalName.value = "";
      } else if (item.userReact.length > 0) {
        console.log(item.userReact);
        item.userReact.forEach((element: any) => {
          if (element.idAuth === idAuth.value) {
            emotionalName.value = element.nameEmotional;
            console.log("11");
          } else {
            emotionalName.value = "";
            console.log("22");
          }
        });
      } else if (item.userReact.length === 0) {
        emotionalName.value = "";
      }
      const onPushUserReact = () => {
        if (react.name === "like") {
          item.userReact.push({
            idAuth: idAuth.value,
            nameEmotional: react.name,
            styleEmotional: react.style,
            isReact: false,
          });
        } else {
          item.userReact.push({
            idAuth: idAuth.value,
            nameEmotional: react.name,
            styleEmotional: react.style,
            isReact: true,
          });
        }
      };
      // HANDLE CLICK EMOTIONAL BUTTON
      if (item.userReact && emotionalName.value === "") {
        console.log("empty");
        const index = item.userReact.indexOf("all");
        item.userReact.splice(index, 1);
        const updateValue = ref({});
        if (react.name === "like") {
          updateValue.value = {
            countLike: ++item.countLike,
            userReact: item.userReact,
          };
        } else if (react.name === "love") {
          onPushUserReact();

          updateValue.value = {
            countLove: ++item.countLove,
            userReact: item.userReact,
          };
        } else if (react.name === "haha") {
          onPushUserReact();

          updateValue.value = {
            countHaha: ++item.countHaha,
            userReact: item.userReact,
          };
        } else if (react.name === "sad") {
          onPushUserReact();

          updateValue.value = {
            countSad: ++item.countSad,
            userReact: item.userReact,
          };
        } else if (react.name === "surprise") {
          onPushUserReact();

          updateValue.value = {
            countSurprise: ++item.countSurprise,
            userReact: item.userReact,
          };
        } else {
          onPushUserReact();

          updateValue.value = {
            countAngry: ++item.countAngry,
            userReact: item.userReact,
          };
        }
        const data = await updateStatus(updateValue.value, item.id);
        console.log(item.userReact);
      } else if (item.userReact && emotionalName.value === react.name) {
        console.log("name already");
        const index = item.userReact.indexOf(idAuth);
        item.userReact.splice(index, 1);
        const updateValue = ref({});
        if (react.name === "like") {
          updateValue.value = {
            countLike: --item.countLike,

            userReact: item.userReact,
          };
        } else if (react.name === "love") {
          updateValue.value = {
            countLove: --item.countLove,
            userReact: item.userReact,
          };
        } else if (react.name === "haha") {
          updateValue.value = {
            countHaha: --item.countHaha,
            userReact: item.userReact,
          };
        } else if (react.name === "sad") {
          updateValue.value = {
            countSad: --item.countSad,
            userReact: item.userReact,
          };
        } else if (react.name === "surprise") {
          updateValue.value = {
            countSurprise: --item.countSurprise,
            userReact: item.userReact,
          };
        } else {
          updateValue.value = {
            countAngry: --item.countAngry,
            userReact: item.userReact,
          };
        }
        const data = await updateStatus(updateValue.value, item.id);
        console.log(item.userReact);
      } else if (item.userReact && emotionalName.value !== react.name) {
        console.log("empty name");
        const index = item.userReact.indexOf(idAuth);
        item.userReact.splice(index, 1);
        //VARIABLE UPDATE FIREBASE STORE
        const updateValue = ref({});
        // THIS FUNC WILL MINUS THE OLD COUNT EMOTIONAL VALUE and PLUS the new count value
        const updateEmotional = (emotional: any) => {
          if (emotional === "like") {
            updateValue.value = {
              ...updateValue.value,
              countLike: --item.countLike,
            };
          } else if (emotional === "love") {
            updateValue.value = {
              ...updateValue.value,
              countLove: --item.countLove,
            };
          } else if (emotional === "sad") {
            updateValue.value = {
              ...updateValue.value,
              countSad: --item.countSad,
            };
          } else if (emotional === "haha") {
            updateValue.value = {
              ...updateValue.value,
              countHaha: --item.countHaha,
            };
          } else if (emotional === "surprise") {
            updateValue.value = {
              ...updateValue.value,
              countSurprise: --item.countSurprise,
            };
          } else if (emotional === "angry") {
            updateValue.value = {
              ...updateValue.value,
              countAngry: --item.countAngry,
            };
          }
        };
        if (react.name === "like") {
          onPushUserReact();

          updateValue.value = {
            countLike: ++item.countLike,
            userReact: item.userReact,
            isReact: false,
          };
          updateEmotional(emotionalName.value);
        } else if (react.name === "love") {
          onPushUserReact();

          updateValue.value = {
            countLove: ++item.countLove,
            userReact: item.userReact,
          };
          updateEmotional(emotionalName.value);
        } else if (react.name === "haha") {
          onPushUserReact();

          updateValue.value = {
            countHaha: ++item.countHaha,
            userReact: item.userReact,
          };
          updateEmotional(emotionalName.value);
        } else if (react.name === "sad") {
          onPushUserReact();

          updateValue.value = {
            countSad: ++item.countSad,
            userReact: item.userReact,
          };
          updateEmotional(emotionalName.value);
        } else if (react.name === "surprise") {
          onPushUserReact();

          updateValue.value = {
            countSurprise: ++item.countSurprise,
            userReact: item.userReact,
          };
          updateEmotional(emotionalName.value);
        } else {
          onPushUserReact();

          updateValue.value = {
            countAngry: ++item.countAngry,
            userReact: item.userReact,
          };
          updateEmotional(emotionalName.value);
        }
        console.log(item.userReact);

        const data = await updateStatus(updateValue.value, item.id);
      }
      idItem.value = "";
    };
    return {
      status,
      onUserStatus,
      isUserStatus,
      isReact,
      idAuth,
      auth,
      onDisplayEmotional,
      onDisplayEmotionalOut,
      idItem,
      emotionals,
      onReact,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/css/variables.scss";
@import "../assets/css/emotional-color.scss";
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
    top: -75%;
    animation: emotional 1s ease-in-out;
    display: flex;
    justify-content: space-between;
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
      @import "../assets/css/emotional-color.scss"; // file scss style emotional color
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
.angry {
  color: red;
}
</style>
