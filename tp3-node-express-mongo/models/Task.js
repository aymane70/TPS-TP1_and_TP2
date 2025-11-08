import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
text: { type: String, required: true, trim: true },
done: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model('Task', taskSchema);