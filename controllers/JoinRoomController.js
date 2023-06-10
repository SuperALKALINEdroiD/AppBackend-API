const ChatGroup = require('../models/ChatGroup');

const JoinRoom = async (request, response) => {
    try {

        const chatGroupId = request.query.chatGroupId;
        const userId = request.query.userId;
        const roomName = request.query.roomName;

        let existingChatGroup = await ChatGroup.findOne({ ChatGroupID: chatGroupId });

        if (existingChatGroup) {
            const existingUser = existingChatGroup.UserID.includes(userId);

            if (!existingUser) {
                existingChatGroup.UserID.push(userId);
                await existingChatGroup.save();
            }

            const responseData = {
                success: true,
                data: { message: 'User joined existing chat group' },
                error: {},
                status: 200
            };

            return response.json(responseData);
        } else {

            let id_array = [];
            id_array[0]= userId;

            const newChatGroup = new ChatGroup({
                ChatGroupID: chatGroupId,
                ChatGroupName: roomName,
                UserID: id_array
            });

            await newChatGroup.save();

            const responseData = {
                success: true,
                data: { message: 'New chat group created' },
                error: {},
                status: 200
            };

            return response.json(responseData);
        }
    } catch (error) {
        console.error('Error:', error);
        const responseData = {
            success: false,
            data: { message: 'Failed to join or create chat group' },
            error: {},
            status: 500
        };
        return response.json(responseData);
    }
};

module.exports = { JoinRoom };
