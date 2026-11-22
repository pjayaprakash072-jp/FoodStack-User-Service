const KAFKA_TOPICS = {
  USER_REG_REQ:"user.registration.requested",
  USER_PROFILE_CREATED:"user.profile.created",
  USER_PROFILE_FAILED:"user.profile.failed",
}

const CONSUMER_TOPICS = {
  USER_REG_REQ:"user.registration.requested",
}
module.exports = {
  KAFKA_TOPICS,
  CONSUMER_TOPICS
};