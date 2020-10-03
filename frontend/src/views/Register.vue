<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>{{ appName }}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form @keyup.enter="submit">
                <v-text-field
                  @keyup.enter="submit"
                  v-model="number"
                  prepend-icon="phone"
                  name="number"
                  label="Phone Number"
                  type="text"
                  required
                ></v-text-field>
                <v-text-field
                  @keyup.enter="submit"
                  v-model="name"
                  prepend-icon="person"
                  name="name"
                  label="Name"
                  type="text"
                  required
                ></v-text-field>
                <v-checkbox
                  @keyup.enter="submit"
                  v-model="useEmail"
                  name="useEmail"
                  label="Use Email/Password Login?"
                ></v-checkbox>
                <v-text-field
                  v-if="useEmail"
                  @keyup.enter="submit"
                  v-model="email"
                  prepend-icon="mail"
                  name="email"
                  label="Email Address"
                  type="text"
                  required
                ></v-text-field>
                <v-text-field
                  v-if="useEmail"
                  @keyup.enter="submit"
                  v-model="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  required
                ></v-text-field>
              </v-form>
              <div v-if="loginError">
                <v-alert
                  :value="loginError"
                  transition="fade-transition"
                  type="error"
                >
                  Incorrect email or password
                </v-alert>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.prevent="submit">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { api } from "@/api";
import { appName } from "@/env";
import { readLoginError } from "@/store/main/getters";
import { dispatchRegister } from "@/store/main/actions";

@Component
export default class Login extends Vue {
  public valid = false;
  public number: string = "";
  public name: string = "";
  public email: string = "";
  public password: string = "";
  public useEmail: boolean = false;
  public appName = appName;

  public get loginError() {
    return readLoginError(this.$store);
  }

  public async submit() {
    if (await this.$validator.validateAll()) {
      dispatchRegister(this.$store, {
        number: this.number,
        name: this.name,
        username: this.email !== "" ? this.email : undefined,
        password: this.password !== "" ? this.password : undefined,
      });
    }
  }
}
</script>

<style></style>
