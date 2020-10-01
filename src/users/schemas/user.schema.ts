import * as mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import paginate from 'mongoose-paginate-v2';
export const UserSchema = new mongoose.Schema({
    fullName: String,
    appToken: String,
    username: String,
    password: String,
    company: String,
    roles: [String]
});
UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(paginate);