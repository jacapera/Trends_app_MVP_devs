const { Image } = require("../../db");
const { getUserById } = require("../search.controllers");
const { putUserProfile } = require("../user.controllers");

module.exports = async (userId, userType, filename, path) => {
  let typeOfId;

  if (["student", "professional"].includes(userType)) {
    typeOfId = "userId";
  } else if (userType === "company") {
    typeOfId = "companyId";
  } else typeOfId = "adminId";

  const savedImage = await Image.create({
    [typeOfId]: userId,
    filename,
    filepath: path,
  });

  if (!savedImage) {
    return { error: "Failed to upload image" };
  }

  try {
    const currentProfile = await getUserById(userId);

    if (!currentProfile) {
      return { error: "User not found" };
    }

    let imageProp;

    if (currentProfile.type === "company") {
      imageProp = "image"
    } else imageProp = "profile_image"

    await putUserProfile(currentProfile, { [imageProp]: path });
  } catch (error) {
    return { error: error.message };
  }

  return { message: "Profile image updated" };
};
