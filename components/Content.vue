<template>
  <div class="container">
    <div class="content__left">
      <NuxtLink :to='`/router-auth/user/${authContent?.id}`' class="content__left--info">
        <img class="content__left--avatar" :src="authContent?.avatar" alt="" />
        <h2 class="content__left--name">
          {{ authContent?.fname }} {{ authContent?.lname }}
        </h2>
      </NuxtLink>
      <NuxtLink
        class="content__left--router"
        v-for="router in leftRouters"
        :key="router.name"
        :to="router.path"
        ><i :class="router.icon"></i>{{ router.name }}</NuxtLink
      >
    </div>
    <div class="content__center">
      <div class="content__center--story">
        <button
          v-if="horizon !== 0"
          class="story__scroll--less"
          @click="scrollStoryLess"
        >
          Less
        </button>
        <div ref="element" class="content__story">
          <div class="story__create">
            <img class="story__img" :src="authContent?.avatar" alt="" />
            <div class="icon__create" @click="onCreateStoryContent">+</div>
            <div class="para__create">Create story</div>
          </div>

          <div
            v-for="story in storiesContent"
            :key="story.id"
            class="story__create"
          >
            <video @click="onStory(story)" class="story__img">
              <source :src="story?.video" type="video/mp4" />
            </video>
            <img class="icon__story" :src="story?.auth.avatar" alt="" />
            <div class="name__story">
              {{ story?.auth.fname }} {{ story?.auth.lname }}
            </div>
          </div>
        </div>
        <button
          v-if="(storiesContent.length + 1) * 130 > element?.offsetWidth"
          class="story__scroll--more"
          @click="scrollStoryMore"
        >
          More
        </button>
      </div>
      <div class="content__center--status">
        <NuxtLink  :to='`/router-auth/user/${authContent?.id}`'
          ><img
            class="content__center--avatar"
            :src="authContent?.avatar"
            alt=""
        /></NuxtLink>
        <div class="create__status" @click="onShowStatus">
          What's on your mind, {{ authContent?.fname }}
          {{ authContent?.lname }}?
        </div>
      </div>
      <div>
        <StatusContentStatus/>
      </div>
    </div>
    <StoriesDisplayStory
      @hideStory="hideStory"
      :story="story"
      v-if="isShowStory"
    />
    <StoriesCreateStory @hidden="hidden" v-if="isShowCreateStory" />
    <StatusCreateStatus
      @hiddenStatus="hiddenStatus"
      :authContent="authContent"
      v-if="isShowCreateStatus"
    />
    <div class="content__right"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Story from "../composables/type/Story";
