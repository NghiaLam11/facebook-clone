<template>
  <div class="signup">
    <form @submit.prevent="onSignUp" class="form">
      <div class="title">
        Create an account
        <p>It's quick and easy</p>
      </div>
      <div class="field">
        <input v-model="fname" type="text" required />
        <label for="">First Name</label>
      </div>

      <div class="field">
        <input v-model="lname" type="text" required />
        <label for="">Last Name</label>
      </div>

      <div class="field">
        <input v-model="email" type="email" required />
        <label for="">Email Address</label>
      </div>

      <div class="field">
        <input v-model="password" type="password" required />
        <label for="">Password</label>
      </div>

      <div class="field">
        <input v-model="confirmPassword" type="password" required />
        <label for="">Confirm Password</label>
      </div>
      <div class="field">
        <input type="submit" value="Sign Up" />
      </div>

      <div class="signup-link">
        Already have a account?<NuxtLink to="/router-auth/signin">
          Login now</NuxtLink
        >
      </div>
    </form>
  </div>
</template>

<script setup>
const fname = ref("");
const lname = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const onSignUp = async () => {
  const user = ref({
    fname: fname.value,
    lname: lname.value,
    email: email.value,
    password: password.value,
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/facebook-clone-11056.appspot.com/o/profile-user.png?alt=media&token=18e5d821-bbbd-47a7-8a84-1418b4b06ad8",
    bio: "Set bio",
  });
  const signUp = await createUser(user.value);
};
fetchFirestore()
definePageMeta({
  layout: false,
});
</script>

<style lang="scss" scoped>
.title {
  font-size: 35px;
  font-weight: 600;
  text-align: left;
  color: #fff;
  user-select: none;
  border-radius: 15px 15px 0 0;
  background: #2b519a;
  padding: 32px;
}

.title p {
  font-size: 18px;
}

form {
  padding: 10px 30px 50px 30px;
}

form .field {
  height: 50px;
  width: 100%;
  margin-top: 20px;
  position: relative;
}

form .field input {
  height: 100%;
  width: 100%;
  outline: none;
  font-size: 17px;
  padding-left: 20px;
  border: 1px solid lightgray;
  transition: all 0.3s ease;
}

form .field input:focus,
form .field input:valid {
  border-color: #4158d0;
}
form .field label {
  position: absolute;
  top: 50%;
  left: 20px;
  color: #999999;
  font-weight: 400;
  font-size: 17px;
  pointer-events: none;
  transform: translateY(-50%);
  transition: all 0.3s ease;
}

form .field input:focus ~ label,
form .field input:valid ~ label {
  top: 0%;
  font-size: 16px;
  color: #4158d0;
  background: #fff;
  transform: translateY(-50%);
}

form .content {
  display: flex;
  width: 100%;
  height: 50px;
  font-size: 16px;
  align-items: center;
  justify-content: space-around;
}

form .content .checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
}

form .content input {
  width: 15px;
  height: 15px;
}

form .content label {
  color: #262626;
  user-select: none;
  padding-left: 5px;
}
</style>
