const ChatGroup = require('../models/ChatGroup');

const GetRooms = async (request, response) => {
  try {
    const userId = request.query.userId;

    const userChatGroups = await ChatGroup.find({ UserID: { $in: [userId] } });

    const chatGroups = userChatGroups.map(group => ({
      groupId: group.ChatGroupID,
      groupName: group.ChatGroupName
    }));

    const responseData = {
      success: true,
      data: {
        chatGroups: chatGroups
      },
      error: {},
      status: 200
    };

    return response.json(responseData);
  } catch (error) {
    console.error('Error:', error);
    const responseData = {
      success: false,
      data: { message: 'Failed to find user\'s chat groups' },
      error: {},
      status: 500
    };
    return response.json(responseData);
  }
};

module.exports = { GetRooms };
