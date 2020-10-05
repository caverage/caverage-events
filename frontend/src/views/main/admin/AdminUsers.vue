<template>
    <div>
        <v-toolbar light>
            <v-toolbar-title style="padding-right: 10px;">
                Manage Users
            </v-toolbar-title>
            <v-text-field
                style="padding-bottom: 10px;"
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" to="/main/admin/users/create"
                >Create User</v-btn
            >
        </v-toolbar>
        <v-data-table :headers="headers" :items="users" :search="search">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.number }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.full_name }}</td>
                <td><v-icon v-if="props.item.is_active">checkmark</v-icon></td>
                <td>
                    <v-icon v-if="props.item.is_superuser">checkmark</v-icon>
                </td>
                <td class="justify-center layout 0px">
                    <v-tooltip top>
                        <span>View</span>
                        <v-btn
                            slot="activator"
                            flat
                            :to="{
                                name: 'main-admin-users-view',
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
                                name: 'main-admin-users-edit',
                                params: { id: props.item.id },
                            }"
                        >
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </v-tooltip>
                    <v-tooltip top>
                        <span>Delete</span>
                        <v-btn
                            slot="activator"
                            flat
                            @click="deleteUser(props.item.id)"
                        >
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
import { IUserProfile } from "@/interfaces";
import { readAdminUsers } from "@/store/admin/getters";
import { dispatchGetUsers, dispatchDeleteUser } from "@/store/admin/actions";

@Component
export default class AdminUsers extends Vue {
    public users: IUserProfile[] = [];
    public search: string = "";
    public headers = [
        {
            text: "ID",
            sortable: true,
            value: "id",
            align: "left",
        },
        {
            text: "Phone Number",
            sortable: true,
            value: "number",
            align: "left",
        },
        {
            text: "Email",
            sortable: true,
            value: "email",
            align: "left",
        },
        {
            text: "Full Name",
            sortable: true,
            value: "full_name",
            align: "left",
        },
        {
            text: "Is Active",
            sortable: true,
            value: "isActive",
            align: "left",
        },
        {
            text: "Is Superuser",
            sortable: true,
            value: "isSuperuser",
            align: "left",
        },
        {
            text: "Actions",
            sortable: false,
            value: "id",
            align: "center",
        },
    ];

    public async deleteUser(id: number) {
        await dispatchDeleteUser(this.$store, { user_id: id });
        await dispatchGetUsers(this.$store);
        this.users = readAdminUsers(this.$store);
    }

    public async mounted() {
        await dispatchGetUsers(this.$store);
        this.users = readAdminUsers(this.$store);
    }
}
</script>
