import mongoose, { Document, Schema, model, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const saltRounds = 12;

export interface IUser extends Document<Types.ObjectId> {
    name: string;
    email: string;
    password: string;
    role: 'user';
    authMethod: 'self' | 'google' | 'github';
    profileurl: string;
    emailVerified: boolean;
    passwordResetToken?: string;
    passwordResetTokenExpires?: Date;
    lastChangedPassword: Date;
    verificationToken?: string;
    correctPassword: (candidatePassword: string) => Promise<boolean>;
    checkPasswordchanged: (JWTTimestamp: number) => boolean;
    getPasswordResetToken: () => string;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: {
            type: String,
            required: function () {
                return this.authMethod === 'self';
            },
            select: false
        },
        role: {
            type: String,
            enum: ['user'],
            default: 'user'
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        authMethod: {
            type: String,
            enum: ['self', 'google', 'github'],
            default: 'self'
        },
        profileurl: {
            type: String,
            default: ''
        },
        passwordResetToken: String,
        passwordResetTokenExpires: Date,
        lastChangedPassword: Date,
        verificationToken: {
            type: String,
            default: undefined,
            select: false
        },
    },
    {
        toObject: { virtuals: true },
        toJSON: {
            virtuals: true,
            transform(doc, ret, options) {
                delete (ret as Partial<IUser>).password;
                return ret;
            },
        },
    },
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) {
        return next();
    }
    this.lastChangedPassword = new Date(Date.now() - 1000);
    next();
});

userSchema.methods.correctPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.checkPasswordchanged = function (JWTTIMESTAMP: number) {
    if (!this.lastChangedPassword) return false;
    const time = this.lastChangedPassword.getTime() / 1000;
    return time > JWTTIMESTAMP;
};

userSchema.methods.getPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
};

const UserModel = mongoose.models.User || model<IUser>('User', userSchema);
export default UserModel;
