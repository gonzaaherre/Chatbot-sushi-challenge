import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  orders: Array<{ order: mongoose.Schema.Types.ObjectId; date: Date }>;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  orders: [
    {
      order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
      date: { type: Date, default: Date.now },
    },
  ],
});

//encriptar la contraseña antes de guardar el usuario

userSchema.pre("save", async function (next) {
  if (this.isModified("password") && typeof this.password === "string") {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Método para comparar la contraseña ingresada con la encriptada
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<User>("User", userSchema);

export default User;
