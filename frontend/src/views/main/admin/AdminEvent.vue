<template>
    <v-container fluid>
        <v-card class="ma-3 pa-3">
            <v-card-title primary-title>
                <div class="headline primary--text">{{ event.name }}</div>
            </v-card-title>
            <v-card-text>
                <div class="my-4">
                    <div class="subheading secondary--text text--lighten-3">
                        Description
                    </div>
                    <div
                        class="title primary--text text--darken-2"
                        v-if="event && event.description"
                    >
                        {{ event.description }}
                    </div>
                    <div class="title primary--text text--darken-2" v-else>
                        -----
                    </div>
                </div>
            </v-card-text>
            <v-date-picker v-model="date" readonly>{{
                event.date
            }}</v-date-picker>
            <v-card-actions>
                <v-btn
                    :to="{
                        name: 'main-admin-events-edit',
                        params: { id: event.id },
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
import { readAdminOneEvent } from "@/store/admin/getters";

@Component
export default class AdminEvent extends Vue {
    get event() {
        return readAdminOneEvent(this.$store)(
            +this.$router.currentRoute.params.id
        );
    }

    public goToEdit() {
        this.$router.push("/main/admin/events/edit");
    }
}
</script>
