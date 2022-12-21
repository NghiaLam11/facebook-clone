<template>
  <div class="story__watch">
    <div @click="hidden" class="fixed"></div>
    <div class="story__watch--child">
      <div class="story">
        <i
          @click="onDeleteStory"
          v-if="story?.auth.id === idAuth"
          class="story__remove fas fa-trash"
        ></i>
        <video class="story__img" controls autoplay>
          <source :src="story?.video" type="video/mp4" />
        </video>
        <div class="story__emotional">
          <div class="story__emotional--child">
            <i @click="onLike" class="like fas fa-thumbs-up"
              ><span>{{ story?.countLike }}</span></i
            >
          </div>
          <div class="story__emotional--child">
            <i @click="onLove" class="love fas fa-heart"
              ><span>{{ story?.countLove }}</span></i
            >
          </div>
          <div class="story__emotional--child">
            <i @click="onHaha" class="haha fas fa-grin-squint"
              ><span>{{ story?.countHaha }}</span></i
            >
          </div>
          <div class="story__emotional--child">
            <i @click="onSad" class="sad fas fa-sad-tear"
              ><span>{{ story?.countSad }}</span></i
            >
          </div>
          <div class="story__emotional--child">
            <i @click="onSurprise" class="surprise fas fa-surprise"
              ><span>{{ story?.countSurprise }}</span></i
            >
          </div>
          <div class="story__emotional--child">
            <i @click="onAngry" class="angry fas fa-angry"
              ><span>{{ story?.countAngry }}</span></i
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    story: Object,
  },
  setup(prop, { emit }) {
    // console.log(prop.story);
    const hidden = () => {
      emit("hideStory");
    };
    const idAuth = computed(() => {
      return idUser().value;
    });
    const id = ref(prop.story?.id);
    const onDeleteStory = async () => {
      const data = await deleteStory(prop.story?.fileName, id.value);
      emit("hideStory");
    };
    const onLike = async () => {
      try {
        if (prop.story?.id) {
          const updateValue = ref({
            countLike: ++prop.story.countLike,
          });

          const data = await updateStory(updateValue.value, id.value);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const onLove = async () => {
      try {
        if (prop.story?.id) {
          const updateValue = ref({
            countLove: ++prop.story.countLove,
          });

          const data = await updateStory(updateValue.value, id.value);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const onHaha = async () => {
      try {
        if (prop.story?.id) {
          const updateValue = ref({
            countHaha: ++prop.story.countHaha,
          });

          const data = await updateStory(updateValue.value, id.value);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const onSad = async () => {
      try {
        if (prop.story?.id) {
          const updateValue = ref({
            countSad: ++prop.story.countSad,
          });

          const data = await updateStory(updateValue.value, id.value);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const onSurprise = async () => {
      try {
        if (prop.story?.id) {
          const updateValue = ref({
            countSurprise: ++prop.story.countSurprise,
          });

          const data = await updateStory(updateValue.value, id.value);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const onAngry = async () => {
      try {
        if (prop.story?.id) {
          const updateValue = ref({
            countAngry: ++prop.story.countAngry,
          });

          const data = await updateStory(updateValue.value, id.value);
        }
      } catch (error) {
        console.log(error);
      }
    };
    return {
      hidden,
      onLike,
      onLove,
      onHaha,
      onSad,
      onSurprise,
      idAuth,
      onAngry,
      onDeleteStory,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/css/fixed.scss";
@import "../assets/css/emotional-color.scss";
.haha,
.sad,
.love,
.surprise,
.angry {
  background-color: transparent;
}
.story__watch {
  @include Fixed;
  z-index: 999;
  background-color: transparent;
  .fixed {
    @include Fixed;
  }
  .story__watch--child {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100%;
    background-color: transparent;
    .story {
      width: 30%;
      height: 70%;
      background-color: black;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
      .story__remove {
        position: absolute;
        font-size: 1.2rem;
        top: 2%;
        right: 2%;
        z-index: 9999;
        color: red;
        cursor: pointer;
      }
      .story__remove:hover {
        font-size: 1.3rem;
      }
      .story__img {
        position: absolute;
        width: 100%;
        height: 105%;
      }
      .story__emotional {
        position: absolute;
        display: flex;
        justify-content: flex-start;
        bottom: 13%;
        z-index: 9999;
        width: 100%;
        i {
          width: 20px;
          font-size: 2rem;
          position: relative;
          cursor: pointer;
          opacity: 0.4;
          transition: all 0.1s linear;
          margin: 5px;
          span {
            position: absolute;
            font-size: 0.8rem;
            bottom: -40%;
            right: -40%;
          }
        }
        i:first-child {
          margin-left: 20px;
        }
        i:hover {
          transform: scale(1.1);
          opacity: 1;
        }
      }
    }
  }
}
</style>
