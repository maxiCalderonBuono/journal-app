import toast from "react-hot-toast";

export const fileUploader = async (file) => {

    const cloudURL = "https://api.cloudinary.com/v1_1/dvqlenul5/upload"

    const formData= new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file)

    try {

     const resp = await fetch (cloudURL,{
         method: 'POST',
         body: formData
     })

     if (resp.ok) {
         const cloudResp = await resp.json()
         return cloudResp.secure_url;
     }

    } catch (error) {
      toast.error('Can not perform image uploading')
    }
}