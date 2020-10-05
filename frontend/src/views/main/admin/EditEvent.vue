<template>
    <v-container fluid>
        <v-card class="ma-3 pa-3">
            <v-card-title primary-title>
                <div class="headline primary--text">{{ name }}</div>
                <v-btn @click="showBase = !showBase"
                    ><v-icon>{{
                        showBase ? "expand_less" : "expand_more"
                    }}</v-icon></v-btn
                >
            </v-card-title>
            <v-expand-transition>
                <div v-show="showBase">
                    <v-divider></v-divider>
                    <v-card-text>
                        <template>
                            <v-form v-model="valid" ref="form" lazy-validation>
                                <v-text-field
                                    label="Name"
                                    v-model="name"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    label="Description"
                                    v-model="description"
                                    required
                                ></v-text-field>
                                <v-date-picker
                                    label="Date"
                                    v-model="date"
                                    required
                                ></v-date-picker>
                            </v-form>
                        </template>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="cancel">Cancel</v-btn>
                        <v-btn @click="reset">Reset</v-btn>
                        <v-btn @click="submit" :disabled="!valid">Save</v-btn>
                    </v-card-actions>
                </div></v-expand-transition
            >
        </v-card>
        <v-card class="ma-3 pa-3">
            <v-card-title invites
                ><div class="headline primary--text">Invites</div>
                <v-btn @click="showInvites = !showInvites"
                    ><v-icon>{{
                        showInvites ? "expand_less" : "expand_more"
                    }}</v-icon></v-btn
                >
                <v-text-field
                    style="padding-bottom: 12px"
                    v-show="showInvites"
                    v-model="searchInvites"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                <v-btn
                    v-show="showInvites"
                    color="primary"
                    @click="sendSelectedReminders"
                    :disabled="!canSendReminders"
                    >Remind Selected<v-icon
                        >notification_important</v-icon
                    ></v-btn
                >
            </v-card-title>
            <v-expand-transition
                ><div v-show="showInvites">
                    <v-data-table
                        v-model="invitesSelected"
                        :headers="invitesHeaders"
                        :items="invites"
                        item-key="id"
                        select-all
                        :search="searchInvites"
                    >
                        <template slot="items" slot-scope="props">
                            <td>
                                <v-checkbox
                                    v-model="invitesSelected"
                                    :value="props.item"
                                    primary
                                    hide-details
                                ></v-checkbox>
                            </td>
                            <td>{{ props.item.user.id }}</td>
                            <td>{{ props.item.user.full_name }}</td>
                            <td>{{ props.item.user.number }}</td>
                            <td>{{ props.item.status }}</td>
                        </template>
                    </v-data-table>
                </div></v-expand-transition
            >
        </v-card>
        <v-card class="ma-3 pa-3">
            <v-card-title invites
                ><div class="headline primary--text">Invite People</div>
                <v-btn @click="showInvitePeople = !showInvitePeople"
                    ><v-icon>{{
                        showInvitePeople ? "expand_less" : "expand_more"
                    }}</v-icon></v-btn
                >
                <v-text-field
                    style="padding-bottom: 12px"
                    v-show="showInvitePeople"
                    v-model="searchInvitePeople"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                <v-btn
                    v-show="showInvitePeople"
                    color="primary"
                    @click="sendSelectedInvites"
                    :disabled="!canSendInvites"
                    >Invite Selected<v-icon>add_alert</v-icon></v-btn
                >
            </v-card-title>
            <v-expand-transition
                ><div v-show="showInvitePeople">
                    <template>
                        <v-data-table
                            v-model="invitePeopleSelected"
                            :headers="invitePeopleHeaders"
                            :items="uninvited"
                            item-key="id"
                            select-all
                            :search="searchInvitePeople"
                        >
                            <template slot="items" slot-scope="props">
                                <td>
                                    <v-checkbox
                                        v-model="invitePeopleSelected"
                                        :value="props.item"
                                        primary
                                        hide-details
                                    ></v-checkbox>
                                </td>
                                <td>{{ props.item.id }}</td>
                                <td>{{ props.item.full_name }}</td>
                                <td>{{ props.item.number }}</td>
                                <td>{{ props.item.email }}</td>
                            </template>
                        </v-data-table>
                    </template>
                </div></v-expand-transition
            >
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IEvent, IEventUpdate, IInvite, IUserProfile } from "@/interfaces";
import {
    dispatchGetUsers,
    dispatchGetEvents,
    dispatchUpdateEvent,
    dispatchSendInvites,
} from "@/store/admin/actions";
import { readAdminUsers, readAdminOneEvent } from "@/store/admin/getters";

@Component
export default class EditEvent extends Vue {
    /** Page Control */
    public showBase: boolean = false;
    public showInvites: boolean = false;
    public showInvitePeople: boolean = false;

    public searchInvites: string = "";
    public searchInvitePeople: string = "";

    /** Event Info */
    public valid = true;
    public id: number = -1;
    public name: string = "";
    public description: string = "";
    public date: string = "";

    /** Invites */
    public invitesSelected: [] = [];
    public invites: IInvite[] = [];
    public invitesHeaders = [
        {
            text: "ID",
            sortable: true,
            value: "user.id",
            align: "left",
        },
        {
            text: "Name",
            value: "user.full_name",
            sortable: true,
        },
        {
            text: "Phone Number",
            value: "user.number",
            sortable: true,
        },
        {
            text: "Invite Status",
            sortable: true,
            value: "status",
            align: "left",
        },
    ];

    /** Uninvited Users */
    public invitePeopleSelected: IUserProfile[] = [];
    public uninvited: IUserProfile[] = [];
    public invitePeopleHeaders = [
        {
            text: "ID",
            sortable: true,
            value: "id",
            align: "left",
        },
        { text: "Name", value: "full_name", sortable: true },
        { text: "Phone Number", value: "number", sortable: true },
        { text: "E-Mail", value: "email", sortable: true },
    ];

    public async mounted() {
        this.reset();
    }

    public async reset() {
        await dispatchGetUsers(this.$store);
        await dispatchGetEvents(this.$store);
        this.$validator.reset();
        if (this.event) {
            this.id = this.event.id;
            this.name = this.event.name;
            this.description = this.event.description;
            this.date = this.event.date;
            this.invites = this.event.invites;

            const invitedUsers: IUserProfile[] = [];

            this.invites.forEach((element) => {
                invitedUsers.push(element.user);
            });

            this.uninvited = this.users.filter((element) => {
                return !invitedUsers.find((element2) => {
                    return element.id === element2.id;
                });
            });
        }

        this.invitePeopleSelected = [];
        this.invitesSelected = [];
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
            this.reset();
        }
    }

    public async sendSelectedInvites() {
        if (this.canSendInvites) {
            const user_ids: number[] = [];
            this.invitePeopleSelected.forEach((element) => {
                user_ids.push(element.id);
            });
            await dispatchSendInvites(this.$store, {
                user_ids: user_ids,
                event_id: this.id,
            });
            this.reset();
        }
    }

    get canSendInvites() {
        return this.invitePeopleSelected.length > 0;
    }

    get canSendReminders() {
        return this.invitesSelected.length > 0;
    }

    get event() {
        return readAdminOneEvent(this.$store)(
            +this.$router.currentRoute.params.id
        );
    }

    get users() {
        return readAdminUsers(this.$store);
    }
}
</script>
