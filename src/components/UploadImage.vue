<template>
    <v-container>
        <v-row no-gutters justify="center" align="center">
            <v-col cols="8">
                <v-file-input
                        show-size
                        label="Select Image"
                        accept="image/*"
                        multiple
                        @change="selectImage"
                ></v-file-input>
            </v-col>
            <!--<v-col cols="4" class="pl-2">
                <v-btn color="success" dark small @click="upload">
                    Upload
                    <v-icon right dark>mdi-cloud-upload</v-icon>
                </v-btn>
            </v-col>-->
        </v-row>
        <div v-if="progress">
            <div>
                <v-progress-linear
                        v-model="progress"
                        color="light-blue"
                        height="25"
                        reactive
                >
                    <strong>{{ progress }} %</strong>
                </v-progress-linear>
            </div>
        </div>

        <v-row
                v-if="images"
        >
            <v-col
                    v-for="(image, i) in images"
                    :key="i"
                    class="d-flex child-flex"
                    cols="4"
            >
                <v-img
                        :src="image.src"
                        aspect-ratio="1"
                        class="grey lighten-2"
                >
                    <template v-slot:placeholder>
                        <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                        >
                            <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                            ></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </v-col>
        </v-row>

        <v-alert v-if="message" border="left" color="blue-grey" dark>
            {{ message }}
        </v-alert>

        <!--<v-card v-if="imageInfos.length > 0" class="mx-auto">
            <v-list>
                <v-subheader>List of Images</v-subheader>
                <v-list-item-group color="primary">
                    <v-list-item v-for="(image, index) in imageInfos" :key="index">
                        <a :href="image.url">{{ image.name }}</a>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>-->
    </v-container>
</template>

<script>
    import UploadService from "../services/UploadFilesService";
    export default {
        name: "upload-image",
        data() {
            return {
                currentImage: undefined,
                previewImage: undefined,
                progress: 0,
                message: "",
                imageInfos: [],
                images: [],
                images2: [],
            }
        },
        mounted() {
            UploadService.getFiles().then(response => {
                this.imageInfos = response.data;
            });
        },
        methods: {
            selectImage(image) {
                this.images2 = image
                console.log('image', image);
                this.$emit('getImagesList', image);
                for(let i = 0; i<image.length; i++) {
                    //this.images[i] = URL.createObjectURL(image[i]);
                    this.images.push({
                        'src': URL.createObjectURL(image[i])
                    })
                }
                console.log('ss1', this.images)
                /*this.currentImage = image;
                console.log('ss1', this.images)
                this.previewImage = URL.createObjectURL(this.currentImage);*/
                this.progress = 0;
                this.message = "";

            },
            upload() {
                if (this.images.length === 0) {
                    this.message = "Пожалуйста, выберите картинку";
                    return;
                }
                this.progress = 0;
                UploadService.upload(this.images2, (event) => {
                    this.progress = Math.round((100 * event.loaded) / event.total);
                })
                    .then((response) => {
                        this.message = response.data.message;
                        return UploadService.getFiles();
                    })
                    .then((images) => {
                        this.imageInfos = images.data;
                    })
                    .catch((err) => {
                        this.progress = 0;
                        this.message = "Could not upload the image! " + err;
                        this.currentImage = undefined;
                    });
            },
        }
    };
</script>

<style scoped>

</style>