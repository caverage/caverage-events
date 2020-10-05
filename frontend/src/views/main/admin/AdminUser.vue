<template>
    <v-container fluid>
        <v-card class="ma-3 pa-3">
            <v-card-title primary-title>
                <div class="headline primary--text">User Profile</div>
            </v-card-title>
            <v-card-text>
                <div class="my-4">
                    <div class="subheading secondary--text text--lighten-3">
                        Full Name
                    </div>
                    <div
                        class="title primary--text text--darken-2"
                        v-if="userProfile && userProfile.full_name"
                    >
                        {{ userProfile.full_name }}
                    </div>
                    <div class="title primary--text text--darken-2" v-else>
                        -----
                    </div>
                </div>
                <div class="my-3">
                    <div class="subheading secondary--text text--lighten-3">
                        Email
                    </div>
                    <div
                        class="title primary--text text--darken-2"
                        v-if="userProfile && userProfile.email"
                    >
                        {{ userProfile.email }}
                    </div>
                    <div class="title primary--text text--darken-2" v-else>
                        -----
                    </div>
                </div>
                <div class="my-3">
                    <div class="subheading secondary--text text--lighten-3">
                        Phone Number
                    </div>
                    <div
                        class="title primary--text text--darken-2"
                        v-if="userProfile && userProfile.number"
                    >
                        {{ userProfile.number }}
                    </div>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    :to="{
                        name: 'main-admin-users-edit',
                        params: { id: userProfile.id },
                    }"
                    >Edit</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Store } from "vuex";
import { readAdminOneUser } from "@/store/admin/getters";

@Component
export default class AdminUser extends Vue {
    get userProfile() {
        return readAdminOneUser(this.$store)(
            +this.$router.currentRoute.params.id
        );
    }

    public goToEdit() {
        this.$router.push("/main/admin/users/edit");
    }
}
</script>
