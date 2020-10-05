<template>
    <v-container fluid>
        <v-card class="ma-3 pa-3">
            <v-card-title primary-title>
                <div class="headline primary--text">Create Event</div>
            </v-card-title>
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
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IEvent, IEventUpdate, IEventCreate } from "@/interfaces";
import { dispatchGetEvents, dispatchCreateEvent } from "@/store/admin/actions";

@Component
export default class CreateUser extends Vue {
    public valid = false;
    public name: string = "";
    public description: string = "";
    public date: string = "";

    public async mounted() {
        await dispatchGetEvents(this.$store);
        this.reset();
    }

    public reset() {
        this.name = "";
        this.description = "";
        this.date = "";
        this.$validator.reset();
    }

    public cancel() {
        this.$router.back();
    }

    public async submit() {
        if (await this.$validator.validateAll()) {
            const updatedEvent: IEventCreate = {
                name: this.name,
                description: this.description,
                date: this.date,
            };
            await dispatchCreateEvent(this.$store, updatedEvent);
            this.$router.push("/main/admin/events");
        }
    }
}
</script>
