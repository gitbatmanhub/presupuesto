import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(myPlaintextPassword) {
  return bcrypt.hash(myPlaintextPassword, saltRounds);
}

export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// const isMatch = await bcrypt.compare(password, hash);
