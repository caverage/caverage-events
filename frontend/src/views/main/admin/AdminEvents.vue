<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title>Manage Events</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/main/admin/events/create">Create Event</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="users">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.date }}</td>
        <td>{{ props.item.attendees }}</td>
        <td class="justify-center">
          <v-tooltip top>
            <span>View</span>
            <v-btn
              slot="activator"
              flat
              :to="{name: 'main-admin-events-view', params: {id: props.item.id}}"
            >
              <v-icon>preview</v-icon>
            </v-btn>
          </v-tooltip>
          <v-tooltip top>
            <span>Edit</span>
            <v-btn
              slot="activator"
              flat
              :to="{name: 'main-admin-events-edit', params: {id: props.item.id}}"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </v-tooltip>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Store } from "vuex";
import { IEvent } from "@/interfaces";
import { readAdminEvents } from "@/store/admin/getters";
import { dispatchGetEvents } from "@/store/admin/actions";

@Component
export default class AdminUsers extends Vue {
  public headers = [
    {
      text: "Name",
      sortable: true,
      value: "name",
      align: "left",
    },
    {
      text: "Date",
      sortable: true,
      value: "date",
      align: "left",
    },
    {
      text: "Attendees",
      sortable: true,
      value: "attendees",
      align: "left",
    },
    {
      text: "Actions",
      value: "id",
    },
  ];
  get users() {
    return readAdminEvents(this.$store);
  }

  public async mounted() {
    await dispatchGetEvents(this.$store);
  }
}
</script>
