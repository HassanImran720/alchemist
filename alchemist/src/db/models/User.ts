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
    projects: string[];
    passwordResetToken?: string;
    passwordResetTokenExpires?: Date;
    lastChangedPassword: Date;
    verificationToken?: string;
    // Profile Identity fields
    identity?: {
        role?: string;
        goals?: string;
        values?: string;
        skills?: string;
        customFields?: { [key: string]: string };
    };
    // Profile Preferences fields
    preferences?: {
        preferredOutput?: string;
        learningStyle?: string;
        toneOfChoice?: string;
        problemSolvingStyle?: string;
        customFields?: { [key: string]: string };
    };
    // Comprehensive Profile fields
    comprehensiveProfile?: {
        role?: string;
        aiLikes?: string[];
        aiDislikes?: string[];
        customAILikes?: string[];
        customAIDislikes?: string[];
        aboutMe?: string;
        myValues?: string[];
        mySkills?: string[];
        howIThink?: string[];
        myInfluences?: string[];
        brandVoices?: Array<{ id: string; key: string; value: string }>;
        audiencePersona?: Array<{ id: string; key: string; value: string }>;
        dataReferences?: Array<{ id: string; key: string; value: string }>;
        workExamples?: Array<{ id: string; key: string; value: string }>;
        miscellaneous?: Array<{ id: string; key: string; value: string }>;
    };
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
        projects: {
            type: [String],
            default: ['My Prompts']
        },
        passwordResetToken: String,
        passwordResetTokenExpires: Date,
        lastChangedPassword: Date,
        verificationToken: {
            type: String,
            default: undefined,
            select: false
        },
        identity: {
            role: { type: String, default: '' },
            goals: { type: String, default: '' },
            values: { type: String, default: '' },
            skills: { type: String, default: '' },
            customFields: {
                type: Map,
                of: String,
                default: {}
            }
        },
        preferences: {
            preferredOutput: { type: String, default: '' },
            learningStyle: { type: String, default: '' },
            toneOfChoice: { type: String, default: '' },
            problemSolvingStyle: { type: String, default: '' },
            customFields: {
                type: Map,
                of: String,
                default: {}
            }
        },
        comprehensiveProfile: {
            role: { type: String, default: '' },
            aiLikes: { type: [String], default: [] },
            aiDislikes: { type: [String], default: [] },
            customAILikes: { type: [String], default: [] },
            customAIDislikes: { type: [String], default: [] },
            aboutMe: { type: String, default: '' },
            myValues: { type: [String], default: [] },
            mySkills: { type: [String], default: [] },
            howIThink: { type: [String], default: [] },
            myInfluences: { type: [String], default: [] },
            brandVoices: {
                type: [{
                    id: String,
                    key: String,
                    value: String
                }],
                default: []
            },
            audiencePersona: {
                type: [{
                    id: String,
                    key: String,
                    value: String
                }],
                default: []
            },
            dataReferences: {
                type: [{
                    id: String,
                    key: String,
                    value: String
                }],
                default: []
            },
            workExamples: {
                type: [{
                    id: String,
                    key: String,
                    value: String
                }],
                default: []
            },
            miscellaneous: {
                type: [{
                    id: String,
                    key: String,
                    value: String
                }],
                default: []
            }
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
