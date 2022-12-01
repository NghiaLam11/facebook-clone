<template>
  <div class="create__status">
    <div @click="onHidden" class="fixed"></div>
    <div class="create__status--child">
      <form @submit.prevent="onSubmit" class="create__form">
        <div class="field">
          <img
            class="content__center--avatar"
            :src="authContent?.avatar"
            alt=""
          />
          <div class="form__option">
            <div class="name__auth">
              {{ authContent?.fname }} {{ authContent?.lname }}
            </div>
            <select @change="onSelect" class="form__select">
              <option value="private">Only me!</option>
              <option value="public">Everyone!</option>
            </select>
          </div>
        </div>
        <div class="field">
          <textarea
            class="create__status--input"
            cols="40"
            rows="10"
            placeholder="What's on your mind?"
            v-model="text"
          ></textarea>
          <input
            @input="onCreateFile"
            type="file"
            name="file"
            id="file"
            class="inputfile"
          />
          <label for="file"><i class="fas fa-images"></i></label>
        </div>
        <div class="field">
          <button class="btn__submit">Upload</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    authContent: Object,
  },
  setup(prop, { emit }) {
    const text = ref("");
    const isPublic = ref(false);
    const onSelect = (e: any) => {
      if (e.target.value === "private") {
        isPublic.value = false;
      } else if (e.target.value === "public") {
        isPublic.value = true;
      }
    };
    const onHidden = () => {
      emit("hiddenStatus");
    };
    const fileName = ref("");
    const file = ref(null);
    const onCreateFile = (e: any) => {
      fileName.value = e.target.files[0].name;
      file.value = e.target.files[0];
    };
    const onSubmit = async () => {
      const status = ref({
        countAngry: 0,
        countSad: 0,
        countLove: 0,
        countLike: 0,
        countHaha: 0,
        countSurprise: 0,
        content: text.value,
        uploadTime: new Date().toLocaleDateString(),
        isPublic: isPublic.value,
        fileName: fileName.value,
        auth: prop.authContent,
      });
      const fileArr = ref({
        fileName,
        file,
      });
      emit("hiddenStatus");
      const data = await addStatus(status.value, fileArr.value)
    };
    return {
      text,
      onSelect,
      isPublic,
      onHidden,
      onSubmit,
      onCreateFile,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/css/fixed.scss";
@import "../assets/css/variables.scss";
.create__status {
  @include Fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  z-index: 9999;
  .fixed {
    @include Fixed;
    z-index: 888;
  }
  .create__status--child {
    z-index: 9999;
    background-color: $bg-color;
    padding: 20px;
    border-radius: 10px;
    .field {
      display: flex;
      flex-direction: column;
      .content__center--avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .create__status--input {
        padding: 5px;
        border: none;
        outline: none;
        box-shadow: 0 0 2px 0 black;
      }
      .btn__submit {
        padding: 5px;
        cursor: pointer;
      }
      .btn__submit:hover {
        background-color: greenyellow;
        border: 2px solid greenyellow;
        border-radius: 2px;
      }
      .form__option {
        margin-left: 5px;
        .form__select {
          background-color: rgb(192, 192, 192);
          border-radius: 2px;
        }
      }
    }
    .field:first-child {
      flex-direction: row;
      padding: 10px;
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
      font-size: 1.5rem;
      font-weight: 700;
      display: inline-block;
      cursor: pointer;
      transition: all 0.2s linear;
      margin: 5px;
      width: 27px;
    }
    .inputfile + label:hover {
      color: $text-color-active;
    }
  }
}
</style>
