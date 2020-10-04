<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title style="padding-right: 10px;"
        >Manage Events</v-toolbar-title
      >
      <v-text-field
        style="padding-bottom: 10px;"
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/main/admin/events/create">Create Event</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="events" :search="search">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.date }}</td>
        <td>
          <span v-for="(invite, index) in props.item.invites" :key="index"
            ><span v-if="invite.status == 'YES'"
              >{{ invite.user.full_name
              }}<span v-if="index != props.item.invites.length - 1"
                >,
              </span></span
            ></span
          >
        </td>
        <td class="justify-center layout 0px">
          <v-tooltip top>
            <span>Invite</span>
            <v-btn
              slot="activator"
              flat
              :to="{
                name: 'main-admin-events-invite',
                params: { id: props.item.id },
              }"
            >
              <v-icon>person_add</v-icon>
            </v-btn>
          </v-tooltip>
          <v-tooltip top>
            <span>View</span>
            <v-btn
              slot="activator"
              flat
              :to="{
                name: 'main-admin-events-view',
                params: { id: props.item.id },
              }"
            >
              <v-icon>preview</v-icon>
            </v-btn>
          </v-tooltip>
          <v-tooltip top>
            <span>Edit</span>
            <v-btn
              slot="activator"
              flat
              :to="{
                name: 'main-admin-events-edit',
                params: { id: props.item.id },
              }"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </v-tooltip>
          <v-tooltip top>
            <span>Delete</span>
            <v-btn slot="activator" flat @click="deleteEvent(props.item.id)">
              <v-icon>delete</v-icon>
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
import { dispatchDeleteEvent, dispatchGetEvents } from "@/store/admin/actions";

@Component
export default class AdminEvents extends Vue {
  public events: IEvent[] = [];
  public search: string = "";
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
      align: "center",
    },
  ];

  public async deleteEvent(id: number) {
    await dispatchDeleteEvent(this.$store, { event_id: id });
    await dispatchGetEvents(this.$store);
    this.events = readAdminEvents(this.$store);
  }

  public async mounted() {
    await dispatchGetEvents(this.$store);
    this.events = readAdminEvents(this.$store);
  }
}
</script>
