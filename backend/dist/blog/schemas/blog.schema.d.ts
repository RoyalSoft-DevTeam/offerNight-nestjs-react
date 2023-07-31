import * as mongoose from 'mongoose';
export declare const BlogSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    body?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    author?: string | undefined;
    date_posted?: string | undefined;
}, mongoose.Document<unknown, {}, {
    body?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    author?: string | undefined;
    date_posted?: string | undefined;
}> & {
    body?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    author?: string | undefined;
    date_posted?: string | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}>;
