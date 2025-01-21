
// import { Request, Response } from "express";

// import UserService from "../services/userService";
// import { validationResult } from "express-validator";
// import { createUserDTO } from "../DTOs/user/createUserDTO";

// class UserController {
//   createUser = [
//     ...createUserDTO,

//     async (req: Request, res: Response) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       try {
//         const { name, email, password } = req.body;
//         const user = await UserService.createUser({ name, email, password });
//         res.status(201).json(user);
//       } catch (error) {
//         res.status(500).json({ message: error });
//       }
//     },
//   ];

//   async getUsers(req: Request, res: Response) {
//     try {
//       const users = await UserService.getUsers();
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(400).json({ message: error });
//     }
//   }

//   async getUserById(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const user = await UserService.getUserById(id);
//       if (!user) {
//         return res.status(404).json({ message: "Usuario no encontrado" });
//       }
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(400).json({ message: error });
//     }
//   }

//   async updateUser(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const { name, email, password } = req.body;
//       const updatedUser = await UserService.updateUser(id, {
//         name,
//         email,
//         password,
//       });
//       if (!updatedUser) {
//         return res.status(404).json({ message: "Usuario no encontrado" });
//       }
//       res.status(200).json(updatedUser);
//     } catch (error) {
//       res.status(400).json({ message: error });
//     }
//   }

//   async deleteUser(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const deletedUser = await UserService.deleteUser(id);
//       if (!deletedUser) {
//         return res.status(404).json({ message: "Usuario no encontrado" });
//       }
//       res.status(200).json({ message: "Usuario eliminado con éxito" });
//     } catch (error) {
//       res.status(400).json({ message: error });
//     }
//   }
// }

// export default new UserController();