const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user.id,
    role: user.role,
    email: user.email,
    organizer: user.organizer,
  };
};

const createParticipant = (participant) => {
  return {
    lastName: participant.lastName,
    participantId: participant._id,
    firstname: participant.firstname,
    email: participant.email,
  };
};

module.exports = { createTokenUser, createParticipant };
