// Create a Mongoose model for blacklisted tokens
const BlacklistTokenModel = mongoose.model('BlacklistToken', {
    token: String,
    createdAt: { type: Date, expires: '7d', default: Date.now } // Tokens will expire after 7 days
  });