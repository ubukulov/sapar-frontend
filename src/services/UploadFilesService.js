import axios from "axios";
class UploadFilesService {
    upload(file, onUploadProgress) {
        let formData = new FormData();
        for(let i = 0; i<file.length; i++) {
            formData.append("file[]", file[i]);
        }

        return axios.post("http://194.4.56.241:8888/api/v1/tours/upload-preview", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        });
    }
    getFiles() {
        return axios.get("http://194.4.56.241:8888/api/v1/tours/upload/get-uploaded-files");
    }
}
export default new UploadFilesService();