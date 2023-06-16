import { useDispatch } from "react-redux";
import { convertToRaw } from "draft-js";
import { thunk_uploadImage } from "../stores/blogSlice";

export function useUploadBlogImage() {
  const dispatch = useDispatch();

  return async function uploadImageReplaceURL(contentState) {
    try {
      const rawContentState = convertToRaw(contentState);
      const entityMap = rawContentState.entityMap;
      let featureImage = null;

      for (let key in entityMap) {
        if (entityMap[key].type === "IMAGE") {
          const formData = new FormData();

          if (entityMap[key].data.src.startsWith("data:image")) {
            const base64Data = entityMap[key].data.src;
            const blob = await fetch(base64Data).then((res) => res.blob());
            const file = new File([blob], "imageBlog", { type: blob.type });
            formData.append("imageBlog", file);
          } else if (entityMap[key].data.src.startsWith("http")) {
            const url = entityMap[key].data.src;
            formData.append("url", url);
          }

          const public_id = await dispatch(thunk_uploadImage(formData));
          entityMap[key].data.src = public_id;
          entityMap[key].data.public_id = public_id;

          if (!featureImage) featureImage = entityMap[key].data.src;
        }
      }
      return featureImage;
    } catch (error) {
      throw error;
    }
  };
}