export default defineComponent({
  setup() {
    const isShowCreateStatus = ref(false);
    const onShowStatus = () => {
      isShowCreateStatus.value = true;
    };
    const hiddenStatus = () => {
      isShowCreateStatus.value = false;
    };
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    const isShowStory = ref(false);
    const storyOfDisplay = ref<Story>();
    const onStory = (story: any) => {
      storyOfDisplay.value = story;
      isShowStory.value = true;
    };
    const hideStory = () => {
      isShowStory.value = false;
    };
    const story = computed(() => {
      return storyOfDisplay.value;
    });
    const horizon = ref(0);
    const element = ref();
    const scrollStoryMore = () => {
      var element = document.querySelector(".content__story");
      if (element !== null && element.scrollWidth - horizon.value < 500) {
        // 500 la so tu cho
        horizon.value = 0;
        element.scrollLeft = horizon.value;
        // horizon.value = element.scrollLeft;
        // console.log(element.scrollLeft);
      } else if (element !== null) {
        horizon.value += 500;
        element.scrollLeft = horizon.value;
        // console.log(element.scrollWidth, horizon.value, element.scrollLeft);
      }
    };

    const scrollStoryLess = () => {
      var element = document.querySelector(".content__story");
      if (element !== null && horizon.value >= 0) {
        horizon.value -= 500;
        element.scrollLeft = horizon.value;
        // console.log(horizon.value);
      } else if (element !== null) {
        horizon.value = 0;
      }
    };
    const hidden = () => {
      isShowCreateStory.value = false;
    };
    const isShowCreateStory = ref(false);
    const onCreateStoryContent = () => {
      isShowCreateStory.value = true;
    };
    fetchStories();
    const authContent = computed(() => {
      return user().value;
    });
    const storiesContent = computed(() => {
      return stories().value;
    });
    const leftRouters = ref([
      {
        name: "Friends",
        path: "/friends",
        icon: "fas fa-user-friends blue",
      },
      {
        name: "Saved",
        path: "/saved",
        icon: "fas fa-bookmark pink-aqua",
      },
      {
        name: "Pages",
        path: "/pages",
        icon: "fas fa-flag org-red",
      },
      {
        name: "Groups",
        path: "/groups",
        icon: "fas fa-layer-group blue",
      },
      {
        name: "Events",
        path: "/events",
        icon: "fas fa-calendar-alt blue-aqua",
      },
      {
        name: "Favorites",
        path: "/favorites",
        icon: "fas fa-star yellow",
      },
    ]);
    return {
      onStory,
      scrollStoryMore,
      scrollStoryLess,
      hidden,
      onCreateStoryContent,
      isShowCreateStory,
      authContent,
      storiesContent,
      leftRouters,
      horizon,
      isShowStory,
      story,
      hideStory,
      element,
      onShowStatus,
      isShowCreateStatus,
      hiddenStatus,
    };
  },
});
</script>

<!-- <script setup lang="ts">
const horizon = ref(0);
const onStory = (story: any) => {
console.log(story)
}
const scrollStoryMore = () => {
  var element = document.querySelector(".content__story");
  horizon.value += 500;
  if (element !== null) {
    element.scrollLeft = horizon.value;
  }
};
const scrollStoryLess = () => {
  var element = document.querySelector(".content__story");
  horizon.value -= 500;
  if (element !== null) {
    element.scrollLeft = horizon.value;
  }
};
const hidden = () => {
  isShowCreateStory.value = false;
};
const isShowCreateStory = ref(false);
const onCreateStoryContent = () => {
  isShowCreateStory.value = true;
};
fetchStories();
const authContent = computed(() => {
  return user().value;
});
const storiesContent = computed(() => {
  return stories().value;
});
const leftRouters = ref([
  {
    name: "Friends",
    path: "/friends",
    icon: "fas fa-user-friends blue",
  },
  {
    name: "Saved",
    path: "/saved",
    icon: "fas fa-bookmark pink-aqua",
  },
  {
    name: "Pages",
    path: "/pages",
    icon: "fas fa-flag org-red",
  },
  {
    name: "Groups",
    path: "/groups",
    icon: "fas fa-layer-group blue",
  },
  {
    name: "Events",
    path: "/events",
    icon: "fas fa-calendar-alt blue-aqua",
  },
  {
    name: "Favorites",
    path: "/favorites",
    icon: "fas fa-star yellow",
  },
]);
</script> -->

