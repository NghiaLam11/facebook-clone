<template>
  <div class="create__story">
    <div @click="hidden" class="fixed"></div>
    <div class="create__story--content">
      <input
        @input="onCreateFile"
        type="file"
        name="file"
        id="file"
        class="inputfile"
      />
      <label for="file"
        ><i class="fas fa-images"></i>
        <div>Select a clip story</div></label
      >
      <button
        v-if="fileSize < 5000000"
        :disabled="file === null"
        class="btn"
        @click="onCreateStory"
      >
        Create
      </button>
      <span v-show="file !== '' && fileSize > 5000000"
        >can't add this file because the story is only accept short video!</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup(prop, { emit }) {
    const fileName = ref("");
    const file = ref(null);
    const fileSize = ref(0);
    const onCreateFile = (e: any) => {
      fileName.value = e.target.files[0].name;
      file.value = e.target.files[0];
      fileSize.value = e.target.files[0].size;
      console.log(e.target.files[0]);
    };
    const hidden = () => {
      emit("hidden");
    };
    const onCreateStory = async () => {
      emit("hidden");
      const story = ref({
        countAngry: 0,
        countSad: 0,
        countLove: 0,
        countLike: 0,
        countHaha: 0,
        countSurprise: 0,
        countDownTime: new Date().getTime(),
        isPublic: false,
        fileName: fileName.value,
        auth: user().value,
      });
      console.log(user().value);
      console.log(fileName.value, "kk");
      const fileArr = ref({
        fileName,
        file,
      });
      const data = await addStory(story.value, fileArr.value);
      fetchStories();
    };
    return {
      fileName,
      hidden,
      file,
      onCreateFile,
      onCreateStory,
      fileSize,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/css/variables.scss";
@import "../assets/css/fixed.scss";

.create__story {
  padding-top: 64px;
  z-index: 999;
  display: flex;
  justify-content: center;
  @include Fixed;
  align-items: center;
  background-color: transparent;
  .fixed {
    @include Fixed;
  }
  .create__story--content {
    z-index: 888;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 30%;
    height: 50%;
    background-image: linear-gradient(to bottom, #15b7e0, #f51ed1);
    text-align: center;
    border-radius: 20px;
    .btn {
      margin-top: 30px;
      background-color: transparent;
      border: 1px solid black;
      font-size: 1rem;
      padding: 5px 20px;
      border-radius: 2px;
      cursor: pointer;
    }
    .inputfile {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
    }
    .inputfile + label {
      font-size: 1.25rem;
      font-weight: 700;
      display: inline-block;
      cursor: pointer;
      transition: all 0.2s linear;
    }
    .inputfile + label:hover {
      font-size: 1.27rem;
    }
  }
}
</style>
