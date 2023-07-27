const {
  Professional,
  Profile,
  Academic,
  Info,
  InfoProfessional,
} = require("../db");

const postProfessional = async (profile, academic, info) => {
  const { company_name, position, ...etc } = info;
  try {
    const createdProfile = await Profile.create({ ...profile });
    const createdAcademic = await Academic.create({ ...academic });
    const createdInfo = await Info.create({ ...etc });
    const createdInfoProfessional = await InfoProfessional.create({
      company_name,
      position,
      infoId: createdInfo.id,
    });

    const professionalProfile = createdProfile.id;
    const professionalAcademic = createdAcademic.id;
    const professionalInfoId = createdInfo.id;
    const professionalInfoExtraId = createdInfoProfessional.id;

    await Professional.create({
      professionalProfile,
      professionalAcademic,
      professionalInfoId,
      professionalInfoExtraId,
    });

    const fullProfessional = await Info.findOne({
      where: { id: professionalInfoId },
      attributes: [
        "id",
        "career",
        "skills",
        "goals",
        "interests",
        "problematic",
        "languages",
        "availability",
        "contract",
      ],
      include: [
        {
          model: InfoProfessional,
          attributes: ["company_name", "position"],
        },
      ],
    });

    // La idea sería, unir todo en un solo objeto después
    fullProfessional.professionalInfo = fullProfessional.professionalInfo || {};
    fullProfessional.professionalInfo.company_name = company_name;
    fullProfessional.professionalInfo.position = position;

    return fullProfessional;
  } catch (error) {
    console.log(error);
  }
};

module.exports = postProfessional;
