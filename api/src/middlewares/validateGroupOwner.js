const { User, ChatGroup } = require("../db");

const validateGroupOwner = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { id: userId, type: userType } = req.user;

    const group = await ChatGroup.findByPk(groupId, {
      include: [
        {
          model: User,
          through: {
            attributes: {
              exclude: ["chatGroupId", "createdAt", "updatedAt"],
            },
          },
          attributes: ["id"],
        },
      ],
    });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    req.group = group;

    if (userType === "admin") {
      next();
    } else {
      const plainGroup = group.toJSON();
      const currentUser = plainGroup.users.filter(
        (user) => user.id === userId
      );
      
      if (!currentUser || !currentUser.length) {
        return res.status(403).json({ error: "Not authorized" });
      }

      const currentUserRole = currentUser[0].userChatGroup.role;

      if (
        plainGroup.ownerId === userId ||
        currentUserRole === "moderator"
      ) {
        next();
      } else {
        return res.status(403).json({ error: "Not authorized" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = validateGroupOwner;
