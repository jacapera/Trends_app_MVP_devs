const { Student, Profile, Academic, Info } = require("../db");

const postStudent = async (profile, academic, info) => {
  try {
    const createdProfile = await Profile.create({...profile});
    const createdAcademic = await Academic.create({...academic});
    const createdInfo = await Info.create({...info});

    const studentProfile = createdProfile.id;
    const studentAcademic = createdAcademic.id;
    const studentInfo = createdInfo.id;

    await Student.create({
      studentProfile,
      studentAcademic,
      studentInfo,
    });

    const fullStudent = await Student.findOne({
      attributes: ["id"],
      include: [
        {
          model: Profile,
          where: {
            id: studentProfile,
          },
        },
        {
          model: Academic,
          where: {
            id: studentAcademic,
          },
        },
        {
          model: Info,
          where: {
            id: studentInfo,
          },
        },
      ],
    });
    
    return fullStudent;
  } catch (error) {
    console.log(error);
  }
};

module.exports = postStudent;