<style lang="scss" scoped>
@import "../assets/css/variables.scss";
@mixin Gradient {
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
.blue {
  background-image: linear-gradient(to bottom, #1e22f5, #15e0c5);
  @include Gradient;
}
.pink-aqua {
  background-image: linear-gradient(to bottom, #f51ed1, #15b7e0);
  @include Gradient;
}
.org-red {
  background-image: linear-gradient(to bottom, #f5911e, #e01515);
  @include Gradient;
}
.blue-aqua {
  background-image: linear-gradient(to bottom, #1ef5ea, #15e0c5);
  @include Gradient;
}
.yellow {
  background-image: linear-gradient(to bottom, #f1f51e, #e09915);
  @include Gradient;
}
.container {
  display: flex;
  .content__left {
    display: flex;
    flex-direction: column;
    flex: 25%;
    overflow: scroll;
    height: 100vh;
    .content__left--info {
      margin: 10px;
      display: flex;
      align-items: center;
      .content__left--name {
        font-size: 2rem;
        color: #2e00fc;
      }
      .content__left--avatar {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .content__left--router {
      font-size: 1.4rem;
      padding: 10px 20px;
    }
    .content__left--router:hover {
      background-color: rgb(226, 223, 223);
    }
  }
  .content__center {
    padding-top: 20px;
    height: 110vh;
    flex: 55%;
    overflow-y: scroll;
    .content__center--story {
      display: flex;
      position: relative;
      height: 220px;
      width: 100%;
      overflow: hidden;
      .story__scroll--less {
        position: absolute;
        z-index: 8;
        height: 100%;
        border: none;
        box-shadow: 0px 0px 50px 10px #ffffff;
        width: 50px;
        opacity: 0.95;
      }
      .story__scroll--more {
        position: absolute;
        right: 0;
        z-index: 8;
        height: 100%;
        width: 50px;
        border: none;
        box-shadow: 0px 0px 50px 10px #ffffff;
      }
      .content__story::-webkit-scrollbar {
        display: none;
      }
      .content__story {
        background-color: $bg-color;
        border-radius: 9px;
        position: absolute;
        display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;
        padding: 10px;
        width: 100%;
        overflow: hidden;
        .story__create {
          height: 200px;
          width: 130px;
          margin: 0 3px;
          position: relative;
          cursor: pointer;
          .story__img {
            border-radius: 10px;
            height: 200px;
            width: 130px;
            object-fit: cover;
            z-index: 8888;
          }
          .icon__create {
            animation: shadow 4s infinite;
            padding: 9px 20px;
            font-size: 3rem;
            position: absolute;
            color: $bg-color;
            border-radius: 50%;
            background-color: $text-color-active;
            bottom: 20%;
            left: calc(50% - (68.8px / 2));
            cursor: pointer;
            opacity: 0.7;
          }
          @keyframes shadow {
            0% {
              box-shadow: 0 0 10px aqua;
            }
            30% {
              box-shadow: 0 0 90px $text-color-active;
            }
            70% {
              box-shadow: 0 0 50px $text-color-active;
            }
            100% {
              box-shadow: 0 0 10px #15b7e0;
            }
          }
          @keyframes shadowStory {
            0% {
              box-shadow: 0 0 10px rgb(0, 140, 255);
            }
            30% {
              box-shadow: 0 0 90px #2e00fc;
            }
            70% {
              box-shadow: 0 0 50px rgb(151, 23, 255);
            }
            100% {
              box-shadow: 0 0 10px rgb(183, 0, 255, 0.5);
            }
          }
          .icon__create:hover {
            transform: scale(1.05);
            transition: all 0.2s linear;
          }
          .para__create {
            position: absolute;
            color: $bg-color;
            bottom: 10%;
            left: calc(50% - (88.8px / 2));
          }
          .icon__story {
            animation: shadowStory 4s infinite;
            padding: 1px;
            width: 40px;
            height: 40px;
            position: absolute;
            color: $bg-color;
            border-radius: 50%;
            background-color: gray;
            top: 4%;
            left: 4%;
            cursor: pointer;
            object-fit: cover;
          }
          .name__story {
            font-size: 0.8rem;
            position: absolute;
            color: rgb(214, 209, 209);
            bottom: 10%;
            left: calc(50% - (88.8px / 2));
            user-select: none;
          }
        }
      }
    }
    .content__center--status {
      border-radius: 10px;
      margin-top: 20px;
      padding: 5px;
      background-color: $bg-color;
      display: flex;
      align-items: center;
      .content__center--avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .create__status {
        background-color: #e1e4e4;
        margin: 0 10px;
        padding: 10px 20px;
        flex: 70%;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.1s linear;
      }
      .create__status:hover {
        background-color: #c6c9c9;
      }
    }
  }
  .content__right {
    overflow: scroll;
    flex: 20%;
  }
  .content__left::-webkit-scrollbar {
    display: none;
  }
  .content__center::-webkit-scrollbar {
    display: none;
  }
  .content__right::-webkit-scrollbar {
    display: none;
  }
}
</style>
