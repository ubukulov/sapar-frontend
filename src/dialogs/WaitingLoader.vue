<template>
    <v-overlay :value="this.$store.getters.getOverlay">
        <v-progress-circular
                indeterminate
                size="64"
        ></v-progress-circular>
    </v-overlay>
</template>

<script>
    export default {
        //
    }
</script>

<style scoped>

</style>