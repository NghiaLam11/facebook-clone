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
        <!-- DISPLAY VALUE IN THE DATABASE RETURN -->
        <div class="status__emotional--display">
          <div
            v-for="e in item.userReact"
            :key="e.idAuth"
            :class="['status__emotional--child', e.nameEmotional]"
            v-show="idAuth === e?.idAuth && e.isReact === true"
            @click="
              onReact(item, {
                name: e.nameEmotional,
                style: e.styleEmotional,
              })
            "
            @mouseover="onDisplayEmotional(item)"
          >
            <i :class="e?.styleEmotional"></i>
          </div>
          <!-- Button Like -->
          <div
            @mouseover="onDisplayEmotional(item)"
            @click="
              onReact(item, {
                style: 'like emotional fas fa-thumbs-up',
                name: 'like',
              })
            "
            class="status__emotional--child"
          >
            <i class="emotional fas fa-thumbs-up"></i>
          </div>
        </div>
        <div @click="onDisplayComments(item)" class="status__emotional--child">
          <i class="emotional fas fa-comment-dots"></i>
        </div>
        <div class="status__emotional--child">
          <i class="emotional fas fa-share"></i>
        </div>
      </div>
    </div>
    <div v-if="isDisplayComments" class="status__comments">
      <StatusCreateComments @hideComments="onDisplayComments" :status="statusComment"/>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
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
      return statusStore().value;
      // .sort(function (a: any, b: any) {
      //   const date1 = new Date(a.uploadTime);
      //   const date2 = new Date(b.uploadTime);
      //   return Number(date1) + Number(date2);
      // });
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
    // HIDDEN EMOTIONAL WHEN YOU GO OUT LIKE BUTTON
    const onDisplayEmotionalOut = () => {
      idItem.value = "";
    };
    // EMOTIONALS
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
    // THIS VARIABLE IS (assign)
    const emotionalArr = ref();
    const onReact = async (item: any, react: any) => {
      fetchStatus();
      if (item.userReact.length > 0) {
        var hashMap = new Map();
        item.userReact.forEach((element: any) => {
          hashMap.set(element.idAuth, element);
        });
        if (
          hashMap.get(idAuth.value) !== undefined &&
          hashMap.get(idAuth.value).isReact === true
        ) {
          // (assign)
          emotionalArr.value = hashMap.get(idAuth.value);
          console.log("11");
        } else if (
          hashMap.get(idAuth.value) !== undefined &&
          hashMap.get(idAuth.value).isReact === false
        ) {
          //(assign)
          console.log("11f");
          emotionalArr.value = hashMap.get(idAuth.value);
        } else if (hashMap.get(idAuth.value) === undefined) {
          //(assign)
          emotionalArr.value = "";
          console.log("22");
        }
      } else if (item.userReact.length === 0) {
        //(assign)
        emotionalArr.value = "";
      }
      // HANDLE CLICK EMOTIONAL BUTTON
      if (item.userReact && emotionalArr.value === "") {
        console.log("empty");
        item.userReact.push({
          idAuth: idAuth.value,
          nameEmotional: react.name,
          styleEmotional: react.style,
          isReact: true,
        });
        const updateValue = ref({});
        if (react.name === "like") {
          updateValue.value = {
            countLike: ++item.countLike,
            userReact: item.userReact,
          };
        } else if (react.name === "love") {
          updateValue.value = {
            countLove: ++item.countLove,
            userReact: item.userReact,
          };
        } else if (react.name === "haha") {
          updateValue.value = {
            countHaha: ++item.countHaha,
            userReact: item.userReact,
          };
        } else if (react.name === "sad") {
          updateValue.value = {
            countSad: ++item.countSad,
            userReact: item.userReact,
          };
        } else if (react.name === "surprise") {
          updateValue.value = {
            countSurprise: ++item.countSurprise,
            userReact: item.userReact,
          };
        } else {
          updateValue.value = {
            countAngry: ++item.countAngry,
            userReact: item.userReact,
          };
        }
        const data = await updateStatus(updateValue.value, item.id);
        console.log(item.userReact);
      } else if (
        item.userReact &&
        emotionalArr.value.nameEmotional === react.name
      ) {
        console.log("name already");
        const index = item.userReact.indexOf(emotionalArr.value);
        console.log(index);
        item.userReact.splice(index, 1);
        if (
          emotionalArr.value.isReact === true &&
          emotionalArr.value.nameEmotional === react.name
        ) {
          item.userReact.push({
            idAuth: idAuth.value,
            nameEmotional: react.name,
            styleEmotional: react.style,
            isReact: false,
          });
        } else if (emotionalArr.value.isReact === false) {
          item.userReact.push({
            idAuth: idAuth.value,
            nameEmotional: react.name,
            styleEmotional: react.style,
            isReact: true,
          });
        }
        const updateValue = ref({});
        // IF THE OLD isReact === TRUE ==> MINUS
        if (emotionalArr.value.isReact === true) {
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
          // IF THE OLD isReact === FALSE ==> PLUS
        } else if (emotionalArr.value.isReact === false) {
          if (react.name === "like") {
            updateValue.value = {
              countLike: ++item.countLike,
              userReact: item.userReact,
            };
          } else if (react.name === "love") {
            updateValue.value = {
              countLove: ++item.countLove,
              userReact: item.userReact,
            };
          } else if (react.name === "haha") {
            updateValue.value = {
              countHaha: ++item.countHaha,
              userReact: item.userReact,
            };
          } else if (react.name === "sad") {
            updateValue.value = {
              countSad: ++item.countSad,
              userReact: item.userReact,
            };
          } else if (react.name === "surprise") {
            updateValue.value = {
              countSurprise: ++item.countSurprise,
              userReact: item.userReact,
            };
          } else {
            updateValue.value = {
              countAngry: ++item.countAngry,
              userReact: item.userReact,
            };
          }
        }
        const data = await updateStatus(updateValue.value, item.id);
        console.log(item.userReact);
      } else if (
        item.userReact &&
        emotionalArr.value.nameEmotional !== react.name
      ) {
        console.log("not equal");
        // (1) FIND THE INDEX TO DELETE THE VALUE OF THE INDEX IN ARR
        const index = item.userReact.indexOf(emotionalArr.value);
        console.log(index);
        item.userReact.splice(index, 1);
        //COMPLETED DELETE THE VALUE
        //
        //IF USER'S REACT IN STORE EQUAL TRUE AND NAME OF EMOTION EQUAL THE OLD VALUE
        // AND THEN PUSH THE NEW VALUE WITH THE isReact = true AFTER DELETED THE OLD ABOVE (1) VALUE
        if (
          emotionalArr.value.isReact === true &&
          emotionalArr.value.nameEmotional !== react.name
        ) {
          item.userReact.push({
            idAuth: idAuth.value,
            nameEmotional: react.name,
            styleEmotional: react.style,
            isReact: false,
          });
          //IF USER'S REACT IN STORE EQUAL TRUE THEN PUSH THE NEW VALUE WITH THE isReact = true AFTER DELETED THE OLD ABOVE (1) VALUE
        } else if (emotionalArr.value.isReact === false) {
          item.userReact.push({
            idAuth: idAuth.value,
            nameEmotional: react.name,
            styleEmotional: react.style,
            isReact: true,
          });
        }
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
          updateValue.value = {
            countLike: ++item.countLike,
            userReact: item.userReact,
            isReact: false,
          };
          updateEmotional(emotionalArr.value.nameEmotional);
        } else if (react.name === "love") {
          updateValue.value = {
            countLove: ++item.countLove,
            userReact: item.userReact,
          };
          updateEmotional(emotionalArr.value.nameEmotional);
        } else if (react.name === "haha") {
          updateValue.value = {
            countHaha: ++item.countHaha,
            userReact: item.userReact,
          };
          updateEmotional(emotionalArr.value.nameEmotional);
        } else if (react.name === "sad") {
          updateValue.value = {
            countSad: ++item.countSad,
            userReact: item.userReact,
          };
          updateEmotional(emotionalArr.value.nameEmotional);
        } else if (react.name === "surprise") {
          updateValue.value = {
            countSurprise: ++item.countSurprise,
            userReact: item.userReact,
          };
          updateEmotional(emotionalArr.value.nameEmotional);
        } else {
          updateValue.value = {
            countAngry: ++item.countAngry,
            userReact: item.userReact,
          };
          updateEmotional(emotionalArr.value.nameEmotional);
        }
        console.log(item.userReact);
        const data = await updateStatus(updateValue.value, item.id);
      }
      idItem.value = "";
    };
    //COMMENTS
    const statusComment = ref()
    const isDisplayComments = ref(false)
    const onDisplayComments = (status: any) => {
      isDisplayComments.value = !isDisplayComments.value;
      if(status){
         statusComment.value = status
      } else {
        return ''
      }
    }
    return {
      status,
      onUserStatus,
      isUserStatus,
      idAuth,
      auth,
      onDisplayEmotional,
      onDisplayEmotionalOut,
      idItem,
      emotionals,
      onReact,
      onDisplayComments,
      isDisplayComments,
      statusComment,
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
  position: relative;
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

    .status__emotional--display {
      flex: 100%;
      text-align: center;
      cursor: pointer;
      transition: all 0.13s linear;
      position: relative;
      .status__emotional--child {
        text-align: center;
        padding: 20px 20px;
        cursor: pointer;
        transition: all 0.13s linear;
        position: absolute;
        left: calc(50% - 26px);
        .emotional {
          font-size: 1.5rem;
          transition: all 0.1s linear;
          padding-left: 2px;
          color: rgb(51, 51, 51, 0.5);
        }

        @import "../assets/css/emotional-color.scss";
        // file scss style emotional color
      }
      .haha,
      .sad,
      .love,
      .surprise,
      .angry {
        background: transparent;
        scale: 1.2;
      }
      .status__emotional--child:hover {
        background-color: transparent;
      }
    }
    .status__emotional--display:hover {
      background-color: rgb(219, 217, 217);
      .status__emotional--child {
        .haha {
          z-index: 2;
          background-color: rgb(219, 217, 217);
          transform: scale(1.04);
          color: yellow;
        }
        .love {
          color: red;
          z-index: 2;
          background-color: rgb(219, 217, 217);
          transform: scale(1.04);
        }

        .sad {
          z-index: 2;
          background-color: rgb(219, 217, 217);
          color: rgb(255, 255, 78);
          transform: scale(1.01);
        }
        .surprise {
          z-index: 2;
          color: rgb(248, 212, 9);
          background-color: rgb(219, 217, 217);
          transform: scale(1.01);
        }
        .angry {
          z-index: 2;
          background-color: rgb(219, 217, 217);
          transform: scale(1.01);
          color: red;
        }
      }
    }
    .status__emotional--child:hover .emotional {
      transform: scale(1.1);
    }
    .status__emotional--child:hover {
      background-color: rgb(219, 217, 217);
    }
  }
}
.status__comments {
  z-index: 9999;
}
</style>
