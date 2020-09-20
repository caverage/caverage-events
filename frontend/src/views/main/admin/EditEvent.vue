<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit Event</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="Name" v-model="name" required></v-text-field>
            <v-text-field label="Description" v-model="description" required></v-text-field>
            <v-date-picker label="Date" v-model="date" required></v-date-picker>
          </v-form>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn @click="reset">Reset</v-btn>
        <v-btn @click="submit" :disabled="!valid">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IEvent, IEventUpdate } from "@/interfaces";
import { dispatchGetEvents, dispatchUpdateEvent } from "@/store/admin/actions";
import { readAdminOneEvent } from "@/store/admin/getters";

@Component
export default class EditEvent extends Vue {
  public valid = true;
  public name: string = "";
  public description: string = "";
  public date: string = "";

  public async mounted() {
    await dispatchGetEvents(this.$store);
    this.reset();
  }

  public reset() {
    this.$validator.reset();
    if (this.event) {
      this.name = this.event.name;
      this.description = this.event.description;
      this.date = this.event.date;
    }
  }

  public cancel() {
    this.$router.back();
  }

  public async submit() {
    if (await this.$validator.validateAll()) {
      const updatedEvent: IEventUpdate = {};
      if (this.name) {
        updatedEvent.name = this.name;
      }
      if (this.description) {
        updatedEvent.description = this.description;
      }
      if (this.date) {
        updatedEvent.date = this.date;
      }
      await dispatchUpdateEvent(this.$store, {
        id: this.event!.id,
        event: updatedEvent,
      });
      this.$router.push("/main/admin/events");
    }
  }

  get event() {
    return readAdminOneEvent(this.$store)(+this.$router.currentRoute.params.id);
  }
}
</script>
