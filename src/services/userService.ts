
// import User from "../models/user-model";
// import { createUserDTO } from "../DTOs/user/createUserDTO";

// class UserService {
//   createUser = async (userData: typeof createUserDTO) => {
//     const { name, email, password } = userData;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       throw new Error("User already exists");
//     }

//     const user = new User({
//       name,
//       email,
//       password,
//     });

//     await user.save();

//     return user;
//   };


//   async getUsers() {
//     return User.find();
//   }

//   // Obtener un usuario por ID
//   async getUserById(id: string) {
//     return User.findById(id);
//   }


//   async updateUser(
//     id: string,
//     updateData: { name?: string; email?: string; password?: string }
//   ) {
//     return User.findByIdAndUpdate(id, updateData, { new: true });
//   }

//   // Eliminar un usuario por ID
//   async deleteUser(id: string) {
//     return User.findByIdAndDelete(id);
//   }
// }

// export default new UserService();

